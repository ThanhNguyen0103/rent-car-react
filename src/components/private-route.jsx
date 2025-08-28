import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "./auth";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useUserContext();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default PrivateRoute;
