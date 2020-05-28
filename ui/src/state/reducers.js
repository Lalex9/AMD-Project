const initialState = {
    userEmail: "",
    userLogged: false
};

function rootReducer(state = initialState, action) {
    if (action.type === "SET_USER") {
        return Object.assign({}, state, {
            userEmail: action.payload.user,
            userLogged: action.payload.isLogged
        });
    }

    return state;
}

export default rootReducer;