import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./index";

vi.mock("../../context/UserContext", () => ({
  useUser: vi.fn(),
}));

import { useUser } from "../../context/UserContext";

const mockUseUser = (role) =>
  vi.mocked(useUser).mockReturnValue({
    role,
    homeRoute: () => (role === "admin_users" ? "/admin/users" : "/my-projects"),
  });

const renderRoute = (allowedRoles, role) => {
  mockUseUser(role);
  return render(
    <MemoryRouter initialEntries={["/protected"]}>
      <Routes>
        <Route
          path="/protected"
          element={
            <ProtectedRoute allowedRoles={allowedRoles}>
              <div>Protected Content</div>
            </ProtectedRoute>
          }
        />
        <Route path="/my-projects" element={<div>My Projects</div>} />
        <Route path="/admin/users" element={<div>Admin Users</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe("ProtectedRoute", () => {
  it("renders children when role is in allowedRoles", () => {
    renderRoute(["admin_projects", "member"], "member");

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("redirects to /my-projects when role is not in allowedRoles", () => {
    renderRoute(["admin_users"], "member");

    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
    expect(screen.getByText("My Projects")).toBeInTheDocument();
  });

  it("redirects to /admin/users when admin_users tries to access project route", () => {
    renderRoute(["admin_projects", "member"], "admin_users");

    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
    expect(screen.getByText("Admin Users")).toBeInTheDocument();
  });

  it("renders children when allowedRoles is not provided", () => {
    renderRoute(undefined, "member");

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});
