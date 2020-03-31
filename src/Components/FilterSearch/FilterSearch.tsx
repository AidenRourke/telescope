import React, { FC, useState, useEffect, useRef, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Button, Input } from 'Components/index';
import { blue, black, white } from 'styles/colors';

const TagFilter = styled.div`
  width: 100%;
  display: flex;
  margin: 2rem 0;
`;

const Dropdown = styled.div`
  position: relative;
`;

const DropdownHeader = styled.button`
  display: flex;
  background: none;
  border: 3px solid ${blue};
  border-right: none;
  color: ${white};
  font-size: 1rem;
  font-family: inherit;
  padding: 1rem;
  cursor: pointer;
`;

const DropdownMenu = styled.ul`
  z-index: 1;
  position: absolute;
  top: 100%;
  background-color: ${black};
  border: 3px solid ${blue};
  list-style: none;
  padding: 0.5rem;
`;

const DropdownItem = styled.button`
  cursor: pointer;
  padding: 0.5rem;
  display: block;
  width: 100%;
  background: none;
  font: inherit;
  color: ${white};
  border: none;
  text-align: left;
  :hover {
    text-decoration: underline;
  }
`;

const Icon = styled(FontAwesomeIcon)<{ isOpen: boolean }>`
  margin-left: 2rem;
  color: ${blue};
  transform: ${({ isOpen }) => isOpen && 'rotate(90deg)'};
`;

const SearchButton = styled(Button)`
  padding: 0 2rem;
`;

interface Props {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
}

const options = ['LOCATION', 'USER', 'DATE'];

const FilterSearch: FC<Props> = ({ setIsOpen, isOpen }) => {
  const [selection, setSelection] = useState<string>(options[0]);

  const menu = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: any) => {
    if (menu.current && !menu.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const handleSelection = (option: string) => {
    setIsOpen(false);
    setSelection(option);
  };

  return (
    <TagFilter>
      <Dropdown ref={menu}>
        <DropdownHeader onClick={() => setIsOpen(!isOpen)}>
          {selection}
          <Icon isOpen={isOpen} icon={faChevronRight} />
        </DropdownHeader>
        {isOpen && (
          <DropdownMenu>
            {options.map(option => (
              <DropdownItem onClick={() => handleSelection(option)}>{option}</DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </Dropdown>
      <Input color="blue" />
      <SearchButton color="blue">
        <FontAwesomeIcon icon={faSearch} size="lg" />
      </SearchButton>
    </TagFilter>
  );
};

export { FilterSearch };
