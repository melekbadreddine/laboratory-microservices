package com.example.MemberService.Service.ServiceImpl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import com.example.MemberService.Entities.EnseignantChercheur;
import com.example.MemberService.Entities.Etudiant;
import com.example.MemberService.Entities.Member;
import com.example.MemberService.Repositories.EnseignantChercheurRepository;
import com.example.MemberService.Repositories.EtudiantRepository;
import com.example.MemberService.Repositories.MemberRepository;
import com.example.MemberService.Service.IMemberService;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class MemberServiceImpl implements IMemberService {

    private final MemberRepository memberRepository;
    private final EtudiantRepository etudiantRepository;
    private final EnseignantChercheurRepository enseignantRepository;
    @Override
    public Member addMember(Member m) {
        return memberRepository.save(m);
    }

    @Override
    public void deleteMember(Long id) {
        if (memberRepository.existsById(id)) {
            memberRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Member with ID " + id + " does not exist.");
        }
    }

    @Override
    public Member updateMember(Member p) {
        if (memberRepository.existsById(p.getId())) {
            return memberRepository.save(p); // Save updated entity directly
        } else {
            throw new IllegalArgumentException("Cannot update. Member with ID " + p.getId() + " does not exist.");
        }
    }

    @Override
    public Member findMember(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Member with ID " + id + " not found."));
    }

    @Override
    public List<Member> findAll() {
        return memberRepository.findAll();
    }

    @Override
    public Member findByCin(String cin) {
        return memberRepository.findByCin(cin);
    }

    @Override
    public Member findByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    @Override
    public List<Member> findByNom(String nom) {
        return memberRepository.findByNom(nom);
    }

    @Override
    public List<Etudiant> findByDiplome(String diplome) {
        return etudiantRepository.findByDiplome(diplome); // Assuming EtudiantRepository is used here
    }

    @Override
    public List<EnseignantChercheur> findByGrade(String grade) {
        return memberRepository.findByGrade(grade);
    }

    @Override
    public List<EnseignantChercheur> findByEtablissement(String etablissement) {
        return memberRepository.findByEtablissement(etablissement);
    }

    @Override
    public List<Etudiant> findByEncadrant(EnseignantChercheur ens) {
        return etudiantRepository.findByEncadrant(ens);
    }

    @Override
    public void affect_etudiantToEnseignant(Long idEns, Long idEtu) {
        Etudiant e = memberRepository.findById(idEtu)
                .filter(member -> member instanceof Etudiant)
                .map(member -> (Etudiant) member)
                .orElseThrow(() -> new IllegalArgumentException("Etudiant with ID " + idEtu + " not found."));

        EnseignantChercheur ens = memberRepository.findById(idEns)
                .filter(member -> member instanceof EnseignantChercheur)
                .map(member -> (EnseignantChercheur) member)
                .orElseThrow(() -> new IllegalArgumentException("EnseignantChercheur with ID " + idEns + " not found."));

        e.setEncadrant(ens);
        memberRepository.save(e);
    }

    @Override
    public List<EnseignantChercheur> findAllEnseignants() {
        return enseignantRepository.findAll();
    }

    @Override
    public List<Etudiant> findAllEtudiants() {
        return etudiantRepository.findAll();
    }

    @Override
    public long countEnseignants() {
        return enseignantRepository.count();
    }

    @Override
    public long countEtudiants() {
        return etudiantRepository.count();
    }
}
