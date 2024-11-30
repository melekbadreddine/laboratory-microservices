import { Member } from './Member';

export interface Teacher extends Member {
  grade: string;
  etablissement: string;
}
