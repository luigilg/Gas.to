"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UNSTABLE_useUnhandledLinking = UNSTABLE_useUnhandledLinking;
var _core = require("@react-navigation/core");
var _react = _interopRequireDefault(require("react"));
var _useLatestCallback = _interopRequireDefault(require("use-latest-callback"));
var _LinkingContext = require("./LinkingContext");
var _UnhandledLinkingContext = require("./UnhandledLinkingContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// FIXME: don't rely on depth only to get the navigator state
function extractNavigatorSpecificState(_, pathState, depth) {
  let partialPathState = pathState;
  let currentDepth = depth;
  while (currentDepth) {
    if (!partialPathState) {
      return undefined;
    }
    partialPathState = partialPathState.routes[partialPathState.routes.length - 1].state;
    currentDepth--;
  }
  return partialPathState;
}
function UNSTABLE_useUnhandledLinking() {
  const navigation = _react.default.useContext(_core.NavigationContext);
  const linking = _react.default.useContext(_LinkingContext.LinkingContext);
  const {
    setLastUnhandledLink,
    lastUnhandledLink
  } = _react.default.useContext(_UnhandledLinkingContext.UnhandledLinkingContext);
  const {
    options
  } = linking;
  const getStateForRouteNamesChange = currentState => {
    if (lastUnhandledLink == null) {
      // noop, nothing to handle
      return;
    }

    // at web, the path is already extracted
    const path = lastUnhandledLink;
    if (!lastUnhandledLink) {
      return;
    }

    // First, we parse the URL to get the desired state
    const getStateFromPathHelper = options?.getStateFromPath ?? _core.getStateFromPath;
    const pathState = getStateFromPathHelper(path, options?.config);
    if (!pathState) {
      return;
    }
    let depth = 0;
    let parent = navigation;
    while (parent) {
      depth++;
      parent = parent.getParent();
    }
    const state = extractNavigatorSpecificState(currentState, pathState, depth);
    if (!state) {
      return;
    }
    return state;
  };
  const clearUnhandledLink = (0, _useLatestCallback.default)(() => {
    setLastUnhandledLink(undefined);
  });
  return {
    lastUnhandledLink,
    getStateForRouteNamesChange,
    clearUnhandledLink
  };
}
//# sourceMappingURL=useUnhandledLinking.js.map