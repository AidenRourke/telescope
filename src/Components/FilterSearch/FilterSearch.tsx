import React, { FC, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Button, Input } from 'Components/index';
import { blue, black, white } from 'styles/colors';
import { useHistory, useLocation } from 'react-router';
import { addToQuery } from '../../App/App';

const FilterForm = styled.form`
  flex: 1;
  display: flex;
`;

const TagFilter = styled.div`
  display: flex;
  margin-right: 1rem;
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
  font-size: 0.75rem;
  font-family: inherit;
  padding: 0.75rem 1.75rem;
  cursor: pointer;
  align-items: center;
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
  font-size: 0.75rem;
  padding: 0.5rem;
  display: block;
  width: 100%;
  background: none;
  font-family: inherit;
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
  options: string[];
}

const FilterSearch: FC<Props> = ({ setIsOpen, isOpen, options }) => {
  const [selection, setSelection] = useState(options[0]);
  const [tagInputValue, setTagInputValue] = useState<string>('');

  const history = useHistory();
  const { search } = useLocation();

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

  const submitForm = (e: any) => {
    e.preventDefault();
    const newSearch = addToQuery({ name: tagInputValue, type: selection }, search);
    history.push({
      search: newSearch,
    });
    setTagInputValue('');
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
              <DropdownItem key={option} onClick={() => handleSelection(option)}>
                {option}
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </Dropdown>
      <FilterForm onSubmit={submitForm}>
        <Input inputSize="small" color="blue" value={tagInputValue} onChange={(e: any) => setTagInputValue(e.target.value)} type="text" />
        <SearchButton color="blue" size="small">
          <FontAwesomeIcon icon={faSearch} size="lg" type="submit" />
        </SearchButton>
      </FilterForm>
    </TagFilter>
  );
};

export { FilterSearch };
