import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useAllProjects from "./getAllProjects";
import { apiFetch } from "../api/client";

vi.mock("../api/client");

beforeEach(() => vi.clearAllMocks());

describe("useAllProjects", () => {
  it("starts with loading true and no data", () => {
    apiFetch.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useAllProjects());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("sets data and stops loading on success", async () => {
    const projects = [{ _id: "1", name: "Proyecto A" }];
    apiFetch.mockResolvedValueOnce({ data: projects });

    const { result } = renderHook(() => useAllProjects());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(projects);
    expect(result.current.error).toBeNull();
  });

  it("sets error and stops loading on failure", async () => {
    apiFetch.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useAllProjects());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("Network error");
  });
});
