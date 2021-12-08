import React, { FormEvent, useState } from "react";
import styles from "./CreateAccount.module.scss";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import Input from "../Input/Input";
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
  show: boolean,
  onClose: Function
}

function CreateAccount({show, onClose}: propTypes) {

  const[formData, setFormData] = useState({ 

    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    pass: ""
  })

  const{firstName, lastName, dateOfBirth, email, pass} = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit= (e:FormEvent)=>{
      e.preventDefault()
      axios.post('https://flowrspot-api.herokuapp.com/api/v1/users/register', {
        email: email, 
        password: pass, 
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dateOfBirth       
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
        onRequestClose={()=> onClose()}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className={styles.title}>Create an Account</h2>
        

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.name}>
            <Input type="text" name="firstName" value={firstName}  onChange={(e) => handleChange(e)} label={"First name"} />
            <Input type="text" name="lastName" value={lastName} onChange={(e) => handleChange(e)} label={"Last name"} />            
          </div>

          <div className={styles.inputInline}>
            <Input type="date"  name="dateOfBirth" value={dateOfBirth} onChange={(e) => handleChange(e)} label={"Date of Birth"} />
            <Input type="text" name="email"value={email} onChange={(e) => handleChange(e)} label={"Email Address"} />
            <Input type="text" name="pass" value={pass} onChange={(e) => handleChange(e)} label={"Password"} />            
          </div>
          <button type="submit" className={styles.create}>Create Account</button>
        </form>
        <button className={styles.notRegister}>
            I don't want to register
          </button>
        
      </Modal>
  );
}

export default CreateAccount;

/*
  <div className={styles.content}>
            <h1>Create Account</h1>
            <div>
            <input className={styles.firstName} placeholder="First Name"/>
            <input className={styles.lastName} placeholder="Last Name"/>
            </div>
            
            <input className={styles.bitrh} placeholder="Date of Birth"/>
            <input className={styles.email} placeholder="Email Address"/>
            <input className={styles.pass} placeholder="Password"/>
            <button className={styles.create}>Create Account</button>
            <button className={styles.notRegister}>I dont want to register</button>            
        </div>
*/
/*

<button onClick={closeModal}>close</button>

*/