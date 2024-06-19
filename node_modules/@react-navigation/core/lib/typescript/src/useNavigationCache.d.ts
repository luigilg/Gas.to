import { type NavigationAction, type NavigationState, type ParamListBase, type Router } from '@react-navigation/routers';
import type { NavigationHelpers, NavigationProp } from './types';
import type { NavigationEventEmitter } from './useEventEmitter';
type Options<State extends NavigationState, ScreenOptions extends {}, EventMap extends Record<string, any>> = {
    state: State;
    getState: () => State;
    navigation: NavigationHelpers<ParamListBase> & Partial<NavigationProp<ParamListBase, string, any, any, any>>;
    setOptions: (cb: (options: Record<string, ScreenOptions>) => Record<string, ScreenOptions>) => void;
    router: Router<State, NavigationAction>;
    emitter: NavigationEventEmitter<EventMap>;
};
type NavigationItem<State extends NavigationState, ScreenOptions extends {}, EventMap extends Record<string, any>> = NavigationProp<ParamListBase, string, string | undefined, State, ScreenOptions, EventMap>;
type NavigationCache<State extends NavigationState, ScreenOptions extends {}, EventMap extends Record<string, any>> = Record<string, NavigationItem<State, ScreenOptions, EventMap>>;
/**
 * Hook to cache navigation objects for each screen in the navigator.
 * It's important to cache them to make sure navigation objects don't change between renders.
 * This lets us apply optimizations like `React.memo` to minimize re-rendering screens.
 */
export declare function useNavigationCache<State extends NavigationState, ScreenOptions extends {}, EventMap extends Record<string, any>, ActionHelpers extends Record<string, () => void>>({ state, getState, navigation, setOptions, router, emitter, }: Options<State, ScreenOptions, EventMap>): {
    base: Omit<{
        dispatch(action: Readonly<{
            type: string;
            payload?: object | undefined;
            source?: string | undefined;
            target?: string | undefined;
        }> | ((state: Readonly<State>) => Readonly<{
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
        reset(state: State | import("@react-navigation/routers").PartialState<State>): void;
        goBack(): void;
        isFocused(): boolean;
        canGoBack(): boolean;
        getId(): string | undefined;
        getParent<T = NavigationHelpers<ParamListBase, {}> | undefined>(id?: string | undefined): T;
        getState(): State;
        setStateForNextRouteNamesChange(state: State | import("@react-navigation/routers").PartialState<State>): void;
    } & import("./types").PrivateValueStore<[ParamListBase, unknown, unknown]>, "getParent"> & {
        getParent<T_1 = NavigationProp<ParamListBase, string, undefined, Readonly<{
            key: string;
            index: number;
            routeNames: string[];
            history?: unknown[] | undefined;
            routes: import("@react-navigation/routers").NavigationRoute<ParamListBase, string>[];
            type: string;
            stale: false;
        }>, {}, {}> | undefined>(id?: string | undefined): T_1;
        setParams(params: Partial<object | undefined>): void;
        setOptions(options: Partial<ScreenOptions>): void;
    } & import("./types").EventConsumer<EventMap & import("./types").EventMapCore<State>> & import("./types").PrivateValueStore<[ParamListBase, string, EventMap]> & ActionHelpers;
    navigations: NavigationCache<State, ScreenOptions, EventMap>;
};
export {};
//# sourceMappingURL=useNavigationCache.d.ts.map