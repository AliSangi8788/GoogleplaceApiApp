import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Settings {
  notifications: boolean;
  locationEnabled: boolean;
  language: string;
}

const SETTINGS_KEY = 'settings';

const defaultSettings: Settings = {
  notifications: true,
  locationEnabled: true,
  language: 'en',
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem(SETTINGS_KEY);
      if (stored) {
        setSettings({ ...defaultSettings, ...JSON.parse(stored) });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const updateSetting = async <K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) => {
    try {
      const newSettings = { ...settings, [key]: value };
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error('Error updating setting:', error);
    }
  };

  return {
    settings,
    updateSetting,
  };
}