// npm modules
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// page components
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Landing from "./pages/Landing/Landing";
import Profiles from "./pages/Profiles/Profiles";
import ChangePassword from "./pages/ChangePassword/ChangePassword";

// components
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// services
import * as authService from "./services/authService";
import * as postService from "./services/postService";

// stylesheets
import "./App.css";

// types
import { User, Posts } from "./types/models";
import Post from "./pages/Post/Post";

function App(): JSX.Element {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(authService.getUser());

  const [posts, setPosts] = useState<Posts[]>([]);

  const handleLogout = (): void => {
    authService.logout();
    setUser(null);
    navigate("/");
  };

  const handleAuthEvt = (): void => {
    setUser(authService.getUser());
  };

  useEffect((): void => {
    const fetchPosts = async (): Promise<void> => {
      try {
        const postData: Post[] = await postService.getAllPosts();
        setPosts(postData);
      } catch (error) {
        console.log(error);
      }
    };
    user ? fetchPosts() : setPosts([]);
  }, [user]);

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts"
          element={
            <ProtectedRoute user={user}>
              <Post posts={posts} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
