import React, { FC, useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Router from './Router';
import { UserContext } from 'Contexts/UserContext';
import { FilterContext } from 'Contexts/FilterContext';
import qs from 'query-string';
import { FilterType } from '../Types/types';

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
`;

const filtersToQueries = (filters: any) => {
  return qs.stringify(filters, { arrayFormat: 'comma' });
};

const queriesToFilters = () => {
  return qs.parse(window.location.search, { arrayFormat: 'comma' });
};

const App: FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [user, setUser] = useState();

  const [filters, setFilters] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    queriesToFilters(),
  );

  useEffect(() => {
    onLoad();
  }, []);

  const setQueryStringWithoutPageReload = (qsValue: string) => {
    const newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + qsValue;
    window.history.pushState({ path: newurl }, '', newurl);
  };

  useEffect(() => {
    setQueryStringWithoutPageReload(`?${filtersToQueries(filters)}`);
  }, [filters]);

  const addFilter = ({ name, type }: FilterType) => {
    const oldFilters = filters[type];
    const newFilter = name.toLowerCase();
    if (oldFilters === newFilter || oldFilters?.includes(newFilter)) return;
    let newFilters;
    if (Array.isArray(oldFilters)) {
      newFilters = [...oldFilters, newFilter];
    } else if (oldFilters) {
      newFilters = [oldFilters, newFilter];
    } else {
      newFilters = [newFilter];
    }
    setFilters({
      [type]: newFilters,
    });
  };

  const removeFilter = ({ type, name }: FilterType) => {
    setFilters({
      [type]: Array.isArray(filters[type]) ? filters[type].filter((filter: any) => filter !== name) : [],
    });
  };

  const onLoad = async () => {
    try {
      await Auth.currentSession();
      await login();
    } catch (e) {
      setUser(null);
    }
    setIsLoaded(true);
  };

  const logout = () => {
    setUser(null);
  };

  const login = async () => {
    const {
      signInUserSession: {
        accessToken: { payload },
      },
    } = await Auth.currentAuthenticatedUser();
    setUser({
      id: payload.username,
      isAdmin: payload['cognito:groups'].includes('modu-world-admin'),
    });
  };

  return (
    <AppContainer id="app">
      {isLoaded && (
        <DndProvider backend={HTML5Backend}>
          <UserContext.Provider value={{ user, logout }}>
            <FilterContext.Provider value={{ filters, addFilter, removeFilter }}>
              <Router />
            </FilterContext.Provider>
          </UserContext.Provider>
        </DndProvider>
      )}
    </AppContainer>
  );
};

export default App;
