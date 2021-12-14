import {useState, useEffect} from 'react';
import styles from "./Flower.module.scss";
import photo from "../../assets/images/flower.png"
import favPhoto from "../../assets/images/favouriteLogo.png"


export interface IFlower {
  id: number;
  name: string;
  latin_name: string;
  sightings: number;
  favourite: boolean;
  profile_picture: string;
}

function Flower({ name, latin_name, sightings, favourite, profile_picture}: IFlower) {

   
  const [login, setLogin] = useState(false);

  
  const token = localStorage.getItem("auth_token");

  // Napraviti da odmah nakon logina bude prikazano, a ne kada se rerenderuje?!
    useEffect(() => {
      setLogin(!!token); 
    },[token]); 

    const [color, setColor] = useState(false);

    let sightingsColor = false;

    const changeColor = () => {

      sightingsColor = !sightingsColor;
      setColor(!color);
      
    }
    

  return (
    <div className={styles.content}>
      <img className={styles.photoFlower} src={photo} alt=""/>      
      <div className={styles.textInfo}>
        <div className={styles.favourite}>{favourite}</div>
        <div className={styles.name}> {name} </div>
        <div className={styles.family}>{latin_name}</div>
      </div>
      <div>
        <button className={styles.sightings} style={{backgroundColor: color? '#ECBCB3'  : '#fff'}}> {sightings} sightings</button>
      </div>
      {login === false ? (<></>) : ( 
        <div className={styles.backFav} style={{backgroundColor: color? '#ECBCB3' : '#fff'}} onClick={()=>changeColor()}>
        <img className={styles.favLogo} src={favPhoto}/>
        </div>
       ) }
      
    </div>
  );
}

export default Flower;
