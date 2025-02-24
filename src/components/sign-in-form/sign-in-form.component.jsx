import React, { useState } from 'react';

import {
  signInWithGooglePopup,
  //createUserDocFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss'
//import { UserContext } from '../../contexts/user.context';

import Button from '../button/button.component';


const defaultFields = {
  email: '',
  password: '',
}

const SignInForm = () => {

  const [fields, setFields] = useState(defaultFields);
  const { email, password } = fields;

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const resetFormFields = () => {
    setFields(defaultFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    }
    catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("Email not found: " + email);
          break;
        case "auth/invalid-credential":
          alert("Invalid credentials: " + email);
          break;
        case "auth/wrong-password":
          alert("Invalid password for email: " + email);
          break;
        case "auth/invalid-email":
          alert("Invalid email: " + email);
          break;
        default:
          console.error("Error signing in", error);
          break;
      }
    }
    
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  }

  return (
    <div className="sign-in-form-container">
      <h2>Already have an account?</h2>
      <span>Sign in with email and password</span>
      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;