import { NavFilterStore, DatabaseStore } from '../types/aliases.ts';

export const getDatabase = (state: DatabaseStore) => state.database;

export const getNavFilter = (state: NavFilterStore) => state.navFilter;
