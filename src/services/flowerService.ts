import axios from "axios"

export default class FlowerService{

    static getFlowers(){
        return axios
        .get("https://flowrspot-api.herokuapp.com/api/v1/flowers", {       
      })
    }


}