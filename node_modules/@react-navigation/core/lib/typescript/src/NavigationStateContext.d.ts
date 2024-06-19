import type { NavigationState, PartialState } from '@react-navigation/routers';
import * as React from 'react';
export declare const NavigationStateContext: React.Context<{
    isDefault?: true | undefined;
    state?: Readonly<{
        key: string;
        index: number;
        routeNames: string[];
        history?: unknown[] | undefined;
        routes: import("@react-navigation/routers").NavigationRoute<import("@react-navigation/routers").ParamListBase, string>[];
        type: string;
        stale: false;
    }> | PartialState<Readonly<{
        key: string;
        index: number;
        routeNames: string[];
        history?: unknown[] | undefined;
        routes: import("@react-navigation/routers").NavigationRoute<import("@react-navigation/routers").ParamListBase, string>[];
        type: string;
        stale: false;
    }>> | undefined;
    getKey: () => string | undefined;
    setKey: (key: string) => void;
    getState: () => NavigationState | PartialState<NavigationState> | undefined;
    setState: (state: NavigationState | PartialState<NavigationState> | undefined) => void;
    getIsInitial: () => boolean;
    addOptionsGetter?: ((key: string, getter: () => object | undefined | null) => void) | undefined;
}>;
//# sourceMappingURL=NavigationStateContext.d.ts.map