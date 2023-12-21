import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { actions } from '../slices/navFilterSlice.ts';
import { getNavFilter } from '../utils/selectors.ts';

export const Nav: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpenFilterMenu } = useSelector(getNavFilter);

  const handleOpen = () => {
    dispatch(actions.openFilterMenu(!isOpenFilterMenu));
  };

  const buttonLineClasses = classNames('toggle-line', {
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
        </div>
        <ul className="filter-list">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </nav>
  );
};
