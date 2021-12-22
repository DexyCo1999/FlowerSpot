import { useEffect, useState } from "react";
import Flower, { IFlower } from "../Flower/Flower";
import styles from "./FlowersList.module.scss";
import getFlower from "../../services/flowerService";
import { useSelector } from "react-redux";
import { AuthState} from "../../store/auth/types";
import { RootState } from "../../store/store";
import { addFavorite } from "../../store/auth/actions";
import FavoriteFlowers from "../FavoritesFlowers/FavoriteFlowers";

interface IProps {
  data?: Array<IFlower>;
  search: string;
}

function FlowersList({ search }: IProps) {
  const [flowers, setFlowers] = useState<Array<IFlower>>([]); 
  const [filterFlowers, setFilterFlowers] = useState<Array<IFlower>>([]); 
  
  // Filtriranje
  useEffect(() => {
    const filter = flowers.filter((flower) =>
      flower.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilterFlowers(filter);
  }, [search]);

  // Izlistavanje
  useEffect(() => {
    getFlower
      .getFlowers()
      .then(function (response: any) {
        setFlowers(response.data.flowers);
        setFilterFlowers(response.data.flowers);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.list}>
      {filterFlowers?.map((flower) => (
        <div key={flower.id}>
          <Flower
            flower ={flower}
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
  );
}

export default FlowersList;
