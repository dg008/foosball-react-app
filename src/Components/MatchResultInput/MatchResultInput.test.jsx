import React from "react";
import { mount } from "enzyme";
import MatchResultInput from "./MatchResultInput";
import { ParticipantInput } from "../ParticipantInput";
import { ParticipantList } from "../ParticipantList";
import { WinnerInput } from "../WinnerInput";
import { WinnerList } from "../WinnerList";
import { ValidatedInput, ValidatedButton } from '../Validation';

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

//   describe("the rendered Grid", () => {
//     it("should contain everything else that gets rendered", () => {
//       const wrappingGrid = resultInput().find("Grid").first();

//       expect(wrappingGrid.children()).toEqual(resultInput().children());
//     });
//   });

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

//   it('FirstTeamSize Input calls "updateFirstTeamSize()" on change', () => {
//     const wrapper = resultInput();
//     const event = {target: {name: "firstTeamSize", value: "1"}};
//     const spy = jest.spyOn(wrapper.instance(), 'updateFirstTeamSize');
//     wrapper.update();
//     // resultInput().find("input[name='firstTeamSize']").simulate('change');
//     wrapper.find("input").first().simulate('change', event);
//     expect(spy).toHaveBeenCalled();
//   });

  it('1st Team Size textbox should update to inputted value on change', () => {
    const event = {target: {name: "firstTeamSize", value: "2"}};
    resultInput().find(ValidatedInput).at(0).prop('onChange')(event);
    resultInput().update();

    expect(resultInput().find(ValidatedInput).first().props().value).toBe("2");
  });

  it('2nd Team Size textbox should update to inputted value on change', () => {
    const event = {target: {name: "secondTeamSize", value: "3"}};
    resultInput().find(ValidatedInput).at(1).prop('onChange')(event);
    resultInput().update();

    expect(resultInput().find(ValidatedInput).at(1).props().value).toBe("3");
  });

  // Required validation
  it('Save button should be disabled if all fields are empty', () => {
    const saveBtn = resultInput().find(ValidatedButton).first().children().find('button').first();
    expect(saveBtn.props().disabled).toBe(true);
  });

  it('Save button should be disabled if only 1st Team Size is entered', () => {
    const event = {target: {name: "firstTeamSize", value: "2"}};
    resultInput().find(ValidatedInput).at(0).prop('onChange')(event);
    resultInput().update();

    const saveBtn = resultInput().find(ValidatedButton).first().children().find('button').first();
    expect(saveBtn.props().disabled).toBe(true);
  });

  it('Save button should be disabled if only 1st & 2nd Team Size is entered', () => {
    let event = {target: {name: "firstTeamSize", value: "2"}};
    resultInput().find(ValidatedInput).at(0).prop('onChange')(event);
    event = {target: {name: "secondTeamSize", value: "3"}};
    resultInput().find(ValidatedInput).at(1).prop('onChange')(event);
    resultInput().update();

    const saveBtn = resultInput().find(ValidatedButton).first().children().find('button').first();
    expect(saveBtn.props().disabled).toBe(true);
  });

  it('Save button should be disabled if only 1st, 2nd Team Size and Participants are entered', () => {
    let event = {target: {name: "firstTeamSize", value: "2"}};
    resultInput().find(ValidatedInput).at(0).prop('onChange')(event);
    event = {target: {name: "secondTeamSize", value: "3"}};
    resultInput().find(ValidatedInput).at(1).prop('onChange')(event);
    resultInput().instance().addParticipant('Steve');
    resultInput().update();

    const saveBtn = resultInput().find(ValidatedButton).first().children().find('button').first();
    expect(saveBtn.props().disabled).toBe(true);
  });

  it('Save button should be enabled if all fields entered', () => {
    let event = {target: {name: "firstTeamSize", value: "2"}};
    resultInput().find(ValidatedInput).at(0).prop('onChange')(event);
    event = {target: {name: "secondTeamSize", value: "3"}};
    resultInput().find(ValidatedInput).at(1).prop('onChange')(event);
    resultInput().instance().addParticipant('Steve');
    resultInput().instance().addWinner('George');
    resultInput().update();

    const saveBtn = resultInput().find(ValidatedButton).first().children().find('button').first();
    expect(saveBtn.props().disabled).toBe(false);
  });

  // Test participant input/list interaction

  // Test node winRates calculator (potentially make it an npm package so its common)


  
});