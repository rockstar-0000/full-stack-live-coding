/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleNameMapper: {
    '^@repo/shared(.*)$': '<rootDir>/../../packages/shared/src$1',
  },
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
};
