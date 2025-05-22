import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  moduleNameMapper: {
    '@app/(.*)$': '<rootDir>/src/app/$1',
    '@core/(.*)$': '<rootDir>/src/app/core/$1',
    '@features/(.*)$': '<rootDir>/src/app/features/$1',
  },
};

export default config;
