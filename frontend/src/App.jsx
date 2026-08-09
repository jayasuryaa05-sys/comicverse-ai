import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import UploadComic from "./pages/UploadComic";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import ComicDetails from "./pages/ComicDetails";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      {/* Routes with Navbar and Footer */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="explore" element={<Explore />} />
        <Route path="profile" element={<Profile />} />
        <Route path="comic/:id" element={<ComicDetails />} />
        <Route path="upload" element={<UploadComic />} />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;