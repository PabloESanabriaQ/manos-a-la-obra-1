import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import PropTypes from "prop-types";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { role, homeRoute } = useUser();

  if (!allowedRoles || allowedRoles.includes(role)) return children;

  return <Navigate to={homeRoute()} replace />;
}

ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired,
};
