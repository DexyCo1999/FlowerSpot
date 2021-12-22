import axios from "axios";


export default class UserInfo{

    static getUserInfo(){
        return axios.get("https://flowrspot-api.herokuapp.com/api/v1/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        })
    }

}