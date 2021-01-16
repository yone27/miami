import { SET_PAGE } from "../actions/types";

const initialState = {
    page: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PAGE:
            return action.payload;
        default:
            return state;
    }
}
