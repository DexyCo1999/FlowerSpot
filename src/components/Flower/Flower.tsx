import styles from "./Flower.module.scss";
import photo from "../../assets/images/flower.png"
import favPhoto from "../../assets/images/favouriteLogo.png"
import {useState} from 'react';

export interface IFlower {
  id: number;
  name: string;
  latin_name: string;
  sightings: number;
  favourite: boolean;
  profile_picture: string;
}

function Flower({ name, latin_name, sightings, favourite, profile_picture}: IFlower) {

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
      <div className={styles.backFav} style={{backgroundColor: color? '#ECBCB3' : '#fff'}} onClick={()=>changeColor()}>
        <img className={styles.favLogo} src={favPhoto}/>
      </div>
    </div>
  );
}

export default Flower;
