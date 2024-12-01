package com.example.demo;

import java.util.Date;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.demo.dao.EtudiantRepository;
import com.example.demo.dao.MemberRepository;
import com.example.demo.entity.EnseignantChercheur;
import com.example.demo.entity.Etudiant;
import com.example.demo.entity.Member;
import com.example.demo.service.IMemberService;

import lombok.AllArgsConstructor;

@AllArgsConstructor // bch injectina l instance de MemberRepository
@SpringBootApplication
public class MemberServiceApplication implements CommandLineRunner {
	MemberRepository memberRepository;
	EtudiantRepository etudiantRepository;
	IMemberService memberService;

	public static void main(String[] args) {
		SpringApplication.run(MemberServiceApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		Member etd1 = Etudiant.builder().cin("123456").dateInscription(new Date()).dateNaissance(new Date())
				.diplome("mastère").email("etd1@gmail.com").password("pass1").encadrant(null).cv("cv1").nom("abid")
				.prenom("youssef").build();
		Member etd2 = Etudiant.builder().cin("1234567").dateInscription(new Date()).dateNaissance(new Date())
				.diplome("ing").email("nihel@gmail.com").password("pass1").encadrant(null).cv("cv1").nom("aloulou")
				.prenom("nihel").build();
		Member en1 = EnseignantChercheur.builder().cin("123").dateNaissance(new Date())
				.email("asma@gmail.com").password("pass1").cv("cv1").etablissement("enis").nom("bahri").prenom("asma")
				.grade("professeur").build();
		Member en2 = EnseignantChercheur.builder().cin("1237").dateNaissance(new Date())
				.email("mariem@gmail.com").password("pass1").cv("cv2").etablissement("enis").nom("kharrat")
				.prenom("mariem").grade("maitre assistant").build();
		memberService.addMember(etd1);
		memberRepository.save(etd2);
		memberRepository.save(en1);
		memberRepository.save(en2);

		Member m = memberService.findMember(1L);
		m.setCv("cv2");

		memberService.updateMember(m);

//delete Member
// memberService.deleteMember(2L);

		memberService.affectEtudiantToEnseignant(1L, 3L);
		memberService.affectEtudiantToEnseignant(2L, 3L);

		EnseignantChercheur e = (EnseignantChercheur) memberService.findMember(3L);
		List<Etudiant> etd = etudiantRepository.findByEncadrant(e);
		for (Etudiant etudiant : etd) {
			System.out.println(etudiant.getNom() + " " + etudiant.getPrenom());
		}


// // Afficher la liste des membres dans le labo
//
// List<Membre> listMembre = memberRepository.findAll();
//
// for (Membre member : listMembre) { // Use `Membre` type and `:`
// System.out.println(member.getNom() + " " + member.getPrenom()); // Add a space between name and prenom
// }
//
// // • Chercher un membre par ID
//
// Membre m = memberRepository.findById(2L).get();
// System.out.println(m.getNom() + " " + m.getPrenom());
//
// // • Modifier un membre
//
// m.setNom("aloulouuu");
//
// System.out.println(m.getNom() + " " + m.getPrenom());
//
// memberRepository.save(m);
//
// // • Supprimer un membre
//
//
// memberRepository.deleteById(1L);
//
//
// listMembre = memberRepository.findAll();
//
// for (Membre member : listMembre) { // Use `Membre` type and `:`
// System.out.println(member.getNom() + " " + member.getPrenom()); // Add a space between name and prenom
// }
	}

}