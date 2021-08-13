import { Match } from '../src/index';
import { assert } from 'chai';

describe('Tennis match', () => {
    let match: Match;

    beforeEach(() => {
        match = new Match('player 1', 'player 2');
    });

    /**
     * Helper function that runs a match with scoring allocated
     * according to the array pointsWonBy. pointsWonBy provides both
     * (a) the player who scores the point and (b) the expected
     * resulting score afterwards.
     *
     * Also tests whether the expected score matches with the
     * actual score after each entry in the pointsWonBy array
     * is run.
     *
     * @param pointsWonBy an array of two-element "tuples"
     *                    (actually array of strings)
     */
    function testMatch(pointsWonBy: [string, string][]) {
        assert.equal(match.score(), '0-0');

        for (const [player, scoreString] of pointsWonBy) {
            match.pointWonBy(player);
            assert.equal(match.score(), scoreString);
        }
    }

    describe('Single game', () => {
        it('should give correct output for example code', () => {
            match.pointWonBy('player 1');
            match.pointWonBy('player 2');
            match.score();
            assert.equal(match.score(), '0-0, 15-15');

            match.pointWonBy('player 1');
            match.pointWonBy('player 1');
            assert.equal(match.score(), '0-0, 40-15');

            match.pointWonBy('player 2');
            match.pointWonBy('player 2');
            assert.equal(match.score(), '0-0, Deuce');

            match.pointWonBy('player 1');
            assert.equal(match.score(), '0-0, Advantage player 1');

            match.pointWonBy('player 1');
            assert.equal(match.score(), '1-0');
        });

        it('should work for a straightforward 0-4 win', () => {
            const pointsWonBy: [string, string][] = [
                ['player 2', '0-0, love-15'],
                ['player 2', '0-0, love-30'],
                ['player 2', '0-0, love-40'],
                ['player 2', '0-1'],
            ];

            testMatch(pointsWonBy);
        });

        it('should work for a straightforward 4-2 win', () => {
            const pointsWonBy: [string, string][] = [
                ['player 2', '0-0, love-15'],
                ['player 2', '0-0, love-30'],
                ['player 1', '0-0, 15-30'],
                ['player 1', '0-0, 30-30'],
                ['player 1', '0-0, 40-30'],
                ['player 1', '1-0'],
            ];

            testMatch(pointsWonBy);
        });

        it('should work for deuce and advantage', () => {
            const pointsWonBy: [string, string][] = [
                ['player 1', '0-0, 15-love'], // 1-0
                ['player 1', '0-0, 30-love'], // 2-0
                ['player 1', '0-0, 40-love'], // 3-0
                ['player 2', '0-0, 40-15'],   // 3-1
                ['player 2', '0-0, 40-30'],   // 3-2
                ['player 2', '0-0, Deuce'],   // 3-3
                ['player 2', '0-0, Advantage player 2'], // 3-4
                ['player 2', '0-1'], // 3-5
            ];

            testMatch(pointsWonBy);
        });

        it('should work for deuce and advantage (long)', () => {
            const pointsWonBy: [string, string][] = [
                ['player 1', '0-0, 15-love'], // 1-0
                ['player 1', '0-0, 30-love'], // 2-0
                ['player 2', '0-0, 30-15'], // 2-1
                ['player 2', '0-0, 30-30'], // 2-2
                ['player 1', '0-0, 40-30'], // 3-2
                ['player 2', '0-0, Deuce'], // 3-3
                ['player 1', '0-0, Advantage player 1'], // 4-3
                ['player 2', '0-0, Deuce'],              // 4-4
                ['player 2', '0-0, Advantage player 2'], // 4-5
                ['player 1', '0-0, Deuce'],              // 5-5
                ['player 1', '0-0, Advantage player 1'], // 6-5
                ['player 1', '1-0'],
            ];

            testMatch(pointsWonBy);
        });
    });

    describe('Whole match', () => {
        it('should work for a typical match (player 1 wins, 6-4)', () => {
            const pointsWonBy: [string, string][] = [
                ['player 1', '0-0, 15-love'],
                ['player 2', '0-0, 15-15'],
                ['player 2', '0-0, 15-30'],
                ['player 2', '0-0, 15-40'],

                ['player 2', '0-1'],
                ['player 2', '0-1, love-15'],
                ['player 2', '0-1, love-30'],
                ['player 2', '0-1, love-40'],
                ['player 2', '0-2'],

                ['player 1', '0-2, 15-love'],
                ['player 1', '0-2, 30-love'],
                ['player 1', '0-2, 40-love'],
                ['player 1', '1-2'],

                ['player 1', '1-2, 15-love'],
                ['player 1', '1-2, 30-love'],
                ['player 2', '1-2, 30-15'],
                ['player 2', '1-2, 30-30'],
                ['player 1', '1-2, 40-30'],
                ['player 2', '1-2, Deuce'],
                ['player 2', '1-2, Advantage player 2'],
                ['player 2', '1-3'],

                ['player 2', '1-3, love-15'],
                ['player 1', '1-3, 15-15'],
                ['player 1', '1-3, 30-15'],
                ['player 1', '1-3, 40-15'],
                ['player 2', '1-3, 40-30'],
                ['player 1', '2-3'],

                ['player 1', '2-3, 15-love'],
                ['player 1', '2-3, 30-love'],
                ['player 1', '2-3, 40-love'],
                ['player 1', '3-3'],

                ['player 1', '3-3, 15-love'],
                ['player 1', '3-3, 30-love'],
                ['player 1', '3-3, 40-love'],
                ['player 1', '4-3'],

                ['player 1', '4-3, 15-love'],
                ['player 1', '4-3, 30-love'],
                ['player 1', '4-3, 40-love'],
                ['player 1', '5-3'],

                ['player 2', '5-3, love-15'],
                ['player 2', '5-3, love-30'],
                ['player 2', '5-3, love-40'],
                ['player 2', '5-4'],

                ['player 2', '5-4, love-15'],
                ['player 1', '5-4, 15-15'],
                ['player 1', '5-4, 30-15'],
                ['player 1', '5-4, 40-15'],
                ['player 1', '6-4, player 1 won match'],

            ];

            testMatch(pointsWonBy);
        });

        it('should work for a typical match (player 1 wins, 7-5)', () => {
            for (let i = 0; i < 4; i++) match.pointWonBy('player 1');
            for (let i = 0; i < 4; i++) match.pointWonBy('player 1');
            for (let i = 0; i < 4; i++) match.pointWonBy('player 1');
            for (let i = 0; i < 4; i++) match.pointWonBy('player 1');
            for (let i = 0; i < 4; i++) match.pointWonBy('player 1');

            assert.equal(match.score(), '5-0');

            for (let i = 0; i < 4; i++) match.pointWonBy('player 2');
            for (let i = 0; i < 4; i++) match.pointWonBy('player 2');
            for (let i = 0; i < 4; i++) match.pointWonBy('player 2');
            for (let i = 0; i < 4; i++) match.pointWonBy('player 2');
            for (let i = 0; i < 4; i++) match.pointWonBy('player 2');

            assert.equal(match.score(), '5-5');

            for (let i = 0; i < 4; i++) match.pointWonBy('player 1');
            assert.equal(match.score(), '6-5');

            for (let i = 0; i < 4; i++) match.pointWonBy('player 1');
            assert.equal(match.score(), '7-5, player 1 won match');
        });

        it('should work for a tie-break match (6-6)', () => {
            for (let i = 0; i < 4; i++) match.pointWonBy('player 1');
            for (let i = 0; i < 4; i++) match.pointWonBy('player 1');
            for (let i = 0; i < 4; i++) match.pointWonBy('player 1');
            for (let i = 0; i < 4; i++) match.pointWonBy('player 1');
            for (let i = 0; i < 4; i++) match.pointWonBy('player 1');

            assert.equal(match.score(), '5-0');

            for (let i = 0; i < 4; i++) match.pointWonBy('player 2');
            for (let i = 0; i < 4; i++) match.pointWonBy('player 2');
            for (let i = 0; i < 4; i++) match.pointWonBy('player 2');
            for (let i = 0; i < 4; i++) match.pointWonBy('player 2');
            for (let i = 0; i < 4; i++) match.pointWonBy('player 2');

            assert.equal(match.score(), '5-5');

            for (let i = 0; i < 4; i++) match.pointWonBy('player 2');
            assert.equal(match.score(), '5-6');

            for (let i = 0; i < 4; i++) match.pointWonBy('player 1');
            assert.equal(match.score(), 'tiebreak, 0-0');

            // Tie-break begins here

            match.pointWonBy('player 1');
            assert.equal(match.score(), 'tiebreak, 1-0');

            match.pointWonBy('player 2');
            assert.equal(match.score(), 'tiebreak, 1-1');

            match.pointWonBy('player 1');
            match.pointWonBy('player 2');

            assert.equal(match.score(), 'tiebreak, 2-2');

            match.pointWonBy('player 1');
            match.pointWonBy('player 2');

            assert.equal(match.score(), 'tiebreak, 3-3');

            match.pointWonBy('player 2');
            match.pointWonBy('player 2');
            match.pointWonBy('player 2');
            match.pointWonBy('player 2');

            assert.equal(match.score(), '6-7, player 2 won match');
        });

    });
});