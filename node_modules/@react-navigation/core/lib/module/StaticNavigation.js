function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import * as React from 'react';
import { isValidElementType } from 'react-is';
import { useRoute } from './useRoute';

/**
 * Flatten a type to remove all type alias names, unions etc.
 * This will show a plain object when hovering over the type.
 */

/**
 * keyof T doesn't work for union types. We can use distributive conditional types instead.
 * https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
 */

/**
 * We get a union type when using keyof, but we want an intersection instead.
 * https://stackoverflow.com/a/50375286/1665026
 */

/**
 * Props for a screen component which is rendered by a static navigator.
 * Takes the route params as a generic argument.
 */

/**
 * Infer the param list from the static navigation config.
 */

const MemoizedScreen = /*#__PURE__*/React.memo(_ref => {
  let {
    component
  } = _ref;
  const route = useRoute();
  const children = /*#__PURE__*/React.createElement(component, {
    route
  });
  return children;
});
const getItemsFromScreens = (Screen, screens) => {
  return Object.entries(screens).map(_ref2 => {
    let [name, item] = _ref2;
    let component;
    let props = {};
    let useIf;
    let isNavigator = false;
    if ('screen' in item) {
      const {
        screen,
        if: _if,
        ...rest
      } = item;
      useIf = _if;
      props = rest;
      if (isValidElementType(screen)) {
        component = screen;
      } else if ('config' in screen) {
        isNavigator = true;
        component = createComponentForStaticNavigation(screen, `${name}Navigator`);
      }
    } else if (isValidElementType(item)) {
      component = item;
    } else if ('config' in item) {
      isNavigator = true;
      component = createComponentForStaticNavigation(item, `${name}Navigator`);
    }
    if (component == null) {
      throw new Error(`Couldn't find a 'screen' property for the screen '${name}'. This can happen if you passed 'undefined'. You likely forgot to export your component from the file it's defined in, or mixed up default import and named import when importing.`);
    }
    const element = isNavigator ? /*#__PURE__*/React.createElement(component, {}) : /*#__PURE__*/React.createElement(MemoizedScreen, {
      component: component
    });
    return () => {
      const shouldRender = useIf == null || useIf();
      if (!shouldRender) {
        return null;
      }
      return /*#__PURE__*/React.createElement(Screen, _extends({
        key: name,
        name: name
      }, props), () => element);
    };
  });
};

/**
 * Create a component that renders a navigator based on the static configuration.
 *
 * @param tree Static navigation config.
 * @param displayName Name of the component to be displayed in React DevTools.
 * @returns A component which renders the navigator.
 */
export function createComponentForStaticNavigation(tree, displayName) {
  const {
    Navigator,
    Group,
    Screen,
    config
  } = tree;
  const {
    screens,
    groups,
    ...rest
  } = config;
  if (screens == null && groups == null) {
    throw new Error("Couldn't find a 'screens' or 'groups' property. Make sure to define your screens under a 'screens' property in the configuration.");
  }
  const items = screens ? getItemsFromScreens(Screen, screens) : [];
  if (groups) {
    items.push(...Object.entries(groups).map(_ref3 => {
      let [key, {
        if: useIf,
        ...group
      }] = _ref3;
      const groupItems = getItemsFromScreens(Screen, group.screens);
      return () => {
        // Call unconditionally since screen configs may contain `useIf` hooks
        const children = groupItems.map(item => item());
        const shouldRender = useIf == null || useIf();
        if (!shouldRender) {
          return null;
        }
        return /*#__PURE__*/React.createElement(Group, _extends({
          navigationKey: key
        }, group, {
          key: key
        }), children);
      };
    }));
  }
  const NavigatorComponent = () => {
    const children = items.map(item => item());
    return /*#__PURE__*/React.createElement(Navigator, rest, children);
  };
  NavigatorComponent.displayName = displayName;
  return NavigatorComponent;
}
/**
 * Create a path config object from a static navigation config for deep linking.
 *
 * @param tree Static navigation config.
 * @param options Additional options from `linking.config`.
 * @param auto Whether to automatically generate paths for leaf screens.
 * @returns Path config object to use in linking config.
 *
 * @example
 * ```js
 * const config = {
 *   screens: {
 *     Home: {
 *       screens: createPathConfigForStaticNavigation(HomeTabs),
 *     },
 *   },
 * };
 * ```
 */
export function createPathConfigForStaticNavigation(tree, options, auto) {
  let initialScreenConfig;
  const createPathConfigForTree = (t, o, skipInitialDetection) => {
    const createPathConfigForScreens = (screens, initialRouteName) => {
      return Object.fromEntries(Object.entries(screens)
      // Re-order to move the initial route to the front
      // This way we can detect the initial route correctly
      .sort((_ref4, _ref5) => {
        let [a] = _ref4;
        let [b] = _ref5;
        if (a === initialRouteName) {
          return -1;
        }
        if (b === initialRouteName) {
          return 1;
        }
        return 0;
      }).map(_ref6 => {
        let [key, item] = _ref6;
        const screenConfig = {};
        if ('linking' in item) {
          if (typeof item.linking === 'string') {
            screenConfig.path = item.linking;
          } else {
            Object.assign(screenConfig, item.linking);
          }
        }
        let screens;
        if ('config' in item) {
          screens = createPathConfigForTree(item, undefined, skipInitialDetection || screenConfig.path != null);
        } else if ('screen' in item && 'config' in item.screen && (item.screen.config.screens || item.screen.config.groups)) {
          screens = createPathConfigForTree(item.screen, undefined, skipInitialDetection || screenConfig.path != null);
        }
        if (screens) {
          screenConfig.screens = screens;
        }
        if (auto && !screenConfig.screens && !('linking' in item)) {
          if (screenConfig.path) {
            if (!skipInitialDetection) {
              // Normalize the path to remove leading and trailing slashes
              const path = screenConfig.path?.split('/').filter(Boolean).join('/');

              // We encounter a leaf screen with empty path,
              // Clear the initial screen config as it's not needed anymore
              if (!skipInitialDetection && path === '') {
                initialScreenConfig = undefined;
              }
            }
          } else {
            if (!skipInitialDetection && initialScreenConfig == null) {
              initialScreenConfig = screenConfig;
            }
            screenConfig.path = key.replace(/([A-Z]+)/g, '-$1').replace(/^-/, '').toLowerCase();
          }
        }
        return [key, screenConfig];
      }).filter(_ref7 => {
        let [, screen] = _ref7;
        return Object.keys(screen).length > 0;
      }));
    };
    const screens = t.config.screens ? createPathConfigForScreens(t.config.screens, o?.initialRouteName ?? t.config.initialRouteName) : {};
    if (t.config.groups) {
      Object.entries(t.config.groups).forEach(_ref8 => {
        let [, group] = _ref8;
        Object.assign(screens, createPathConfigForScreens(group.screens, o?.initialRouteName ?? t.config.initialRouteName));
      });
    }
    if (Object.keys(screens).length === 0) {
      return undefined;
    }
    return screens;
  };
  const screens = createPathConfigForTree(tree, options, false);
  if (auto && initialScreenConfig) {
    initialScreenConfig.path = '';
  }
  return screens;
}
//# sourceMappingURL=StaticNavigation.js.map