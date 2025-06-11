package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.MilkRecord;
import com.example.services.MilkRecordserviceImplement;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/milk-records")
public class MilkRecordController {
@Autowired
public MilkRecordserviceImplement milkRecordserviceImplement;

//@PostMapping
//public MilkRecord addMilk(@RequestBody MilkRecord milk) {
//   
//    
//    return milkRecordserviceImplement.addMilkRecord(milk);
//}
@PostMapping
public MilkRecord addMilk(@RequestBody MilkRecord milk) {
    System.out.println("Received milk record: " + milk);
    return milkRecordserviceImplement.addMilkRecord(milk);
}

@GetMapping
public List<MilkRecord> getAllRecords() {
    return milkRecordserviceImplement.getAllMilkRecords(); 
}

@GetMapping("/customer/{customerId}")
public List<MilkRecord> getRecordsByCustomer(@PathVariable Long customerId) {
    return milkRecordserviceImplement.getRecordsByCustomer(customerId);
}

@GetMapping("/{id}")
public ResponseEntity<MilkRecord> getRecordById(@PathVariable Long id) {
    return milkRecordserviceImplement.getRecordById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
}

@PutMapping("/{id}")
public ResponseEntity<MilkRecord> updateMilkRecord(@PathVariable Long id, @RequestBody MilkRecord updatedRecord) {
    return ResponseEntity.ok(milkRecordserviceImplement.updateMilkRecord(id, updatedRecord));
}

@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteMilkRecord(@PathVariable Long id) {
    milkRecordserviceImplement.deleteRecord(id);
    return ResponseEntity.noContent().build();
}

}

