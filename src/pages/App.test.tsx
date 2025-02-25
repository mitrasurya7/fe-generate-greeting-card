import { render, screen, cleanup } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);
describe("Gift Card App", () => {
  test("renders App component correctly", () => {
    render(<App />);
    expect(screen.getByText(/Gift Card/i)).toBeInTheDocument();
    expect(screen.getByText(/Download/i)).toBeInTheDocument();
  });


  test("allows user to enter text and displays it correctly", async () => {
    render(<App />);

    const dearInput = screen.getByLabelText("Dear");
    const messageInput = screen.getByLabelText("Message");
    const fromInput = screen.getByLabelText("From");

    await userEvent.type(dearInput, "John");
    await userEvent.type(messageInput, "Happy Birthday!");
    await userEvent.type(fromInput, "Alice");

    expect(dearInput).toHaveValue("John");
    expect(messageInput).toHaveValue("Happy Birthday!");
    expect(fromInput).toHaveValue("Alice");
  });
});
