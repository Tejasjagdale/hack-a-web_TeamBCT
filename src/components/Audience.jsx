import { Avatar, AvatarGroup, Flex, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase-config";
import firebase from "firebase/compat/app";

const Audience = ({ usersArr }) => {
  const [userDetails, setUserDetails] = useState([]);

  useEffect(async () => {
    const snapshot = await firebase.firestore().collection("Users").get();
    if (!snapshot.empty) {
      snapshot.forEach((ele) => {
        if (usersArr.includes(ele.id.toString())) {
          setUserDetails((prevState) => [...prevState, ele.data()]);
        } else {
          console.log("Nope");
        }
      });
    }
  }, []);

  useEffect(() => console.log(userDetails), [userDetails]);

  return (
    <div>
      <Wrap spacing="50px">
        {userDetails.map((user) => {
          console.log(user.fname, user.photo);
          return (
            <WrapItem>
              <Avatar
                size="lg"
                name={user.fname + " " + user.lname}
                src={user.photo}
              />
            </WrapItem>
          );
        })}
      </Wrap>
    </div>
  );
};

export default Audience;
