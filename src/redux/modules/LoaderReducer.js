import {
    SET_IS_LOADING
} from '../actions/actionConstants';

const initialState = {
    isLoading: false
};

export default function LoaderReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                isLoading: action.payload
            };
        default:
            return state;
    }
}
