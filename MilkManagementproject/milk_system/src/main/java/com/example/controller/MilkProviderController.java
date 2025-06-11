package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.model.MilkProvider;
import com.example.services.MilkProviderServiceImplement;

@RestController
@RequestMapping("/api/providers")
public class MilkProviderController {
@Autowired
	public MilkProviderServiceImplement milkProviderServiceImplement;
@GetMapping
public List<MilkProvider> getAllProviders() {
    return milkProviderServiceImplement.getAllProviders();
}

@GetMapping("/{id}")
public ResponseEntity<MilkProvider> getProviderById(@PathVariable Long id) {
    return milkProviderServiceImplement.getProviderById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
}

@PostMapping
public MilkProvider addProvider(@RequestBody MilkProvider provider) {
    return milkProviderServiceImplement.addProvider(provider);
}

@PutMapping("/{id}")
public ResponseEntity<MilkProvider> updateProvider(@PathVariable Long id, @RequestBody MilkProvider updatedProvider) {
    return ResponseEntity.ok(milkProviderServiceImplement.updateProvider(id, updatedProvider));
}

@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteProvider(@PathVariable Long id) {
	milkProviderServiceImplement.deleteProvider(id);
    return ResponseEntity.noContent().build();
}
}
