import React, { useReducer, createContext } from 'react';
import { useDefaultContext } from "./defaultContext";
import { saveToStorage } from '../../utils/localeStorage';
import { STORAGE_KEY } from '../../config';

export const AppContext = createContext();

let reducer = (state, action) => {
    switch (action.type) {
        case "setLocale":
            saveToStorage(STORAGE_KEY, action.locale);

            return { ...state, locale: action.locale };
        default:
            break;
    }
};

export const AppContextProvider = ({ children }) => {
    const defaultContext = useDefaultContext();
    const [state, dispatch] = useReducer(reducer, defaultContext);
    const value = { state, dispatch };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};