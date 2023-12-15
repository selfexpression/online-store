import React from 'react';

import { useData } from '../hooks/index.ts';

export const Main: React.FC = () => {
  const data = useData();

  console.log(data);

  return (
    <div></div>
  );
};
