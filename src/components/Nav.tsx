import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { actions } from '../slices/navFilterSlice.ts';
import { getNavFilterStore, getDatabaseStore } from '../utils/selectors.ts';

export const Nav: React.FC = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector(getDatabaseStore);
  const { isOpenFilterMenu } = useSelector(getNavFilterStore);

  const handleOpen = (): void => {
    dispatch(actions.openFilterMenu(!isOpenFilterMenu));
  };

  const handleCurrentCategory = (id: number | null = null, value: boolean = false) => (): void => {
    const payload = {
      id,
      isFilteredValue: value,
    };

    dispatch(actions.setCurrentCategoryID(payload));
  };

  const buttonLineClasses = classNames('toggle-line', {
    opened: isOpenFilterMenu,
  });

  const filterListClasses = classNames('filter-list m-0 p-0 no-wrap', {
    opened: isOpenFilterMenu,
  });

  return (
    <nav className="collection-nav">
      <div className="nav-filter">
        <div className="filter-menu">
          <button
            type="button"
            aria-label="filter-menu-toggle"
            aria-expanded={isOpenFilterMenu}
            onClick={handleOpen}
          >
            <span className={buttonLineClasses} />
          </button>
          <ul className={filterListClasses}>
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
                onClick={handleCurrentCategory(id, true)}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
