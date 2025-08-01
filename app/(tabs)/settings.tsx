import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Bell, MapPin, Globe, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import { useSettings } from '@/hooks/useSettings';

export default function SettingsScreen() {
  const { settings, updateSetting } = useSettings();

  const settingsItems = [
    {
      section: 'Account',
      items: [
        {
          title: 'Profile',
          subtitle: 'Manage your account information',
          icon: User,
          onPress: () => Alert.alert('Coming Soon', 'Profile management will be available soon'),
        },
      ],
    },
    {
      section: 'Preferences',
      items: [
        {
          title: 'Notifications',
          subtitle: 'Push notifications for new places',
          icon: Bell,
          type: 'switch',
          value: settings.notifications,
          onToggle: (value: boolean) => updateSetting('notifications', value),
        },
        {
          title: 'Location Services',
          subtitle: 'Allow location access for nearby places',
          icon: MapPin,
          type: 'switch',
          value: settings.locationEnabled,
          onToggle: (value: boolean) => updateSetting('locationEnabled', value),
        },
        {
          title: 'Language',
          subtitle: 'English (US)',
          icon: Globe,
          onPress: () => Alert.alert('Coming Soon', 'Language selection will be available soon'),
        },
      ],
    },
    {
      section: 'Support',
      items: [
        {
          title: 'Privacy Policy',
          subtitle: 'How we protect your data',
          icon: Shield,
          onPress: () => Alert.alert('Privacy Policy', 'Your privacy is important to us. We only collect data necessary to provide our services.'),
        },
        {
          title: 'Help & Support',
          subtitle: 'Get help with the app',
          icon: HelpCircle,
          onPress: () => Alert.alert('Help', 'Need help? Contact us at support@placesapp.com'),
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Customize your experience</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingsItems.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.section}</Text>
            
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={styles.settingItem}
                onPress={item.onPress}
                disabled={item.type === 'switch'}
              >
                <View style={styles.settingIcon}>
                  <item.icon size={20} color="#64748B" />
                </View>
                
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>{item.title}</Text>
                  <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                </View>

                {item.type === 'switch' ? (
                  <Switch
                    value={item.value}
                    onValueChange={item.onToggle}
                    trackColor={{ false: '#E2E8F0', true: '#60A5FA' }}
                    thumbColor={item.value ? '#2563EB' : '#FFFFFF'}
                  />
                ) : (
                  <ChevronRight size={20} color="#CBD5E1" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.settingItem, styles.signOutItem]}
            onPress={() => Alert.alert('Sign Out', 'Are you sure you want to sign out?')}
          >
            <View style={styles.settingIcon}>
              <LogOut size={20} color="#EF4444" />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, styles.signOutText]}>
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
          <Text style={styles.copyrightText}>© 2024 Places App</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  signOutItem: {
    borderBottomWidth: 0,
  },
  signOutText: {
    color: '#EF4444',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  versionText: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    color: '#CBD5E1',
  },
});