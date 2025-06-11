package com.example.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.model.Customer;
import com.example.model.MonthlyCustomerSummary;
import com.example.model.MonthlySales;
import com.example.repository.CustomerRepository;
import com.example.repository.MilkRecordRepository;
import com.example.repository.MonthlySalesRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.EntityManagerFactory;

@Service
@Transactional
public class MonthlySalesServiceImplement implements MonthlySalesService {
    
    @Autowired
    private MonthlySalesRepository monthlySalesRepository; 
    
    @Autowired
    private CustomerRepository customerRepository; 
    
    @Autowired
    private MilkRateService milkRateService;

    @Autowired
    private MilkRecordRepository milkRecordRepository;
   
    @Autowired
    private EntityManagerFactory entityManagerFactory;

    @Override
    public List<MonthlyCustomerSummary> getMonthlyCustomerSummaries(String monthYear) {
        return milkRecordRepository.findMonthlyCustomerSummaries(monthYear);
    }

    @Override
    public void generateMonthlySales(String monthYear) {
        List<MonthlyCustomerSummary> summaries = getMonthlyCustomerSummaries(monthYear);
        
        for (MonthlyCustomerSummary summary : summaries) {
            Customer customer = customerRepository.findById(summary.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

            // Check if monthly sales record already exists
            Optional<MonthlySales> existingSales = monthlySalesRepository
                .findByCustomer_CustomerIdAndMonthYear(customer.getCustomerId(), monthYear);

            MonthlySales monthlySales;
            if (existingSales.isPresent()) {
                monthlySales = existingSales.get();
            } else {
                monthlySales = new MonthlySales();
                monthlySales.setCustomer(customer);
                monthlySales.setMonthYear(monthYear);
                monthlySales.setStatus("PENDING"); // Default status
            }

            monthlySales.setTotalMilk(summary.getTotalQuantity());
            monthlySales.setTotalAmount(summary.getTotalAmount());
            
            monthlySalesRepository.save(monthlySales);
        }
    }

    @Override
    public List<MonthlySales> getAllSales() {
        return monthlySalesRepository.findAll();
    }

    @Override
    public List<MonthlySales> getSalesByCustomer(Long customerId) {
        return monthlySalesRepository.findByCustomer_CustomerId(customerId);
    }

    @Override
    public Optional<MonthlySales> getSalesById(Long saleId) {
        return monthlySalesRepository.findById(saleId);
    }

    @Override
    @Transactional
    public MonthlySales addMonthlySales(MonthlySales sales) {
        System.out.println("Received monthly sales data: " + sales.toString());
        
        // Validate customer
        if (sales.getCustomer() == null || sales.getCustomer().getCustomerId() == null) {
            throw new RuntimeException("Customer information is missing in the request.");
        }

        // Validate required fields
        if (sales.getMonthYear() == null || sales.getTotalMilk() == null) {
            throw new RuntimeException("Month-Year and Total Milk are required fields.");
        }

        // Find the customer
        Customer existingCustomer = customerRepository.findById(sales.getCustomer().getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        // Check for existing sale
        Optional<MonthlySales> existingSale = monthlySalesRepository
            .findByCustomer_CustomerIdAndMonthYear(existingCustomer.getCustomerId(), sales.getMonthYear());

        if (existingSale.isPresent()) {
            System.out.println("Updating existing monthly sale for: " + existingCustomer.getName());
            MonthlySales existing = existingSale.get();
            existing.setTotalMilk(sales.getTotalMilk());
            existing.setTotalAmount(sales.getTotalAmount());
            existing.setStatus(sales.getStatus());
            return monthlySalesRepository.save(existing);
        }

        try {
            // Get the next available ID (will reuse deleted IDs)
            Long nextId = monthlySalesRepository.getNextAvailableId();
            
            // Set up the new sale
            sales.setSaleId(nextId);
            sales.setCustomer(existingCustomer);
            sales.setStatus(sales.getStatus() != null ? sales.getStatus() : "PENDING");
            
            // Use JPA repository to save
            MonthlySales savedSale = monthlySalesRepository.save(sales);
            
            if (savedSale == null) {
                throw new RuntimeException("Failed to save monthly sale");
            }
            
            System.out.println("Successfully saved monthly sale with ID: " + savedSale.getSaleId());
            return savedSale;
            
        } catch (Exception e) {
            System.err.println("Error while saving monthly sale: " + e.getMessage());
            throw new RuntimeException("Error saving monthly sale: " + e.getMessage());
        }
    }

    @Override
    public MonthlySales updateMonthlySales(Long saleId, MonthlySales updatedSales) {
        return monthlySalesRepository.findById(saleId).map(sales -> {
            sales.setMonthYear(updatedSales.getMonthYear());
            sales.setTotalMilk(updatedSales.getTotalMilk());
            sales.setStatus(updatedSales.getStatus());
            sales.setTotalAmount(updatedSales.getTotalAmount());

            if (updatedSales.getCustomer() != null && updatedSales.getCustomer().getCustomerId() != null) {
                Customer existingCustomer = customerRepository.findById(updatedSales.getCustomer().getCustomerId())
                    .orElseThrow(() -> new RuntimeException("Customer not found"));
                sales.setCustomer(existingCustomer);
            }

            return monthlySalesRepository.save(sales);
        }).orElseThrow(() -> new RuntimeException("Monthly sales record not found!"));
    }

    @Override
    public void deleteSales(Long saleId) {
        monthlySalesRepository.deleteById(saleId);
    }
}
