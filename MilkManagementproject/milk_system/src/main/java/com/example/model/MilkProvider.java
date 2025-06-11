package com.example.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "milk_providers")
@Getter
@Setter

public class MilkProvider {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long providerId;
    private String name;
    private String address;
    private String phone;

    public MilkProvider() {
    	
    }
    
    public MilkProvider(Long providerId, String name, String address, String phone) {
		super();
		this.providerId = providerId;
		this.name = name;
		this.address = address;
		this.phone = phone;
	}

	public Long getProviderId() {
		return providerId;
	}

	public void setProviderId(Long providerId) {
		this.providerId = providerId;
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
	
}
