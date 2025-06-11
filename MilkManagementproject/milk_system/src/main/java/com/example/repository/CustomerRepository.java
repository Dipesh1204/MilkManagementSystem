package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.model.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long>{
	 @Query(value = "SELECT IFNULL(MAX(customer_id), 0) + 1 FROM customers", nativeQuery = true)
	    Long getNextCustomerId();
}
