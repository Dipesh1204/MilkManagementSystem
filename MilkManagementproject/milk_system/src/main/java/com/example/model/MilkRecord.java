package com.example.model;

import jakarta.persistence.*;

@Entity
@Table(name = "milk_records")
public class MilkRecord {
    @Id
    private Long recordId;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
    private String recordDate;
    private Double quantity;
    private Double rate;
    
    @Transient
    public Double getTotalAmount() {
        return this.quantity * this.rate;
    }
    
    public MilkRecord() {
    }
 
    public MilkRecord(Long recordId, Customer customer, String recordDate, Double quantity, Double rate) {
        super();
        this.recordId = recordId;
        this.customer = customer;
        this.recordDate = recordDate;
        this.quantity = quantity;
        this.rate = rate;
    }

    public Long getRecordId() {
        return recordId;
    }

    public void setRecordId(Long recordId) {
        this.recordId = recordId;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public String getRecordDate() {
        return recordDate;
    }

    public void setRecordDate(String recordDate) {
        this.recordDate = recordDate;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public Double getRate() {
        return rate;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }
}
