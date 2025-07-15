import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ChatroomPage from "./pages/ChatroomPage";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";

const App = () => {
  const isVerified = useSelector((state) => state.auth.isVerified);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={isVerified ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/chatroom/:id"
            element={isVerified ? <ChatroomPage /> : <Navigate to="/" />}
          />
        </Routes>
        <ToastContainer position="top-center" />
      </div>
    </Router>
  );
};

export default App;
