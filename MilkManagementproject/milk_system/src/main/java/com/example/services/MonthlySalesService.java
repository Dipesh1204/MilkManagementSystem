package com.example.services;

import java.util.List;
import java.util.Optional;

import com.example.model.*;

public interface MonthlySalesService {
	public List<MonthlySales> getAllSales();
	
	public List<MonthlySales> getSalesByCustomer(Long customerId);
	
	public MonthlySales addMonthlySales(MonthlySales monthlySales);
	
	public Optional<MonthlySales> getSalesById(Long saleId);
	
	public MonthlySales updateMonthlySales(Long saleId, MonthlySales updatedSales);
	
	public void deleteSales(Long saleId);
	
	public List<MonthlyCustomerSummary> getMonthlyCustomerSummaries(String monthYear);
	
	public void generateMonthlySales(String monthYear);
}
