// Add missing React import to resolve the 'React' namespace for React.ReactNode
import React from 'react';

export interface SystemButton {
  id: string;
  name: string;
  url: string;
  description: string;
  icon: React.ReactNode;
  fullWidth?: boolean;
}