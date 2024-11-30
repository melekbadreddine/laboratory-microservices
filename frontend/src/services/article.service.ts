import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/app-config';
import { Article } from 'src/models/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient: HttpClient) {}

  getArticles(): Observable<Article[]>{
    return this.httpClient.get<Article[]>(`${API.url}/${API.article}/articles`);
    //return new Observable((observer) => {observer.next(this.tab)});
  }

  saveArticle(article: Article): Observable<Article>{

    return this.httpClient.post<Article>(`${API.url}/${API.article}/articles/create`, article);

    //ken maandekch back-end

    //this.tab.unshift(member);
    //this.tab = [article, ...this.tab.filter(item=> item.id!= article.id)];
    //return new Observable (observer => {observer.next()});
  }

  updateArticle(article: Article): Observable<Article>{
    return this.httpClient.put<Article>(`${API.url}/${API.article}/articles/${article.id}/update`, article);
  }

  deleteArticle(id: number): Observable<void>{
    return this.httpClient.delete<void>(`${API.url}/${API.article}/articles/${id}/delete`);
  }

  getArticleById(id: number): Observable<Article>{
    return this.httpClient.get<Article>(`${API.url}/${API.article}/articles/${id}`);
    //return new Observable((observer) => {observer.next(this.tab.find((article)=>article.id === id))});
  }
}