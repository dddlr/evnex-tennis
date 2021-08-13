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

match.pointWonBy('player 1');
match.pointWonBy('player 1');
match.pointWonBy('player 1');
match.pointWonBy('player 1');

console.log(match.score()); // 2-0

match.pointWonBy('player 1');
match.pointWonBy('player 2');
match.pointWonBy('player 1');
match.pointWonBy('player 2');

console.log(match.score()); // 2-0, 30-30

match.pointWonBy('player 2');
match.pointWonBy('player 2');

console.log(match.score()); // 2-1

for (let i = 0; i < 4; i++) match.pointWonBy('player 1');
for (let i = 0; i < 4; i++) match.pointWonBy('player 2');
for (let i = 0; i < 4; i++) match.pointWonBy('player 1');
for (let i = 0; i < 4; i++) match.pointWonBy('player 2');
for (let i = 0; i < 4; i++) match.pointWonBy('player 1');
for (let i = 0; i < 4; i++) match.pointWonBy('player 2');

console.log(match.score()); // 5-4

match.pointWonBy('player 1');
match.pointWonBy('player 1');
match.pointWonBy('player 1');
match.pointWonBy('player 2');
match.pointWonBy('player 2');
match.pointWonBy('player 1');

console.log(match.score()); // 6-4, player 1 won match