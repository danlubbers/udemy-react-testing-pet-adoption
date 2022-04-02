import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "../Card/Card";
import { PetsContext } from "../Pets/Pets";
import cats from "../../mocks/cats.json";

const cardProps = {
  name: "Sydney",
  phone: "111-111-1111",
  email: "test@email.com",
  image: {
    url: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    alt: "cute cat",
  },
  isFavorite: false,
  index: 1,
  updateFavorite: () => {},
};

const renderComponent = (props) => {
  render(
    <PetsContext.Provider value={{ cats, setCats: () => {} }}>
      <Card {...props} />
    </PetsContext.Provider>
  );
};

describe("Card", () => {
  test("should show name of cat", () => {
    renderComponent(cardProps);

    expect(
      screen.getByRole("heading", { name: /sydney/i })
    ).toBeInTheDocument();
  });

  test("should show phone number", () => {
    renderComponent(cardProps);

    expect(screen.getByText(/111-111-1111/i)).toBeInTheDocument();
  });

  test("should show email", () => {
    renderComponent(cardProps);

    expect(screen.getByText(/test@email.com/i)).toBeInTheDocument();
  });

  test("should show image exists with correct url", () => {
    renderComponent(cardProps);

    expect(screen.getByAltText(/cute cat/i).src).toBe(cardProps.image.url);
  });

  test("should show outline heart", () => {
    renderComponent(cardProps);

    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
  });

  test("should show filled heart", () => {
    renderComponent({ ...cardProps, isFavorite: true });

    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
  });

  test("should toggle heart status", () => {
    renderComponent(cardProps);

    userEvent.click(screen.getByRole("button"));
    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();

    userEvent.click(screen.getByRole("button"));
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
  });
});
