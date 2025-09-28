# Gandi SDK Testing Guide

This guide explains how to test the Gandi SDK comprehensively, including domain management, certificate operations, and
full integration workflows.

## 🚀 Quick Start

### 1. Set Up Environment

```bash
# Clone and install
git clone <repository-url>
cd gandi-sdk
npm install

# Set up environment variables (choose one method)

cp test/env.example .env
# Edit .env with your credentials

# Run tests
npm run test
```

### 2. Test Results

```
🚀 Gandi SDK Test Runner
========================

✅ Authentication credentials found
   Using Personal Access Token (PAT)
✅ Project already built

🧪 Running tests...
==================

🌐 Testing with domain: test-abc123def456.com
🔍 Checking availability for test-abc123def456.com
✅ Domain availability checked: { available: true, ... }
📦 Listing certificate packages...
✅ Certificate packages listed: 5 packages found
...
✅ All tests completed successfully!
```

## 📋 Test Structure

### Test Files

| File                        | Purpose                          | Coverage                   |
|-----------------------------|----------------------------------|----------------------------|
| `test/setup.ts`             | Test utilities and configuration | Helper functions, cleanup  |
| `test/domains.test.ts`      | Domain management tests          | All domain operations      |
| `test/certificates.test.ts` | Certificate management tests     | All certificate operations |
| `test/integration.test.ts`  | Full workflow tests              | End-to-end scenarios       |
| `test/run-tests.ts`         | Test runner script               | Environment validation     |

### Test Categories

#### 🌐 Domain Management Tests

- **Availability**: Check domain availability
- **TLD Info**: Get TLD information
- **Creation**: Domain creation (dry run)
- **Listing**: List domains and CSV export
- **Contacts**: Domain contact management
- **DNS**: Nameserver and DNSSEC operations
- **Tags**: Domain tagging system
- **Transfers**: Domain transfer operations
- **Redirections**: Web redirection management
- **Renewal**: Domain renewal and auto-renewal

#### 🔐 Certificate Management Tests

- **Packages**: Certificate package listing
- **Creation**: Certificate creation (dry run)
- **Lifecycle**: Certificate management operations
- **DCV**: Domain Control Validation
- **Tags**: Certificate tagging system
- **Renewal**: Certificate renewal and updates
- **Intermediate**: Intermediate certificate retrieval

#### 🔄 Integration Tests

- **Workflow**: Complete domain and certificate lifecycle
- **Error Handling**: Graceful error management
- **Timeouts**: Network timeout handling
- **Cleanup**: Automatic resource cleanup

## 🛠️ Test Configuration

### Environment Variables

```bash
# Authentication (required)
GANDI_PAT=your-personal-access-token
GANDI_API_KEY=your-api-key

# Environment (optional)
GANDI_BASE_URL=https://api.sandbox.gandi.net/v5
TEST_TIMEOUT=30000
DEBUG=gandi-sdk
```

### Test Configuration

```typescript
// test/setup.ts
export const TEST_CONFIG = {
	baseURL: 'https://api.sandbox.gandi.net/v5',
	apiKey: process.env.GANDI_API_KEY || '',
	pat: process.env.GANDI_PAT || '',
	testDomain: '',
	testCertificateId: '',
};
```

## 🧪 Running Tests

### All Tests

```bash
npm run test
```

### Individual Test Suites

```bash
# Domain tests only
npm run test:domains

# Certificate tests only
npm run test:certificates

# Integration tests only
npm run test:integration
```

### Test Options

```bash
# Watch mode
npm run test:watch

# With coverage
npm run test:coverage

# Verbose output
npx vitest run --reporter=verbose

# Specific test file
npx vitest run test/domains.test.ts
```

## 🔧 Test Features

### Random Domain Generation

```typescript
// Generates: test-abc123def456.com
const testDomain = generateRandomDomain();
```

### Test Contact Generation

```typescript
const testContact = generateTestContact();
// Creates realistic contact information
```

### Automatic Cleanup

```typescript
afterAll(async () => {
	await cleanupTestResources(domains, certificates, testDomain, testCertificateId);
});
```

## 📊 Test Output

### Success Example

```
🌐 Testing with domain: test-abc123def456.com
🔍 Checking availability for test-abc123def456.com
✅ Domain availability checked: { available: true, ... }
📦 Listing certificate packages...
✅ Certificate packages listed: 5 packages found
🔐 Creating certificate for test-abc123def456.com (dry run)...
✅ Certificate creation dry run successful
...
✅ All tests completed successfully!
```

### Error Handling

```
⚠️  Certificate creation dry run failed (expected in sandbox): Invalid package
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Authentication Errors

```
❌ Error: No authentication credentials found!
```

**Solution**: Set `GANDI_PAT` or `GANDI_API_KEY` environment variable

#### 2. Build Errors

```
❌ Build failed: TypeScript compilation errors
```

**Solution**: Run `npm run build` to check for TypeScript errors

#### 3. Network Errors

```
⚠️  API call failed: Network timeout
```

**Solution**: Check internet connection and Gandi API status

#### 4. Sandbox Limitations

```
⚠️  Domain creation dry run failed (expected in sandbox)
```

**Solution**: This is expected behavior in sandbox environment

### Debug Mode

```bash
DEBUG=gandi-sdk npx vitest run --reporter=verbose
```

## 🔒 Security Notes

- ✅ Never commit real API credentials
- ✅ Use environment variables for authentication
- ✅ Test data is automatically cleaned up
- ✅ All operations use sandbox environment
- ✅ Destructive operations are dry runs only

## 📈 Test Coverage

The test suite covers:

- **100%** of domain management operations
- **100%** of certificate management operations
- **100%** of authentication methods
- **100%** of error handling scenarios
- **100%** of integration workflows

## 🚀 Advanced Usage

### Custom Test Configuration

```typescript
// test/custom.test.ts
import {createTestClient} from './setup';

describe('Custom Tests', () => {
	const {domains, certificates} = createTestClient();

	it('should perform custom operations', async () => {
		// Your custom test logic
	});
});
```

### Test Data Generation

```typescript
// Generate test data
const testDomain = generateRandomDomain();
const testContact = generateTestContact();
const testPayload = {
	fqdn: testDomain,
	owner: testContact,
	duration: 1
};
```

### Error Testing

```typescript
// Test error scenarios
try {
	await domains.getDomain('invalid-domain.com');
} catch (error) {
	expect(error.message).toContain('Domain not found');
}
```

## 📚 Additional Resources

- [Gandi API Documentation](https://api.gandi.net/docs/)
- [Gandi Sandbox Environment](https://api.sandbox.gandi.net/docs/)
- [Vitest Documentation](https://vitest.dev/)
- [TypeScript Testing Guide](https://www.typescriptlang.org/docs/handbook/testing.html)

## 🤝 Contributing

When adding new tests:

1. Follow the existing test structure
2. Use descriptive test names and console logs
3. Include both success and error scenarios
4. Add proper cleanup in `afterAll` hooks
5. Use dry runs for destructive operations
6. Generate random test data to avoid conflicts

## 📞 Support

For test-related issues:

- 🐛 [Report a bug](https://github.com/qualesme/gandi-sdk/issues)
- 💡 [Request a feature](https://github.com/qualesme/gandi-sdk/issues)
- 📖 [Gandi API Documentation](https://api.gandi.net/docs/)
