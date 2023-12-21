import { DatabaseStateType, NavFilterStateType } from '../types/aliases.ts';

export const getDatabase = (state: DatabaseStateType) => state.database;

export const getNavFilterState = (state: NavFilterStateType) => state.navFilter;
