# AI-Powered Task Management App - Firebase

A modern task management application built with React Native, Firebase, and OpenAI integration.

## Features

- 🤖 AI-powered task suggestions and descriptions
- ✨ Create, edit, and delete tasks
- ✅ Mark tasks as completed/pending
- 🎨 Colorful and intuitive UI
- 📱 Responsive mobile-first design
- 🔄 Real-time updates with Firebase
- 🎯 Task animations and transitions

## Tech Stack

- React Native with Expo
- TypeScript
- Firebase (Firestore)
- React Navigation
- OpenAI API integration
- React Native Paper UI components
- Formik & Yup for form management

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Hadionly/task-management-firebase.git
   ```
2. Navigate to the project directory:
   ```sh
   cd task-management-app
   ```
3. Install dependencies and json-server:
   ```sh
   npm install
   ```
4. Run the app:
   ```sh
   npx expo start
   ```

## Setting up Open AI

Update config file:
Go to `../config/api.config.ts`:

```typescript
export const API_CONFIG = {
  OPENAI_API_KEY: "API_KEY", // Replace with OpenAI Key
};
```

Replace API_KEY with OpenAI Key

Note: Your mobile device/emulator must be on the same network as your development machine.

## Usage

## Expo Go Setup and Usage

### Expo Go Installation

1. Install Expo Go on your mobile device:
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Running the App

1. Start Expo development server:

```sh
npx expo start
```

2. Connect to your app:

- Android: Scan QR code with Expo Go app
- iOS: Scan QR code with Camera app
- Emulator: Press 'a' for Android or 'i' for iOS

### Test Usage

1. Launch the app on your device/emulator
2. Create a new task using the + button
3. Use AI suggestions for task titles and descriptions
4. Manage tasks with intuitive swipe actions
5. Track task completion status

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```sh
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```sh
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, feel free to reach out to us at [hadieltighanidev.com](mailto:hadieltighanidev.com).
