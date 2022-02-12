import "./App.css";
import Layout from "./components/Layout";
import AuctionRoom from "./pages/AuctionRoom";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./auth/PrivateRoute";
import AuthContextProvider, { useAuth } from "./context/AuthContext";
import UserSignin from "./pages/UserSignin";
import Events from "./pages/Events";
import Items from "./pages/Items";
import { createContext, useEffect, useState } from "react";
export const loginContext = createContext({});

function App() {
  const { currentUser } = useAuth();
  const [loginDetails, setloginDetails] = useState(null);
  useEffect(() => {
    console.log(loginContext);
  }, [loginDetails]);

  return (
    <>
      <loginContext.Provider value={[loginDetails, setloginDetails]}>
        <AuthContextProvider>
            <Layout>
              <Routes>
                <Route exact path="/" element={<UserSignin />} />
                <Route exact path="/auction" element={<PrivateRoute />}>
                  <Route exact path="/auction" element={<AuctionRoom />} />
                </Route>
                <Route exact path="/events" element={<PrivateRoute />}>
                  <Route exact path="/events" element={<Events />} />
                </Route>
                <Route exact path="/items" element={<PrivateRoute />}>
                  <Route exact path="/items" element={<Items />} />
                </Route>
              </Routes>
            </Layout>
        </AuthContextProvider>
      </loginContext.Provider>
    </>
  );
}

export default App;
