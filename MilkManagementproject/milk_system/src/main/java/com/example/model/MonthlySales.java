package com.example.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "monthly_sales")
public class MonthlySales {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long saleId;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @NotNull(message = "Month-Year is required")
    private String monthYear;

    @NotNull(message = "Total milk quantity is required")
    @Positive(message = "Total milk quantity must be positive")
    private Double totalMilk;

    private Double totalAmount;

    private String status = "PENDING";

    public MonthlySales() {
    }

    public MonthlySales(Long saleId, Customer customer, String monthYear, Double totalMilk, Double totalAmount, String status) {
        this.saleId = saleId;
        this.customer = customer;
        this.monthYear = monthYear;
        this.totalMilk = totalMilk;
        this.totalAmount = totalAmount;
        this.status = status != null ? status : "PENDING";
    }

    public Long getSaleId() {
        return saleId;
    }

    public void setSaleId(Long saleId) {
        this.saleId = saleId;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public String getMonthYear() {
        return monthYear;
    }

    public void setMonthYear(String monthYear) {
        this.monthYear = monthYear;
    }

    public Double getTotalMilk() {
        return totalMilk;
    }

    public void setTotalMilk(Double totalMilk) {
        this.totalMilk = totalMilk;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status != null ? status : "PENDING";
    }

    @PrePersist
    public void prePersist() {
        if (this.status == null) {
            this.status = "PENDING";
        }
    }
}
