import { describe, it, expect, vi, beforeEach } from "vitest";
import changePassword from "./changePassword";
import { apiFetch } from "../api/client";

vi.mock("../api/client");

beforeEach(() => vi.clearAllMocks());

describe("changePassword", () => {
  it("returns success when request succeeds", async () => {
    apiFetch.mockResolvedValueOnce({ message: "Password updated" });

    const result = await changePassword("old123", "new456");

    expect(result).toEqual({ success: true });
    expect(apiFetch).toHaveBeenCalledWith("/users/me/password", {
      method: "PATCH",
      body: JSON.stringify({ currentPassword: "old123", newPassword: "new456" }),
    });
  });

  it("returns error when request fails", async () => {
    apiFetch.mockRejectedValueOnce(new Error("Current password is incorrect"));

    const result = await changePassword("wrong", "new456");

    expect(result).toEqual({ success: false, error: "Current password is incorrect" });
  });
});
