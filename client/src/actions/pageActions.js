import axios from "axios";
import { GET_ERRORS, SET_PAGE } from "./types";

// Register page
export const addPage = (pageData, history) => dispatch => {
    axios
        .post("/page", pageData)
        .then(res => {
            if (res.data.error) {
                let obj = {
                    name: res.data.error
                }
                dispatch({
                    type: GET_ERRORS,
                    payload: obj
                })
                history.push("/dashboard/page")
            }
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Get page
export const getPage = (pageData) => dispatch => {
    axios
        .get(`/page/${pageData}`)
        .then(res => {
            if (res.data.error) {
                let obj = {
                    value: res.data.error
                }
                dispatch({
                    type: GET_ERRORS,
                    payload: obj
                })
            } else {
			    dispatch(setPage(res.data));
            }
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set current page
export const setPage = page => {
	return {
		type: SET_PAGE,
		payload: page
	};
};