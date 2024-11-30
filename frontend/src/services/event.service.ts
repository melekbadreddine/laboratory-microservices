import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API, GLOBAL } from 'src/app/app-config';
import { Observable } from 'rxjs';
import { Evt } from 'src/models/Event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  // tab: enseEventignant[] = GLOBAL._DB.events;
  //Injection de HTTP CLIENT
  constructor(private httpClient: HttpClient) {}

  getEvents(): Observable<Evt[]> {
    return this.httpClient.get<Evt[]>(`${API.url}/${API.event}/events`);
    //return new Observable((observer) => {observer.next(this.tab)});
  }

  saveEvent(event: Evt): Observable<Evt> {
    return this.httpClient.post<Evt>(
      `${API.url}/${API.event}/events/create`,
      event
    );

    //ken maandekch back-end

    //this.tab.unshift(member);
    //this.tab = [event, ...this.tab.filter(item=> item.id!= event.id)];
    //return new Observable (observer => {observer.next()});
  }

  updateEvent(event: Evt): Observable<Evt> {
    return this.httpClient.put<Evt>(
      `${API.url}/${API.event}/events/${event.id}/update`,
      event
    );
  }

  deleteEvent(id: string): Observable<void> {
    this.httpClient.delete<void>(
      `${API.url}/${API.member}/members-per-event/${id}/delete`
    );
    return this.httpClient.delete<void>(
      `${API.url}/${API.event}/events/${id}/delete`
    );
  }

  getEventById(id: string): Observable<Evt> {
    return this.httpClient.get<Evt>(`${API.url}/${API.event}/events/${id}`);
    //return new Observable((observer) => {observer.next(this.tab.find((event)=>event.id === id))});
  }

  getFullYearsEvents(startYear: number, endYear: number): Observable<number[]> {
    const url = `${API.url}/${API.event}/events/full-years-events/${startYear}/${endYear}`;
    return this.httpClient.get<number[]>(url);
  }
}
