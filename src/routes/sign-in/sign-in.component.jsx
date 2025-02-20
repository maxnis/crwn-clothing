import {
  signInWithGooglePopup, createUserDocFromAuth
} from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
  const logGoogleUserPopup = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromAuth(user);
    console.log('userDocRef:', userDocRef);
  }

  return (
    <div>
      <h1>Sign-In Page</h1>
      <button onClick={logGoogleUserPopup}>Sign in with Google Popup</button>
      <SignUpForm />
    </div>
  );
}

export default SignIn;