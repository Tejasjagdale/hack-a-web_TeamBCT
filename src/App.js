import "./App.css";
import Layout from "./components/Layout";
import AuctionRoom from "./pages/AuctionRoom";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./auth/PrivateRoute";
import AuthContextProvider, { useAuth } from "./context/AuthContext";
import UserSignin from "./pages/UserSignin";
import Events from "./pages/Events";
import Items from "./pages/Items";
import { useEffect } from "react";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Layout>
          <Routes>
            <Route element={<Layout />} />
            <Route exact path="/" element={<UserSignin />} />
            <Route element={<PrivateRoute />}>
              <Route exact path="/auction" element={<AuctionRoom />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route exact path="/events" element={<Events />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route exact path="/items" element={<Items />} />
            </Route>
          </Routes>
        </Layout>
      </AuthContextProvider>
    </>
  );
}

export default App;
