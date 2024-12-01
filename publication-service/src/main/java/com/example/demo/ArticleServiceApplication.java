package com.example.demo;

import java.util.Date;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.demo.entity.Article;
import com.example.demo.service.IArticleService;

import lombok.AllArgsConstructor;

@SpringBootApplication
@AllArgsConstructor
public class ArticleServiceApplication implements CommandLineRunner{
	IArticleService articleService;
	public static void main(String[] args) {
		SpringApplication.run(ArticleServiceApplication.class, args);
	}
	@Override
	public void run(String... args) throws Exception {
		Article article1 = Article.builder().titre("newArticle").lien("http//helloworld.tn").date(new Date()).sourcepdf("src.pdf").type("informatique").build();
		articleService.addArticle(article1);
		List<Article> a = (List<Article>) articleService.findByTitre("newArticle");
		for (Article article : a) {
			System.out.println(article.getTitre());

		}
	}
	

}
