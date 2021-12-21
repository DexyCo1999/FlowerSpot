import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, useRoutes, Link, useNavigate} from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../../assets/images/Vector.png";
import CreateAccount from "../CreateAccount/CreateAccount";
import WelcomeBack from "../WelcomeBack/WelcomeBack";
import ProfileModalDialog from "../ProfileModalDialog/ProfileModalDialog";
import profilePhoto from "../../assets/images/profilePhoto2.png";
import informationUser from "../../services/userInfoService";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { profileDetails as profileDetailsAction} from "../../store/auth/actions";
import { login as loginState, profileDetails, signIn} from "../../store/auth/types";
import { useDispatch } from "react-redux";



export default function Header() {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalSignIn, setShowModalSignIn] = useState(false);
  const [showProfileModal, setProfileModal] = useState(false);

  const [login, setLogin] = useState(false);
  const [click, setClick] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    id: 0,
    first_name: "",
    last_name: ""
  });

  // ispis informacija login
  const userI = useSelector<RootState, loginState>(
    state => state.loginReducer.login
  )
  // ispis informacija sign in
  const userII = useSelector<RootState, signIn>(
    state=>state.loginReducer.signIn
  )
  // ispis informacija kada je pozvan PROFILE DETAILS
  const userInfoDetails = useSelector<RootState, profileDetails> (
    state=> state.loginReducer.profileDetails
  )



   // Ispit informacija o favourite - PROBA DA LI RADI OK 
   const favouriteConsoleLog = useSelector<RootState, loginState>(
    state=>state.loginReducer.postFavourite
  )

  console.log(favouriteConsoleLog);


  const token = localStorage.getItem("auth_token");
  useEffect(() => {
    setLogin(!!token); // --> Ako postoji token, korisnik je logovan
  },[token]);

  // Prikupljanje informacija o korisniku
  useEffect(() => {   
    informationUser.getUserInfo()
      .then(function (response: any) {
        // setUserInfo({
        //   first_name: response.data.user.first_name,
        //   last_name: response.data.user.last_name,
        // })
        dispatch(profileDetailsAction({
          id: response.data.user.id,
          firstName : response.data.user.first_name,
          lastName:  response.data.user.last_name
          
        })); 
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [token]); //Da bi se osvezavalo cim se neko loguje, kreira nalog

  return (
    <div className={styles.header} >
      <div className={styles.flowrSpot} >
        <img src={logo} alt="" onClick={()=>setClick(true)}/>
        FlowrSpot
      </div>

    {/* // { window.innerWidth < 301 ?  -- Ako zelim da ogranicim velicinu ekrana na 300px( */} 
       {!click ? (
      
        <div className={styles.right}>
          <div onClick={()=>navigate("/")} className={styles.flowers} > Flowers </div>
          <div className="LatestSigh">Latest Sightings</div>
          {/* <Route path="/favs">  */}
            <div onClick={()=>navigate("/favs")} className="favs" > Favorites </div>
          {/* </Route> */}
          
  
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
                
                {/* {userI.firstName} {userI.lastName} */}
                {userInfoDetails.firstName} {userInfoDetails.lastName}
                {/* {userInfo.first_name} {userInfo.last_name} */}
              </div>
              <img className={styles.photo} src={profilePhoto} alt={""} />
              <ProfileModalDialog
                show={showProfileModal}
                onClose={() => setProfileModal(false)}  
                // first_name={userInfo.first_name} 
                // last_name={userInfo.last_name} 

                first_name={userInfoDetails.firstName}
                last_name={userInfoDetails.lastName}
              />
            </>
          )}
        </div>
     ):(<HamburgerMenu className={styles.hamburger}/>)}
    </div>
  )
}

