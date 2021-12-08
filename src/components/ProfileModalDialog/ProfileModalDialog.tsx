import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "../ProfileModalDialog/ProfileModalDialog.module.scss";
import profileImage from "../../assets/images/profilePhoto.png";
import left from "../../assets/images/left.png";
import right from "../../assets/images/right.png";
import axios from "axios";
import { stringify } from "querystring";
import { info } from "console";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "40px 80px"
  },
};

type propTypes = {
  show: boolean,
  onClose: Function,
  first_name: string,
  last_name: string;
}

// export type propProfileInfo = {
//   first_name: string,
//   last_name: string;
// }

function ProfileModalDialog({show, onClose, first_name,last_name}: propTypes ) {

  // const[information, setInformation] = useState({
  //   first_name: "",
  //   last_name: "",
  //   id: 0
  // });

  // const{first_name,last_name} = information;

  // useEffect(()=>{
  //   axios
  //     .get("https://flowrspot-api.herokuapp.com/api/v1/users/me",{
  //       headers: {Authorization: `Bearer ${localStorage.getItem("auth_token")}`}
  //     })
  //     .then(function(response:any){
  //     //  setInformation({ 
  //     //   //  first_name: response.data.user.first_name,
  //     //   //  last_name:response.data.user.last_name
  //     //  })
  //     setInformation(response.data.user);
  //      console.log(response.data);
  //     })
  //     .catch(function(error){
  //       console.log(error);
  //     });
  // },[])
  
  return (
    
      <Modal
        isOpen={show}
        onRequestClose={()=>onClose()}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form>
          <div className={styles.content}>
            <div className={styles.exit} onClick={()=>onClose()}>
              <img className={styles.right} src={right} alt={""} />
              <img className={styles.left} src={left} alt={""} />
            </div>
            <div className={styles.header}>
              <img
                className={styles.profilePhoto}
                src={profileImage}
                alt={""}
              />
              <div className={styles.profileInfo}>
                <div className={styles.name}>{first_name} {last_name}</div>
                <div className={styles.sightings}>47 sightings</div>
              </div>
            </div>
            <div className={styles.information}>
              <div>
                <label>First Name</label>
                <div>{first_name}</div>
              </div>
              <div>
                <label>Last Name</label>
                <div>{last_name}</div>
              </div>
              <div>
                <label>Date of Birth</label>
                <div>May 20, 1990</div>
              </div>
              <div>
                <label>Email Address</label>
                <div>{first_name}.{last_name}@gmail.com</div>
              </div>
            </div>
            <button className={styles.logout}>Logout</button>
          </div>
        </form>
      </Modal>
   
  );
}

export default ProfileModalDialog;


