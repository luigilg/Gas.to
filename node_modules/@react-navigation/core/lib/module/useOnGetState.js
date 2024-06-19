import * as React from 'react';
import { isArrayEqual } from './isArrayEqual';
import { NavigationBuilderContext } from './NavigationBuilderContext';
import { NavigationRouteContext } from './NavigationRouteContext';
export function useOnGetState(_ref) {
  let {
    getState,
    getStateListeners
  } = _ref;
  const {
    addKeyedListener
  } = React.useContext(NavigationBuilderContext);
  const route = React.useContext(NavigationRouteContext);
  const key = route ? route.key : 'root';
  const getRehydratedState = React.useCallback(() => {
    const state = getState();

    // Avoid returning new route objects if we don't need to
    const routes = state.routes.map(route => {
      const childState = getStateListeners[route.key]?.();
      if (route.state === childState) {
        return route;
      }
      return {
        ...route,
        state: childState
      };
    });
    if (isArrayEqual(state.routes, routes)) {
      return state;
    }
    return {
      ...state,
      routes
    };
  }, [getState, getStateListeners]);
  React.useEffect(() => {
    return addKeyedListener?.('getState', key, getRehydratedState);
  }, [addKeyedListener, getRehydratedState, key]);
}
//# sourceMappingURL=useOnGetState.js.map