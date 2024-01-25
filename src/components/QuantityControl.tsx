/* eslint-disable no-unused-vars */
import React from 'react';

import { MinusIcon } from './Icons/MinusIcon.tsx';
import { PlusIcon } from './Icons/PlusIcon.tsx';

interface QuantityControlProps {
  handler: (action: string) => void;
  quantity: number;
  disabled?: boolean;
}

export const QuantityControl: React.FC<QuantityControlProps> = (
  { handler, quantity, disabled = false },
) => (
  <div className="counter-items m-2">
    <button
      type="button"
      aria-label="decrement"
      onClick={() => handler('decrement')}
      disabled={disabled}
    >
      <MinusIcon />
    </button>
    <span className="p-4">{quantity}</span>
    <button
      type="button"
      aria-label="increment"
      onClick={() => handler('increment')}
      disabled={disabled}
    >
      <PlusIcon />
    </button>
  </div>
);
