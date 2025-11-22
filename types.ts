import React from 'react';

export interface Project {
  id: number;
  title: string;
  role: string;
  time?: string; // Added time field
  description: string;
  tech: string[];
  image: string;
  link: string | null; // Allow null for secret projects
}

export interface ExperienceItem {
  id: number;
  year: string;
  title: string;
  subtitle: string;
  type: 'education' | 'work';
  description: string;
}

export interface MapStat {
  label: string;
  value: number;
  icon: React.ReactNode;
}