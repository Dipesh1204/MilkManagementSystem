package com.example.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.model.MilkProvider;
import com.example.repository.MilkProviderRepository;

@Service
@Transactional
public class MilkProviderServiceImplement implements MilkProviderService {

    //private final MilkProviderRepository milkProvider; // ✅ Declare the field

@Autowired
public MilkProviderRepository milkProvider ;
    @Override
    public List<MilkProvider> getAllProviders() {
        return milkProvider.findAll();
    }

    @Override
    public Optional<MilkProvider> getProviderById(Long providerId) {
        return milkProvider.findById(providerId);
    }

    @Override
    public MilkProvider addProvider(MilkProvider provider) {
        return milkProvider.save(provider);
    }

    @Override
    public void deleteProvider(Long providerId) {
        milkProvider.deleteById(providerId);
    }

    @Override
    public MilkProvider updateProvider(Long providerId, MilkProvider updatedProvider) {
        return milkProvider.findById(providerId).map(provider -> {
            provider.setName(updatedProvider.getName());
            provider.setAddress(updatedProvider.getAddress());
            provider.setPhone(updatedProvider.getPhone());
            return milkProvider.save(provider);
        }).orElseThrow(() -> new RuntimeException("Provider not found!"));
    }
}
