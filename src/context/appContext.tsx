import { createContext, ReactNode, useReducer } from 'react';
import { TOGGLE_NAV } from './actions';
import reducer from './reducer';

export type AppState = {
  showMobileNav: boolean;
  toggleNav: () => void;
};

type AppProviderTypeProps = {
  children: ReactNode;
};

const AppContext = createContext<AppState>({} as AppState);

function AppProvider({ children }: AppProviderTypeProps) {
  function toggleNav() {
    dispatch({ type: TOGGLE_NAV });
  }

  const initialState: AppState = {
    showMobileNav: false,
    toggleNav: toggleNav,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AppContext.Provider value={{ ...state, toggleNav }}>{children}</AppContext.Provider>;
}

export { AppProvider, AppContext };
