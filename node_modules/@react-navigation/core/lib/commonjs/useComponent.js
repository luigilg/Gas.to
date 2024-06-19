"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useComponent = useComponent;
var React = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const NavigationContent = _ref => {
  let {
    render,
    children
  } = _ref;
  return render(children);
};
function useComponent(render) {
  const renderRef = React.useRef(render);

  // Normally refs shouldn't be mutated in render
  // But we return a component which will be rendered
  // So it's just for immediate consumption
  renderRef.current = render;
  React.useEffect(() => {
    renderRef.current = null;
  });
  return React.useRef(_ref2 => {
    let {
      children
    } = _ref2;
    const render = renderRef.current;
    if (render === null) {
      throw new Error('The returned component must be rendered in the same render phase as the hook.');
    }
    return /*#__PURE__*/React.createElement(NavigationContent, {
      render: render
    }, children);
  }).current;
}
//# sourceMappingURL=useComponent.js.map