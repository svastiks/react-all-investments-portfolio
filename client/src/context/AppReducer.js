const appReducer = (state, action) => {
    switch (action.type) {
        case "ADD_CRYPTO_TO_TRACKLIST":
            return {
                ...state,
                tracklist: [action.payload, ...state.tracklist]
            }
        default:
            return state;
    }
};
export default appReducer;