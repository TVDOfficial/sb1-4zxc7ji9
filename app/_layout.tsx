import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import * as Speech from 'expo-speech';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Initialize speech module
    const initSpeech = async () => {
      try {
        const voices = await Speech.getAvailableVoicesAsync();
        if (!voices) {
          console.warn('No voices available');
        }
      } catch (error) {
        console.warn('Speech initialization error:', error);
        // Speech might not be available, but app should still work
      }
    };

    // Using void operator to explicitly handle the promise
    void initSpeech();
  }, []);

  return (
    <>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </>
  );
}