import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "../Card/Card";

const cardProps = {
  name: "Sydney",
  phone: "111-111-1111",
  email: "test@email.com",
  image: {
    url: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    alt: "cute cat",
  },
  isFavorite: false,
};

describe("Card", () => {
  test("should show name of cat", () => {
    render(<Card {...cardProps} />);

    expect(
      screen.getByRole("heading", { name: /sydney/i })
    ).toBeInTheDocument();
  });

  test("should show phone number", () => {
    render(<Card {...cardProps} />);

    expect(screen.getByText(/111-111-1111/i)).toBeInTheDocument();
  });

  test("should show email", () => {
    render(<Card {...cardProps} />);

    expect(screen.getByText(/test@email.com/i)).toBeInTheDocument();
  });

  test("should show image exists with correct url", () => {
    render(<Card {...cardProps} />);

    expect(screen.getByAltText(/cute cat/i).src).toBe(cardProps.image.url);
  });

  test("should show outline heart", () => {
    render(<Card {...cardProps} />);

    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
  });

  test("should show filled heart", () => {
    render(<Card {...cardProps} isFavorite={true} />);

    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
  });

  test("should toggle heart status", () => {
    render(<Card {...cardProps} />);

    userEvent.click(screen.getByRole("button"));
    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();

    userEvent.click(screen.getByRole("button"));
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
  });
});
