
import { IFlower } from "../../components/Flower/Flower";

import {
    LOG_IN, 
    PROFILE_DETAILS, 
    SIGN_IN, 
    POST_FAVOURITE,
    ADD_FAVORITE,   
    REMOVE_FAVORITE }
from "./constants";

import { 
    login as loginState, 
    signIn as signInState,
    profileDetails as profileDetailsState,
    postFavourite as postFavouriteState}  
from "./types";


export const login = (data:loginState)=> ({
    type: LOG_IN,
    payload: data

})

export const signIn = (data:signInState) => ({
    type: SIGN_IN,
    payload: data
})

export const profileDetails = (data: profileDetailsState) => ({
    type: PROFILE_DETAILS,
    payload: data
})

export const postFavourite = (data: postFavouriteState) => ({
    type: POST_FAVOURITE,
    payload: data
})


export const addFavorite = (data: Array<IFlower>) => ({
    type: ADD_FAVORITE,
    payload: data
})

export const removeFavorite = (data: Array<IFlower>) => ({
    type: REMOVE_FAVORITE,
    payload: data
})
