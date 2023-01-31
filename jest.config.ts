import type { Config } from 'jest';
import { moduleNameMapper } from './jest/tools';

const config: Config = {
  testEnvironment: 'node',
  clearMocks: true,
  setupFilesAfterEnv: ['./jest/setup.ts'],
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text',
    'html',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/public',
    '*.js',
  ],
  testMatch: [
    '**/*.test.ts?(x)',
  ],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
};

export default config;
