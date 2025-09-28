import {config} from 'dotenv';
import {CertificatesResource, CountryCode, DomainsResource, GandiSDK} from "../src";

// Load environment variables from .env file
config();

// Test configuration
export const TEST_CONFIG = {
    // Use sandbox environment for testing
    baseURL: 'https://api.sandbox.gandi.net/v5',
    // These should be set as environment variables
    apiKey: process.env.GANDI_API_KEY || '',
    pat: process.env.GANDI_PAT || '',
    // Test domain will be generated randomly
    testDomain: '',
    // Test certificate ID will be set after creation
    testCertificateId: '',
    family: process.env.FAMILY || '',
    given: process.env.GIVEN || '',
    type: process.env.TYPE || 'individual',
    city: process.env.CITY || '',
    phone: process.env.PHONE || '',
    zip: process.env.ZIP || '',
    country: process.env.COUNTRY || 'FR',
    state: process.env.STATE || '',
};

// Initialize clients
export function createTestClient() {
    if (!TEST_CONFIG.pat && !TEST_CONFIG.apiKey) {
        throw new Error('Please set GANDI_PAT or GANDI_API_KEY environment variable');
    }

    const sdk = new GandiSDK({
        baseURL: TEST_CONFIG.baseURL,
        authMode: TEST_CONFIG.pat ? 'pat' : 'apiKey',
        ...(TEST_CONFIG.pat ? {pat: TEST_CONFIG.pat} : {apiKey: TEST_CONFIG.apiKey}),
    })

    return {
        sdk,
        client: sdk.client,
        domains: sdk.domains,
        certificates: sdk.certificates,
    };
}

// Generate random domain name for testing
export function generateRandomDomain(): string {
    const randomString = Math.random().toString(36).substring(2, 15);
    const tlds = ['com'];
    const randomTld = tlds[Math.floor(Math.random() * tlds.length)];
    return `test-${randomString}.${randomTld}`;
}

// Generate test contact data
export function generateTestContact() {
    return {
        country: TEST_CONFIG.country as CountryCode,
        email: `test-${Math.random().toString(36).substring(2, 15)}@example.com`,
        family: TEST_CONFIG.family,
        given: TEST_CONFIG.given,
        streetaddr: '123 Test Street',
        city: TEST_CONFIG.city,
        state: TEST_CONFIG.state,
        zip: TEST_CONFIG.zip,
        phone: TEST_CONFIG.phone,
        type: TEST_CONFIG.type,
    };
}

// Wait for a specified amount of time
export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Clean up test resources
export async function cleanupTestResources(
    domains: DomainsResource,
    certificates: CertificatesResource,
    domainName?: string,
    certificateId?: string
) {
    console.log('🧹 Cleaning up test resources...');

    try {
        // Delete test certificate if it exists
        if (certificateId) {
            try {
                await certificates.revokeCertificate(certificateId);
                console.log(`✅ Revoked certificate ${certificateId}`);
            } catch (error) {
                console.log(`⚠️  Could not revoke certificate ${certificateId}:`, error.message);
            }
        }

        // Delete test domain if it exists
        if (domainName) {
            try {
                await domains.deleteDomain(domainName);
                console.log(`✅ Deleted domain ${domainName}`);
            } catch (error) {
                console.log(`⚠️  Could not delete domain ${domainName}:`, error.message);
            }
        }
    } catch (error) {
        console.log('⚠️  Error during cleanup:', error.message);
    }
}
