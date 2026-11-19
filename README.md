# PocketStudy

**Study smarter. Remember more.**

PocketStudy is an offline-first study companion for students. It organises subjects, topics, revision cards, exam dates and focus sessions without requiring an account or internet connection for core use.

## Features
- Subject library with topic organisation and mastery status (Not started, Learning, Mastered).
- Exam schedule with countdowns and upcoming exam list.
- Flashcards with question/answer flip and subject filtering.
- Focus timer with 15, 25, 45 and 60 minute presets.
- Study-session history, total study time and per-subject progress.
- Configurable daily study goal and light/dark appearance.
- Optional daily local notification reminder at 6:00 pm.
- JSON backup export and restore.
- Native Android SQLite persistence; browser preview uses localStorage.
- No login, cloud sync, analytics or advertising SDK integration.

## Stack
React 19, TypeScript, Vite 7, Capacitor 8, Capacitor SQLite, Capacitor Local Notifications and lucide-react.

## Requirements
Node.js 20.19+ or 22.12+ recommended for Vite 7. JDK 21 and Android Studio for Android builds.

## Run browser preview
1. Run npm install.
2. Run npm run dev.

## Generate Android project
1. Run npm install.
2. Run npm run build.
3. Run npx cap add android.
4. Run npx cap sync android.
5. Run npx cap open android and launch it from Android Studio.

Android application ID: com.pocketstudy.app

## Android safe areas and keyboard
The viewport opts into viewport-fit=cover. The app root, sticky header, bottom navigation and modal sheet account for CSS env(safe-area-inset-*) values. The bottom navigation reserves room for gesture/navigation bars. The modal is height-limited and scrollable so fields remain reachable when the keyboard opens. Verify windowSoftInputMode=adjustResize in the generated Android manifest and test both gesture and three-button navigation on physical devices.

## Data storage
Native Android uses SQLite with a versioned local state record. Browser preview uses localStorage. SQLite is configured with no-encryption; do not describe it as encrypted. Backups are exported only when the user requests them.

## Reminders
The optional reminder schedules a local notification at 6:00 pm. It uses Android notification permission and does not send data to a server.

## Release checklist
Generate and inspect Android project files; verify the app icon and notification small icon; test persistence, backup restore, focus timer, notification scheduling and safe areas on real devices; inspect the final dependency tree and Android manifest before completing Play Console Data Safety declarations.