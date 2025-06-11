package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Customer;
import com.example.services.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/api/customers")
public class CustomerController {
	@Autowired
	public CustomerServiceImplement customerServiceImpl;
	
	 @GetMapping
	    public List<Customer> getAllCustomers() {
	        return customerServiceImpl.getAllCustomers();
	    }

	    @PostMapping
	    public Customer addCustomer(@RequestBody Customer customer) {
	        return customerServiceImpl.addCustomer(customer);
	    }
	    
	    @GetMapping("/{id}")
	    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
	        return customerServiceImpl.getCustomerById(id)
	                .map(ResponseEntity::ok)
	                .orElse(ResponseEntity.notFound().build());
	    }
	    
	    @PutMapping("/{id}")
	    public ResponseEntity<Customer> updateCustomer(@PathVariable Long id, @RequestBody Customer updatedCustomer) {
	        return ResponseEntity.ok(customerServiceImpl.updateCustomer(id, updatedCustomer));
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
	    	customerServiceImpl.deleteCustomer(id);
	        return ResponseEntity.noContent().build();
	    }
}


