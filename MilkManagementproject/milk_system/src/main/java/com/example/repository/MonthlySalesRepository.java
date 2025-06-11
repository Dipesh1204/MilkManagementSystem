package com.example.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.model.MonthlySales;

@Repository
public interface MonthlySalesRepository extends JpaRepository<MonthlySales, Long> {
	List<MonthlySales> findByCustomer_CustomerId(Long customerId);
	
	@Query("SELECT ms FROM MonthlySales ms LEFT JOIN FETCH ms.customer")
	List<MonthlySales> findAllWithCustomers();

	@Query(value = "SELECT IFNULL(MAX(sale_id), 0) + 1 FROM monthly_sales", nativeQuery = true)
    Long getNextSaleId();

	Optional<MonthlySales> findByCustomer_CustomerIdAndMonthYear(Long customerId, String monthYear);

	@Query(value = "SELECT COALESCE( " +
		   "  (SELECT MIN(t1.sale_id + 1) " +
		   "   FROM monthly_sales t1 " +
		   "   WHERE NOT EXISTS ( " +
		   "     SELECT 1 FROM monthly_sales t2 " +
		   "     WHERE t2.sale_id = t1.sale_id + 1 " +
		   "   )), " +
		   "  CASE " +
		   "    WHEN NOT EXISTS (SELECT 1 FROM monthly_sales) THEN 1 " +
		   "    WHEN NOT EXISTS (SELECT 1 FROM monthly_sales WHERE sale_id = 1) THEN 1 " +
		   "    ELSE (SELECT MAX(sale_id) + 1 FROM monthly_sales) " +
		   "  END " +
		   ") AS next_id", nativeQuery = true)
	Long getNextAvailableId();
}
