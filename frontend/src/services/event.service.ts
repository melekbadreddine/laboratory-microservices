import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/app-config';
import { Observable } from 'rxjs';
import { Evenement } from 'src/models/event';

@Injectable({
  providedIn: 'root',
})
export class EvenementService {
  constructor(private httpClient: HttpClient) {}

  getEvenements(): Observable<Evenement[]> {
    return this.httpClient.get<Evenement[]>(`${API.url}/${API.event}/events`);
  }

  saveEvenement(event: Evenement): Observable<Evenement> {
    return this.httpClient.post<Evenement>(
      `${API.url}/${API.event}/events/create`,
      event
    );
  }

  updateEvenement(event: Evenement): Observable<Evenement> {
    return this.httpClient.put<Evenement>(
      `${API.url}/${API.event}/events/${event.id}/update`,
      event
    );
  }

  deleteEvenement(id: number): Observable<void> {
    this.httpClient.delete<void>(
      `${API.url}/${API.member}/members-per-event/${id}/delete`
    );
    return this.httpClient.delete<void>(
      `${API.url}/${API.event}/events/${id}/delete`
    );
  }

  getEvenementById(id: number): Observable<Evenement> {
    return this.httpClient.get<Evenement>(
      `${API.url}/${API.event}/events/${id}`
    );
  }

  getFullYearsEvents(startYear: number, endYear: number): Observable<number[]> {
    const url = `${API.url}/${API.event}/events/full-years-events/${startYear}/${endYear}`;
    return this.httpClient.get<number[]>(url);
  }
}
