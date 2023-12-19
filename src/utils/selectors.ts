import { DatabaseStateType } from '../types/aliases.ts';

export const getDatabase = (state: DatabaseStateType) => state.database;
