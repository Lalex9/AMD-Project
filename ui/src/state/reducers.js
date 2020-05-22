const initialState = {
    userLogged: false
};

function rootReducer(state = initialState, action) {
    if (action.type === "SET_USER") {
        return Object.assign({}, state, {
            userLogged: action.payload
        });
    }

    return state;
}

export default rootReducer;