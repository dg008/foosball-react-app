import React from "react";
import { mount } from "enzyme";
import MatchResultInput from "./MatchResultInput";
import { ParticipantInput } from "../ParticipantInput";
import { ParticipantList } from "../ParticipantList";
import { WinnerInput } from "../WinnerInput";
import { WinnerList } from "../WinnerList";

describe("when entering a match result", () => {
  let props;
  let mountedResultInput;
  const resultInput = () => {
    if (!mountedResultInput) {
        mountedResultInput = mount(
        <MatchResultInput {...props} />
      );
    }
    return mountedResultInput;
  }

  beforeEach(() => {
    props = {
      onSave: undefined,
    };
    mountedResultInput = undefined;
  });

  it("should always render a Grid", () => {
    const grids = resultInput().find("Grid");
    expect(grids.length).toBeGreaterThan(0);
  });

  it("should always renders a `ParticipantInput`", () => {
    expect(resultInput().find(ParticipantInput).length).toBe(1);
  });

  it("should always renders a `ParticipantList`", () => {
    expect(resultInput().find(ParticipantList).length).toBe(1);
  });

  it("should always renders a `WinnerInput`", () => {
    expect(resultInput().find(WinnerInput).length).toBe(1);
  });

  it("should always renders a `ParticipantList`", () => {
    expect(resultInput().find(WinnerList).length).toBe(1);
  });
});