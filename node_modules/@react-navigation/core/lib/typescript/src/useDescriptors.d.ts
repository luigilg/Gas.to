import type { NavigationAction, NavigationState, ParamListBase, PartialState, Router } from '@react-navigation/routers';
import * as React from 'react';
import { type AddKeyedListener, type AddListener } from './NavigationBuilderContext';
import type { Descriptor, EventMapBase, NavigationHelpers, NavigationProp, RouteConfig, RouteProp } from './types';
import type { NavigationEventEmitter } from './useEventEmitter';
export type ScreenConfigWithParent<State extends NavigationState, ScreenOptions extends {}, EventMap extends EventMapBase> = {
    keys: (string | undefined)[];
    options: (ScreenOptionsOrCallback<ScreenOptions> | undefined)[] | undefined;
    layout: ScreenLayout | undefined;
    props: RouteConfig<ParamListBase, string, State, ScreenOptions, EventMap, unknown>;
};
type ScreenLayout = (props: {
    route: RouteProp<ParamListBase, string>;
    navigation: any;
    theme: ReactNavigation.Theme;
    children: React.ReactElement;
}) => React.ReactElement;
type ScreenOptionsOrCallback<ScreenOptions extends {}> = ScreenOptions | ((props: {
    route: RouteProp<ParamListBase, string>;
    navigation: any;
    theme: ReactNavigation.Theme;
}) => ScreenOptions);
type Options<State extends NavigationState, ScreenOptions extends {}, EventMap extends EventMapBase> = {
    state: State;
    screens: Record<string, ScreenConfigWithParent<State, ScreenOptions, EventMap>>;
    navigation: NavigationHelpers<ParamListBase>;
    screenOptions: ScreenOptionsOrCallback<ScreenOptions> | undefined;
    screenLayout: ScreenLayout | undefined;
    onAction: (action: NavigationAction) => boolean;
    getState: () => State;
    setState: (state: State) => void;
    addListener: AddListener;
    addKeyedListener: AddKeyedListener;
    onRouteFocus: (key: string) => void;
    router: Router<State, NavigationAction>;
    emitter: NavigationEventEmitter<EventMap>;
};
/**
 * Hook to create descriptor objects for the child routes.
 *
 * A descriptor object provides 3 things:
 * - Helper method to render a screen
 * - Options specified by the screen for the navigator
 * - Navigation object intended for the route
 */
export declare function useDescriptors<State extends NavigationState, ActionHelpers extends Record<string, () => void>, ScreenOptions extends {}, EventMap extends EventMapBase>({ state, screens, navigation, screenOptions, screenLayout, onAction, getState, setState, addListener, addKeyedListener, onRouteFocus, router, emitter, }: Options<State, ScreenOptions, EventMap>): {
    describe: (route: RouteProp<ParamListBase>, placeholder: boolean) => Descriptor<ScreenOptions, Omit<{
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
        reset(state: State | PartialState<State>): void;
        goBack(): void;
        isFocused(): boolean;
        canGoBack(): boolean;
        getId(): string | undefined;
        getParent<T = NavigationHelpers<ParamListBase, {}> | undefined>(id?: string | undefined): T;
        getState(): State;
        setStateForNextRouteNamesChange(state: State | PartialState<State>): void;
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
    } & import("./types").EventConsumer<EventMap & import("./types").EventMapCore<State>> & import("./types").PrivateValueStore<[ParamListBase, string, EventMap]> & ActionHelpers, RouteProp<ParamListBase>>;
    descriptors: Record<string, Descriptor<ScreenOptions, Omit<{
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
        reset(state: State | PartialState<State>): void;
        goBack(): void;
        isFocused(): boolean;
        canGoBack(): boolean;
        getId(): string | undefined;
        getParent<T = NavigationHelpers<ParamListBase, {}> | undefined>(id?: string | undefined): T;
        getState(): State;
        setStateForNextRouteNamesChange(state: State | PartialState<State>): void;
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
    } & import("./types").EventConsumer<EventMap & import("./types").EventMapCore<State>> & import("./types").PrivateValueStore<[ParamListBase, string, EventMap]> & ActionHelpers, RouteProp<ParamListBase>>>;
};
export {};
//# sourceMappingURL=useDescriptors.d.ts.map