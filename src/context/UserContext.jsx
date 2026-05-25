import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const PERMISSIONS = {
  admin_projects: new Set([
    "project:read",
    "project:edit",
    "project:delete",
    "epic:read",
    "epic:create",
    "epic:edit",
    "epic:delete",
    "story:read",
    "story:create",
    "story:edit",
    "story:delete",
    "task:read",
    "task:create",
    "task:edit",
    "task:delete",
  ]),
  member: new Set([
    "project:read",
    "epic:read",
    "epic:edit",
    "story:read",
    "story:create",
    "story:edit",
    "story:delete",
    "task:read",
    "task:create",
    "task:edit",
    "task:delete",
  ]),
  admin_users: new Set([
    "user:read",
    "user:create",
    "user:edit",
    "user:deactivate",
    "project:members",
  ]),
};

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const role = user?.role ?? null;

  const canDo = (permission) => PERMISSIONS[role]?.has(permission) ?? false;

  const isAdminUsers = () => role === "admin_users";
  const isAdminProjects = () => role === "admin_projects";
  const isMember = () => role === "member";

  const homeRoute = () => (isAdminUsers() ? "/admin/users" : "/my-projects");

  return (
    <UserContext.Provider
      value={{ user, setUser, role, canDo, isAdminUsers, isAdminProjects, isMember, homeRoute }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUser = () => useContext(UserContext);
