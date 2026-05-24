import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PaginationComponent from "./index";

describe("PaginationComponent", () => {
  it("renders current page and total", () => {
    render(<PaginationComponent page={2} totalPages={5} onPageChange={vi.fn()} />);

    expect(screen.getByText("2 / 5")).toBeInTheDocument();
  });

  it("disables previous button on first page", () => {
    render(<PaginationComponent page={1} totalPages={3} onPageChange={vi.fn()} />);

    expect(screen.getByText("←")).toBeDisabled();
    expect(screen.getByText("→")).not.toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(<PaginationComponent page={3} totalPages={3} onPageChange={vi.fn()} />);

    expect(screen.getByText("→")).toBeDisabled();
    expect(screen.getByText("←")).not.toBeDisabled();
  });

  it("calls onPageChange with previous page when clicking ←", async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();
    render(<PaginationComponent page={3} totalPages={5} onPageChange={onPageChange} />);

    await user.click(screen.getByText("←"));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange with next page when clicking →", async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();
    render(<PaginationComponent page={3} totalPages={5} onPageChange={onPageChange} />);

    await user.click(screen.getByText("→"));

    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});
