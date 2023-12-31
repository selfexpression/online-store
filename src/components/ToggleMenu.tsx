import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { actions as filterActions } from '../slices/filterMenuSlice.ts';
import { actions as sortActions } from '../slices/sortMenuSlice.ts';
import { getFilterState, getSortState, getDatabaseState } from '../utils/selectors.ts';
import type { MenuOpenHandlers } from '../types/interfaces.ts';

import { SortIcon } from './Icons/SortIcon.tsx';

const FilterList: React.FC<MenuOpenHandlers> = ({ handleOpenFilterMenu }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isOpenFilterMenu } = useSelector(getFilterState);
  const { categories } = useSelector(getDatabaseState);

  const handleCurrentCategory = (id: number | null, value: boolean): void => {
    const payload = { id, isFilteredValue: value };

    dispatch(filterActions.setCurrentCategoryID(payload));
    handleOpenFilterMenu();
  };

  return (
    <ul className={classNames('filter-list m-0 p-0 no-wrap', {
      opened: isOpenFilterMenu,
    })}>
      <li
        className="p-2"
        onClick={() => handleCurrentCategory(null, !isOpenFilterMenu)}
      >
        {t('filterList.reset')}
      </li>
      {categories.map(({ id }) => (
        <li
          key={id}
          className="p-2"
          onClick={() => handleCurrentCategory(id, isOpenFilterMenu)}
        >
          {t(`filterList.categories.${id}`)}
        </li>
      ))}
    </ul>
  );
};

const SortList: React.FC<MenuOpenHandlers> = ({ handleOpenSortMenu }) => {
  const dispatch = useDispatch();
  const { isOpenSortMenu } = useSelector(getSortState);
  const { t } = useTranslation();
  const sortValues = t('sortValues', { returnObjects: true });

  const handleCurrentValue = (value: string): void => {
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
          onClick={() => handleCurrentValue(key)}
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
  const { isOpenFilterMenu } = useSelector(getFilterState);

  const handleOpenFilterMenu = (): void => {
    dispatch(filterActions.openFilterMenu(!isOpenFilterMenu));
  };

  return (
    <div className="filter-menu">
      <button
        type="button"
        aria-label={t('toggleMenu.filterMenuToggle')}
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
  const { isOpenSortMenu } = useSelector(getSortState);

  const handleOpenSortMenu = (): void => {
    dispatch(sortActions.openSortMenu(!isOpenSortMenu));
  };

  return (
    <div className="sort-menu">
      <button
        type="button"
        aria-label={t('toggleMenu.sortMenuToggle')}
        aria-expanded={isOpenSortMenu}
        onClick={handleOpenSortMenu}
        className="font-large"
      >
        <SortIcon />
      </button>
      <SortList handleOpenSortMenu={handleOpenSortMenu} />
    </div>
  );
};

export const ToggleMenu: React.FC = () => {
  const { t } = useTranslation();
  const { currentCategoryID } = useSelector(getFilterState);
  const currentFilterValue = currentCategoryID !== null
    ? t(`filterList.categories.${currentCategoryID}`)
    : t('toggleMenu.defaultFilter');

  return (
    <div className="toggle-menu-container">
      <div className="current-filter ml-4">
        <span>{currentFilterValue}</span>
      </div>
      <div className="toggle-menu-wrapper w-100">
        <div className="toggle-menu d-flex">
          <FilterMenu />
          <SortMenu />
        </div>
      </div>
    </div>
  );
};
