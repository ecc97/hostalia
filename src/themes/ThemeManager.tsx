'use client';

import { useEffect } from 'react';
import { useDarkModeStore } from '@/store/DarkModeStore';

export default function ThemeManager() {
  const { darkMode } = useDarkModeStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return null;
}

