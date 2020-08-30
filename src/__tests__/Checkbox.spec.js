import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { Checkbox } from "../components/Checkbox";

beforeEach(cleanup); // clean the DOM!

jest.mock("../firebase", () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          update: jest.fn(),
        })),
      })),
    })),
  },
}));

describe("<Checkbox />", () => {
  describe("Success", () => {
    it("renders the task CheckBox", () => {
      const { queryByTestId } = render(
        <Checkbox id="1" taskDesc="Finish this tutorial series!" />
      );
      expect(queryByTestId("CheckBox-action")).toBeTruthy();
    });

    it("renders the task CheckBox and accepts a onClick", () => {
      const { queryByTestId } = render(
        <Checkbox id="1" taskDesc="Finish this tutorial series!" />
      );
      expect(queryByTestId("CheckBox-action")).toBeTruthy();
      fireEvent.click(queryByTestId("CheckBox-action"));
    });

    it("renders the task CheckBox and accepts a onKeyDown", () => {
      const { queryByTestId } = render(
        <Checkbox id="1" taskDesc="Finish this tutorial series!" />
      );
      expect(queryByTestId("CheckBox-action")).toBeTruthy();
      fireEvent.keyDown(queryByTestId("CheckBox-action"), {
        key: "a",
        code: 65,
      });
      fireEvent.keyDown(queryByTestId("CheckBox-action"), {
        key: "Enter",
        code: 13,
      });
    });
  });
});
