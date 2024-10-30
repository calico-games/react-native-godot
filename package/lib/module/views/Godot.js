function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useEffect, forwardRef, useRef } from 'react';
import { GodotView } from './GodotView';
export const useGodotRef = () => useRef(null);
export const Godot = /*#__PURE__*/forwardRef(({
  style,
  onLayout: _onLayout,
  source,
  scene,
  debug,
  onMessage,
  ...props
}, forwardedRef) => {
  const innerRef = useGodotRef();
  const ref = useCombinedRefs(forwardedRef, innerRef);
  return /*#__PURE__*/React.createElement(GodotView, _extends({
    ref: ref,
    style: style,
    onLayout: _onLayout,
    source: source,
    scene: scene,
    debug: debug,
    onMessage: onMessage
  }, props));
});

/**
 * Combines a list of refs into a single ref. This can be used to provide
 * both a forwarded ref and an internal ref keeping the same functionality
 * on both of the refs.
 * @param refs Array of refs to combine
 * @returns A single ref that can be used in a ref prop.
 */
const useCombinedRefs = (...refs) => {
  const targetRef = React.useRef(null);
  useEffect(() => {
    refs.forEach(ref => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(targetRef.current);
        } else {
          ref.current = targetRef.current;
        }
      }
    });
  }, [refs]);
  return targetRef;
};
//# sourceMappingURL=Godot.js.map