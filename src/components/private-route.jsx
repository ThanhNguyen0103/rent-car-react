import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "./auth";

const PrivateRoute = ({ children, role }) => {
  const location = useLocation();
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (role && !user.role.name.includes(role)) {
    return <Navigate to="/forbidden" />;
  }
  return children;
};

export default PrivateRoute;
