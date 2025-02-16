import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const achievements = [
  {
    id: 'basic',
    title: 'Math Shame Master',
    description: 'Used the calculator for 1+1... seriously?',
    icon: '🤦‍♂️',
    locked: false,
  },
  {
    id: 'roasted',
    title: 'Thick Skin',
    description: 'Got roasted 100 times and kept coming back',
    icon: '🔥',
    locked: true,
  },
  {
    id: 'easter',
    title: 'Easter Egg Hunter',
    description: 'Found your first hidden calculator response',
    icon: '🥚',
    locked: true,
  },
  // Add more achievements...
];

export default function AchievementsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Achievements</Text>
          <Text style={styles.subtitle}>
            Your journey of mathematical shame...
          </Text>
        </View>

        <View style={styles.achievementsContainer}>
          {achievements.map((achievement) => (
            <View
              key={achievement.id}
              style={[
                styles.achievement,
                achievement.locked && styles.achievementLocked,
              ]}>
              <Text style={styles.achievementIcon}>{achievement.icon}</Text>
              <View style={styles.achievementContent}>
                <Text
                  style={[
                    styles.achievementTitle,
                    achievement.locked && styles.achievementTitleLocked,
                  ]}>
                  {achievement.title}
                </Text>
                <Text
                  style={[
                    styles.achievementDescription,
                    achievement.locked && styles.achievementDescriptionLocked,
                  ]}>
                  {achievement.description}
                </Text>
              </View>
              {achievement.locked && (
                <Ionicons name="lock-closed" size={24} color="#666666" />
              )}
            </View>
          ))}
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
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  title: {
    color: '#FF9500',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#999999',
    fontSize: 16,
    marginTop: 5,
  },
  achievementsContainer: {
    padding: 20,
  },
  achievement: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    marginBottom: 10,
  },
  achievementLocked: {
    opacity: 0.7,
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  achievementTitleLocked: {
    color: '#666666',
  },
  achievementDescription: {
    color: '#999999',
    fontSize: 14,
    marginTop: 2,
  },
  achievementDescriptionLocked: {
    color: '#666666',
  },
});