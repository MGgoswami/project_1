import * as types from './actionConstants';

export const setApiResponse = (payload) => ({
    type: types.SET_API_RESPONSE,
    payload
});

export const setIsLoading = (payload) => ({
    type: types.SET_IS_LOADING,
    payload
});