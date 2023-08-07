import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("opens the modal correctly", async () => {
  const user = userEvent.setup();
  render(<App />);
  const button = screen.getByRole("button", { name: /Request an invite/i });
  expect(button).toBeInTheDocument();
  await user.click(button);

  expect(
    screen.getByRole("heading", { name: /Request an invite/i })
  ).toBeInTheDocument();
});
