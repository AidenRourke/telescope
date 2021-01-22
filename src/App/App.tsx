import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Router from './Router';
import { UserContext } from 'Contexts/UserContext';
import qs from 'query-string';
import { FilterType } from 'Types/types';

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const filtersToQueries = (filters: any) => {
  return qs.stringify(filters, { arrayFormat: 'comma' });
};

export const queryToObject = (query: string) => {
  return qs.parse(query, { arrayFormat: 'comma' });
};

export const addToQuery = ({ name, type }: FilterType, query: string) => {
  const queryObject = queryToObject(query);
  const oldFilters = queryObject[type];
  const newFilter = name.toLowerCase();

  if (oldFilters !== newFilter && !oldFilters?.includes(newFilter)) {
    let newFilters: any[];
    if (Array.isArray(oldFilters)) {
      newFilters = [...oldFilters, newFilter];
    } else if (oldFilters) {
      newFilters = [oldFilters, newFilter];
    } else {
      newFilters = [newFilter];
    }
    queryObject[type] = newFilters;
    return filtersToQueries(queryObject);
  }
};

export const removeFromQuery = ({ type, name }: FilterType, query: string) => {
  const queryObject = queryToObject(query);
  const oldFilters = queryObject[type];

  if (oldFilters) {
    let newFilters: any[];
    if (Array.isArray(oldFilters)) {
      newFilters = oldFilters.filter((filter: string) => filter !== name);
    } else {
      newFilters = [];
    }
    queryObject[type] = newFilters;
    return filtersToQueries(queryObject);
  }
};

const App: FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [user, setUser] = useState();

  useEffect(() => {
    onLoad();
  }, []);

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
          <UserContext.Provider value={{ user, login, logout }}>
            <Router />
          </UserContext.Provider>
        </DndProvider>
      )}
    </AppContainer>
  );
};

export default App;
