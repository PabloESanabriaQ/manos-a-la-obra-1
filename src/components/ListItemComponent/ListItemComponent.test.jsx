import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ListItemComponent from "./index";

const ITEM = { _id: "abc123", name: "Mi épica", icon: "🚀", description: "Una descripción" };

const renderItem = (props = {}) =>
  render(
    <MemoryRouter>
      <ul>
        <ListItemComponent item={ITEM} path="epic" {...props} />
      </ul>
    </MemoryRouter>
  );

describe("ListItemComponent", () => {
  it("renders the item name and icon", () => {
    renderItem();

    expect(screen.getByText("Mi épica")).toBeInTheDocument();
    expect(screen.getByText("🚀")).toBeInTheDocument();
  });

  it("link points to the correct path", () => {
    renderItem();

    expect(screen.getByRole("link")).toHaveAttribute("href", "/epic/abc123");
  });

  it("description is hidden by default", () => {
    renderItem();

    const desc = screen.getByText("Una descripción");
    expect(desc).toHaveClass(/hidden/);
  });

  it("description becomes visible on hover", async () => {
    const user = userEvent.setup();
    renderItem();

    await user.hover(screen.getByRole("listitem"));

    const desc = screen.getByText("Una descripción");
    expect(desc).not.toHaveClass(/hidden/);
  });

  it("action buttons are not rendered when not hovered", () => {
    renderItem({ onEdit: vi.fn(), onDelete: vi.fn() });

    expect(screen.queryByTitle("crud.edit")).not.toBeInTheDocument();
    expect(screen.queryByTitle("crud.delete")).not.toBeInTheDocument();
  });

  it("shows edit and delete buttons on hover when both callbacks provided", async () => {
    const user = userEvent.setup();
    renderItem({ onEdit: vi.fn(), onDelete: vi.fn() });

    await user.hover(screen.getByRole("listitem"));

    expect(screen.getByTitle("crud.edit")).toBeInTheDocument();
    expect(screen.getByTitle("crud.delete")).toBeInTheDocument();
  });

  it("only shows edit button when only onEdit is provided", async () => {
    const user = userEvent.setup();
    renderItem({ onEdit: vi.fn() });

    await user.hover(screen.getByRole("listitem"));

    expect(screen.getByTitle("crud.edit")).toBeInTheDocument();
    expect(screen.queryByTitle("crud.delete")).not.toBeInTheDocument();
  });

  it("only shows delete button when only onDelete is provided", async () => {
    const user = userEvent.setup();
    renderItem({ onDelete: vi.fn() });

    await user.hover(screen.getByRole("listitem"));

    expect(screen.queryByTitle("crud.edit")).not.toBeInTheDocument();
    expect(screen.getByTitle("crud.delete")).toBeInTheDocument();
  });

  it("calls onEdit with the full item on click", () => {
    const onEdit = vi.fn();
    renderItem({ onEdit });

    fireEvent.mouseEnter(screen.getByRole("listitem"));
    fireEvent.click(screen.getByTitle("crud.edit"));

    expect(onEdit).toHaveBeenCalledWith(ITEM);
  });

  it("calls onDelete with id and name on click", () => {
    const onDelete = vi.fn();
    renderItem({ onDelete });

    fireEvent.mouseEnter(screen.getByRole("listitem"));
    fireEvent.click(screen.getByTitle("crud.delete"));

    expect(onDelete).toHaveBeenCalledWith(ITEM._id, ITEM.name);
  });

  it("hides action buttons when mouse leaves", async () => {
    const user = userEvent.setup();
    renderItem({ onEdit: vi.fn() });

    await user.hover(screen.getByRole("listitem"));
    expect(screen.getByTitle("crud.edit")).toBeInTheDocument();

    await user.unhover(screen.getByRole("listitem"));
    expect(screen.queryByTitle("crud.edit")).not.toBeInTheDocument();
  });
});
