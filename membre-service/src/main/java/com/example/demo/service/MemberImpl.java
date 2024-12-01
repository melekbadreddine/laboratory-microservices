package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dao.EnseignantChercheurRepository;
import com.example.demo.dao.EtudiantRepository;
import com.example.demo.dao.MemberRepository;
import com.example.demo.entity.EnseignantChercheur;
import com.example.demo.entity.Etudiant;
import com.example.demo.entity.Member;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MemberImpl implements IMemberService {
	MemberRepository memberRepository;
	EtudiantRepository etudiantRepository;
	EnseignantChercheurRepository enseignantChercheurRepository;

	public Member addMember(Member m) {
		memberRepository.save(m);
		return m;
	}

	public void deleteMember(Long id) {
		memberRepository.deleteById(id);
	}

	public Member updateMember(Member m) {
		return memberRepository.saveAndFlush(m);
	}

	public Member findMember(Long id) {
		Member m = (Member) memberRepository.findById(id).get();
		return m;
	}

	public List<Member> findAll() {
		return memberRepository.findAll();
	}

	public Member findByCin(String cin) {
		return memberRepository.findByCin(cin);
	}

	public Member findByEmail(String email) {
		return memberRepository.findByEmail(email);
	}

	public List<Member> findByNom(String nom) {
		return memberRepository.findByNomStartingWith(nom);
	}

	public List<Etudiant> findByDiplome(String diplome) {
		return etudiantRepository.findByDiplome(diplome);
	}

	public List<EnseignantChercheur> findByGrade(String grade) {
		return enseignantChercheurRepository.findByGrade(grade);
	}

	public List<EnseignantChercheur> findByEtablissement(String etablissement) {
		return enseignantChercheurRepository.findByEtablissement(etablissement);
	}

	public List<Etudiant> findByEncadrant(EnseignantChercheur encadrant) {
		return etudiantRepository.findByEncadrant(encadrant);
	}

	public void affectEtudiantToEnseignant(Long id_etudiant, Long id_ecadrant) {

		Etudiant m = etudiantRepository.findById(id_etudiant).get();
		EnseignantChercheur ens = enseignantChercheurRepository.findById(id_ecadrant).get();
		m.setEncadrant(ens);
		memberRepository.save(m);

	}

}
