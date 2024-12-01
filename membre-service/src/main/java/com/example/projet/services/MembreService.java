package com.example.projet.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projet.dao.EnseignantChercheurDao;
import com.example.projet.dao.EtudiantDao;
import com.example.projet.dao.MembreDao;
import com.example.projet.dao.Membre_PublicationDao;
import com.example.projet.entities.EnseignantChercheur;
import com.example.projet.entities.Etudiant;
import com.example.projet.entities.Membre;
import com.example.projet.entities.Membre_Pub_Id;
import com.example.projet.entities.Membre_Publication;

@Service
public class MembreService {
	@Autowired
	MembreDao membreDao;
	@Autowired
	EtudiantDao etudiantDao;
	@Autowired
	EnseignantChercheurDao enseignantChercheurDao;
	@Autowired
	Membre_PublicationDao membrePublicationDao;

	public List<Membre> findAll() {
		return membreDao.findAll();
	}

	public Membre addMember(Membre m) {
		membreDao.save(m);
		return m;
	}

	public void deleteMember(Long id) {
		membreDao.deleteById(id);
	}

	public Membre updateMember(Membre m) {
		return membreDao.saveAndFlush(m);
	}

	public Membre findMember(Long id) {
		Membre m = (Membre) membreDao.findById(id).get();
		return m;
	}

	public Membre findByCin(String cin) {
		return membreDao.findByCin(cin);
	}

	public Membre findByEmail(String email) {
		return membreDao.findByEmail(email);
	}

	public List<Membre> findByNom(String nom) {
		return membreDao.findByNom(nom);
	}

	public List<Etudiant> findByDiplome(String diplome) {
		return etudiantDao.findByDiplome(diplome);
	}

	public List<EnseignantChercheur> findByGrade(String grade) {
		return enseignantChercheurDao.findByGrade(grade);
	}

	public List<EnseignantChercheur> findByEtablissement(String etablissement) {
		return enseignantChercheurDao.findByEtablissement(etablissement);
	}

	public void affecterEtudiant(Long etudiantId, Long enseignantId) {
		Etudiant etudiant = (Etudiant) membreDao.findById(etudiantId).get();
		EnseignantChercheur enseignantChercheur = (EnseignantChercheur) membreDao.findById(enseignantId).get();
		etudiant.setEncadrant(enseignantChercheur);
		membreDao.save(etudiant);
	}

	public void affecterauteurTopublication(Long idauteur, Long idpub) {
		Membre mbr = (Membre) membreDao.findById(idauteur).get();
		Membre_Publication mbs = new Membre_Publication();
		mbs.setAuteur(mbr);
		mbs.setId(new Membre_Pub_Id(idpub, idauteur));
		membrePublicationDao.save(mbs);
	}
}
