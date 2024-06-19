import type { CommonNavigationAction, PartialState } from './types';
/**
 * Base router object that can be used when writing custom routers.
 * This provides few helper methods to handle common actions such as `RESET`.
 */
export declare const BaseRouter: {
    getStateForAction<State extends Readonly<{
        key: string;
        index: number;
        routeNames: string[];
        history?: unknown[] | undefined;
        routes: import("./types").NavigationRoute<import("./types").ParamListBase, string>[];
        type: string;
        stale: false;
    }>>(state: State, action: CommonNavigationAction): State | PartialState<State> | null;
    shouldActionChangeFocus(action: CommonNavigationAction): boolean;
};
//# sourceMappingURL=BaseRouter.d.ts.map