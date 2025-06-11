package com.example.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.model.MilkRecord;
import com.example.repository.MilkRecordRepository;
@Service
@Transactional
public class MilkRecordserviceImplement implements MilkRecordservice {
@Autowired
public MilkRecordRepository Record;
	
@Autowired
private MilkRateService milkRateService;

	@Override
	public List<MilkRecord> getAllMilkRecords() {
		// TODO Auto-generated method stub
		return Record.findAll();
	}

	@Override
	public MilkRecord addMilkRecord(MilkRecord record) {
		// Set the current applicable rate
		double currentRate = milkRateService.getCurrentRate();
		record.setRate(currentRate);

		// Check if a record already exists for this customer on this date
		Optional<MilkRecord> existingRecord = Record.findByCustomer_CustomerIdAndRecordDate(
			record.getCustomer().getCustomerId(),
			record.getRecordDate()
		);

		if (existingRecord.isPresent()) {
			// Update existing record by adding the new quantity
			MilkRecord existing = existingRecord.get();
			existing.setQuantity(existing.getQuantity() + record.getQuantity());
			// Always use the current rate
			existing.setRate(currentRate);
			return Record.save(existing);
		}

		// If no existing record is found, create a new one with the next available ID
		if (record.getRecordId() == null) {
			Long nextId = Record.getNextRecordId();
			record.setRecordId(nextId);
		}
		return Record.save(record);
	}
	@Override
	  public List<MilkRecord> getRecordsByCustomer(Long customerId) {
	        return Record.findByCustomer_CustomerId(customerId);
	    }
	
	@Override
	  public MilkRecord updateMilkRecord(Long recordId, MilkRecord updatedRecord) {
        // Get the current applicable rate
        double currentRate = milkRateService.getCurrentRate();
        
        return Record.findById(recordId).map(record -> {
            record.setRecordDate(updatedRecord.getRecordDate());
            record.setQuantity(updatedRecord.getQuantity());
            // Always use the current rate
            record.setRate(currentRate);
            return Record.save(record);
        }).orElseThrow(() -> new RuntimeException("Record not found!"));
    }
	
	@Override
	public Optional<MilkRecord> getRecordById(Long recordId) {
        return Record.findById(recordId);
    }
	
	  @Override
	    public void deleteRecord(Long recordId) {
	        Record.deleteById(recordId);
	    }

}
