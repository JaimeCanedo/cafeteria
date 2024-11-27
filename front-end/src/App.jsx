import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import LayoutAuth from "./layouts/LayoutAuth";
import LayoutAdmin from "./layouts/LayoutAdmin";
// Pages auth
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import ForgetPassword from "./pages/auth/ForgotPassword.jsx";
// Pages admin
import Home from "./pages/admin/Home";
// import Profile from "./pages/admin/Profile";
// import Chat from "./pages/admin/Chat";
// import Error404 from "./pages/Error404";
// import Tickets from "./pages/admin/Tickets";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/olvide-password" element={<ForgetPassword />} />
        <Route path="/" element={<LayoutAdmin />}>
          <Route index element={<Home />}/>
          {/* <Route path="profile" element={<Profile />} />
          <Route path="chat" element={<Chat />} />
          <Route path="tickets" element={<Tickets />} /> */}
          </Route>
          {/* <Route path="*" element={<Error404 />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;