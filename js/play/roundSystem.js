// round = moment of the game
// turn = the turn of the round (1, 2, 3)
// playerTurn = the player who is playing
// turnType = the type of the turn (Move, Card Use, Shopping and invocation)
var round = 0;
var turn = 0;
var playerTurn;
var turnType;

// the first round of the game
function startingRound(value) {
  round = 1;
  createCards(value.cards, value.enemyCards);
}


