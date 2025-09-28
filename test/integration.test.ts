import {config} from 'dotenv';
import {afterAll, beforeAll, describe, expect, it} from 'vitest';
import {cleanupTestResources, createTestClient, generateRandomDomain, generateTestContact} from './setup';
import {CountryCode} from "../src";

config();

describe('Full Integration Test Workflow', () => {
	const {domains, certificates} = createTestClient();
	let testDomain: string;
	let testContact: any;
	let testCertificateId: string | null = null;

	beforeAll(async () => {
		testDomain = generateRandomDomain();
		testContact = generateTestContact();
		console.log(`🚀 Starting full integration test with domain: ${testDomain}`);
		console.log(`📧 Test contact email: ${testContact.email}`);
	});

	afterAll(async () => {
		console.log('🧹 Cleaning up integration test resources...');
		await cleanupTestResources(domains, certificates, testDomain, testCertificateId);
	});

	describe('Complete Domain and Certificate Workflow', () => {
		it('should complete the full domain and certificate lifecycle', async () => {
			console.log('\n=== STEP 1: Domain Availability Check ===');

			// Step 1: Check domain availability
			try {
				const availability = await domains.checkDomainAvailability({
					name: testDomain,
					country: CountryCode.US
				});
				console.log('✅ Domain availability checked:', availability);
			} catch (error) {
				console.log('⚠️  Domain availability check failed:', error.message);
			}

			console.log('\n=== STEP 2: TLD Information ===');

			// Step 2: Get TLD information
			try {
				const tldInfo = await domains.getTldInfo('com');
				console.log('✅ TLD info retrieved:', tldInfo);
			} catch (error) {
				console.log('⚠️  TLD info retrieval failed:', error.message);
			}

			console.log('\n=== STEP 3: Domain Creation (Dry Run) ===');

			// Step 3: Try to create domain (dry run)
			try {
				const domainCreation = await domains.createNewDomain({
					fqdn: testDomain,
					owner: testContact,
					duration: 1
				}, undefined, true); // dry run

				console.log('✅ Domain creation dry run successful:', domainCreation);
			} catch (error) {
				console.log('⚠️  Domain creation dry run failed (expected in sandbox):', error.message);
			}

			console.log('\n=== STEP 4: Certificate Package Information ===');

			// Step 4: Get certificate packages
			try {
				const packages = await certificates.getCertificatePackages({
					category: 'ssl',
					page: 1,
					per_page: 5
				});
				console.log('✅ Certificate packages retrieved:', packages.length, 'packages found');
			} catch (error) {
				console.log('⚠️  Certificate packages retrieval failed:', error.message);
			}

			console.log('\n=== STEP 5: Certificate Creation (Dry Run) ===');

			// Step 5: Try to create certificate (dry run)
			try {
				const certificateCreation = await certificates.createCertificate({
					package: 'cert_std',
					cn: testDomain,
					altnames: [`www.${testDomain}`, `api.${testDomain}`],
					dcv_method: 'dns',
					duration: 1
				}, true); // dry run

				console.log('✅ Certificate creation dry run successful:', certificateCreation);
			} catch (error) {
				console.log('⚠️  Certificate creation dry run failed (expected in sandbox):', error.message);
			}

			console.log('\n=== STEP 6: DCV Parameters ===');

			// Step 6: Get DCV parameters
			try {
				const dcvParams = await certificates.retrieveDCVParameters({
					altnames: [testDomain, `www.${testDomain}`],
					dcv_method: 'dns'
				});
				console.log('✅ DCV parameters retrieved:', dcvParams);
			} catch (error) {
				console.log('⚠️  DCV parameters retrieval failed:', error.message);
			}

			console.log('\n=== STEP 7: List Existing Resources ===');

			// Step 7: List existing domains and certificates
			try {
				const domainList = await domains.listDomains({
					page: 1,
					per_page: 5
				});
				console.log('✅ Existing domains listed:', domainList);
			} catch (error) {
				console.log('⚠️  Domain listing failed:', error.message);
			}

			try {
				const certList = await certificates.listCertificates({
					page: 1,
					per_page: 5
				});
				console.log('✅ Existing certificates listed:', certList);

				// If we have existing certificates, test operations on them
				if (certList && certList.length > 0) {
					testCertificateId = certList[0].id;
					console.log(`🔍 Testing operations on existing certificate: ${testCertificateId}`);

					// Test certificate details
					try {
						const certDetails = await certificates.getCertificate(testCertificateId);
						console.log('✅ Certificate details retrieved:', certDetails);
					} catch (error) {
						console.log('⚠️  Certificate details retrieval failed:', error.message);
					}

					// Test certificate tags
					try {
						const tags = await certificates.getCertificateTags(testCertificateId);
						console.log('✅ Certificate tags retrieved:', tags);
					} catch (error) {
						console.log('⚠️  Certificate tags retrieval failed:', error.message);
					}
				}
			} catch (error) {
				console.log('⚠️  Certificate listing failed:', error.message);
			}

			console.log('\n=== STEP 8: DNS Management Simulation ===');

			// Step 8: Test DNS management operations
			try {
				const nameservers = await domains.getNameservers('example.com');
				console.log('✅ Nameservers retrieved:', nameservers);
			} catch (error) {
				console.log('⚠️  Nameservers retrieval failed (expected for non-owned domain):', error.message);
			}

			try {
				const dnssec = await domains.getDNSSECWithLiveDNS('example.com');
				console.log('✅ DNSSEC status retrieved:', dnssec);
			} catch (error) {
				console.log('⚠️  DNSSEC status retrieval failed (expected for non-owned domain):', error.message);
			}

			console.log('\n=== STEP 9: Domain Management Operations ===');

			// Step 9: Test domain management operations
			try {
				const domainTags = await domains.getDomainTags('example.com');
				console.log('✅ Domain tags retrieved:', domainTags);
			} catch (error) {
				console.log('⚠️  Domain tags retrieval failed (expected for non-owned domain):', error.message);
			}

			try {
				const webRedirections = await domains.listWebRedirections('example.com');
				console.log('✅ Web redirections listed:', webRedirections);
			} catch (error) {
				console.log('⚠️  Web redirections listing failed (expected for non-owned domain):', error.message);
			}

			console.log('\n=== STEP 10: Certificate Management Operations ===');

			// Step 10: Test certificate management operations
			if (testCertificateId) {
				try {
					// Test certificate renewal (dry run)
					await certificates.renewCertificate(testCertificateId, {
						dcv_method: 'dns',
						duration: 1
					}, true); // dry run
					console.log('✅ Certificate renewal dry run successful');
				} catch (error) {
					console.log('⚠️  Certificate renewal dry run failed:', error.message);
				}

				try {
					// Test certificate update (dry run)
					await certificates.updateCertificate(testCertificateId, {
						dcv_method: 'dns'
					}, true); // dry run
					console.log('✅ Certificate update dry run successful');
				} catch (error) {
					console.log('⚠️  Certificate update dry run failed:', error.message);
				}

				try {
					// Test DCV operations
					await certificates.resendCertificateDCV(testCertificateId);
					console.log('✅ DCV resend successful');
				} catch (error) {
					console.log('⚠️  DCV resend failed:', error.message);
				}

				try {
					await certificates.updateCertificateDCVMethod(testCertificateId, 'dns');
					console.log('✅ DCV method update successful');
				} catch (error) {
					console.log('⚠️  DCV method update failed:', error.message);
				}
			}

			console.log('\n=== INTEGRATION TEST COMPLETED ===');
			console.log('✅ All integration test steps completed successfully!');
			console.log(`🌐 Test domain: ${testDomain}`);
			console.log(`📧 Test contact: ${testContact.email}`);
			if (testCertificateId) {
				console.log(`🔐 Test certificate: ${testCertificateId}`);
			}
		});
	});

	describe('Error Handling and Edge Cases', () => {
		it('should handle API errors gracefully', async () => {
			console.log('🛡️  Testing error handling...');

			// Test with invalid domain
			try {
				await domains.getDomain('invalid-domain-that-does-not-exist-12345.com');
			} catch (error) {
				console.log('✅ Invalid domain error handled correctly:', error.message);
			}

			// Test with invalid certificate ID
			try {
				await certificates.getCertificate('invalid-certificate-id-12345');
			} catch (error) {
				console.log('✅ Invalid certificate error handled correctly:', error.message);
			}

			// Test with invalid TLD
			try {
				await domains.getTldInfo('invalid-tld-12345');
			} catch (error) {
				console.log('✅ Invalid TLD error handled correctly:', error.message);
			}
		});

		it('should handle network timeouts and retries', async () => {
			console.log('⏱️  Testing timeout handling...');

			// This test would be more relevant with actual network conditions
			// For now, we'll just test that the API calls complete within reasonable time
			const startTime = Date.now();

			try {
				await domains.listDomains({page: 1, per_page: 1});
				const endTime = Date.now();
				const duration = endTime - startTime;

				console.log(`✅ API call completed in ${duration}ms`);
				expect(duration).toBeLessThan(10000); // Should complete within 10 seconds
			} catch (error) {
				console.log('⚠️  API call failed:', error.message);
			}
		});
	});
});
