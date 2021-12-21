import { AnyAction } from "redux";
import { addFavorite, postFavourite } from "./actions";
import { LOG_IN, PROFILE_DETAILS, SIGN_IN, POST_FAVOURITE, ADD_FAVORITE, REMOVE_FAVORITE} from "./constants";
import { AuthState } from "./types";



const initialState: AuthState = {
  login:
        {username: "", pass: ""},

  signIn: 
        {email: "",
        pass: "",
        firstName: "",
        lastName: "",
        dateOfBirth: ""},
        
  profileDetails:
        {
           id: 0,
           firstName: "",
           lastName: "" 
        },
  postFavourite:
    {
        id: 0,
        user_id: 0,
        flower: {
            id: 0,
            name: "",
            latin_name: "",
            sightings: 0,
            profile_picture: "",
            favorite: false
        }
    },
    addFavorite : []
}



    


const loginReducer = (state= initialState, action:AnyAction) => {
    const {type, payload} = action;
    switch(type){
        case LOG_IN:
            return{
                ...state,
                login: payload
            }
        case SIGN_IN:
            return{
                ...state,
                login: {
                   ...state.login,
                   username : payload.email
                },
                signIn: payload
            }
        case PROFILE_DETAILS:
            return{
                ...state,
                profileDetails: payload
            }
        case POST_FAVOURITE:
            return{
                ...state,
                postFavourite: payload
            }
        case ADD_FAVORITE:
            return{
                ...state, 
                addFavorite: payload
            }
        case REMOVE_FAVORITE:
            return{
                ...state,
                addFavorite: payload
            //    ...state.addFavorite.slice(0, action.payload), //--> start vs end
            //    ...state.addFavorite.slice(action.payload + 1) //--> nastavak od payload              
            }

        default:         
        return state;
    }
}

export default loginReducer;

