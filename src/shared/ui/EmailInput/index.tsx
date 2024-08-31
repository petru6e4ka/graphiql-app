'use client';

import { TextInput } from '@mantine/core';
import React from 'react';

export function EmailInput() {
  return <TextInput withAsterisk label="Email" placeholder="your@email.com" required />;
}
