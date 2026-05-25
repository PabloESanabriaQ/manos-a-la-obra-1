import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AdminUsersView from "./index";
import getUsers from "../../services/getUsers";
import createUser from "../../services/createUser";

vi.mock("../../context/UserContext", () => ({
  useUser: () => ({
    role: "admin_users",
    canDo: () => true,
    isAdminUsers: () => true,
  }),
}));

vi.mock("../../services/getUsers");
vi.mock("../../services/createUser");
vi.mock("../../services/updateUser", () => ({ default: vi.fn() }));
vi.mock("../../services/deactivateUser", () => ({ default: vi.fn() }));
vi.mock("../../services/updateProjectMembers", () => ({ default: vi.fn() }));
vi.mock("../../services/getAllProjects", () => ({
  default: () => ({ data: [], loading: false, error: null }),
}));

const USERS = [
  { _id: "1", username: "admin", email: "admin@test.com", role: "admin_users", active: true },
  { _id: "2", username: "pablo", email: "pablo@test.com", role: "member", active: true },
];

const renderView = () =>
  render(
    <MemoryRouter>
      <AdminUsersView />
    </MemoryRouter>
  );

beforeEach(() => {
  vi.clearAllMocks();
  getUsers.mockResolvedValue({ data: USERS });
});

describe("AdminUsersView", () => {
  it("renders title and both tabs", async () => {
    renderView();

    expect(screen.getByText("admin.title")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "admin.usersTab" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "admin.projectsTab" })).toBeInTheDocument();
  });

  it("fetches and displays the user list on load", async () => {
    renderView();

    await waitFor(() => expect(screen.getByText("admin")).toBeInTheDocument());
    expect(screen.getByText("pablo")).toBeInTheDocument();
    expect(getUsers).toHaveBeenCalledOnce();
  });

  it("shows the create user form when clicking the create button", async () => {
    const user = userEvent.setup();
    renderView();

    await waitFor(() => screen.getByText("admin"));
    await user.click(screen.getByRole("button", { name: /admin\.createUser/ }));

    expect(screen.getByPlaceholderText("admin.username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("admin.email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("admin.password")).toBeInTheDocument();
  });

  it("calls createUser and shows success toast on form submit", async () => {
    createUser.mockResolvedValueOnce({});
    getUsers.mockResolvedValue({ data: USERS });
    const user = userEvent.setup();
    renderView();

    await waitFor(() => screen.getByText("admin"));
    await user.click(screen.getByRole("button", { name: /admin\.createUser/ }));

    await user.type(screen.getByPlaceholderText("admin.username"), "newuser");
    await user.type(screen.getByPlaceholderText("admin.email"), "new@test.com");
    await user.type(screen.getByPlaceholderText("admin.password"), "pass123");
    await user.click(screen.getByRole("button", { name: "admin.save" }));

    await waitFor(() => expect(createUser).toHaveBeenCalledOnce());
    await waitFor(() => expect(screen.getByText("admin.userCreated")).toBeInTheDocument());
  });

  it("shows error toast when fetching users fails", async () => {
    getUsers.mockRejectedValueOnce(new Error("Network error"));
    renderView();

    await waitFor(() => expect(screen.getByText("Network error")).toBeInTheDocument());
  });

  it("switches to the projects tab on click", async () => {
    const user = userEvent.setup();
    renderView();

    await user.click(screen.getByRole("button", { name: "admin.projectsTab" }));

    expect(screen.getByText("admin.selectProject")).toBeInTheDocument();
  });
});
