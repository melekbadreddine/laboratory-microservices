package com.example.projet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

import com.example.projet.services.MembreService;

@EnableDiscoveryClient
@SpringBootApplication
public class ProjetApplication {

	@Autowired
	MembreService membreService;

	@Autowired

	public static void main(String[] args) {
		SpringApplication.run(ProjetApplication.class, args);
	}

}
