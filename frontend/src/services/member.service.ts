import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/app-config';
import { Enseignant } from 'src/models/enseignant';
import { Etudiant } from 'src/models/etudiant';
import { Member } from 'src/models/member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private httpClient: HttpClient) {}

  saveMember(type: string, member: Member): Observable<Member> {
    if (type == 'etudiant') {
      return this.httpClient.post<Member>(
        `${API.url}/${API.member}/members/etudiant/create`,
        member
      );
    } else if (type == 'enseignant') {
      return this.httpClient.post<Member>(
        `${API.url}/${API.member}/members/enseignant/create`,
        member
      );
    } else {
      return new Observable((observer) =>
        observer.error('Invalid member type')
      );
    }
  }

  updateMember(type: string, member: Member): Observable<Member> {
    if (type == 'etudiant') {
      return this.httpClient.put<Member>(
        `${API.url}/${API.member}/members/etudiant/${member.id}/update`,
        member
      );
    } else if (type == 'enseignant') {
      return this.httpClient.put<Member>(
        `${API.url}/${API.member}/members/enseignant/${member.id}/update`,
        member
      );
    } else {
      return new Observable((observer) =>
        observer.error('Invalid member type')
      );
    }
  }

  getMemberById(id: number): Observable<Member> {
    return this.httpClient.get<Member>(
      `${API.url}/${API.member}/members/${id}`
    );
  }

  getMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(`${API.url}/${API.member}/members`);
  }

  getEnseignants(): Observable<Enseignant[]> {
    return this.httpClient.get<Enseignant[]>(
      `${API.url}/${API.member}/members/enseignants`
    );
  }

  getEtudiants(): Observable<Etudiant[]> {
    return this.httpClient.get<Etudiant[]>(
      `${API.url}/${API.member}/members/etudiants`
    ); // observe
  }

  affectEtudiantToEnseignant(
    etudiant: Member,
    enseignant: Member
  ): Observable<void> {
    return this.httpClient.put<void>(
      `${API.url}/${API.member}/members/affect-encadrant/${enseignant.id}`,
      etudiant.id
    );
  }

  getNbPubMembers(): Observable<number[]> {
    return this.httpClient.get<number[]>(
      `${API.url}/${API.member}/members/numberpublications`
    );
  }
  getNbOutilMembers(): Observable<number[]> {
    return this.httpClient.get<number[]>(
      `${API.url}/${API.member}/members/numberoutils`
    );
  }

  getNumberPerMemberType(): Observable<Record<string, number>> {
    return this.httpClient.get<Record<string, number>>(
      `${API.url}/${API.member}/members/members-per-role`
    );
  }

  getNumberPerMemberGrade(): Observable<Record<string, number>> {
    return this.httpClient.get<Record<string, number>>(
      `${API.url}/${API.member}/members/members-per-grade`
    );
  }
  getNumberPerMemberDiplome(): Observable<Record<string, number>> {
    return this.httpClient.get<Record<string, number>>(
      `${API.url}/${API.member}/members/members-per-diplome`
    );
  }

  getNumberPerMemberEtablissement(): Observable<Record<string, number>> {
    return this.httpClient.get<Record<string, number>>(
      `${API.url}/${API.member}/members/members-per-etablissement`
    );
  }

  affectMemberToEvent(idMember: number, idEvent: number): Observable<void> {
    return this.httpClient.post<void>(
      `${API.url}/${API.member}/members/affect-event/${idEvent}`,
      idMember
    );
  }
  affectMemberToTool(idMember: number, idTool: number): Observable<void> {
    return this.httpClient.post<void>(
      `${API.url}/${API.member}/members/affect-tool/${idTool}`,
      idMember
    );
  }
  affectMemberToPub(idMember: number, idPub: number): Observable<void> {
    return this.httpClient.post<void>(
      `${API.url}/${API.member}/members/affect-pub/${idPub}`,
      idMember
    );
  }

  getMemberByOutil(idOutil: number): Observable<Member> {
    return this.httpClient.get<Member>(
      `${API.url}/${API.member}/members/members-outil/${idOutil}`
    );
  }

  getMembersByEvent(idEvent: number): Observable<Member[]> {
    return this.httpClient.get<Member[]>(
      `${API.url}/${API.member}/members-per-event/${idEvent}`
    );
  }
  deleteEnseignant(memberId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${API.url}/${API.member}/members/enseignant/${memberId}/delete`
    );
  }

  deleteEtudiant(memberId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${API.url}/${API.member}/members/etudiant/${memberId}/delete`
    );
  }
}
