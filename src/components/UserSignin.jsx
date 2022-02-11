import React from "react";
import { db } from "../utils/firebase-config";
import {  useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SignInCard from "SignInCard";

const CouncSignin = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const signIn = () => {
    const counsellorCollection = db.collection("counsellors");
    signInWithGoogle()
      .then((user) => {
        counsellorCollection.doc(user.user.uid.toString()).set(
          {
			fname:user.user.displayName.split(" ")[0],
			lname:user.user.displayName.split(" ")[1],
			email:user.user.email,
            isVerified: false,
            bio: "This is the bio",
            qualifications: ["MA", "PhD"],
          },
          { merge: true }
        );
        
        navigate("/counsellor/verify");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <SignInCard signIn={signIn} />
    </>
  );
};

export default CouncSignin;