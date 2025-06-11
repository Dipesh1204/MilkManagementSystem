package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.model.MonthlySales;
import com.example.model.MonthlyCustomerSummary;
import com.example.repository.CustomerRepository;
import com.example.services.MilkRateService;
import com.example.services.MonthlySalesService;

@RestController
@RequestMapping("/api/monthly-sales")
@CrossOrigin(origins = "http://localhost:3000")
public class MonthlySalesController {
    @Autowired
    private MonthlySalesService monthlySalesService;

    @Autowired
    private MilkRateService milkRateService;

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("/summaries/{monthYear}")
    public ResponseEntity<List<MonthlyCustomerSummary>> getMonthlyCustomerSummaries(@PathVariable String monthYear) {
        return ResponseEntity.ok(monthlySalesService.getMonthlyCustomerSummaries(monthYear));
    }

    @PostMapping("/generate/{monthYear}")
    public ResponseEntity<Void> generateMonthlySales(@PathVariable String monthYear) {
        monthlySalesService.generateMonthlySales(monthYear);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public List<MonthlySales> getAllSales() {
        return monthlySalesService.getAllSales();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MonthlySales> getSalesById(@PathVariable Long id) {
        return monthlySalesService.getSalesById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/customer/{customerId}")
    public List<MonthlySales> getSalesByCustomer(@PathVariable Long customerId) {
        return monthlySalesService.getSalesByCustomer(customerId);
    }

    @PostMapping
    public MonthlySales addMonthlySales(@RequestBody MonthlySales monthlySales) {
        return monthlySalesService.addMonthlySales(monthlySales);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MonthlySales> updateMonthlySales(@PathVariable Long id, @RequestBody MonthlySales updatedSales) {
        return ResponseEntity.ok(monthlySalesService.updateMonthlySales(id, updatedSales));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSales(@PathVariable Long id) {
        monthlySalesService.deleteSales(id);
        return ResponseEntity.noContent().build();
    }
}