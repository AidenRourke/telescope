import React, { FC } from 'react';
import { FilterType } from 'Types/types';
import { queryToObject, removeFromQuery } from 'App/App';
import { useHistory, useLocation } from 'react-router';
import { FilterTag } from './FilterTag';
import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const Filters: FC = () => {
  const history = useHistory();
  const { search } = useLocation();

  const filters = queryToObject(search);

  const removeFilter = (filter: FilterType) => {
    const newSearch = removeFromQuery(filter, search);
    history.push({
      search: newSearch,
    });
  };

  const renderFilters = () => {
    const tags: any[] = [];
    if (filters) {
      Object.keys(filters).map(key => {
        const filtersOfType = filters[key];
        if (filtersOfType) {
          if (Array.isArray(filtersOfType)) {
            filtersOfType.map((name: string) => {
              tags.push(<FilterTag filter={{ type: key, name }} onClick={removeFilter} />);
            });
          } else {
            tags.push(<FilterTag filter={{ type: key, name: filtersOfType }} onClick={removeFilter} />);
          }
        }
      });
    }
    return tags;
  };

  return <FilterContainer>{renderFilters()}</FilterContainer>;
};

export { Filters };
