package com.example.model;

public class MonthlyCustomerSummary {
    private Long customerId;
    private Double totalQuantity;
    private Double totalAmount;

    public MonthlyCustomerSummary(Long customerId, Double totalQuantity, Double totalAmount) {
        this.customerId = customerId;
        this.totalQuantity = totalQuantity;
        this.totalAmount = totalAmount;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Double getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(Double totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }
} 