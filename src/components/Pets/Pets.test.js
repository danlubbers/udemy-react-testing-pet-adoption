import { render, screen } from "@testing-library/react";
import Pets from "../Pets/Pets";
import catsMock from "../../mocks/cats.json";
import { rest } from "msw";
import { setupServer } from "msw/node";

const mockServer = setupServer(
  rest.get("http://localhost:4000/cats", (req, res, ctx) => {
    return res(ctx.json(catsMock));
  })
);

// eslint-disable-next-line testing-library/no-render-in-setup
beforeEach(() => render(<Pets />));
beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

describe("Pets", () => {
  test("should render five card components", async () => {
    const cards = await screen.findAllByRole("article");
    expect(cards.length).toBe(5);
  });
});
