import React, {useState, useEffect} from 'react';
import styles from "./FavoriteFlowers.module.scss";
import Header from '../Header/Header';
import Flower, {IFlower} from '../Flower/Flower';
import FlowerService from "../../services/flowerService";
import getFlower from "../../services/flowerService";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";

  

function FavoriteFlowers() {



    // const [flowers, setFlowers] = useState<Array<IFlower>>([]); //svi

    const favFlower = useSelector<RootState, Array<IFlower>>(    
      state => state.loginReducer.addFavorite, 
      
    )

   
  //   useEffect(() => {
  //       getFlower
  //         .getFlowers()
  //         .then(function (response: any) {
  //           setFlowers(response.data.flowers);
            
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //         });
  //     }, []);

    return (
      <div> 
        <Header/>        
      <div className={styles.list}>
        {favFlower.map((flower) => (
        <div key={flower.id}>
          <Flower
          flower={ flower}
            id={flower.id}
            name={flower.name}
            latin_name={flower.latin_name}
            sightings={flower.sightings}
            favorite={flower.favorite}
            profile_picture={flower.profile_picture}
          />
        </div>
      ))}
      
    </div>
        </div>
    )
}

export default FavoriteFlowers
