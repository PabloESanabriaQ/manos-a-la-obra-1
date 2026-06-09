import { describe, it, expect, vi, beforeEach } from "vitest";
import login from "./login";
import { apiFetch } from "../api/client";

vi.mock("../api/client");

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

describe("login", () => {
  it("returns user and stores in localStorage on success", async () => {
    const user = { _id: "1", username: "pablo", name: { first: "Pablo" } };
    apiFetch.mockResolvedValueOnce({}).mockResolvedValueOnce({ data: user });

    const result = await login("pablo", "secret");

    expect(result).toEqual({ success: true, user });
    expect(localStorage.getItem("user")).toBe(JSON.stringify(user));
  });

  it("returns error when login request fails", async () => {
    apiFetch.mockRejectedValueOnce(new Error("Invalid credentials"));

    const result = await login("pablo", "wrong");

    expect(result).toEqual({ success: false, error: "Invalid credentials" });
    expect(localStorage.getItem("user")).toBeNull();
  });

  it("returns error when /users/me request fails", async () => {
    apiFetch.mockResolvedValueOnce({}).mockRejectedValueOnce(new Error("Unauthorized"));

    const result = await login("pablo", "secret");

    expect(result).toEqual({ success: false, error: "Unauthorized" });
  });
});
