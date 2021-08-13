Evnex project
=============

by [Grant Wong][github], 12-13 August 2021.

Tennis rules are new to me so I'm not sure if I got all of the intricacies
of tennis scoring, but hopefully this covers pretty much everything :)

Setup + how to test
-------------------

Tested on Node v15.12 on Linux.

```sh
~$ yarn
~$ yarn run test
```

Example usage
-------------

Based on the specification file. This can be run by typing `yarn run build`
then `node dist/src/example.js`.

```js
const match = new Match('player 1', 'player 2');

match.pointWonBy('player 1');
match.pointWonBy('player 2');
match.score(); // 0-0, 15-15

match.pointWonBy('player 1');
match.pointWonBy('player 1');
match.score(); // 0-0, 40-15

match.pointWonBy('player 2');
match.pointWonBy('player 2');
match.score(); // 0-0, Deuce

match.pointWonBy('player 1');
match.score(); // 0-0, Advantage player 1

match.pointWonBy('player 1');
match.score(); // 1-0

// etc.
```

[github]: https://github.com/dddlr
