function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useEffect, forwardRef, useRef } from 'react';
import { GodotView } from './GodotView';
export const useGodotRef = () => useRef(null);
export const Godot = /*#__PURE__*/forwardRef(({
  style,
  onLayout: _onLayout,
  source,
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