package com.example.project.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.entities.Evenement;
import com.example.project.services.EvenementService;

@RestController
public class EvenementController {
	@Autowired
	EvenementService evenementService;

	@GetMapping("/evenement")
	public List<Evenement> findAll() {
		return evenementService.findAll();
	}

	@PostMapping
	public void addEvenement(@RequestBody Evenement evenement) {
		evenementService.addEvenement(evenement);
	}
}
