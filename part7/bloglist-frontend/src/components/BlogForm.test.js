import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("<Blogform /> calls event handler with right details", async () => {
  const mockHandler = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm submitBlog={mockHandler} />);

  const inputTitle = screen.getByPlaceholderText("write blog title here");
  const inputAuthor = screen.getByPlaceholderText("write blog author here");
  const inputUrl = screen.getByPlaceholderText("write blog url here");
  const createButton = screen.getByText("create");

  await user.type(inputTitle, "testing a blog form");
  await user.type(inputAuthor, "alex");
  await user.type(inputUrl, "abc.com");
  await user.click(createButton);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0].title).toBe("testing a blog form");
  expect(mockHandler.mock.calls[0][0].author).toBe("alex");
  expect(mockHandler.mock.calls[0][0].url).toBe("abc.com");

  /* Debuging stuff */
  // console.log(mockHandler.mock.calls[0][0].author)
  // console.log(mockHandler.mock.calls[0][0].title)
  // console.log(mockHandler.mock.calls[0][0].url)
  // screen.debug(inputTitle)
});
