package com.example.project.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entities.Evenement;

public interface EvenementDao extends JpaRepository<Evenement,Long> {
}
