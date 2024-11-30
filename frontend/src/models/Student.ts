import { Member } from './Member';
import { Teacher } from './Teacher';

export interface Student extends Member {
  sujet: string;
  diplome: string;
  dateInscription: Date;
  encadrant: Teacher;
}
