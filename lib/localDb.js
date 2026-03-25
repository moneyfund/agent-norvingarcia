'use client';

import { mockProfile, mockProperties } from './mockData';

const STORAGE_KEYS = {
  properties: 'ng_properties',
  profile: 'ng_profile'
};

const hasWindow = () => typeof window !== 'undefined';

const read = (key, fallback) => {
  if (!hasWindow()) return fallback;
  const raw = window.localStorage.getItem(key);
  return raw ? JSON.parse(raw) : fallback;
};

const write = (key, value) => {
  if (!hasWindow()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const db = {
  getProperties: () => read(STORAGE_KEYS.properties, mockProperties),
  saveProperties: (properties) => write(STORAGE_KEYS.properties, properties),
  getProfile: () => read(STORAGE_KEYS.profile, mockProfile),
  saveProfile: (profile) => write(STORAGE_KEYS.profile, profile)
};
