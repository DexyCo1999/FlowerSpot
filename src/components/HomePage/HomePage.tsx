import React , {useState} from "react";
import styles from "./HomePage.module.scss";
import path from "../../assets/images/search.png";
import back_photo from "../../assets/images/pl-hero.png";
import flower from "../../assets/images/flower.png";
import FlowersList from "../FlowersList/FlowersList";


export interface IHomePage{
  searchValue: string
}

export default function HomePage() {
  // const flowers = [
  //   {
  //     name: 'Baloon flowers',
  //     family: 'Platycodon grandiflorus',
  //     sightings: 135,
  //     favourite: false,
  //     image: flower
  //   },
  //   {
  //     name: 'Baloon flowers2',
  //     family: 'Platycodon grandiflorus',
  //     sightings: 135,
  //     favourite: false,
  //     image: flower
  //   },
  //   {
  //     name: 'Baloon flowers3',
  //     family: 'Platycodon grandiflorus',
  //     sightings: 135,
  //     favourite: false,
  //     image: flower
  //   },
  //   {
  //     name: 'Baloon flowers4',
  //     family: 'Platycodon grandiflorus',
  //     sightings: 135,
  //     favourite: true,
  //     image: flower
  //   },
  //   {
  //     name: 'Baloon flowers2',
  //     family: 'Platycodon grandiflorus',
  //     sightings: 135,
  //     favourite: true,
  //     image: flower
  //   },
  //   {
  //     name: 'Baloon flowers3',
  //     family: 'Platycodon grandiflorus',
  //     sightings: 135,
  //     favourite: false,
  //     image: flower
  //   },
  //   {
  //     name: 'Baloon flowers4',
  //     family: 'Platycodon grandiflorus',
  //     sightings: 135,
  //     favourite: false,
  //     image: flower
  //   }
  // ]



    const[searchValue, setSearchValue]= useState("");

  return (
    <>
    <div className={styles.content}>
      <div className={styles.text_contenet}>
        <h1 className={styles.title}>Discover flowers around you</h1>
        <h6 className={styles.subtitle}>
          Explore between more than 8.427 sightings
        </h6>
        <div className={styles.inputDiv}>
          <input
            type="text"
            placeholder="Looking for something specific?"
            className={styles.input}
            value={searchValue}
            onChange={(e)=>setSearchValue(e.target.value)}

          />
          <img src={path} alt="" />
        </div>
      </div>
    </div>

    <FlowersList  search={searchValue} />

    </>
  );
}
