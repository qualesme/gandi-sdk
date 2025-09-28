#!/usr/bin/env ts-node

/**
 * Gandi SDK Test Runner
 * 
 * This script runs comprehensive tests for the Gandi SDK, including:
 * - Domain management operations
 * - Certificate management operations
 * - Full integration workflow
 * 
 * Prerequisites:
 * 1. Set environment variables:
 *    - GANDI_PAT: Your Gandi Personal Access Token (recommended)
 *    - GANDI_API_KEY: Your Gandi API Key (alternative)
 * 
 * 2. Install dependencies:
 *    npm install
 * 
 * 3. Build the project:
 *    npm run build
 * 
 * Usage:
 *    npm run test
 *    or
 *    npx ts-node test/run-tests.ts
 */

import { config } from 'dotenv';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

// Load environment variables from .env file
config();

console.log('🚀 Gandi SDK Test Runner');
console.log('========================\n');

// Check if environment variables are set
const hasPat = !!process.env.GANDI_PAT;
const hasApiKey = !!process.env.GANDI_API_KEY;

if (!hasPat && !hasApiKey) {
  console.error('❌ Error: No authentication credentials found!');
  console.error('');
  console.error('Please set one of the following environment variables:');
  console.error('  GANDI_PAT=your-personal-access-token');
  console.error('  GANDI_API_KEY=your-api-key');
  console.error('');
  console.error('For sandbox testing, you can use:');
  console.error('  export GANDI_PAT=your-sandbox-pat');
  console.error('  npm run test');
  process.exit(1);
}

console.log('✅ Authentication credentials found');
if (hasPat) {
  console.log('   Using Personal Access Token (PAT)');
} else {
  console.log('   Using API Key');
}

// Check if dist directory exists
const distPath = join(process.cwd(), 'dist');
if (!existsSync(distPath)) {
  console.log('📦 Building project...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Project built successfully\n');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ Project already built\n');
}

// Run tests
console.log('🧪 Running tests...');
console.log('==================\n');

try {
  execSync('npx vitest run --reporter=verbose', { stdio: 'inherit' });
  console.log('\n✅ All tests completed successfully!');
} catch (error) {
  console.error('\n❌ Some tests failed');
  process.exit(1);
}
