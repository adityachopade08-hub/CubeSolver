import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";

const noop = () => {};

const defaultActions = {
    executeMove: noop,
    reset: noop,
    scramble: noop,
    undo: noop,
    redo: noop,
    solve: noop,
};

const CubeActions = createContext({
    ...defaultActions,
    registerActions: noop,
});

export function CubeActionsProvider({ children }) {
    const [actions, setActions] = useState(defaultActions);

    const registerActions = useCallback((nextActions = {}) => {
        setActions({
            ...defaultActions,
            ...nextActions,
        });
    }, []);

    const value = useMemo(
        () => ({
            ...actions,
            registerActions,
        }),
        [actions, registerActions]
    );

    return (
        <CubeActions.Provider value={value}>
            {children}
        </CubeActions.Provider>
    );
}

export function useCubeActions() {
    return useContext(CubeActions);
}
