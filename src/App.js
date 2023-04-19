import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./components/pages/register/Register";
import Login from "./components/pages/login/Login";
import Settings from "./components/pages/settings/Settings";
import Write from "./components/pages/write/Write";
import Home from "./components/pages/home/Home";
import Single from "./components/pages/single/Single";
import TopBar from "./components/topbar/TopBar";
import { useContext } from "react";
import { context } from "./context/Context";

function App() {
  const { user } = useContext(context);
  return (
    <>
      <TopBar />
      {/* <Single /> */}
      {/* <Write /> */}
      {/* <Settings /> */}
      {/* <Login /> */}
      {/* <Register /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/write" element={user ? <Write /> : <Register />} />
        <Route path="/post/:id" element={<Single />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;
