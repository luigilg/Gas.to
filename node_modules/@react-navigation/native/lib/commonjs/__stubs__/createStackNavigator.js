"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStackNavigator = createStackNavigator;
var _core = require("@react-navigation/core");
var React = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const StackNavigator = props => {
  const {
    state,
    descriptors,
    NavigationContent
  } = (0, _core.useNavigationBuilder)(_core.StackRouter, props);
  return /*#__PURE__*/React.createElement(NavigationContent, null, descriptors[state.routes[state.index].key].render());
};
function createStackNavigator() {
  return (0, _core.createNavigatorFactory)(StackNavigator)();
}
//# sourceMappingURL=createStackNavigator.js.map