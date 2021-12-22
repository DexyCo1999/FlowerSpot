import React, { FormEvent, useState } from "react";
import styles from "./CreateAccount.module.scss";
import Modal from "react-modal";
import Input from "../Input/Input";
import Auth from "../../services/authService";
import LoginMessage from "../LoginMessage/LoginMessage";
import {
  validateEmail,
  validatePassword,
  validateName,
  validateDate,
} from "../../uts/validation";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/auth/actions";

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

function CreateAccount({ show, onClose }: propTypes) {
  const [showModalMessage, setShowModalMessage] = useState(false);
  const text = "Congratulations! You have successfully sign up into FlowrSpot";

  const dispatch = useDispatch();

  // Za hvatanje error message
  const [errors, setErrors] = useState({
    email: "",
    pass: "",
    firstName: "",
    lastName: "",
    dateOfBirthError: "",
  });

  // Za prikazivanje podataka
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    pass: "",
  });

  const { firstName, lastName, dateOfBirth, email, pass } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Postavljanje error message
    const valEmail = validateEmail(email);
    const valPass = validatePassword(pass);
    const valFirstName = validateName(firstName);
    const valLastName = validateName(lastName);
    const valDate = validateDate(dateOfBirth);

    if (
      valEmail.length > 0 ||
      valPass.length > 0 ||
      valFirstName.length > 0 ||
      valLastName.length > 0 ||
      valDate.length > 0
    ) {
      setErrors({
        email: valEmail,
        pass: valPass,
        firstName: valFirstName,
        lastName: valLastName,
        dateOfBirthError: valDate,
      });
      return;
    }
    Auth.signIn(email, pass, firstName, lastName, dateOfBirth)
      .then(function (response: any) {
        localStorage.setItem("auth_token", response.data.auth_token);
        setShowModalMessage(true);
        console.log(response);
        dispatch(
          signIn({
            email,
            pass,
            firstName,
            lastName,
            dateOfBirth,
          })
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onModalClose = () => {
    setShowModalMessage(false);
    onClose();
  };

  return !showModalMessage ? (
    <Modal
      isOpen={show}
      onRequestClose={() => onClose()}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h2 className={styles.title}>Create an Account</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.name}>
          <Input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => handleChange(e)}
            label={"First name"}
          />
          <Input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => handleChange(e)}
            label={"Last name"}
          />
        </div>
        <span className={styles.errorMessage}>
          {errors.firstName || errors.lastName}
        </span>
        <div className={styles.inputInline}>
          <Input
            type="date"
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => handleChange(e)}
            label={"Date of Birth"}
          />
          <span className={styles.errorMessage}>{errors.dateOfBirthError}</span>
          <Input
            type="text"
            name="email"
            value={email}
            onChange={(e) => handleChange(e)}
            label={"Email Address"}
          />
          <span className={styles.errorMessage}>{errors.email}</span>
          <Input
            type="password"
            name="pass"
            value={pass}
            onChange={(e) => handleChange(e)}
            label={"Password"}
          />
          <span className={styles.errorMessage}>{errors.pass}</span>
        </div>
        <button type="submit" className={styles.create}>
          Create Account
        </button>
      </form>
      <button className={styles.notRegister}>I don't want to register</button>
    </Modal>
  ) : (
    <LoginMessage
      show={showModalMessage}
      onClose={() => onModalClose()}
      text={text}
    />
  );
}

export default CreateAccount;
