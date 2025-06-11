package com.example.services;

import java.util.List;
import java.util.Optional;

import com.example.model.Customer;


public interface CustomerService {
	
	
	public List<Customer>getAllCustomers() ;
	
	public Customer addCustomer(Customer customer);
	
	public Optional<Customer> getCustomerById(Long customerId);
	
	public void deleteCustomer(Long customerId);
	
	public Customer updateCustomer(Long customerId, Customer updatedCustomer);
    }

