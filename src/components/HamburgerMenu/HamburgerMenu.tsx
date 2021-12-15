import React from "react";
import styles from "./HamburgerMenu.module.scss";
import { slide as Menu } from "react-burger-menu";
import {useState} from 'react';

function HamburgerMenu() {

//     const[open, setOpen]=useState(false);


//   return open? (
//     <div className={styles.header}>
//       <div className = {styles.icon}>
//         <div className={styles.ham}></div>
//         <div className={styles.ham}></div>
//         <div className={styles.ham}></div>
//     </div>
//       </div> ): (
//     <Menu isOpen={open}> 
//         <div className={styles.items}>
//           <div>Flowers</div>
//           <div>Latest Sightings</div>
//           <div> Favourites </div>
//         </div>
//       </Menu>)



return (
  <div className={styles.header}>
        <div className = {styles.icon} >
            <div className={styles.ham}></div>
            <div className={styles.ham}></div>
            <div className={styles.ham}></div>
      </div>   
  <Menu right  noOverlay  disableOverlayClick  noTransition width={ '200px' } className={styles.bmmenu}>  
        {/* <div className={styles.items}> */}
            <span className={styles.items}>Flowers</span>
            <span className={styles.items}>Latest Sightings</span>
            <span className={styles.items}>  Favourites </span>
      {/* </div> */}
       {/* <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/about">About</a>
        <a id="contact" className="menu-item" href="/contact">Contact</a> */}
</Menu>
</div>)

}

export default HamburgerMenu;
