import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase-config";
import { useAuth } from "../context/AuthContext";
import { Avatar, Button, Container, Wrap, WrapItem } from "@chakra-ui/react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { GrSend } from "react-icons/gr";
// import { FaUserCircle } from "react-icons/fa";
import { doc, setDoc } from "firebase/firestore";
// import { collection, onSnapshot, query, where } from "@firebase/firestore";
import "./Chat.css";

const Chat = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const ref = db.collection("messages");
  const [chat, setchat] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [rid, setrid] = useState("");
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("id");
  const session_type = searchParams.get("type");
  const ref1 = db.collection(session_type === "free" ? "sessions" : "paid");

  const [data, setData] = useState({
    sender: "",
    receiver: "",
    msg: "",
    time: "",
    session: "",
    timeindex: "",
  });

  function getchats() {
    ref.orderBy("timeindex").onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        if (currentUser) {
          if (doc.data().session === session_id) {
            let temp = doc.data();
            temp["id"] = doc.id;
            items.push(temp);
          }
        }
      });
      setchat(items);
      var objDiv = document.querySelector(`.mainchat`);
      if (objDiv) {
        objDiv.scrollTop = objDiv.scrollHeight;
      }
    });
  }

  function Deletechat(e) {
    e.preventDefault();
    let id = e.currentTarget.parentElement.parentElement.parentElement.id;
    ref.doc(id).delete();
  }

  const send = async (e) => {
    e.preventDefault();

    var d = new Date();

    data.time = d.toLocaleString();
    data.sender = currentUser.email;
    data.session = session_id;
    data.receiver = rid;
    const d1 = new Date();
    data.timeindex = d1.getTime();

    await ref.add(data);
    setData({
      sender: currentUser.email,
      receiver: rid,
      msg: "",
      time: "",
      session: session_id,
      timeindex: "",
    });
  };

  useEffect(() => {
    getchats();
    ref1.onSnapshot((query) => {
      query.forEach((doc) => {
        if (doc.id === session_id) {
          if (currentUser) {
            if (doc.data() && !doc.data().endtime) {
              if (
                doc.data().uid === currentUser.email ||
                doc.data().uid === currentUser.uid
              ) {
                setReceiver(doc.data().cname);
                setrid(doc.data().cid);
              } else {
                setReceiver(doc.data().uname);
                setrid(doc.data().uid);
              }
            } else {
              navigate("/");
            }
          }
        }
      });
    });
  }, [currentUser]);

  const endsession = async (e) => {
    e.preventDefault();
    var d = new Date();
    const sessionRef = doc(
      db,
      session_type === "free" ? "sessions" : "paid",
      session_id
    );
    setDoc(sessionRef, { endtime: d.toLocaleString() }, { merge: true });
    chat.forEach((value) => {
      ref.doc(value.id).delete();
    });
    navigate("/");
  };

  return (
    <>
      <div className="center">
        <Container
          style={{
            boxShadow: "0 5px 20px rgb(0 0 0 / 0.2)",
            padding: 0,
            width: "500px",
          }}
        >
          <div className="header">
            <Wrap className="profile">
              <WrapItem>
                <Avatar name={receiver} />
              </WrapItem>
            </Wrap>
            {receiver}
            <Button colorScheme="red" onClick={endsession}>
              End Session
            </Button>
          </div>
          <div className="mainchat">
            {chat.map((data) => {
              if (currentUser) {
                if (data.sender === currentUser.email) {
                  return (
                    <div className="chat_wrapper" key={data.id}>
                      <div id={data.id} className="your_msg">
                        <div className="y_details">
                          <b className="yname">you</b>
                          <p className="ymsg">{data.msg}</p>
                          <div className="ytime">
                            <p>{data.time}</p>
                            <button
                              color="red"
                              style={{ fontSize: "15px", color: "red" }}
                              onClick={Deletechat}
                            >
                              <AiFillDelete />
                            </button>
                          </div>
                        </div>
                        <Wrap className="profile">
                          <WrapItem>
                            <Avatar name={currentUser.displayName} />
                          </WrapItem>
                        </Wrap>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="chat_wrapper" key={data.id}>
                      <div id={data.id} className="rec_msg">
                        <Wrap className="profile">
                          <WrapItem>
                            <Avatar name={receiver} />
                          </WrapItem>
                        </Wrap>
                        <div className="r_details">
                          <b className="rname">{receiver}</b>
                          <p className="rmsg">{data.msg}</p>
                          <div className="ytime">
                            <p>{data.time}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              }
            })}
          </div>
          <div className="footer">
            <input
              type="text"
              name="msg"
              id="type_feild"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  send(e);
                }
              }}
              placeholder="Type message here..."
              value={data.msg}
              onChange={(e) => {
                setData({ ...data, msg: e.currentTarget.value });
              }}
            />
            <Button
              colorScheme="green"
              variant="solid"
              leftIcon={<GrSend color="white" />}
              onClick={send}
            >
              send
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Chat;
