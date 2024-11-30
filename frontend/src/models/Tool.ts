import { Member } from './Member';

export interface Tool {
  id: string;
  nom: string;
  date: Date;
  source: string;
  createur?: Member;
}
