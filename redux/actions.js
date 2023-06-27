import AsyncStorage from '@react-native-async-storage/async-storage';
import {getRandomWord} from './wordDictionary';
import {
  SET_WORD,
  MAKE_GUESS,
  RESET_GAME,
  SET_HIGH_SCORE,
  RESET_SCORE,
} from './types';

export const setWord = word => ({
  type: SET_WORD,
  payload: word.toLowerCase(),
});

export const makeGuess = letter => ({
  type: MAKE_GUESS,
  payload: letter.toLowerCase(),
});

export const resetGame = () => ({
  type: RESET_GAME,
});

export const setHighScore = score => ({
  type: SET_HIGH_SCORE,
  payload: score,
});

export const resetScore = () => ({
  type: RESET_SCORE,
});

export const loadHighScore = () => {
  return async dispatch => {
    try {
      const highScore = await AsyncStorage.getItem('highScore');
      if (highScore) {
        dispatch(setHighScore(parseInt(highScore)));
      }
    } catch (error) {
      console.error('Failed to load high score:', error);
    }
  };
};

export const saveHighScore = score => {
  return async dispatch => {
    try {
      await AsyncStorage.setItem('highScore', score.toString());
      dispatch(setHighScore(score));
    } catch (error) {
      console.error('Failed to save high score:', error);
    }
  };
};

export const startNewGame = () => {
  return async dispatch => {
    try {
      const word = getRandomWord();
      dispatch(setWord(word));
      dispatch(resetGame());
      console.log('===word', word);
    } catch (error) {
      console.error('Failed to start a new game:', error);
    }
  };
};
