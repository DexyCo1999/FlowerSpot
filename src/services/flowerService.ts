import axios from "axios"

export default class FlowerService{

    static getFlowers(){
        return axios
        .get("https://flowrspot-api.herokuapp.com/api/v1/flowers", {       
      })
    }
    

    static postFavouriteFlowers(
      id: number,
      user_id: number,
      flower: {
          id: number,
          name: string,
          latin_name: string,
          sightings: number,
          profile_picture: string,
          favorite: boolean})
      {
      return axios
      .post(`https://flowrspot-api.herokuapp.com/api/v1/flowers/${flower.id}/favorites`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
    }
}