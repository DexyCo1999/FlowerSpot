import styles from "../WelcomeBack/WelcomeBack.module.scss";
import Input from "../Input/Input";
import React, { useState , useEffect, FormEvent} from "react";
import Modal from "react-modal";
import { symbolName } from "typescript";
import axios from 'axios';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
type propTypes = {
  show: boolean;
  onClose: Function;
};


function WelcomeBack({show, onClose}: propTypes) {
  

  const [login, setLogin] = useState({
    email: "",
    pass: ""
  })

  const{email,pass}=login;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  setLogin({ ...login, [e.target.name]: e.target.value });
 
  
  const handleSubmit= (e:FormEvent)=>{
    e.preventDefault()
    axios.post('https://flowrspot-api.herokuapp.com/api/v1/users/login', {
      email: email, 
      password: pass
          
    })
    .then(function (response: any) {
      localStorage.setItem("auth_token", response.data.auth_token); 
      onClose();
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  }




  return (
      <Modal
        isOpen={show}
        onRequestClose={() => onClose()}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className={styles.title}>Welcome Back</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputInline}>
            <Input type="string" name="email" value={email} onChange={(e)=>handleChange(e)} label={"Email Address"} />
            <Input type="string" name="pass" value={pass} onChange={(e)=>handleChange(e)} label={"Password"} />
          </div>
          <button type="submit" className={styles.btLogin}>Login to your Account</button>
        </form>
        <button className={styles.notRegister}>I don't want to register</button>
      </Modal>
  );
}

export default WelcomeBack;

/*
 return (
      <div>

<button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className={styles.title}>Welcome Back</h2>
        

        <form className={styles.form}>
            <div className={styles.inputDiv}>  
            <Input value={""} label={"Email Address"} onChange={()=>{}}/>
            <Input value={""} label={"Password"} onChange={()=>{}}/>
            </div>
            <button className={styles.btLogin}>Login to your Account</button>
         </form>
      </Modal>



      </div>
  );
  */
