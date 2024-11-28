package com.example.evenementservice.controllers;


import com.example.evenementservice.entities.Evenement;
import com.example.evenementservice.services.EvenementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class EvenementController {
    @Autowired
    EvenementService evenementService;
    @GetMapping("/evenement")
    public List<Evenement> findAll(){
        return evenementService.findAll();
    }
    @PostMapping
    public void addEvenement(@RequestBody Evenement evenement){
        evenementService.addEvenement(evenement);
    }
}
