function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { createComponentForStaticNavigation, createPathConfigForStaticNavigation } from '@react-navigation/core';
import * as React from 'react';
import { NavigationContainer } from './NavigationContainer';
/**
 * Create a navigation component from a static navigation config.
 * The returned component is a wrapper around `NavigationContainer`.
 *
 * @param tree Static navigation config.
 * @returns Navigation component to use in your app.
 */
export function createStaticNavigation(tree) {
  const Component = createComponentForStaticNavigation(tree, 'RootNavigator');
  function Navigation(_ref, ref) {
    let {
      linking,
      ...rest
    } = _ref;
    const screens = React.useMemo(() => {
      if (tree.config.screens) {
        return createPathConfigForStaticNavigation(tree, {
          initialRouteName: linking?.config?.initialRouteName
        }, linking?.enabled === 'auto');
      }
      return undefined;
    }, [linking?.config, linking?.enabled]);
    if (linking?.enabled === true && screens == null) {
      throw new Error('Linking is enabled but no linking configuration was found for the screens.\n\n' + 'To solve this:\n' + "- Specify a 'linking' property for the screens you want to link to.\n" + "- Or set 'linking.enabled' to 'auto' to generate paths automatically.\n\n" + 'See usage guide: https://reactnavigation.org/docs/7.x/static-configuration#linking');
    }
    return /*#__PURE__*/React.createElement(NavigationContainer, _extends({}, rest, {
      ref: ref,
      linking: linking ? {
        ...linking,
        enabled: typeof linking.enabled === 'boolean' ? linking.enabled : screens != null,
        config: screens ? {
          ...linking.config,
          screens
        } : undefined
      } : undefined
    }), /*#__PURE__*/React.createElement(Component, null));
  }
  return /*#__PURE__*/React.forwardRef(Navigation);
}
//# sourceMappingURL=createStaticNavigation.js.map