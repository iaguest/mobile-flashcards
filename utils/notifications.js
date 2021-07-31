import React from 'react'
import { AsyncStorage } from 'react-native'
import * as Notifications from 'expo-notifications'

const NOTIFICATION_KEY = 'Mobile-Flashcards:notifications'

function secondsUntilEightPM() {
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(20);
  tomorrow.setMinutes(0);
  return (tomorrow - new Date()) / 1000;
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
          Notifications.requestPermissionsAsync()
            .then(({status})=> {
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync();
                Notifications.scheduleNotificationAsync({
                  content: {
                    title: 'Complete a quiz',
                    body: "👋 Don't forget to complete at least one quiz today!",
                    sound: true
                  },
                  trigger: {
                    // seconds: 30,
                    seconds: secondsUntilEightPM(),
                    repeats: false,
                  }
                });

                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
              }
            });
      }
    });
}