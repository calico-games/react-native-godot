import React, {useEffect, forwardRef, useRef} from 'react';
import type {Ref, MutableRefObject, ForwardedRef, FunctionComponent} from 'react';

import {GodotView} from './GodotView';
import type {GodotViewProps} from './types';

export const useGodotRef = () => useRef<GodotView>(null);

export interface GodotProps extends GodotViewProps {
  ref?: Ref<GodotView> | undefined;
}

export const Godot = forwardRef<GodotView, GodotProps>(
(
  {
    style,
    onLayout: _onLayout,
    source,
    scene,
    debug,
    onMessage,
    ...props
  },
  forwardedRef
) => {
    const innerRef = useGodotRef();
    const ref = useCombinedRefs(forwardedRef, innerRef);

    return (
      <GodotView
        ref={ref}
        style={style}
        onLayout={_onLayout}
        source={source}
        scene={scene}
        debug={debug}
        onMessage={onMessage}
        {...props}
      />
    );
  }
) as FunctionComponent<GodotProps & React.RefAttributes<GodotView>>;
  
/**
 * Combines a list of refs into a single ref. This can be used to provide
 * both a forwarded ref and an internal ref keeping the same functionality
 * on both of the refs.
 * @param refs Array of refs to combine
 * @returns A single ref that can be used in a ref prop.
 */
const useCombinedRefs = <T,>(
...refs: Array<MutableRefObject<T> | ForwardedRef<T>>
) => {
    const targetRef = React.useRef<T>(null);

    useEffect(() => {
        refs.forEach((ref) => {
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