# Gandi SDK

[![npm version](https://img.shields.io/npm/v/@qualesme/gandi-sdk.svg)](https://www.npmjs.com/package/@qualesme/gandi-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An unofficial TypeScript SDK for the Gandi API v5. This package provides a clean, type-safe interface for interacting with Gandi's domain management services.

> **Disclaimer**: This is an unofficial SDK and is not affiliated with or endorsed by Gandi.

## Features

- 🚀 **TypeScript Support**: Full type definitions for all API endpoints
- 🔒 **Authentication**: Support for both API Key and Personal Access Token (PAT) authentication
- 🌐 **Domain Management**: Complete domain lifecycle management
- 📋 **Comprehensive API Coverage**: All major Gandi API v5 domain endpoints
- 🛡️ **Type Safety**: Strongly typed request/response interfaces
- 📦 **Zero Dependencies**: Built on top of axios with minimal overhead

## Installation

```bash
npm install @qualesme/gandi-sdk
```

## Quick Start

```typescript
import { GandiClient, DomainsResource } from '@qualesme/gandi-sdk';

// Initialize the client with your API key or PAT
const client = new GandiClient({
  baseURL: "https://api.gandi.net/v5",
  authMode: "pat",
  pat: "your-personal-access-token"
});

// Create domains resource
const domains = new DomainsResource(client);

// List your domains
const domainList = await domains.listDomains({
  page: 1,
  per_page: 10
});

console.log(domainList);
```

## Authentication

The SDK supports two authentication methods:

### API Key Authentication
```typescript
import { GandiClient, DomainsResource } from '@qualesme/gandi-sdk';

const client = new GandiClient({
  baseURL: "https://api.gandi.net/v5",
  authMode: "apiKey",
  apiKey: "your-api-key"
});

const domains = new DomainsResource(client);
```

### Personal Access Token (PAT) Authentication
```typescript
import { GandiClient, DomainsResource } from '@qualesme/gandi-sdk';

const client = new GandiClient({
  baseURL: "https://api.gandi.net/v5",
  authMode: "pat",
  pat: "your-personal-access-token"
});

const domains = new DomainsResource(client);
```

### Sandbox Environment
```typescript
import { GandiClient, DomainsResource } from '@qualesme/gandi-sdk';

// For testing with Gandi's sandbox environment
const client = new GandiClient({
  baseURL: "https://api.sandbox.gandi.net/v5",
  authMode: "pat",
  pat: "your-sandbox-pat"
});

const domains = new DomainsResource(client);
```

## API Reference

### Domain Management

#### List Domains
```typescript
// Get all domains
const domains = await domains.listDomains({
  page: 1,
  per_page: 50,
  tld: 'com'
});

// Get domains as CSV
const csvData = await domains.listDomains({}, true);
```

#### Check Domain Availability
```typescript
const availability = await domains.checkDomainAvailability({
  name: 'example.com',
  country: 'US'
});
```

#### Create Domain
```typescript
const newDomain = await domains.createNewDomain({
  fqdn: 'example.com',
  owner: {
    country: 'US',
    email: 'owner@example.com',
    family: 'Doe',
    given: 'John',
    streetaddr: '123 Main St',
    type: 'individual'
  },
  duration: 1
});
```

#### Get Domain Information
```typescript
const domain = await domains.getDomain('example.com');
```

#### Update Domain Contacts
```typescript
await domains.updateDomainContacts('example.com', {
  owner: {
    country: 'US',
    email: 'newowner@example.com',
    family: 'Smith',
    given: 'Jane',
    streetaddr: '456 Oak Ave',
    type: 'individual'
  }
});
```

#### Domain Renewal
```typescript
// Get renewal information
const renewalInfo = await domains.getDomainRenewalInfo('example.com');

// Renew domain
await domains.renewDomain('example.com', 1); // 1 year renewal
```

#### Auto-renewal Management
```typescript
// Enable auto-renewal
await domains.editAutoRenew('example.com', {
  enabled: true,
  duration: 1
});
```

### DNS Management

#### DNSSEC Management
```typescript
// Get DNSSEC status
const dnssec = await domains.getDNSSECWithLiveDNS('example.com');

// Activate DNSSEC
await domains.activateDNSSECWithLiveDNS('example.com');

// Deactivate DNSSEC
await domains.disableDNSSECWithLiveDNS('example.com');
```

#### Nameserver Management
```typescript
// Get current nameservers
const nameservers = await domains.getNameservers('example.com');

// Set nameservers
await domains.setNameservers('example.com', {
  nameservers: ['ns1.example.com', 'ns2.example.com']
});
```

### Domain Transfers

#### Transfer Domain to Gandi
```typescript
const transfer = await domains.transferDomainToGandi({
  fqdn: 'example.com',
  owner: {
    country: 'US',
    email: 'owner@example.com',
    family: 'Doe',
    given: 'John',
    streetaddr: '123 Main St',
    type: 'individual'
  },
  authinfo: 'your-auth-code'
});
```

#### Check Transfer Availability
```typescript
const availability = await domains.checkTransferAvailability(
  'example.com',
  'your-auth-code'
);
```

### Web Redirections

#### List Web Redirections
```typescript
const redirections = await domains.listWebRedirections('example.com');
```

#### Create Web Redirection
```typescript
await domains.createWebRedirection('example.com', {
  host: 'www',
  type: 'http301',
  url: 'https://example.com',
  protocol: 'https',
  override: false
});
```

### Domain Tags

#### Manage Domain Tags
```typescript
// Get domain tags
const tags = await domains.getDomainTags('example.com');

// Add tag to domain
await domains.attachTagToDomain('example.com', 'production');

// Update all tags
await domains.updateAllTagsForDomain('example.com', ['production', 'important']);

// Update some tags
await domains.updateSomeTagsForDomain('example.com', ['new-tag'], ['old-tag']);
```

### TLD Information

#### List Available TLDs
```typescript
const tlds = await domains.listAvailableTlds({
  category: 'generic',
  page: 1,
  per_page: 20
});
```

#### Get TLD Information
```typescript
const tldInfo = await domains.getTldInfo('com');
```

## Error Handling

The SDK uses axios for HTTP requests, so errors are thrown as axios error objects:

```typescript
try {
  const domain = await domains.getDomain('example.com');
} catch (error) {
  if (error.response) {
    // Server responded with error status
    console.error('API Error:', error.response.status, error.response.data);
  } else if (error.request) {
    // Request was made but no response received
    console.error('Network Error:', error.message);
  } else {
    // Something else happened
    console.error('Error:', error.message);
  }
}
```

## TypeScript Support

The SDK is written in TypeScript and provides comprehensive type definitions:

```typescript
import { 
  GandiClient,
  DomainsResource,
  CreateDomainPayload, 
  DomainContacts,
  CountryCode 
} from '@qualesme/gandi-sdk';

const client = new GandiClient({
  baseURL: "https://api.gandi.net/v5",
  authMode: "pat",
  pat: "your-pat"
});

const domains = new DomainsResource(client);

const payload: CreateDomainPayload = {
  fqdn: 'example.com',
  owner: {
    country: CountryCode.US,
    email: 'owner@example.com',
    family: 'Doe',
    given: 'John',
    streetaddr: '123 Main St',
    type: 'individual'
  }
};
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This is an unofficial SDK for the Gandi API. It is not affiliated with, endorsed by, or connected to Gandi in any way. Use at your own risk.

## Support

For issues and questions:
- 🐛 [Report a bug](https://github.com/qualesme/gandi-sdk/issues)
- 💡 [Request a feature](https://github.com/qualesme/gandi-sdk/issues)
- 📖 [Gandi API Documentation](https://api.gandi.net/docs/)

## Changelog

### v0.1.4
- Finished Certificate management implementation
- Added unit tests
- Added Billing resource (https://api.gandi.net/docs/billing/)

### v0.1.3
- Started Certificate management implementation
- Renamed Utils to utils
- Changed some functions arguments to have dryRun then sharingId everywhere

### v0.1.2
- Initial release
- Domain management functionality
- TypeScript support
- Authentication with API key and PAT
