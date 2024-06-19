export function goBack() {
  return {
    type: 'GO_BACK'
  };
}
export function navigate() {
  if (typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'string') {
    return {
      type: 'NAVIGATE',
      payload: {
        name: arguments.length <= 0 ? undefined : arguments[0],
        params: arguments.length <= 1 ? undefined : arguments[1]
      }
    };
  } else {
    const payload = (arguments.length <= 0 ? undefined : arguments[0]) || {};
    if (!('name' in payload)) {
      throw new Error('You need to specify a name when calling navigate with an object as the argument. See https://reactnavigation.org/docs/navigation-actions#navigate for usage.');
    }
    return {
      type: 'NAVIGATE',
      payload
    };
  }
}
export function navigateDeprecated() {
  if (typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'string') {
    return {
      type: 'NAVIGATE_DEPRECATED',
      payload: {
        name: arguments.length <= 0 ? undefined : arguments[0],
        params: arguments.length <= 1 ? undefined : arguments[1]
      }
    };
  } else {
    const payload = (arguments.length <= 0 ? undefined : arguments[0]) || {};
    if (!('name' in payload)) {
      throw new Error('You need to specify a name when calling navigate with an object as the argument. See https://reactnavigation.org/docs/navigation-actions#navigatelegacy for usage.');
    }
    return {
      type: 'NAVIGATE_DEPRECATED',
      payload
    };
  }
}
export function reset(state) {
  return {
    type: 'RESET',
    payload: state
  };
}
export function setParams(params) {
  return {
    type: 'SET_PARAMS',
    payload: {
      params
    }
  };
}
export function preload(name, params) {
  return {
    type: 'PRELOAD',
    payload: {
      name,
      params
    }
  };
}
//# sourceMappingURL=CommonActions.js.map