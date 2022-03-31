import { render, screen, within } from "@testing-library/react";
import Pets from "../Pets/Pets";
import catsMock from "../../mocks/cats.json";
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";

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

  test("should filter for male cats", async () => {
    const cards = await screen.findAllByRole("article");

    userEvent.selectOptions(screen.getByLabelText(/gender/i), "male");
    expect(screen.getAllByRole("article")).toStrictEqual([cards[1], cards[3]]);
  });

  test("should filter for female cats", async () => {
    const cards = await screen.findAllByRole("article");

    userEvent.selectOptions(screen.getByLabelText(/gender/i), "female");
    expect(screen.getAllByRole("article")).toStrictEqual([
      cards[0],
      cards[2],
      cards[4],
    ]);
  });

  test("should filter for favorite cats", async () => {
    const cards = await screen.findAllByRole("article");

    userEvent.click(within(cards[0]).getByRole("button"));
    userEvent.click(within(cards[3]).getByRole("button"));

    userEvent.selectOptions(screen.getByLabelText(/favorite/i), "favorite");

    expect(screen.getAllByRole("article")).toStrictEqual([cards[0], cards[3]]);
  });

  test("should filter for not favorite cats", async () => {
    const cards = await screen.findAllByRole("article");

    userEvent.click(within(cards[0]).getByRole("button"));
    userEvent.click(within(cards[3]).getByRole("button"));

    userEvent.selectOptions(screen.getByLabelText(/favorite/i), "not favorite");

    expect(screen.getAllByRole("article")).toStrictEqual([
      cards[1],
      cards[2],
      cards[4],
    ]);
  });

  test("should filter for favorite male cats", async () => {
    const cards = await screen.findAllByRole("article");

    userEvent.click(within(cards[0]).getByRole("button")); // female cat
    userEvent.click(within(cards[3]).getByRole("button")); // male cat

    userEvent.selectOptions(screen.getByLabelText(/gender/i), "male");
    userEvent.selectOptions(screen.getByLabelText(/favorite/i), "favorite");

    expect(screen.getAllByRole("article")).toStrictEqual([cards[3]]); // check for only male
  });
});
