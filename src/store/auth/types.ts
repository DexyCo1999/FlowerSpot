import { IFlower } from "../../components/Flower/Flower";

export interface AuthState{
    login: login,
    signIn: signIn,
    profileDetails: profileDetails,
    postFavourite: postFavourite,
    addFavorite: Array<IFlower>
    // removeFavorite: Array<IFlower>
}

export interface login {
    username: string,
    pass: string
}

export interface signIn{
    email: string,
    pass: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string
}

export interface profileDetails{
    id: number,
    firstName: string,
    lastName: string
}

export interface postFavourite{
    id: number,
    user_id: number,
    flower: {
        id: number,
        name: string,
        latin_name: string,
        sightings: number,
        profile_picture: string,
        favorite: boolean
    }
}


