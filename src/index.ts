/**
 * Code test created by Grant Wong for Evnex.
 */

interface Score {
    game: [number, number];
    set: [number, number];
    tiebreak: [number, number];
}

enum Players {
    None = -1,
    Player1 = 0,
    Player2 = 1,
}

export class Match {
    static SET_TIEBREAK_THRESHOLD = 6;
    static SET_WINNING_THRESHOLD = 2;
    static GAME_TIEBREAK_THRESHOLD = 4;
    static GAME_WINNING_THRESHOLD = 2;

    // From "Tennis scoring system", on Wikipedia
    private customPointStrings = ['love', '15', '30', '40', 'game'];

    private players: [string, string] = ['', ''];
    private scores: Score = {
        game: [0, 0],
        set: [0, 0],
        tiebreak: [0, 0],
    };

    private winner: Players = Players.None;

    // Whether a tie-break is played
    // (i.e. when players are tied 6-6)
    private playTieBreak = false;

    constructor(player1: string, player2: string) {
        this.players[Players.Player1] = player1;
        this.players[Players.Player2] = player2;
    }

    private getPointString(points: number): string {
        if (points >= this.customPointStrings.length) {
            return points.toString();
        }

        return this.customPointStrings[points];
    }

    /**
     * Gets the player index that corresponds to the string input.
     *
     * @param player player input string
     * @returns player index
     */
    private getPlayerIndex(player: string): Players {
        if (player === this.players[Players.Player1]) return Players.Player1;
        if (player === this.players[Players.Player2]) return Players.Player2;

        throw TypeError(`Player name ${player} does not exist.`);
    }

    /**
     * Process a player winning a point during non-tiebreak gameplay.
     *
     * @param playerIndex which player won the point
     */
    private winPoint(playerIndex: Players) {
        this.scores.game[playerIndex]++;

        const gameScoreDifference = Math.abs(
            this.scores.game[Players.Player1] - this.scores.game[Players.Player2]
        );

        // A player has won the current game

        if (
            Math.max(...this.scores.game) >= Match.GAME_TIEBREAK_THRESHOLD &&
            gameScoreDifference >= Match.GAME_WINNING_THRESHOLD
        ) {
            if (this.scores.game[Players.Player1] > this.scores.game[Players.Player2]) {
                // Player 1 has won the game
                this.scores.set[Players.Player1]++;
            } else {
                // Player 2 has won the game
                this.scores.set[Players.Player2]++;
            }

            this.scores.game[Players.Player1] = 0;
            this.scores.game[Players.Player2] = 0;
        }
    }

    private winTieBreakPoint(playerIndex: Players) {
        this.scores.tiebreak[playerIndex]++;

        const scoreDifference = Math.abs(
            this.scores.tiebreak[Players.Player1] - this.scores.game[Players.Player2]
        );

        const tieBreakWon = (
            Math.max(...this.scores.tiebreak) >= Match.GAME_TIEBREAK_THRESHOLD &&
            scoreDifference >= Match.GAME_WINNING_THRESHOLD
        );

        if (tieBreakWon) {
            if (this.scores.tiebreak[Players.Player1] > this.scores.tiebreak[Players.Player2]) {
                // Player 1 has won the tie-breaker
                this.scores.set[Players.Player1]++;
                this.winner = Players.Player1;

            } else {
                // Player 2 has won the tie-breaker
                this.scores.set[Players.Player2]++;
                this.winner = Players.Player2;
            }
        }
    }

    private updateSetStatus() {

        // Check if the match has been won by any player
        // (without the need for tie-break)

        const setScoreDifference = Math.abs(
            this.scores.set[Players.Player1] - this.scores.set[Players.Player2]
        );

        const matchWon = (
            Math.max(...this.scores.set) >= Match.SET_TIEBREAK_THRESHOLD &&
            setScoreDifference >= Match.SET_WINNING_THRESHOLD
        );

        if (matchWon) {
            if (this.scores.set[Players.Player1] > this.scores.set[Players.Player2]) {
                this.winner = Players.Player1;
            } else {
                this.winner = Players.Player2;
            }

            this.playTieBreak = false;

            // Match finished, nothing to do
            return;
        }

        // Check if tie-break game should be played now

        const playTieBreak = (
            this.scores.set[Players.Player1] === 6 &&
            this.scores.set[Players.Player2] === 6
        );

        if (playTieBreak) this.playTieBreak = true;
    }

    /**
     * Joins strings with commas. Unlike Array.join(), this function will
     * silently ignore all strings that are falsy, in particular the
     * empty string.
     *
     * @param strings array of strings
     */
    private joinStrings(strings: string[]) {
        return strings.filter(s => Boolean(s)).join(', ');
    }

    /**
     * Gives one point to the specified player.
     *
     * This function also updates the status of the game automatically,
     * including how many sets each player has won, whether to enter
     * a tie-breaker, and which player has won the match if applicable.
     *
     * @param player player's name, as a string
     */
    pointWonBy(player: string) {
        const playerIndex = this.getPlayerIndex(player);

        if (this.winner !== Players.None) throw Error('Game already finished');

        if (this.playTieBreak) {
            this.winTieBreakPoint(playerIndex);
            return;
        } else {
            this.winPoint(playerIndex);
        }

        this.updateSetStatus();
    }

    /**
     * Returns the raw set, game, and tie-break scores for the match
     *
     * Used for debugging purposes only.
     *
     * @returns string containing set scores, game scores and
     *          tie-breaker scores
     */
    getRawScore(): string {
        return `${this.scores.set[0]}-${this.scores.set[1]} ` +
            `${this.scores.game[0]}-${this.scores.game[1]} ` +
            `${this.scores.tiebreak[0]}-${this.scores.tiebreak[1]}`;
    }

    /**
     * Returns the formatted score of the game, as some combination
     * of the game/set/tie-breaker scores as relevant to the current
     * situation.
     *
     * @returns the score, as a string
     */
    score(): string {
        // Create some shorter remappings for less typing
        const gameScores = this.scores.game;
        const setScores = this.scores.set;
        const tieBreakScores = this.scores.tiebreak;

        const deuceThreshold = Match.GAME_TIEBREAK_THRESHOLD - 1;

        // Assuming points are never negative
        const fewerThanDeuce =
            gameScores[Players.Player1] < deuceThreshold ||
            gameScores[Players.Player2] < deuceThreshold;

        let setScoreString = `${setScores[Players.Player1]}-` +
            `${setScores[Players.Player2]}`;
        let gameScoreString = '';


        if (this.playTieBreak) {
            // Playing tie-break, so don't display anything except
            // the tie-break score
            setScoreString = '';
            gameScoreString = `${tieBreakScores[Players.Player1]}-` +
                `${tieBreakScores[Players.Player2]}`;

        } else if (fewerThanDeuce) {
            if (
                gameScores[Players.Player1] !== 0 ||
                gameScores[Players.Player2] !== 0
            ) {
                gameScoreString =
                    `${this.getPointString(gameScores[Players.Player1])}-` +
                    `${this.getPointString(gameScores[Players.Player2])}`;
            }
        } else {
            if (gameScores[Players.Player1] === gameScores[Players.Player2]) {
                gameScoreString = 'Deuce';
            } else if (
                gameScores[Players.Player1] > gameScores[Players.Player2]
            ) {
                gameScoreString = `Advantage ${this.players[Players.Player1]}`;
            } else {
                gameScoreString = `Advantage ${this.players[Players.Player2]}`;
            }
        }

        const fullScore = this.joinStrings([setScoreString, gameScoreString]);
        return fullScore;
    }


}

// TODO eslint