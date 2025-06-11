package com.example.services;

import java.util.List;
import java.util.Optional;

import com.example.model.MilkRecord;

public interface MilkRecordservice {
	
	public List<MilkRecord> getAllMilkRecords();
	
	public MilkRecord addMilkRecord(MilkRecord record);
	
	public List<MilkRecord> getRecordsByCustomer(Long customerId);
	
	public Optional<MilkRecord> getRecordById(Long recordId);
	
	public MilkRecord updateMilkRecord(Long recordId, MilkRecord updatedRecord);
	
	public void deleteRecord(Long recordId);
	
	
}

