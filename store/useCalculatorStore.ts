import { create } from 'zustand';

type Personality = 'sassy' | 'teacher' | 'genius' | 'stoner' | 'teen' | 'grandma';
type RoastLevel = 'mild' | 'medium' | 'brutal';

interface CalculatorState {
  display: string;
  result: string;
  memory: string;
  lastOperation: string | null;
  personality: Personality;
  roastLevel: RoastLevel;
  profanityEnabled: boolean;
  niceMode: boolean;
  actions: {
    appendNumber: (num: string) => void;
    setOperation: (op: string) => void;
    calculate: () => void;
    clear: () => void;
    setPersonality: (personality: Personality) => void;
    setRoastLevel: (level: RoastLevel) => void;
    toggleProfanity: () => void;
    toggleNiceMode: () => void;
  };
}

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
  display: '0',
  result: '',
  memory: '',
  lastOperation: null,
  personality: 'sassy',
  roastLevel: 'medium',
  profanityEnabled: false,
  niceMode: false,
  actions: {
    appendNumber: (num) =>
      set((state) => ({
        display: state.display === '0' ? num : state.display + num,
      })),
    setOperation: (op) =>
      set((state) => ({
        memory: state.display,
        display: '0',
        lastOperation: op,
      })),
    calculate: () => {
      const state = get();
      const num1 = parseFloat(state.memory);
      const num2 = parseFloat(state.display);
      let result = 0;

      switch (state.lastOperation) {
        case '+':
          result = num1 + num2;
          break;
        case '-':
          result = num1 - num2;
          break;
        case '*':
          result = num1 * num2;
          break;
        case '/':
          result = num1 / num2;
          break;
      }

      set({
        display: result.toString(),
        memory: '',
        lastOperation: null,
      });
    },
    clear: () =>
      set({
        display: '0',
        result: '',
        memory: '',
        lastOperation: null,
      }),
    setPersonality: (personality) => set({ personality }),
    setRoastLevel: (level) => set({ roastLevel }),
    toggleProfanity: () =>
      set((state) => ({ profanityEnabled: !state.profanityEnabled })),
    toggleNiceMode: () => set((state) => ({ niceMode: !state.niceMode })),
  },
}));