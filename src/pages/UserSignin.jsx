import React, { useContext } from "react";
import { db } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SignInCard from "../components/SignInCard";
import Header from "../components/Header";
import { loginContext } from "../App";

const UserSignin = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const signIn = () => {
    const UserCollection = db.collection("Users");
    signInWithGoogle()
      .then((user) => {
        UserCollection.doc(user.user.uid.toString()).set(
          {
            fname: user.user.displayName.split(" ")[0],
            lname: user.user.displayName.split(" ")[1],
            email: user.user.email,
            isVerified: false,
          },
          { merge: true }
        );
        navigate("/events");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Header />
      <SignInCard signIn={signIn} />
    </>
  );
};

export default UserSignin;
