package com.example.MemberService.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.MemberService.Entities.EnseignantChercheur;

import java.util.List;

@Repository
public interface EnseignantChercheurRepository extends JpaRepository<EnseignantChercheur, Long> {
    List<EnseignantChercheur> findByGrade(String grade);
    List<EnseignantChercheur>findByEtablissement(String etablissement);
    List<EnseignantChercheur> findAll();
}
