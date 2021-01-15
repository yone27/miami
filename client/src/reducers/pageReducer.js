import { SET_PAGES } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
	//	isAuthenticated: false,
	pages: {},
	loading: false
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_PAGES:
			return {
				...state,
				pages: action.payload
			};
		default:
			return state;
	}
}
