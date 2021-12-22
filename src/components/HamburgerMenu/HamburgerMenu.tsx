import React from "react";
import styles from "./HamburgerMenu.module.scss";
import { slide as Menu } from "react-burger-menu";
import { useState, useEffect } from "react";
import CreateAccount from "../CreateAccount/CreateAccount";
import WelcomeBack from "../WelcomeBack/WelcomeBack";
import ProfileModalDialog from "../ProfileModalDialog/ProfileModalDialog";
import informationUser from "../../services/userInfoService";
import profilePhoto from "../../assets/images/profilePhoto2.png";

interface IHamburger{
  className: string;
}
function HamburgerMenu({className}:IHamburger) {
  // State-ovi za otvaranje modalnih dijaloga
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalSignIn, setShowModalSignIn] = useState(false);
  const [showProfileModal, setProfileModal] = useState(false);

  // State za pracenje da li je korisnik logovan
  const [login, setLogin] = useState(false);


  // State za ispis informacija o korisniku
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
  });

  // State za zatvaranje menu-ja 
  const[open, setOpen] = useState(true); 

  // Preuzimanje tokena
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    setLogin(!!token); // --> Ako postoji token, korisnik je logovan
  }, [token]);

  // Prikupljanje informacija o korisniku koje se ispisuju u ProfileModalDialogu
  useEffect(() => {
    informationUser
      .getUserInfo()
      .then(function (response: any) {
        setUserInfo({
          first_name: response.data.user.first_name,
          last_name: response.data.user.last_name,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [token]); //Da bi se osvezavalo cim se neko loguje, kreira nalog

  // Otvaranje login i zatvaranje menu
  const clickLogin=()=>{
    setOpen(false);
    setShowModalLogin(true)
  }

  // Otvaranje sign in i zatvaranje menu
  const clickSignIn=()=>{
    setOpen(false);
    setShowModalSignIn(true);
  }

   // Otvaranje ModalProfileInformation i zatvaranje menu
   const clickProfileModal=()=>{
    setOpen(false);
    setProfileModal(true);
  }

  return (
    <div className={styles.header}>
      <div className={styles.icon}>
        <div className={styles.ham}></div>
        <div className={styles.ham}></div>
        <div className={styles.ham}></div>
      </div>
      <Menu 
      onOpen={() => setOpen(!open)}
      isOpen={open} 
        right
        noOverlay
        disableOverlayClick
        noTransition
        width={"200px"}
        className={styles.bmmenu}
      >
        <span className={styles.items} onClick={()=>setOpen(false)}>Flowers</span>
        <span className={styles.items} onClick={()=>setOpen(false)}>Latest Sightings</span>
        <span className={styles.items} onClick={()=>setOpen(false)}> Favourites </span>
        
        {login === false ? (
          <>
            <div
              className={styles.items}
              onClick={() => clickLogin()}
            >
              Login
            </div>
            <WelcomeBack
              show={showModalLogin}
              onClose={() => setShowModalLogin(false)}
            />
            <div
              className={styles.items}
              onClick={() => clickSignIn()}
            >
              New Account
            </div>
            <CreateAccount
              show={showModalSignIn}
              onClose={() => setShowModalSignIn(false)}
            />
          </>
        ) : (
          <>
            <div
              className={styles.items}
              onClick={() => clickProfileModal()}
            >
              {userInfo.first_name} {userInfo.last_name}
            </div>
            <img className={styles.photo} src={profilePhoto} alt={""} />
            <ProfileModalDialog
              show={showProfileModal}
              onClose={() => setProfileModal(false)}
              first_name={userInfo.first_name}
              last_name={userInfo.last_name}
            />
          </>
        )}
      </Menu>
    </div>
  );
}

export default HamburgerMenu;
