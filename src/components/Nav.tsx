import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { actions as filterActions } from '../slices/filterSlice.ts';
import { actions as sortActions } from '../slices/sortSlice.ts';
import { getFilterStore, getDatabaseStore, getSortStore } from '../utils/selectors.ts';
import { SortValues, MenuOpenHandlers } from '../types/interfaces.ts';

const FilterList: React.FC<MenuOpenHandlers> = ({ handleOpenFilterMenu }) => {
  const dispatch = useDispatch();
  const { isOpenFilterMenu } = useSelector(getFilterStore);
  const { categories } = useSelector(getDatabaseStore);

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
        {'Сбросить'}
      </li>
      {categories.map(({ name, id }) => (
        <li
          key={id}
          className="p-2"
          onClick={handleCurrentCategory(id, isOpenFilterMenu)}
        >
          {name}
        </li>
      ))}
    </ul>
  );
};

const SortList: React.FC<MenuOpenHandlers> = ({ handleOpenSortMenu }) => {
  const dispatch = useDispatch();
  const { isOpenSortMenu, sortValues } = useSelector(getSortStore);

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
  const { isOpenFilterMenu } = useSelector(getFilterStore);

  const handleOpenFilterMenu = (): void => {
    dispatch(filterActions.openFilterMenu(!isOpenFilterMenu));
  };

  return (
    <div className="filter-menu">
      <button
        type="button"
        aria-label="filter-menu-toggle"
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
  const { isOpenSortMenu, currentValue, sortValues } = useSelector(getSortStore);

  const handleOpenSortMenu = (): void => {
    dispatch(sortActions.openSortMenu(!isOpenSortMenu));
  };

  return (
    <div className="sort-menu">
      <button
        type="button"
        aria-label="sort-menu-toggle"
        aria-expanded="false"
        onClick={handleOpenSortMenu}
      >
        {sortValues[currentValue as keyof SortValues]}
      </button>
      <SortList handleOpenSortMenu={handleOpenSortMenu} />
    </div>
  );
};

export const Nav: React.FC = () => (
  <nav className="collection-nav">
    <div className="nav-filter d-flex justify-content-between">
      <FilterMenu />
      <SortMenu />
    </div>
  </nav>
);
