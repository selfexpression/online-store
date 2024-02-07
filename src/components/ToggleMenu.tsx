import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { actions as filterActions } from '../slices/filterMenuSlice.ts';
import { actions as sortActions } from '../slices/sortMenuSlice.ts';
import { getFilterState, getSortState, getDatabaseState } from '../utils/selectors.ts';
import { filterProducts } from '../thunks/databaseThunks.ts';
import type { AppDispatch } from '../types/aliases.ts';

import { SortIcon } from './Icons/SortIcon.tsx';

type ToggleMenuHandler = {
  handleToggleMenu: () => void;
}

interface MenuProps {
  isOpenMenu: boolean;
  handleToggleMenu: () => void;
  List: React.FC<ToggleMenuHandler>;
  TogglerIcon: React.JSX.Element;
  marker: string;
}

const BrandList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { initialProducts } = useSelector(getDatabaseState);
  const { isOpenMenu } = useSelector(getFilterState);

  const handleToggleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const payload = {
      name: e.target.name.toLowerCase(),
      isCheckedInput: e.target.checked,
    };

    dispatch(filterActions.setCurrentBrandNames(payload));
    dispatch(filterProducts());
  };

  const brands = _.uniqWith(initialProducts
    .map((product) => product.brand.toLowerCase()))
    .map((brand) => brand.replace(/^\w/, (c) => c.toUpperCase()));

  return (
    <div className={cn('filter-list brand-list m-0 p-0 no-wrap', {
      opened: isOpenMenu,
    })}>
      {brands.map((brand) => (
        <div className="item p-2 d-flex align-items-center" key={brand}>
          <input
            type="checkbox"
            id={brand}
            name={brand}
            onChange={handleToggleCheckbox}
          />
          <label className="w-100" htmlFor={brand}>{brand}</label>
        </div>
      ))}
    </div>
  );
};

const CategoryList: React.FC<ToggleMenuHandler> = ({ handleToggleMenu }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { isOpenMenu } = useSelector(getFilterState);
  const { categories } = useSelector(getDatabaseState);

  const handleCurrentCategory = (id: number | null): void => {
    const payload = { id };

    dispatch(filterActions.setCurrentCategoryID(payload));
    dispatch(filterProducts());
    handleToggleMenu();
  };

  return (
    <ul className={cn('filter-list m-0 p-0 no-wrap', {
      opened: isOpenMenu,
    })}>
      <li
        className="item p-2"
        onClick={() => handleCurrentCategory(null)}
      >
        {t('toggleMenu.filterList.reset')}
      </li>
      {categories.map(({ id }) => (
        <li
          key={id}
          className="p-2 item"
          onClick={() => handleCurrentCategory(id)}
        >
          {t(`toggleMenu.filterList.categories.${id}`)}
        </li>
      ))}
    </ul>
  );
};

const SortList: React.FC<ToggleMenuHandler> = ({ handleToggleMenu }) => {
  const dispatch = useDispatch();
  const { isOpenMenu } = useSelector(getSortState);
  const { t } = useTranslation();
  const sortValues = t('toggleMenu.sortValues', { returnObjects: true });

  const handleCurrentValue = (value: string): void => {
    dispatch(sortActions.setCurrentValue(value));
    handleToggleMenu();
  };

  return (
    <ul className={cn('sort-list m-0 p-0 no-wrap', {
      opened: isOpenMenu,
    })}>
      {Object.entries(sortValues).map(([key, value]) => (
        <li
          key={key}
          className="p-2 item"
          onClick={() => handleCurrentValue(key)}
        >
          {value}
        </li>
      ))}
    </ul>
  );
};

const Menu: React.FC<MenuProps> = ({
  isOpenMenu,
  handleToggleMenu,
  List,
  TogglerIcon,
  marker,
}) => {
  const { t } = useTranslation();

  return (
    <div className={`${marker}-menu`}>
      <button
        type="button"
        aria-label={t(`toggleMenu.${marker}MenuToggle`)}
        aria-expanded={isOpenMenu}
        onClick={handleToggleMenu}
      >
        {TogglerIcon}
      </button>
      <List handleToggleMenu={handleToggleMenu} />
    </div>
  );
};

const FilterList: React.FC<ToggleMenuHandler> = ({ handleToggleMenu }) => (
  <>
    <CategoryList handleToggleMenu={handleToggleMenu} />
    <BrandList />
  </>
);

const FilterMenu: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpenMenu } = useSelector(getFilterState);

  const handleToggleMenu = (): void => {
    dispatch(filterActions.toggleMenu(!isOpenMenu));
  };

  const TogglerIcon = () => <span className={cn('toggle-line', {
    opened: isOpenMenu,
  })}/>;

  return (
    <Menu
      isOpenMenu={isOpenMenu}
      handleToggleMenu={handleToggleMenu}
      List={FilterList}
      TogglerIcon={TogglerIcon()}
      marker={'filter'}
    />
  );
};

const SortMenu: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpenMenu } = useSelector(getSortState);

  const handleToggleMenu = (): void => {
    dispatch(sortActions.openSortMenu(!isOpenMenu));
  };

  return (
    <Menu
      isOpenMenu={isOpenMenu}
      handleToggleMenu={handleToggleMenu}
      List={SortList}
      TogglerIcon={SortIcon()}
      marker={'sort'}
    />
  );
};

export const ToggleMenu: React.FC = () => {
  const { t } = useTranslation();
  const { currentCategoryID } = useSelector(getFilterState);
  const currentFilterValue = currentCategoryID
    ? t(`toggleMenu.filterList.categories.${currentCategoryID}`)
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
