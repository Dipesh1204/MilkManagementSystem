package com.example.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.model.Customer;
import com.example.repository.CustomerRepository;



@Service
@Transactional

public class CustomerServiceImplement implements CustomerService{
	@Autowired
	public CustomerRepository customerRepo;

	@Override
	public List<Customer> getAllCustomers() {
		
		return customerRepo.findAll();
	}

	@Override
	public Customer addCustomer(Customer customers) {
		 if (customers.getCustomerId() == null) { // Assign ID only for new records
	            customers.setCustomerId(customerRepo.getNextCustomerId());
	        }
		return customerRepo.save(customers) ;
		
	}
	
	@Override
	public Optional<Customer> getCustomerById(Long customerId) {
        return customerRepo.findById(customerId);
    }
	
	@Override
	public void deleteCustomer(Long customerId) {
		customerRepo.deleteById(customerId);
    }
	
	@Override
	  public Customer updateCustomer(Long customerId, Customer updatedCustomer) {
        return customerRepo.findById(customerId).map(customer -> {
            customer.setName(updatedCustomer.getName());
            customer.setAddress(updatedCustomer.getAddress());
            customer.setPhone(updatedCustomer.getPhone());
            customer.setEmail(updatedCustomer.getEmail());
            return customerRepo.save(customer);
        }).orElseThrow(() -> new RuntimeException("Customer not found!"));
    }
}



	


