import { useEffect, useState } from "react";
import Flower, { IFlower } from "../Flower/Flower";
import styles from "./FlowersList.module.scss";
import getFlower from "../../services/flowerService";

interface IProps {
  data?: Array<IFlower>;
  search: string;
}

function FlowersList({ search }: IProps) {
  const [flowers, setFlowers] = useState<Array<IFlower>>([]); //svi
  const [filterFlowers, setFilterFlowers] = useState<Array<IFlower>>([]); //izlistani

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
            id={flower.id}
            name={flower.name}
            latin_name={flower.latin_name}
            sightings={flower.sightings}
            favourite={flower.favourite}
            profile_picture={flower.profile_picture}
          />
        </div>
      ))}
    </div>
  );
}

export default FlowersList;
