import { FilterStore, DatabaseStore, SortStore } from '../types/aliases.ts';

export const getDatabaseStore = (state: DatabaseStore) => state.database;

export const getFilterStore = (state: FilterStore) => state.filter;

export const getSortStore = (state: SortStore) => state.sort;
