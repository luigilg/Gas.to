"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStaticNavigation = createStaticNavigation;
var _core = require("@react-navigation/core");
var React = _interopRequireWildcard(require("react"));
var _NavigationContainer = require("./NavigationContainer");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/**
 * Create a navigation component from a static navigation config.
 * The returned component is a wrapper around `NavigationContainer`.
 *
 * @param tree Static navigation config.
 * @returns Navigation component to use in your app.
 */
function createStaticNavigation(tree) {
  const Component = (0, _core.createComponentForStaticNavigation)(tree, 'RootNavigator');
  function Navigation(_ref, ref) {
    let {
      linking,
      ...rest
    } = _ref;
    const screens = React.useMemo(() => {
      if (tree.config.screens) {
        return (0, _core.createPathConfigForStaticNavigation)(tree, {
          initialRouteName: linking?.config?.initialRouteName
        }, linking?.enabled === 'auto');
      }
      return undefined;
    }, [linking?.config, linking?.enabled]);
    if (linking?.enabled === true && screens == null) {
      throw new Error('Linking is enabled but no linking configuration was found for the screens.\n\n' + 'To solve this:\n' + "- Specify a 'linking' property for the screens you want to link to.\n" + "- Or set 'linking.enabled' to 'auto' to generate paths automatically.\n\n" + 'See usage guide: https://reactnavigation.org/docs/7.x/static-configuration#linking');
    }
    return /*#__PURE__*/React.createElement(_NavigationContainer.NavigationContainer, _extends({}, rest, {
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