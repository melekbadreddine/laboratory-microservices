package com.example.MemberService.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.MemberService.Entities.EnseignantChercheur;
import com.example.MemberService.Entities.Etudiant;
import com.example.MemberService.Entities.Member;

import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member,Long>
{
    Member findByCin(String cin);
    List<Member> findByNomStartingWith(String caractere);
    Member findByEmail(String email);


    List<Member> findByNom(String nom);

    List<Etudiant> findByDiplome(String diplome);

    List<EnseignantChercheur> findByGrade(String grade);

    List<EnseignantChercheur> findByEtablissement(String etablissement);
}
