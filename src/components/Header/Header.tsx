import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../../assets/images/Vector.png";
import CreateAccount from "../CreateAccount/CreateAccount";
import WelcomeBack from "../WelcomeBack/WelcomeBack";
import ProfileModalDialog from "../ProfileModalDialog/ProfileModalDialog";
import profilePhoto from "../../assets/images/profilePhoto2.png";
import axios from "axios";



export default function Header() {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalSignIn, setShowModalSignIn] = useState(false);
  const [showProfileModal, setProfileModal] = useState(false);

  const [login, setLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
  });

 // const { first_name, last_name } = userInfo;

  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    setLogin(!!token);
  }, [token]);

  useEffect(() => {
    axios
      .get("https://flowrspot-api.herokuapp.com/api/v1/users/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then(function (response: any) {
        setUserInfo({
          first_name: response.data.user.first_name,
          last_name: response.data.user.last_name,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.header}>
      <div className={styles.flowrSpot}>
        <img src={logo} alt="" />
        FlowrSpot
      </div>

      <div className={styles.right}>
        <div className="flowers">Flowers</div>
        <div className="LatestSigh">Latest Sightings</div>
        <div className="favs" onClick={() => setLogin(!login)}>
          {" "}
          Favourites
        </div>

        {login === false ? (
          <>
            <div
              className={styles.login}
              onClick={() => setShowModalLogin(true)}
            >
              Login
            </div>
            <WelcomeBack
              show={showModalLogin}
              onClose={() => setShowModalLogin(false)}
            />
            <div
              className={styles.account}
              onClick={() => setShowModalSignIn(true)}
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
              className={styles.profile}
              onClick={() => setProfileModal(true)}
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
      </div>
    </div>
  );
}
