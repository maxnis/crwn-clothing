import { signInWithGoogle, createUserDocFromAuth } from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGoogle();
      const userDocRef = await createUserDocFromAuth(user);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  }

  return (
    <div>
      <h1>Sign-In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google</button>
    </div>
  );
}

export default SignIn;