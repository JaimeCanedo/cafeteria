import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import LayoutAuth from "./layouts/LayoutAuth";
import LayoutHome from "./layouts/LayoutHome.jsx";
import LayoutAdmin from "./layouts/LayoutAdmin.jsx";
// Pages auth
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import ForgetPassword from "./pages/auth/ForgotPassword.jsx";
// Pages admin
import Home from "./pages/admin/Home";
import Admin from "./pages/admin/Admin.jsx";
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

        <Route path="/admin" element={<LayoutAdmin/>}>
        <Route index element={<Admin />}/>
        </Route>
        <Route path="/" element={<LayoutHome />}>
          <Route index element={<Home />}/>
          {/* <Route path="profile" element={<Profile />} />
          <Route path="chat" element={<Chat />} />
          <Route path="tickets" element={<Tickets />} /> */}
          </Route>s
          {/* <Route path="*" element={<Error404 />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;