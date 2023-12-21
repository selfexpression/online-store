import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../slices/navFilterSlice.ts';
import { getNavFilterState } from '../utils/selectors.ts';

export const Nav: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpenFilterMenu } = useSelector(getNavFilterState);
console.log(isOpenFilterMenu)
  const handleOpen = () => {
    dispatch(actions.openFilterMenu(!isOpenFilterMenu));
  };

  return (
    <nav className="collection-nav">
      <div className="nav-filter">
        <div className="filter-menu">
          <button
            type="button"
            aria-label="filter-menu-toggle"
            aria-expanded="false"
            onClick={handleOpen}
          >
            <span className="toggle-line"></span>
          </button>
        </div>
      </div>
    </nav>
  );
};
