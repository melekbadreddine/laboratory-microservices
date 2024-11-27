import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evt } from 'src/models/Event';
import { Member } from 'src/models/Member';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  nbevents: number = 0;

  constructor(private http: HttpClient) {}
  getAllEvents(): Observable<Evt[]> {
    //envoyer une req http vers backend
    return this.http.get<Evt[]>('http://localhost:3000/events');
  }
  getMemberByID(id: string): Observable<Member> {
    return this.http.get<Member>(`http://localhost:3000/members/${id}`);
  }
  createEvent(evt: Evt): Observable<void> {
    return this.http.post<void>('http://localhost:3000/events', evt);
  }
  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/events/${id}`);
  }
  updateMember(id: string, m: Member): Observable<void> {
    return this.http.put<void>(`http://localhost:3000/members/${id}`, m);
  }
  countNbEvents(): number {
    this.getAllEvents().subscribe((data) => {
      this.nbevents = data.length;
    });
    return this.nbevents;
  }
}
