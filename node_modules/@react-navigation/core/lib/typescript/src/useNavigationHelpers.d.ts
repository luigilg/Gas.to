import { type NavigationAction, type NavigationState, type ParamListBase, type Router } from '@react-navigation/routers';
import { type NavigationHelpers, PrivateValueStore } from './types';
import type { NavigationEventEmitter } from './useEventEmitter';
type Options<State extends NavigationState, Action extends NavigationAction> = {
    id: string | undefined;
    onAction: (action: NavigationAction) => boolean;
    getState: () => State;
    emitter: NavigationEventEmitter<any>;
    router: Router<State, Action>;
};
/**
 * Navigation object with helper methods to be used by a navigator.
 * This object includes methods for common actions as well as methods the parent screen's navigation object.
 */
export declare function useNavigationHelpers<State extends NavigationState, ActionHelpers extends Record<string, () => void>, Action extends NavigationAction, EventMap extends Record<string, any>>({ id: navigatorId, onAction, getState, emitter, router, }: Options<State, Action>): {
    dispatch(action: Readonly<{
        type: string;
        payload?: object | undefined;
        source?: string | undefined;
        target?: string | undefined;
    }> | ((state: Readonly<Readonly<{
        key: string;
        index: number;
        routeNames: string[];
        history?: unknown[] | undefined;
        routes: import("@react-navigation/routers").NavigationRoute<ParamListBase, string>[];
        type: string;
        stale: false;
    }>>) => Readonly<{
        type: string;
        payload?: object | undefined;
        source?: string | undefined;
        target?: string | undefined;
    }>)): void;
    navigate<RouteName extends string>(...args: RouteName extends unknown ? [screen: RouteName] | [screen: RouteName, params: object | undefined] : never): void;
    navigate<RouteName_1 extends string>(options: RouteName_1 extends unknown ? {
        name: RouteName_1;
        params: object | undefined;
        path?: string | undefined;
        merge?: boolean | undefined;
    } : never): void;
    navigateDeprecated<RouteName_2 extends string>(...args: RouteName_2 extends unknown ? [screen: RouteName_2] | [screen: RouteName_2, params: object | undefined] : never): void;
    navigateDeprecated<RouteName_3 extends string>(options: RouteName_3 extends unknown ? {
        name: RouteName_3;
        params: object | undefined;
        merge?: boolean | undefined;
    } : never): void;
    preload<RouteName_4 extends string>(...args: RouteName_4 extends unknown ? [screen: RouteName_4] | [screen: RouteName_4, params: object | undefined] : never): void;
    reset(state: Readonly<{
        key: string;
        index: number;
        routeNames: string[];
        history?: unknown[] | undefined;
        routes: import("@react-navigation/routers").NavigationRoute<ParamListBase, string>[];
        type: string;
        stale: false;
    }> | import("@react-navigation/routers").PartialState<Readonly<{
        key: string;
        index: number;
        routeNames: string[];
        history?: unknown[] | undefined;
        routes: import("@react-navigation/routers").NavigationRoute<ParamListBase, string>[];
        type: string;
        stale: false;
    }>>): void;
    goBack(): void;
    isFocused(): boolean;
    canGoBack(): boolean;
    getId(): string | undefined;
    getParent<T = NavigationHelpers<ParamListBase, {}> | undefined>(id?: string | undefined): T;
    getState(): Readonly<{
        key: string;
        index: number;
        routeNames: string[];
        history?: unknown[] | undefined;
        routes: import("@react-navigation/routers").NavigationRoute<ParamListBase, string>[];
        type: string;
        stale: false;
    }>;
    setStateForNextRouteNamesChange(state: Readonly<{
        key: string;
        index: number;
        routeNames: string[];
        history?: unknown[] | undefined;
        routes: import("@react-navigation/routers").NavigationRoute<ParamListBase, string>[];
        type: string;
        stale: false;
    }> | import("@react-navigation/routers").PartialState<Readonly<{
        key: string;
        index: number;
        routeNames: string[];
        history?: unknown[] | undefined;
        routes: import("@react-navigation/routers").NavigationRoute<ParamListBase, string>[];
        type: string;
        stale: false;
    }>>): void;
} & PrivateValueStore<[ParamListBase, unknown, unknown]> & import("./types").EventEmitter<EventMap> & {
    setParams<RouteName_5 extends string>(params: Partial<object | undefined>): void;
} & ActionHelpers;
export {};
//# sourceMappingURL=useNavigationHelpers.d.ts.map