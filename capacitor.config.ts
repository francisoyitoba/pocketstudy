import type { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = { appId: 'com.pocketstudy.app', appName: 'PocketStudy', webDir: 'dist', plugins: { LocalNotifications: { smallIcon: 'ic_stat_icon_config_sample', iconColor: '#47745a' }, CapacitorSQLite: { iosDatabaseLocation: 'Library/CapacitorDatabase', androidIsEncryption: false } } };
export default config;