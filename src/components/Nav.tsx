import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { actions as filterActions } from '../slices/filterSlice.ts';
import { actions as sortActions } from '../slices/sortSlice.ts';
import { getFilterStore, getSortStore } from '../utils/selectors.ts';
import { SortValues, MenuOpenHandlers } from '../types/interfaces.ts';

const FilterList: React.FC<MenuOpenHandlers> = ({ handleOpenFilterMenu }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isOpenFilterMenu } = useSelector(getFilterStore);
  const categories = t('filterList.categories', { returnObjects: true });

  const handleCurrentCategory = (
    id: number | null = null,
    value: boolean = false,
  ) => (): void => {
    const payload = {
      id,
      isFilteredValue: value,
    };

    dispatch(filterActions.setCurrentCategoryID(payload));
    handleOpenFilterMenu();
  };

  return (
    <ul className={classNames('filter-list m-0 p-0 no-wrap', {
      opened: isOpenFilterMenu,
    })}>
      <li
        className="p-2"
        onClick={handleCurrentCategory()}
      >
        {t('filterList.reset')}
      </li>
      {Object.entries(categories).map(([key, value], index) => (
        <li
          key={key}
          className="p-2"
          onClick={handleCurrentCategory(index + 1, isOpenFilterMenu)}
        >
          {value}
        </li>
      ))}
    </ul>
  );
};

const SortList: React.FC<MenuOpenHandlers> = ({ handleOpenSortMenu }) => {
  const dispatch = useDispatch();
  const { isOpenSortMenu } = useSelector(getSortStore);
  const { t } = useTranslation();
  const sortValues = t('sortValues', { returnObjects: true });

  const handleCurrentValue = (value: string) => (): void => {
    dispatch(sortActions.setCurrentValue(value));
    handleOpenSortMenu();
  };

  return (
    <ul className={classNames('sort-list m-0 p-0 no-wrap', {
      opened: isOpenSortMenu,
    })}>
      {Object.entries(sortValues).map(([key, value]) => (
        <li
          key={key}
          className="p-2"
          onClick={handleCurrentValue(key)}
        >
          {value}
        </li>
      ))}
    </ul>
  );
};

const FilterMenu: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isOpenFilterMenu } = useSelector(getFilterStore);

  const handleOpenFilterMenu = (): void => {
    dispatch(filterActions.openFilterMenu(!isOpenFilterMenu));
  };

  return (
    <div className="filter-menu">
      <button
        type="button"
        aria-label={t('nav.filterMenuToggle')}
        aria-expanded={isOpenFilterMenu}
        onClick={handleOpenFilterMenu}
      >
        <span className={classNames('toggle-line', {
          opened: isOpenFilterMenu,
        })}
        />
      </button>
      <FilterList handleOpenFilterMenu={handleOpenFilterMenu} />
    </div>
  );
};

const SortMenu: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const sortValues: SortValues = t('sortValues', { returnObjects: true });
  const { isOpenSortMenu, currentValue } = useSelector(getSortStore);

  const handleOpenSortMenu = (): void => {
    dispatch(sortActions.openSortMenu(!isOpenSortMenu));
  };

  return (
    <div className="sort-menu">
      <button
        type="button"
        aria-label={t('nav.sortMenuToggle')}
        aria-expanded={isOpenSortMenu}
        onClick={handleOpenSortMenu}
        className="font-large"
      >
        {sortValues[currentValue as keyof SortValues]}
      </button>
      <SortList handleOpenSortMenu={handleOpenSortMenu} />
    </div>
  );
};

export const Nav: React.FC = () => (
  <nav className="collection-nav">
    <div className="nav-filter d-flex">
      <FilterMenu />
      <SortMenu />
    </div>
  </nav>
);
