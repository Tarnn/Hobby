import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

const PrivateRoute = ({ element: Component }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return isAuthenticated ? Component : <Navigate to="/" />;
};

export default PrivateRoute;
