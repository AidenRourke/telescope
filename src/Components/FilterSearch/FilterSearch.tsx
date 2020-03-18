import React, { FC } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Button, Input } from 'Components/index';
import { blue, white } from 'styles/colors';

const TagFilter = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 4rem;
`;

const DropdownButton = styled.button`
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

const Icon = styled(FontAwesomeIcon)`
  margin-left: 3rem;
  color: ${blue};
`;

const SearchButton = styled(Button)`
  padding: 0 4rem;
`;

const FilterSearch: FC = () => {
  return (
    <TagFilter>
      <DropdownButton>
        LOCATION
        <Icon icon={faChevronRight} />
      </DropdownButton>
      <Input color="blue" />
      <SearchButton color="blue">
        <FontAwesomeIcon icon={faSearch} size="lg" />
      </SearchButton>
    </TagFilter>
  );
};

export { FilterSearch };
