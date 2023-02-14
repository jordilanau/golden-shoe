import { TOGGLE_NAV } from './actions';
import { AppState } from './appContext';

export type ActionType = {
  type: string;
  payload?: string;
};

function reducer(state: AppState, action: ActionType) {
  switch (action.type) {
    case TOGGLE_NAV: {
      return { ...state, showMobileNav: !state.showMobileNav };
    }
    default: {
      return { ...state };
    }
  }
}

export default reducer;
