import React from 'react'
import { AsyncStorage } from 'react-native'
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications'

const NOTIFICATION_KEY = 'Mobile-Flashcards:notifications'

function secondsUntilNextAlarm() {
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
          Permissions.askAsync(Permissions.NOTIFICATIONS)
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
                    //seconds: secondsUntilNextAlarm(),
                    seconds: 10,
                    repeats: false,
                  }
                });

                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
              }
            });
      }
    });
}