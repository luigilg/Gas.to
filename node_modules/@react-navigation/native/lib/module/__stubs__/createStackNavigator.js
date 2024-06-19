import { createNavigatorFactory, StackRouter, useNavigationBuilder } from '@react-navigation/core';
import * as React from 'react';
const StackNavigator = props => {
  const {
    state,
    descriptors,
    NavigationContent
  } = useNavigationBuilder(StackRouter, props);
  return /*#__PURE__*/React.createElement(NavigationContent, null, descriptors[state.routes[state.index].key].render());
};
export function createStackNavigator() {
  return createNavigatorFactory(StackNavigator)();
}
//# sourceMappingURL=createStackNavigator.js.map