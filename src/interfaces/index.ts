import { DocumentData } from 'firebase/firestore';

export interface DataApi {
  getHaircareData: () => Promise<DocumentData>;
}
