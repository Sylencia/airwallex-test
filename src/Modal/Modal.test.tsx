import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { Modal } from "./Modal";

test("should call onClose when escape is pressed", async () => {
  const user = userEvent.setup();
  const onCloseCallback = jest.fn();

  render(
    <div>
      <Modal isOpen={true} onClose={onCloseCallback}>
        <h1>Modal is open</h1>
      </Modal>
    </div>
  );

  await user.keyboard("{Escape}");

  expect(onCloseCallback.mock.calls).toHaveLength(1);
});

test("should close the modal when background is clicked", async () => {
  const user = userEvent.setup();
  const onCloseCallback = jest.fn();

  render(
    <div>
      <Modal isOpen={true} onClose={onCloseCallback}>
        <h1>Modal is open</h1>
      </Modal>
    </div>
  );

  const background = screen.getByTestId("modal-background");
  await user.click(background);

  expect(onCloseCallback.mock.calls).toHaveLength(1);
});
