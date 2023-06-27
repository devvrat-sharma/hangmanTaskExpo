import {
  SET_WORD,
  MAKE_GUESS,
  RESET_GAME,
  SET_HIGH_SCORE,
  RESET_SCORE,
} from './types';

const initialState = {
  word: '',
  guessedWord: '',
  remainingLives: 7,
  score: 0,
  highScore: 0,
};

const hangmanReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WORD:
      return {
        ...state,
        word: action.payload,
        guessedWord: '_'.repeat(action.payload.length),
      };
    case MAKE_GUESS:
      const {word, guessedWord, remainingLives, score} = state;
      const letter = action.payload;
      let newGuessedWord = '';
      let newRemainingLives = remainingLives;
      let newScore = score;

      for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
          newGuessedWord += letter;
        } else {
          newGuessedWord += guessedWord[i];
        }
      }

      console.log("===letter", letter)
      console.log("===check", word.includes(letter))

      if (!word.includes(letter)) {
        newRemainingLives -= 1;
      }

      if (newGuessedWord === word) {
        newScore += 1;
        newRemainingLives = 7;
      }
  
      return {
        ...state,
        guessedWord: newGuessedWord,
        remainingLives: newRemainingLives,
        score: newScore,
      };
    case RESET_GAME:
      return {
        ...state,
        guessedWord: '_'.repeat(state.word.length),
        remainingLives: 7,
      };
    case RESET_SCORE:
      return {
        ...state,
        score: 0,
      };
    case SET_HIGH_SCORE:
      return {
        ...state,
        highScore: action.payload,
      };
    default:
      return state;
  }
};

export default hangmanReducer;
