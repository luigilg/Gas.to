import { type NavigatorTypeBagBase, type ParamListBase, type StackNavigationState, type StaticConfig, type TypedNavigator } from '@react-navigation/native';
import * as React from 'react';
import type { NativeStackNavigationEventMap, NativeStackNavigationOptions, NativeStackNavigationProp, NativeStackNavigatorProps } from '../types';
declare function NativeStackNavigator({ id, initialRouteName, children, layout, screenListeners, screenOptions, screenLayout, UNSTABLE_getStateForRouteNamesChange, ...rest }: NativeStackNavigatorProps): React.JSX.Element;
export declare function createNativeStackNavigator<ParamList extends ParamListBase, NavigatorID extends string | undefined = undefined, TypeBag extends NavigatorTypeBagBase = {
    ParamList: ParamList;
    NavigatorID: NavigatorID;
    State: StackNavigationState<ParamList>;
    ScreenOptions: NativeStackNavigationOptions;
    EventMap: NativeStackNavigationEventMap;
    NavigationList: {
        [RouteName in keyof ParamList]: NativeStackNavigationProp<ParamList, RouteName, NavigatorID>;
    };
    Navigator: typeof NativeStackNavigator;
}, Config extends StaticConfig<TypeBag> | undefined = StaticConfig<TypeBag> | undefined>(config?: Config): TypedNavigator<TypeBag, Config>;
export {};
//# sourceMappingURL=createNativeStackNavigator.d.ts.map