# Google Places Discovery App

A modern React Native application built with Expo that allows users to discover, search, and save their favorite places using location-based services. The app features a clean, intuitive interface with comprehensive place information, reviews, and favorites management.

## 🚀 Features

- **Smart Search**: Real-time place search with autocomplete suggestions
- **Location-Based Discovery**: Find nearby places based on your current location
- **Category Filtering**: Filter places by type (restaurants, hotels, cafes, shopping, etc.)
- **Favorites System**: Save and manage your favorite places
- **Detailed Place Information**: View ratings, reviews, contact info, and opening hours
- **Responsive Design**: Optimized for mobile, tablet, and web platforms
- **Modern UI**: Clean design with smooth animations and micro-interactions

## 📱 Screenshots

The app includes four main tabs:
- **Search**: Discover places with smart search and filtering
- **Favorites**: Manage your saved places
- **Nearby**: Find places around your current location
- **Settings**: Customize app preferences and account settings

## 🛠 Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router with tab-based navigation
- **State Management**: React Hooks with AsyncStorage
- **Styling**: StyleSheet with responsive design
- **Icons**: Lucide React Native
- **Storage**: AsyncStorage for local data persistence
- **Location Services**: Web Geolocation API / Expo Location

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Expo CLI** (optional, for additional development tools)

### For Mobile Development:
- **Expo Go app** on your mobile device (iOS/Android)
- Or **Android Studio** for Android emulator
- Or **Xcode** for iOS simulator (macOS only)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd google-places-app
```

### 2. Install Dependencies

```bash
npm install
```

Or if you prefer yarn:

```bash
yarn install
```

### 3. Start the Development Server

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

This will start the Expo development server and display a QR code in your terminal.

## 📱 Running on Different Platforms

### Web Browser
The app will automatically open in your default web browser at `http://localhost:8081`

### Mobile Device (Recommended)

1. **Install Expo Go** on your mobile device:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Scan the QR Code**:
   - Open Expo Go app
   - Scan the QR code displayed in your terminal
   - The app will load on your device

### iOS Simulator (macOS only)

```bash
# Press 'i' in the terminal after starting the dev server
# Or run directly:
npx expo start --ios
```

### Android Emulator

```bash
# Press 'a' in the terminal after starting the dev server
# Or run directly:
npx expo start --android
```

## 🔧 Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build:web` | Build for web production |
| `npm run lint` | Run ESLint for code quality |

## 📁 Project Structure

```
├── app/                          # App screens and navigation
│   ├── (tabs)/                   # Tab-based navigation
│   │   ├── _layout.tsx           # Tab layout configuration
│   │   ├── index.tsx             # Search screen
│   │   ├── favorites.tsx         # Favorites management
│   │   ├── nearby.tsx            # Nearby places
│   │   └── settings.tsx          # App settings
│   ├── _layout.tsx               # Root layout
│   └── +not-found.tsx            # 404 error screen
├── components/                   # Reusable UI components
│   ├── PlaceCard.tsx             # Place information card
│   └── SearchFilters.tsx         # Category filter component
├── hooks/                        # Custom React hooks
│   ├── usePlacesSearch.ts        # Places search logic
│   ├── useFavorites.ts           # Favorites management
│   ├── useLocation.ts            # Location services
│   ├── useSettings.ts            # App settings
│   └── useFrameworkReady.ts      # Framework initialization
├── types/                        # TypeScript type definitions
│   └── places.ts                 # Place-related types
├── assets/                       # Static assets
│   └── images/                   # App icons and images
├── app.json                      # Expo configuration
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Project documentation
```

## 🎨 Customization

### Styling
The app uses a consistent design system with:
- **Primary Color**: #2563EB (Blue)
- **Success Color**: #10B981 (Green)
- **Warning Color**: #F59E0B (Amber)
- **Error Color**: #EF4444 (Red)
- **Spacing System**: 8px base unit
- **Typography**: System fonts with proper hierarchy

### Adding New Features
1. Create new components in the `components/` directory
2. Add custom hooks in the `hooks/` directory
3. Define types in the `types/` directory
4. Update navigation in `app/(tabs)/_layout.tsx`

## 🔒 Privacy & Permissions

The app requests the following permissions:
- **Location Access**: To find nearby places and provide location-based recommendations
- **Storage Access**: To save favorites and app settings locally

All data is stored locally on your device using AsyncStorage.

## 🐛 Troubleshooting

### Common Issues

**Metro bundler issues:**
```bash
# Clear Metro cache
npx expo start --clear
```

**Node modules issues:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

**Expo Go connection issues:**
- Ensure your mobile device and computer are on the same WiFi network
- Try restarting the Expo development server
- Check firewall settings

**Location not working:**
- Grant location permissions when prompted
- For web: ensure HTTPS or localhost
- Check browser location settings

### Performance Optimization

For better performance:
- Enable Hermes JavaScript engine (enabled by default)
- Use production builds for testing: `expo build`
- Optimize images and assets
- Implement proper error boundaries

## 📚 API Integration

This app currently uses mock data for demonstration. To integrate with real APIs:

1. **Google Places API**:
   - Get API key from Google Cloud Console
   - Enable Places API
   - Replace mock data in `hooks/usePlacesSearch.ts`

2. **Location Services**:
   - The app uses web geolocation for web platform
   - For native platforms, integrate `expo-location`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Search existing issues in the repository
3. Create a new issue with detailed information
4. Join the Expo community for additional support

## 🔄 Updates

To update the app:

```bash
# Update Expo SDK
npx expo install --fix

# Update other dependencies
npm update
```

---

**Happy coding! 🎉**

Built with ❤️ using React Native and Expo