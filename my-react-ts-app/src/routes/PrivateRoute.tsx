import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthInitialState } from "../state/features/auth/AuthSlice";

const PrivateRoute = ({ element: Component }) => {
  const isAuthenticated = useSelector((state: AuthInitialState) => state.isAuthenticated);
  return isAuthenticated ? Component : <Navigate to="/profile" />;
};

export default PrivateRoute;