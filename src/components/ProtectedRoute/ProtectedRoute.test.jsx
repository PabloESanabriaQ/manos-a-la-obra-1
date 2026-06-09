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
    homeRoute: () => "/home",
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
        <Route path="/home" element={<div>Home</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe("ProtectedRoute", () => {
  it("renders children when role is in allowedRoles", () => {
    renderRoute(["admin_projects", "member"], "member");

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("redirects to /home when role is not in allowedRoles", () => {
    renderRoute(["admin_users"], "member");

    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("redirects to /home when admin_users tries to access project route", () => {
    renderRoute(["admin_projects", "member"], "admin_users");

    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("renders children when allowedRoles is not provided", () => {
    renderRoute(undefined, "member");

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});
