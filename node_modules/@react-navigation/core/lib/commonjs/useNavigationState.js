"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useNavigationState = useNavigationState;
var React = _interopRequireWildcard(require("react"));
var _useNavigation = require("./useNavigation");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Hook to get a value from the current navigation state using a selector.
 *
 * @param selector Selector function to get a value from the state.
 */
function useNavigationState(selector) {
  const navigation = (0, _useNavigation.useNavigation)();

  // We don't care about the state value, we run the selector again at the end
  // The state is only to make sure that there's a re-render when we have a new value
  const [, setResult] = React.useState(() => selector(navigation.getState()));

  // We store the selector in a ref to avoid re-subscribing listeners every render
  const selectorRef = React.useRef(selector);
  React.useEffect(() => {
    selectorRef.current = selector;
  });
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('state', e => {
      setResult(selectorRef.current(e.data.state));
    });
    return unsubscribe;
  }, [navigation]);
  return selector(navigation.getState());
}
//# sourceMappingURL=useNavigationState.js.map