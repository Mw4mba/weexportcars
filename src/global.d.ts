// Declarations for non-TS assets imported in the project
// This file silences TypeScript errors for importing CSS and image assets in Next.js

declare module '*.css';
declare module '*.scss';
declare module '*.sass';

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';

declare module '*.webp';

// Allow importing JSON files without errors
declare module '*.json';
