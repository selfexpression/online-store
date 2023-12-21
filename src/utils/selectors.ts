import { NavFilterStore, DatabaseStore } from '../types/aliases.ts';

export const getDatabaseStore = (state: DatabaseStore) => state.database;

export const getNavFilterStore = (state: NavFilterStore) => state.navFilter;
