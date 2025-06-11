package com.example.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.model.MilkRecord;
import com.example.model.MonthlyCustomerSummary;

@Repository
public interface MilkRecordRepository extends JpaRepository<MilkRecord	, Long> {
	List<MilkRecord> findByCustomer_CustomerId(Long customerId);
	Optional<MilkRecord> findByCustomer_CustomerIdAndRecordDate(Long customerId, String recordDate);
	
	@Query(value = "SELECT MIN(t1.record_id + 1) AS next_id FROM milk_records t1 " +
	               "LEFT JOIN milk_records t2 ON t1.record_id + 1 = t2.record_id " +
	               "WHERE t2.record_id IS NULL", nativeQuery = true)
	Long findNextAvailableId();
	
	@Query(value = "SELECT COALESCE(MIN(t1.record_id + 1), 1) AS next_id FROM milk_records t1 " +
	               "LEFT JOIN milk_records t2 ON t1.record_id + 1 = t2.record_id " +
	               "WHERE t2.record_id IS NULL", nativeQuery = true)
	Long getNextRecordId();

    @Query("SELECT NEW com.example.model.MonthlyCustomerSummary(" +
           "mr.customer.customerId, " +
           "SUM(mr.quantity), " +
           "SUM(mr.quantity * mr.rate)) " +
           "FROM MilkRecord mr " +
           "WHERE SUBSTRING(mr.recordDate, 1, 7) = :monthYear " +
           "GROUP BY mr.customer.customerId")
    List<MonthlyCustomerSummary> findMonthlyCustomerSummaries(@Param("monthYear") String monthYear);
}
