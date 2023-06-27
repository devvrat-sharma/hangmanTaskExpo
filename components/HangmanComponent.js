import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  startNewGame,
  makeGuess,
  loadHighScore,
  saveHighScore,
  resetScore,
} from '../redux/actions';

const selectWord = state => state.word;
const selectGuessedWord = state => state.guessedWord;
const selectRemainingLives = state => state.remainingLives;
const selectScore = state => state.score;
const selectHighScore = state => state.highScore;

const HangmanComponent = () => {
  const dispatch = useDispatch();
  const word = useSelector(selectWord);
  const guessedWord = useSelector(selectGuessedWord);
  const remainingLives = useSelector(selectRemainingLives);
  const score = useSelector(selectScore);
  const highScore = useSelector(selectHighScore);
  const [inputLetter, setInputLetter] = useState('');

  useEffect(() => {
    if (score > highScore) {
      dispatch(saveHighScore(score));
    }
  }, [score]);

  useEffect(() => {
    if (remainingLives === 0) {
      dispatch(resetScore(0));
    }
  }, [remainingLives]);

  useEffect(() => {
    dispatch(startNewGame());
    dispatch(loadHighScore());
  }, []);

  const handleGuess = () => {
    if (word && guessedWord && inputLetter) {
      dispatch(makeGuess(inputLetter));
      setInputLetter('');
    }
  };

  const handleStartNewGame = () => {
    dispatch(startNewGame());
  };

  // const handleSaveHighScore = () => {
  //   dispatch(saveHighScore(score));
  // };

  const renderGameStatus = () => {
    if (guessedWord === word) {
      return (
        <>
          <Text>You win!</Text>
          <Text>Score: {score}</Text>
        </>
      );
    }

    if (remainingLives === 0) {
      return (
        <>
          <Text style={styles.text}>Game over!</Text>
          <Text style={styles.text}>Score: 0</Text>
        </>
      );
    }

    return (
      <>
        <Text style={styles.text}>Word: {guessedWord}</Text>
        <Text style={styles.text}>Remaining Lives: {remainingLives}</Text>
        <Text style={styles.text}>Score: {score}</Text>
        <Text style={styles.text}>High Score: {highScore}</Text>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {renderGameStatus()}

      {guessedWord === word || remainingLives === 0 ? (
        <Button title="New Game" onPress={handleStartNewGame} />
      ) : (
        <>
          <TextInput
            placeholder="Enter a letter to guess word..."
            onChangeText={setInputLetter}
            maxLength={1}
            value={inputLetter}
            style={styles.input}
          />
          <Button
            title="Guess"
            onPress={handleGuess}
            disabled={!guessedWord}
            color={'purple'}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
    padding: 20,
    justifyContent: 'center',
    // alignItems: 'center',
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
  },
  text: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
  },
});

export default HangmanComponent;
