import { createContext, useContext } from "react";

const CubeActions = createContext();

export function CubeActionsProvider({

    value,

    children

}){

    return(

        <CubeActions.Provider value={value}>

            {children}

        </CubeActions.Provider>

    );

}

export function useCubeActions(){

    return useContext(CubeActions);

}