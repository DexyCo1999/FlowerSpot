import styles from "../WelcomeBack/WelcomeBack.module.scss";
import Input from "../Input/Input";
import React, { useState , useEffect, FormEvent} from "react";
import Modal from "react-modal";
import Auth from "../../services/authService";
import LoginMessage from "../LoginMessage/LoginMessage";
import {validateEmail, validatePassword } from "../../uts/validation";
import {useDispatch} from "react-redux";
import { RootState } from "../../store/store";
import { AuthState } from "../../store/auth/types";
import { login as loginUser } from "../../store/auth/actions";



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
  
  const[showModalMessage, setShowModalMessage] = useState(false);
  const text = "Congratulations! You have successfully logged into FlowrSpot";

      // definisanje dispatch
  const dispatch = useDispatch(); 
  // Za hvatanje error message
  const [errors, setErrors] = useState({
    email: "",
    pass: ""
  });

  const [login, setLogin] = useState({
    email: "",
    pass: ""
  }) 

  const{email,pass}=login;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  setLogin({ ...login, [e.target.name]: e.target.value });
 
  
  const handleSubmit= (e:FormEvent)=>{
    e.preventDefault()
    // postavljanje error message
    const valEmail = validateEmail(email)
    const valPass = validatePassword(pass);
    if (valEmail.length > 0 || valPass.length>0) 
    {
      setErrors({email:valEmail, pass:valPass})
      return;
    };


    
    Auth.login(email,pass) 
    // dispecujem akciju 
    .then(function (response: any) {
      localStorage.setItem("auth_token", response.data.auth_token); 
      //onClose();
      setShowModalMessage(true);
      console.log(response);
      dispatch(loginUser({ username:email, pass}))
      
    })
    .catch(function (error) {
      console.log(error);
    });

  }
 const onModalClose = () => {
  setShowModalMessage(false)
  onClose();
}
// Dijalozi rade ok sad, ali problem je sto ne ostane logovan
  return !showModalMessage ?  (
      <Modal
        isOpen={show}
        onRequestClose={() => onClose()}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className={styles.title}>Welcome Back</h2>

        <form onSubmit={handleSubmit} className={styles.form}> 
          <div className={styles.inputInline}>
            <Input id="name" type="string" name="email" value={email} onChange={(e)=>handleChange(e)} label={"Email Address"} />
            <span className={styles.emailMessage}>{errors.email}</span>            
            <Input id="password" type="password" name="pass" value={pass} onChange={(e)=>handleChange(e)} label={"Password"} />
            <span className={styles.emailMessage}>{errors.pass}</span>  
          </div>
          <button type="submit" className={styles.btLogin}>Login to your Account</button>          
        </form>
        <button className={styles.notRegister}>I don't want to register</button>
      </Modal>
  ) : (    
     <LoginMessage 
    show = {showModalMessage}
    onClose = {()=>onModalClose()}
    text = {text}  
    />
  );
}

export default WelcomeBack;

