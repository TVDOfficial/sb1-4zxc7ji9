import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Speech from 'expo-speech';
import { CalculatorButton } from '../../components/CalculatorButton';
import { useCalculatorStore } from '../../store/useCalculatorStore';
import { roasts, niceResponses, easterEggs } from '../../utils/roasts';

export default function CalculatorScreen() {
  const {
    display,
    personality,
    roastLevel,
    niceMode,
    actions: { appendNumber, setOperation, calculate, clear },
  } = useCalculatorStore();

  const speakRoast = useCallback(async () => {
    try {
      // Only use speech on native platforms
      if (Platform.OS === 'web') {
        return;
      }

      const currentRoasts = niceMode
        ? niceResponses
        : roasts[personality][roastLevel];
      const randomRoast =
        currentRoasts[Math.floor(Math.random() * currentRoasts.length)];

      // Check for easter eggs
      if (easterEggs[display]) {
        const easterEggResponses = easterEggs[display];
        const randomEasterEgg =
          easterEggResponses[Math.floor(Math.random() * easterEggResponses.length)];
        
        // Check if speech is available before trying to use it
        const voices = await Speech.getAvailableVoicesAsync();
        if (!voices || voices.length === 0) {
          console.warn('Speech not available');
          return;
        }

        await Speech.speak(randomEasterEgg, {
          rate: 0.9,
          pitch: 1.1,
          language: 'en-US',
        });
        return;
      }

      // Check if speech is available before trying to use it
      const voices = await Speech.getAvailableVoicesAsync();
      if (!voices || voices.length === 0) {
        console.warn('Speech not available');
        return;
      }

      await Speech.speak(randomRoast, {
        rate: 0.9,
        pitch: 1.1,
        language: 'en-US',
      });
    } catch (error) {
      console.warn('Speech error:', error);
      // Silently fail on speech errors - the calculator should still work
    }
  }, [display, niceMode, personality, roastLevel]);

  const handleCalculate = useCallback(() => {
    calculate();
    void speakRoast(); // void operator to explicitly ignore the promise
  }, [calculate, speakRoast]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{display}</Text>
      </View>
      <View style={styles.buttonGrid}>
        <View style={styles.row}>
          <CalculatorButton label="C" onPress={clear} />
          <CalculatorButton label="±" onPress={() => {}} />
          <CalculatorButton label="%" onPress={() => {}} />
          <CalculatorButton
            label="÷"
            onPress={() => setOperation('/')}
            isOperation
          />
        </View>
        <View style={styles.row}>
          <CalculatorButton label="7" onPress={() => appendNumber('7')} />
          <CalculatorButton label="8" onPress={() => appendNumber('8')} />
          <CalculatorButton label="9" onPress={() => appendNumber('9')} />
          <CalculatorButton
            label="×"
            onPress={() => setOperation('*')}
            isOperation
          />
        </View>
        <View style={styles.row}>
          <CalculatorButton label="4" onPress={() => appendNumber('4')} />
          <CalculatorButton label="5" onPress={() => appendNumber('5')} />
          <CalculatorButton label="6" onPress={() => appendNumber('6')} />
          <CalculatorButton
            label="-"
            onPress={() => setOperation('-')}
            isOperation
          />
        </View>
        <View style={styles.row}>
          <CalculatorButton label="1" onPress={() => appendNumber('1')} />
          <CalculatorButton label="2" onPress={() => appendNumber('2')} />
          <CalculatorButton label="3" onPress={() => appendNumber('3')} />
          <CalculatorButton
            label="+"
            onPress={() => setOperation('+')}
            isOperation
          />
        </View>
        <View style={styles.row}>
          <CalculatorButton
            label="0"
            onPress={() => appendNumber('0')}
            style={{ flex: 2 }}
          />
          <CalculatorButton label="." onPress={() => appendNumber('.')} />
          <CalculatorButton label="=" onPress={handleCalculate} isOperation />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  display: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  displayText: {
    color: 'white',
    fontSize: 64,
    textAlign: 'right',
    fontWeight: '300',
  },
  buttonGrid: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});