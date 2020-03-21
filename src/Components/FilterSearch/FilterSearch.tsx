import React, { FC, useState } from 'react';
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
  &:hover {
    cursor: pointer;
  }
`;

const DropdownMenu = styled.ul`
  z-index: 1;
  position: absolute;
  top: 100%;
  width: 100%;
  background-color: ${black};
  border: 3px solid ${blue};
  list-style: none;
  padding: 0;
`;

const DropdownItem = styled.li`
  padding: 0 1rem 1rem 1rem;
  &:first-child {
    padding: 1rem;
  }
  cursor: pointer;
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

const options = ['LOCATION', 'USER', 'DATE'];

const FilterSearch: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selection, setSelection] = useState<string>(options[0]);

  return (
    <TagFilter>
      <Dropdown>
        <DropdownHeader onClick={() => setIsOpen(!isOpen)}>
          {selection}
          <Icon isOpen={isOpen} icon={faChevronRight} />
        </DropdownHeader>
        {isOpen && (
          <DropdownMenu>
            {options.map(option => (
              <DropdownItem onClick={() => setSelection(option)}>{option}</DropdownItem>
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
