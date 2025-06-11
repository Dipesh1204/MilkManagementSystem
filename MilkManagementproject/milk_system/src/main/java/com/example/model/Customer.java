package com.example.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "customers")

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Customer {
    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
   
    private Long customerId;
    private String name;
    
    private String phone;
    private String email;
    private String address;
    
    public Customer() {
    }
    
    public Customer(Long customerId, String name, String address, String phone, String email) {
		super();
		this.customerId = customerId;
		this.name = name;
		this.address = address;
		this.phone = phone;
		this.email = email;
	}

	public Long getCustomerId() {
		return customerId;
	}
	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	@Override
	public String toString() {
		return "Customer [customerId=" + customerId + ", name=" + name + ", address=" + address + ", phone=" + phone
				+ ", email=" + email + "]";
	}
}

