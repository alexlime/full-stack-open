import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  // Set up the screen before each test
  let container;
  const blog = {
    title: "testing blog component",
    author: "alex",
    url: "xyz.com",
    likes: "1",
    user: {
      name: "alex lime",
      username: "al",
    },
  };
  const user = { username: "al" };
  const mockHandler = jest.fn();
  beforeEach(() => {
    container = render(
      <Blog user={user} blog={blog} addLike={mockHandler} />
    ).container;
  });

  test("renders title and author only", () => {
    const element = screen.getByText("testing blog component alex");
    expect(element).toBeDefined();

    const hiddenContent = container.querySelector(".moreInfo");
    expect(hiddenContent).toHaveStyle("display: none");
    // screen.debug(hiddenContent)
  });

  test("Reveal additional blog content when show button is clicked", async () => {
    const hiddenContent = container.querySelector(".moreInfo");
    const button = screen.getByText("show");

    // before click additional content is hidden
    expect(hiddenContent).toHaveStyle("display: none");

    const action = userEvent.setup();
    await action.click(button);

    // after click additional content is shown
    expect(hiddenContent).not.toHaveStyle("display: none");
  });

  test("clicking the like button twice calls event handler twice", async () => {
    const action = userEvent.setup();
    const button = screen.getByText("like");

    await action.click(button);
    await action.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
    // screen.debug(button)
  });
});
