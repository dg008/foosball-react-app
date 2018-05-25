
const winRatesCalculator = ({firstParticipant, secondParticipant, matchResults}) => {
    let numGamesWith1stParticipant = 0,
        numGamesWith2ndParticipant = 0,
        numGamesWonBy1stParticipant = 0,
        numGamesWonBy1stParticipantAgainst2ndParticipant = 0;

    matchResults.forEach(matchResult => {
        if (matchResult.participants.includes(firstParticipant)) {
            numGamesWith1stParticipant++;
            if (matchResult.participants.includes(secondParticipant)) {
                numGamesWith2ndParticipant++;
                if (matchResult.winners.includes(firstParticipant)) {
                    numGamesWonBy1stParticipantAgainst2ndParticipant++;
                }
            }
            if (matchResult.winners.includes(firstParticipant)) {
                numGamesWonBy1stParticipant++;
            }
        }
    });
    
    let overallWinRate = (numGamesWonBy1stParticipant/numGamesWith1stParticipant)*100;
    overallWinRate = isNaN(overallWinRate)
    ? NaN
    : overallWinRate.toFixed(2);
    const overallLossRate = (100 - overallWinRate).toFixed(2);

    let specificWinRate = (numGamesWonBy1stParticipantAgainst2ndParticipant/numGamesWith2ndParticipant)*100;
    specificWinRate = isNaN(specificWinRate)
    ? NaN
    : specificWinRate.toFixed(2);
    const specificLossRate = (100 - specificWinRate).toFixed(2);

    return {
        numGamesWith2ndParticipant,
        overallWinRate,
        overallLossRate,
        specificWinRate,
        specificLossRate,
      };
}

export default winRatesCalculator;
