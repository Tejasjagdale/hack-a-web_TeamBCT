import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";

const AuthContext = createContext({
  currentUser: null,
  register: () => Promise,
  login: () => Promise,
  signInWithGoogle: () => Promise,
  logout: () => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email, {
      url: "https://localhost:3000/",
    });
  }

  function resetPassword(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword);
  }

  function logout() {
    return signOut(auth);
  }

  const value = {
    currentUser,
    register,
    login,
    signInWithGoogle,
    logout,
    forgotPassword,
    resetPassword,
  };

  if (pending) {
    return <>Loading</>;
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthState = () => {
  const { currentUser } = useAuth();
  return { ...auth, isAuthenticated: currentUser != null };
};
