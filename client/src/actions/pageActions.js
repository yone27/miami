import axios from "axios";
import { GET_ERRORS } from "./types";

// Register page
export const addPage = (pageData, history) => dispatch => {
    axios
        .post("/page", pageData)
        .then(res => history.push("/dashboard"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};