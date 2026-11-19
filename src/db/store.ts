import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, type SQLiteDBConnection } from '@capacitor-community/sqlite';
import type { StudyState } from '../types';
import { migrations } from './migrations';
const STORAGE_KEY = 'pocketstudy.state';
export const emptyState = (): StudyState => ({ subjects: [], topics: [], flashcards: [], exams: [], sessions: [], theme: 'light', dailyGoalMinutes: 60, remindersEnabled: false });
let connection: Promise<SQLiteDBConnection> | null = null;
async function getDb(): Promise<SQLiteDBConnection> {
  if (!Capacitor.isNativePlatform()) throw new Error('Native SQLite is only available in the Android app.');
  if (!connection) connection = (async () => {
    const sqlite = new SQLiteConnection(CapacitorSQLite);
    await sqlite.addUpgradeStatement('pocketstudy', migrations);
    const consistent = await sqlite.checkConnectionsConsistency();
    const exists = await sqlite.isConnection('pocketstudy', false);
    const db = consistent.result && exists.result ? await sqlite.retrieveConnection('pocketstudy', false) : await sqlite.createConnection('pocketstudy', false, 'no-encryption', 1, false);
    const opened = await db.isDBOpen();
    if (!opened.result) await db.open();
    return db;
  })().catch(error => { connection = null; throw error; });
  return connection;
}
function validState(value: unknown): value is StudyState {
  if (!value || typeof value !== 'object') return false;
  const v = value as Partial<StudyState>;
  return Array.isArray(v.subjects) && Array.isArray(v.topics) && Array.isArray(v.flashcards) && Array.isArray(v.exams) && Array.isArray(v.sessions);
}
export async function loadState(): Promise<StudyState> {
  if (!Capacitor.isNativePlatform()) {
    try { const raw = localStorage.getItem(STORAGE_KEY); if (!raw) return emptyState(); const parsed: unknown = JSON.parse(raw); return validState(parsed) ? { ...emptyState(), ...parsed } : emptyState(); }
    catch { return emptyState(); }
  }
  const db = await getDb();
  const result = await db.query('SELECT payload FROM app_state WHERE id = 1 LIMIT 1;');
  const raw = result.values?.[0]?.payload;
  if (typeof raw !== 'string') return emptyState();
  try { const parsed: unknown = JSON.parse(raw); return validState(parsed) ? { ...emptyState(), ...parsed } : emptyState(); }
  catch { throw new Error('Your study database could not be read.'); }
}
export async function saveState(state: StudyState): Promise<void> {
  const payload = JSON.stringify(state);
  if (!Capacitor.isNativePlatform()) { localStorage.setItem(STORAGE_KEY, payload); return; }
  const db = await getDb();
  await db.run('INSERT INTO app_state(id, payload, updated_at) VALUES(1, ?, ?) ON CONFLICT(id) DO UPDATE SET payload = excluded.payload, updated_at = excluded.updated_at;', [payload, new Date().toISOString()]);
}
export const makeId = (): string => crypto.randomUUID();
export const nowIso = (): string => new Date().toISOString();