import { createContext } from 'react';
import { useState } from 'react';

export const DropdownContext = createContext({
  open: false,
  trigger: () => null,
});

export const DropdownProvider = () => {
  const [dropdown, setDropdown] = useState(DropdownContext);
};
