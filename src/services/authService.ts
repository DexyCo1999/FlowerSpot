import axios from "axios";

export default class Auth{

    static signIn(email: string, pass:string, firstName: string, lastName:string, dateOfBirth:string){
        return axios.post('https://flowrspot-api.herokuapp.com/api/v1/users/register', {
            email: email, 
            password: pass, 
            first_name: firstName,
            last_name: lastName,
            date_of_birth: dateOfBirth       
          })      
    }
    static login(email:string, pass:string){
        return axios.post('https://flowrspot-api.herokuapp.com/api/v1/users/login', {
            email: email, 
            password: pass
                
          })
    }
}