import React, { useContext, useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";

import Button from "../button/button.component";
import { UserContext } from "../../contexts/user.context";

const defaultFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [fields, setFields] = useState(defaultFields);
  const { displayName, email, password, confirmPassword } = fields;

  const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFields(defaultFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      setCurrentUser(user);

      await createUserDocFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          alert("Email is already in use");
          break;
        case "auth/invalid-email":
          alert("Invalid email: ", email);
          break;
        default:
          console.error("Error creating user", error);
          break;
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  return (
    <div className="sign-up-form-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          id="displayName"
          name="displayName"
          required
          onChange={handleChange}
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          id="email"
          name="email"
          required
          onChange={handleChange}
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          id="password"
          name="password"
          required
          onChange={handleChange}
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          onChange={handleChange}
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
