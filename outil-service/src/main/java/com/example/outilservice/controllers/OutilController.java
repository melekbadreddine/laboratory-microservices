package com.example.outilservice.controllers;


import com.example.outilservice.entities.Outil;
import com.example.outilservice.services.OutilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class OutilController {
    @Autowired
    OutilService outilService;
    @GetMapping("/outil")
    public List<Outil> getAll(){
        return outilService.findAll();
    }
    @PostMapping
    public void addOutil(@RequestBody Outil outil){
        outilService.addOutil(outil);
    }

}
