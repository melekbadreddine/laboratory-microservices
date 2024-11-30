import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API, GLOBAL } from 'src/app/app-config';
import { Member } from 'src/models/Member';
import { Student } from 'src/models/Student';
import { Teacher } from 'src/models/Teacher';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  //Injection de HTTP CLIENT
  constructor(private httpClient: HttpClient) {}

  saveMember(type: string, member: Member): Observable<Member> {
    if (type == 'student') {
      return this.httpClient.post<Member>(
        `${API.url}/${API.member}/members/student/create`,
        member
      );

      // @RequestBody(name="member") Member member
    } else if (type == 'teacher') {
      return this.httpClient.post<Member>(
        `${API.url}/${API.member}/members/teacher/create`,
        member
      );
    } else {
      return new Observable((observer) =>
        observer.error('Invalid member type')
      );
    }
    //ken maandekch back-end

    //this.tab.unshift(member);
    //this.tab = [member, ...this.tab.filter(item=> item.id!= member.id)];
    //return new Observable (observer => {observer.next()});
  }

  updateMember(type: string, member: Member): Observable<Member> {
    if (type == 'student') {
      return this.httpClient.put<Member>(
        `${API.url}/${API.member}/members/student/${member.id}/update`,
        member
      );
    } else if (type == 'teacher') {
      return this.httpClient.put<Member>(
        `${API.url}/${API.member}/members/teacher/${member.id}/update`,
        member
      );
    } else {
      return new Observable((observer) =>
        observer.error('Invalid member type')
      );
    }
    //ken maandekch back-end

    //this.tab.unshift(member);
    //this.tab = [member, ...this.tab.filter(item=> item.id!= member.id)];
    //return new Observable (observer => {observer.next()});
  }

  getMemberById(id: string): Observable<Member> {
    return this.httpClient.get<Member>(
      `${API.url}/${API.member}/members/${id}`
    );
    //return new Observable((observer) => {observer.next(this.tab.find((member)=>member.id === id))});
  }

  getMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(`${API.url}/${API.member}/members`);
    //return new Observable((observer) => {observer.next(this.tab.find((member)=>member.id === id))});
  }

  getTeachers(): Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>(
      `${API.url}/${API.member}/members/teachers`
    );
    //return new Observable((observer) => {observer.next(this.tab.find((member)=>member.id === id))});
  }

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(
      `${API.url}/${API.member}/members/students`
    ); // observe
    //return new Observable((observer) => {observer.next(this.tab.find((member)=>member.id === id))});
  }

  affectStudentToTeacher(student: Member, teacher: Member): Observable<void> {
    return this.httpClient.put<void>(
      `${API.url}/${API.member}/members/affect-encadrant/${teacher.id}`,
      student.id
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
  deleteTeacher(memberId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${API.url}/${API.member}/members/teacher/${memberId}/delete`
    );
  }

  deleteStudent(memberId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${API.url}/${API.member}/members/student/${memberId}/delete`
    );
  }
}
