package com.example.services;

import java.util.*;

import com.example.model.*;

public interface MilkProviderService {
	public List<MilkProvider> getAllProviders();
	
	public Optional<MilkProvider> getProviderById(Long providerId);
	
	public MilkProvider addProvider(MilkProvider provider);
	
	 public void deleteProvider(Long providerId);
	 
	 public MilkProvider updateProvider(Long providerId, MilkProvider updatedProvider);
}
