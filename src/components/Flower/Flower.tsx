import { useState, useEffect } from "react";
import styles from "./Flower.module.scss";
import photo from "../../assets/images/flower.png";
import favPhoto from "../../assets/images/favouriteLogo.png";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import {
  login as loginState,
  profileDetails,
  signIn,
} from "../../store/auth/types";
import FlowerService from "../../services/flowerService";
import { addFavorite, postFavourite, removeFavorite } from "../../store/auth/actions";
import { AuthState} from "../../store/auth/types";
import FavoriteFlowers from "../FavoritesFlowers/FavoriteFlowers";



export interface IFlower {
  id?: number;
  name: string;
  latin_name: string;
  sightings: number;
  favorite: boolean;
  profile_picture: string;
  flower  : IFlower
}

function Flower({
  name,
  latin_name,
  sightings,
  favorite,
  profile_picture,
  id,
  flower
}: IFlower) {

  const [login, setLogin] = useState(false);
 



  //  // ispis informacija kada je pozvan PROFILE DETAILS
  //  const userInfoDetails = useSelector<RootState, profileDetails> (
  //   state=> state.loginReducer.profileDetails
  // )

  // ----------------------------- DAMJAN RESENJA
  // // Napraviti da odmah nakon logina bude prikazano, a ne kada se rerenderuje?!
  // useEffect(() => {
  //   //  const token = localStorage.getItem("auth_token");
  //   // console.log(userInfoDetails, "ovo je username");
  //   if (userInfoDetails.username !== "") {
  //     setLogin(true);
  //   }
  // }, [userInfoDetails]);



  const favFlower = useSelector<RootState, Array<IFlower>>(    
      state => state.loginReducer.addFavorite
  ) 

  // const removeFavFlower = useSelector<RootState, Array<IFlower>>(    
  //   state => state.loginReducer.removeFavorite
  // )

  // smestamo azuriran niz od remove
  // const removeFavFlower = useSelector<RootState, Array<IFlower>>(
  //   state => state.loginReducer.removeFavorite
  // )

  const token = localStorage.getItem("auth_token");
  useEffect(() => {
    setLogin(!!token); // --> Ako postoji token, korisnik je logovan
  },[token]);

  const [color, setColor] = useState(false);



  const changeColor = () => {    
  
    flower.favorite = !flower.favorite;
  }; // Boja se menja na klik, kao i vrednost da li je selektovano il ne.

  const dispatch = useDispatch();

  const setFavourite = () => {     
  
     let same = false;     
     favFlower.forEach(damjan => {

      if(flower.id === damjan.id){
        same = true;
        return;       
      }  
     });     

      if(same){ 
             
        changeColor();
        const filter = favFlower.filter((damjan) => (damjan.id !== flower.id));
        console.log(filter);
        dispatch(removeFavorite(filter));  
        console.log("NISAM VISE SELEKTOVAN");     // nalazi se u nizu i kada je selektovan 
        console.log(flower.favorite);
        console.log(favFlower);
      }
      
      if(!same)
      {
        
        changeColor();
        dispatch(addFavorite([...favFlower,flower]));    
        console.log("SAD JESAM SELEKTOVAN");   
        console.log(flower.favorite);  
        console.log(favFlower);
        
  
      } 
    
    

    // Pokusaj koriscenja REDUXA -------> GRESKA NA BACKENDU!?
    // console.log(userInfoDetails.id);

    // FlowerService.postFavouriteFlowers(id, userInfoDetails.id, {
    //   id,
    //   name,
    //   latin_name,
    //   sightings,
    //   profile_picture,
    //   favorite:true}).then(function (response: any) {
    //   // dispatch(postFavourite({ id, user_id:id, flower:{id,name,latin_name,sightings,profile_picture,favourite}}))
    // })
    // .catch(function (error){
    //   console.log(error);
    // });
  };





  return (
    <div className={styles.content}>
      <img className={styles.photoFlower} src={photo} alt="" />
      <div className={styles.textInfo}>
        <div className={styles.favorite}>{favorite}</div>
        <div className={styles.name}> {name} </div>
        <div className={styles.family}>{latin_name}</div>
      </div>
      <div>
        <button
          className={styles.sightings}
          style={{ backgroundColor:  flower.favorite ? "#ECBCB3" : "#fff" }}
        >
          {" "}
          {sightings} sightings
        </button>
      </div>
      {!login ? (
        <></>
      ) : (
        <div
          className={styles.backFav}
          style={{ backgroundColor: flower.favorite ? "#ECBCB3" : "#fff" }}
          onClick={()=>setFavourite()}
        >
          <img className={styles.favLogo} src={favPhoto} />
        </div>
      )}
    </div>
  );
}
    
      

export default Flower;

