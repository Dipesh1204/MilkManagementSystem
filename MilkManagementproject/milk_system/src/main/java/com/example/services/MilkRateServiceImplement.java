//package com.example.services;
//
//import java.util.List;
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//
//import com.example.model.MilkRate;
//import com.example.repository.MilkRateRepository;
//
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//@Service
//@Transactional
//
//public class MilkRateServiceImplement implements MilkRateService {
//@Autowired
//public MilkRateRepository milkRate;
//
//@Override
//public List<MilkRate> getAllRates() {
//    return milkRate.findAll();
//}
//
//@Override
//public Optional<MilkRate> getRateById(Long rateid) {
//    return milkRate.findById(rateid);
//}
//
//@Override
//public MilkRate addMilkRate(MilkRate rate) {
//    if (rate.getRateId() == null) {
//        rate.setRateId(milkRate.getnextRateid());
//    }
//    return milkRate.save(rate);
//}
//
//
//@Override
//public MilkRate updateMilkRate(Long id, MilkRate updatedRate) {
//    return milkRate.findById(id).map(rate -> {
//        rate.setRate(updatedRate.getRate());
//        return milkRate.save(rate);
//    }).orElseThrow(() -> new RuntimeException("Milk rate not found"));
//}
//
//
//@Override
//public void deleteMilkRate(Long RateId) {
//	 milkRate.deleteById(RateId);
//}
//}
//

package com.example.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.model.MilkRate;
import com.example.repository.MilkRateRepository;

@Service
@Transactional
public class MilkRateServiceImplement implements MilkRateService {

    @Autowired
    public MilkRateRepository milkRate;
    
    @Override
    public double getCurrentRate() {
        return milkRate.findTopByOrderByEffectiveFromDesc()
                       .map(MilkRate::getRate)
                       .orElseThrow(() -> new RuntimeException("No rate found"));
    }

    @Override
    public List<MilkRate> getAllRates() {
        return milkRate.findAll();
    }

    @Override
    public Optional<MilkRate> getRateById(Long rateId) {
        return milkRate.findById(rateId);
    }

    @Override
    public synchronized MilkRate addMilkRate(MilkRate rate) {
        if (rate.getRateId() == null) {
            rate.setRateId(milkRate.getnextRateid());
        }
        return milkRate.save(rate);
    }

    @Override
    public MilkRate updateMilkRate(Long id, MilkRate updatedRate) {
        return milkRate.findById(id).map(rate -> {
            rate.setRate(updatedRate.getRate());
            rate.setEffectiveFrom(updatedRate.getEffectiveFrom());
            return milkRate.save(rate);
        }).orElseThrow(() -> new RuntimeException("Milk rate not found"));
    }
    

    @Override
    public void deleteMilkRate(Long rateId) {
        milkRate.deleteById(rateId);
    }
    
    public MilkRate getLatestRate() {
        return milkRate.findTopByOrderByEffectiveFromDesc()
                       .orElseThrow(() -> new RuntimeException("No rate available"));
    }

    public double getRateForCustomer(Long customerId) {
        return milkRate.findTopByCustomer_CustomerIdOrderByEffectiveFromDesc(customerId)
            .map(MilkRate::getRate)
            .orElseThrow(() -> new RuntimeException("No milk rate found for customer ID: " + customerId));
    }

}
