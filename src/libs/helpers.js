// @flow
import type { Importance } from './types';

export const newUniqueId = () => `_${Math.random().toString(36).substr(2, 9)}`;

export const importanceToText = (i: Importance) => {
  switch (i) {
    case 'normal':
      return 'Обычная';
    case 'important':
      return 'Важная';
    default:
      return 'Очень важная';
  }
};

export const timeFormat = 'DD.MM.YY HH:mm';

export const hoursInDayRange: number[] = Array.from({ length: 24 }, (v, k) => k + 1);
