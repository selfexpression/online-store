import { RootState } from '../types/aliases.ts';

export const getDatabaseState = (state: RootState) => state.database;

export const getFilterState = (state: RootState) => state.filter;

export const getSortState = (state: RootState) => state.sort;

export const getProductCardState = (state: RootState) => state.productCard;

export const getNavbarState = (state: RootState) => state.navbar;

export const getCartState = (state: RootState) => state.cart;

export const getCurrentBrandNames = (state: RootState) => state.filter.currentBrandNames;
