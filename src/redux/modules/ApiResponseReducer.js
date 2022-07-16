import {
    SET_API_RESPONSE,
    GET_API_RESPONSE
} from '../actions/actionConstants';

const initialState = {
    page: 1,
    date: '',
    data: []
};

export default function ApiResponseReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_API_RESPONSE:
            return {
                ...state,
                page: action.payload.page,
                date: action.payload.date
            };
        case GET_API_RESPONSE:
            return {
                ...state,
                data: action.payload.data
            };
        default:
            return state;
    }
}
