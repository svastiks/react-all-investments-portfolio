import React, { createContext, useReducer } from 'react'
import AppReducer from '../context/AppReducer'

const initialState = {
    trackList: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = props => {
    const [state, dispacth] = useReducer(AppReducer, initialState);

    //Actions
    const addCryptoToTrackList = (coin) => {
        dispacth({ type: "ADD_CRYPTO_TO_TRACKLIST", payload: coin });
    }

    return (
        <GlobalContext.Provider value={{ trackList: state.trackList, addCryptoToTrackList, }}>
            {props.children}
        </GlobalContext.Provider>
    )
}