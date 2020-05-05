import { CHANGE_PAGINATION } from "../constants/actions";

const initialState = {
    activePage: 1
};

export const pagination = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_PAGINATION:
            return Object.assign({}, state, { ...state, activePage: action.index });
        default:
            return state;
    }
};
