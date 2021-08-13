import { Match } from '../src/index';

const match = new Match('player 1', 'player 2');

match.pointWonBy('player 1');
match.pointWonBy('player 2');
console.log(match.score()); // 0-0, 15-15

match.pointWonBy('player 1');
match.pointWonBy('player 1');
console.log(match.score()); // 0-0, 40-15

match.pointWonBy('player 2');
match.pointWonBy('player 2');
console.log(match.score()); // 0-0, Deuce

match.pointWonBy('player 1');
console.log(match.score()); // 0-0, Advantage player 1

match.pointWonBy('player 1');
console.log(match.score()); // 1-0

// Feel free to continue the match here