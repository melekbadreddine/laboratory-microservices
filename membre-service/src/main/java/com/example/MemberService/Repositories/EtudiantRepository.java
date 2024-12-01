package com.example.MemberService.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.MemberService.Entities.EnseignantChercheur;
import com.example.MemberService.Entities.Etudiant;

import java.util.List;

@Repository
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {
    List<Etudiant>findByDiplome(String diplome);
    List<Etudiant>findByDiplomeOrderByDateInscriptionDesc(String diplome);
    List<Etudiant>findByEncadrant(EnseignantChercheur ens);
    List<Etudiant> findAll();
}
