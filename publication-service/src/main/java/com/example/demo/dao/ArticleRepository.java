package com.example.demo.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Article;

public interface ArticleRepository  extends JpaRepository<Article, Long>{
	List<Article> findByLien (String type);
	List<Article> findByTitre (String titre);
	List<Article> findByDate (Date date);
}
