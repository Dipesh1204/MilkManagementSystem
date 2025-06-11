package com.example.milk;

import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.example.repository")  
@ComponentScan(basePackages = {"com.example"})
@EntityScan("com.example.model")
public class MilkSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(MilkSystemApplication.class, args);
		
	}

}
