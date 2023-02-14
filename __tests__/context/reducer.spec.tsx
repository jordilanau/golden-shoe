import { TOGGLE_NAV } from '../../src/context/actions';
import { AppState } from '../../src/context/appContext';
import reducer, { ActionType } from '../../src/context/reducer';

describe('reducer', () => {
  it('returns current state if action not supported', () => {
    const NOT_SUPPORTED = 'NOT_SUPPORTED';

    const state: AppState = {
      showMobileNav: false,
      toggleNav: jest.fn(),
    };

    const action: ActionType = {
      type: NOT_SUPPORTED,
    };

    expect(reducer(state, action)).toEqual(state);
  });

  it('tests TOGGLE_NAV action from false to true', () => {
    const state: AppState = {
      showMobileNav: false,
      toggleNav: jest.fn(),
    };

    const expected: AppState = {
      ...state,
      showMobileNav: !state.showMobileNav,
    };

    const action: ActionType = {
      type: TOGGLE_NAV,
    };

    expect(reducer(state, action)).toEqual(expected);
  });

  it('tests TOGGLE_NAV action from true to false', () => {
    const state: AppState = {
      showMobileNav: true,
      toggleNav: jest.fn(),
    };

    const expected: AppState = {
      ...state,
      showMobileNav: !state.showMobileNav,
    };

    const action: ActionType = {
      type: TOGGLE_NAV,
    };

    expect(reducer(state, action)).toEqual(expected);
  });
});
