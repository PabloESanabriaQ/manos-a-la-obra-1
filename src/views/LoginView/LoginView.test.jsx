import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import LoginView from "./index";
import login from "../../services/login";

vi.mock("../../services/login");

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

const renderLoginView = (setUser = vi.fn()) =>
  render(
    <MemoryRouter>
      <LoginView setUser={setUser} />
    </MemoryRouter>
  );

beforeEach(() => {
  vi.clearAllMocks();
});

describe("LoginView", () => {
  it("renders username input, password input and submit button", () => {
    renderLoginView();

    expect(screen.getByPlaceholderText("login.usernamePlaceholder")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("************")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "login.submit" })).toBeInTheDocument();
  });

  it("shows error when submitting empty form", async () => {
    const user = userEvent.setup();
    renderLoginView();

    await user.click(screen.getByRole("button", { name: "login.submit" }));

    expect(screen.getByText("login.errorEmpty")).toBeInTheDocument();
  });

  it("calls setUser and navigates on successful login", async () => {
    const mockUser = { _id: "1", username: "pablo" };
    login.mockResolvedValueOnce({ success: true, user: mockUser });
    const setUser = vi.fn();
    const user = userEvent.setup();
    renderLoginView(setUser);

    await user.type(screen.getByPlaceholderText("login.usernamePlaceholder"), "pablo");
    await user.type(screen.getByPlaceholderText("************"), "secret");
    await user.click(screen.getByRole("button", { name: "login.submit" }));

    await waitFor(() => expect(setUser).toHaveBeenCalledWith(mockUser));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("shows error message on failed login", async () => {
    login.mockResolvedValueOnce({ success: false, error: "Invalid credentials" });
    const user = userEvent.setup();
    renderLoginView();

    await user.type(screen.getByPlaceholderText("login.usernamePlaceholder"), "pablo");
    await user.type(screen.getByPlaceholderText("************"), "wrong");
    await user.click(screen.getByRole("button", { name: "login.submit" }));

    await waitFor(() => expect(screen.getByText("Invalid credentials")).toBeInTheDocument());
  });
});
