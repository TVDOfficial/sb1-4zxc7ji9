import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCalculatorStore } from '../../store/useCalculatorStore';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const {
    personality,
    roastLevel,
    profanityEnabled,
    niceMode,
    actions: { setPersonality, setRoastLevel, toggleProfanity, toggleNiceMode },
  } = useCalculatorStore();

  const personalities = [
    { id: 'sassy', name: 'Sassy AI', icon: 'happy' },
    { id: 'teacher', name: 'Angry Teacher', icon: 'school' },
    { id: 'genius', name: 'Evil Genius', icon: 'nuclear' },
    { id: 'stoner', name: 'Lazy Stoner', icon: 'leaf' },
    { id: 'teen', name: 'Annoyed Teen', icon: 'phone-portrait' },
    { id: 'grandma', name: 'Southern Grandma', icon: 'heart' },
  ];

  const roastLevels = [
    { id: 'mild', name: 'Mild' },
    { id: 'medium', name: 'Medium' },
    { id: 'brutal', name: 'Brutal' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personality</Text>
          {personalities.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={[
                styles.option,
                personality === p.id && styles.selectedOption,
              ]}
              onPress={() => setPersonality(p.id)}>
              <Ionicons
                name={p.icon}
                size={24}
                color={personality === p.id ? '#FF9500' : '#FFFFFF'}
              />
              <Text
                style={[
                  styles.optionText,
                  personality === p.id && styles.selectedOptionText,
                ]}>
                {p.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Roast Intensity</Text>
          {roastLevels.map((level) => (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.option,
                roastLevel === level.id && styles.selectedOption,
              ]}
              onPress={() => setRoastLevel(level.id)}>
              <Text
                style={[
                  styles.optionText,
                  roastLevel === level.id && styles.selectedOptionText,
                ]}>
                {level.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.switchOption}>
            <Text style={styles.switchText}>Enable Profanity</Text>
            <Switch
              value={profanityEnabled}
              onValueChange={toggleProfanity}
              trackColor={{ false: '#767577', true: '#FF9500' }}
              thumbColor={profanityEnabled ? '#FFFFFF' : '#f4f3f4'}
            />
          </View>

          <View style={styles.switchOption}>
            <Text style={styles.switchText}>Nice Mode</Text>
            <Switch
              value={niceMode}
              onValueChange={toggleNiceMode}
              trackColor={{ false: '#767577', true: '#FF9500' }}
              thumbColor={niceMode ? '#FFFFFF' : '#f4f3f4'}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  sectionTitle: {
    color: '#FF9500',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#2C2C2E',
    borderColor: '#FF9500',
    borderWidth: 1,
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
  selectedOptionText: {
    color: '#FF9500',
    fontWeight: '600',
  },
  switchOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    marginBottom: 10,
  },
  switchText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});