import React from "react";
import winRatesCalculator from "./winRatesCalculator";

describe("when calculating win rates", () => {
  it("should return NaN for rates when 1st participant is not found", () => {
    const firstParticipant = 'MADE_UP_NAME';
    const matchResults = [ { participants: [ 'David', 'Peter' ],
        winners: ['David'] } ];
    const winRates = winRatesCalculator({firstParticipant, matchResults});

    expect(winRates.overallWinRate).toEqual(NaN);
    expect(winRates.overallLossRate).toEqual(NaN);
  });

  it("should calculate correct rate for 1st participant in 1 game", () => {
    const firstParticipant = 'David';
    const matchResults = [ { participants: [ 'David', 'Peter' ],
        winners: ['David'] } ];
    const winRates = winRatesCalculator({firstParticipant, matchResults});
    
    expect(winRates.overallWinRate).toEqual(100.00);
    expect(winRates.overallLossRate).toEqual(0.00);
  });

  it("should calculate correct rate for 1st participant in 3 games", () => {
    const firstParticipant = 'David';
    const matchResults = [ { participants: [ 'David', 'Peter' ], winners: ['David'] },
        { participants: [ 'David', 'George' ], winners: ['George'] },
        { participants: [ 'David', 'Stephen' ], winners: ['David'] }];
    const winRates = winRatesCalculator({firstParticipant, matchResults});
    
    expect(winRates.overallWinRate).toEqual(66.67);   // Because of rounding
    expect(winRates.overallLossRate).toEqual(33.33);
  });

  it("should return NaN for rates when 2nd participant is not found", () => {
    const firstParticipant = 'Bart', secondParticipant = 'MADE_UP_NAME';
    const matchResults = [ { participants: [ 'Bart', 'Lisa' ],
        winners: ['Bart'] } ];
    const winRates = winRatesCalculator({firstParticipant, secondParticipant, matchResults});

    expect(winRates.specificWinRate).toEqual(NaN);
    expect(winRates.specificLossRate).toEqual(NaN);
  });

  it("should calculate correct rate for 1st participant against 2nd participant", () => {
    const firstParticipant = 'Bart', secondParticipant = 'Homer';
    const matchResults = [ { participants: [ 'Bart', 'Lisa' ], winners: ['Bart'] },
    { participants: [ 'Bart', 'Homer' ], winners: ['Homer'] },
    { participants: [ 'Bart', 'Maggie' ], winners: ['Bart'] },];
    const winRates = winRatesCalculator({firstParticipant, secondParticipant, matchResults});
    
    expect(winRates.overallWinRate).toEqual(66.67);
    expect(winRates.overallLossRate).toEqual(33.33);
    expect(winRates.specificWinRate).toEqual(0.00);
    expect(winRates.specificLossRate).toEqual(100.00);
  });
});