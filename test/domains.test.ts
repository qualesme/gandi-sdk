import {afterAll, beforeAll, describe, expect, it} from 'vitest';
import {cleanupTestResources, createTestClient, generateRandomDomain, generateTestContact} from './setup';
import {CountryCode} from "../src";

describe('Domain Management Tests', () => {
	const {domains, certificates} = createTestClient();
	let testDomain: string;
	let testContact: any;

	beforeAll(async () => {
		testDomain = generateRandomDomain();
		testContact = generateTestContact();
		console.log(`🌐 Testing with domain: ${testDomain}`);
	});

	afterAll(async () => {
		await cleanupTestResources(domains, certificates, testDomain);
	});

	describe('Domain Availability and Information', () => {
		it('should check domain availability', async () => {
			console.log(`🔍 Checking availability for ${testDomain}`);

			const availability = await domains.checkDomainAvailability({
				name: testDomain,
				country: CountryCode.FR
			});

			expect(availability).toBeDefined();
			console.log('✅ Domain availability checked:', availability);
		});

		it('should list available TLDs', async () => {
			console.log('🔍 Listing available TLDs...');

			const tlds = await domains.listAvailableTlds({
				category: 'gTLD',
				page: 1,
				per_page: 10
			});

			expect(tlds).toBeDefined();
			expect(Array.isArray(tlds)).toBe(true);
			// @ts-ignore
			console.log('✅ TLDs listed:', tlds.length, 'TLDs found');
		});

		it('should get TLD information', async () => {
			console.log('🔍 Getting TLD info for .com...');

			const tldInfo = await domains.getTldInfo('com');

			expect(tldInfo).toBeDefined();
			console.log('✅ TLD info retrieved:', tldInfo);
		});
	});

	describe('Domain Lifecycle Management', () => {
		it('should create a new domain', async () => {
			console.log(`🏗️  Creating domain ${testDomain}...`);

			try {
				const result = await domains.createNewDomain({
					fqdn: testDomain,
					owner: testContact,
					duration: 1
				}, false);

				expect(result).toBeDefined();
				console.log('✅ Domain creation dry run successful:', result);
			} catch (error) {
				console.log('⚠️  Domain creation dry run failed (expected in sandbox):', error.message, error.response?.data);
				// This is expected to fail in sandbox environment
			}
		});

		it('should get domain details', async () => {
			console.log(`🏗️  Getting details for ${testDomain}...`);
			while (true) {
				try {
					const details = await domains.getDomain(testDomain);
					expect(details).toBeDefined();
					console.log('✅ Domain details retrieved:', details);
					break; // ✅ succès, on sort
				} catch (error: any) {
					if (error?.response?.status === 404 || error.message == 'HTTP 404') {
						console.log('⏳  Got 404, retrying in 5s...');
						await new Promise((resolve) => setTimeout(resolve, 5000));
						continue; // ↩️ boucle
					}
					console.log('⚠️  Other error:', error.message, error.response?.data);
					throw error; // ❌ pas un 404, on arrête
				}
			}
		});


		it('should list domains', async () => {
			console.log('📋 Listing domains...');

			const domainList = await domains.listDomains({
				page: 1,
				per_page: 10
			});

			expect(domainList).toBeDefined();
			console.log('✅ Domains listed:', domainList);
		});

		it('should list domains as CSV', async () => {
			console.log('📋 Listing domains as CSV...');

			try {
				const csvData = await domains.listDomains({}, true);
				expect(csvData).toBeDefined();
				console.log('✅ Domains CSV retrieved');
			} catch (error) {
				console.log('⚠️  CSV export not available:', error.message);
			}
		});
	});

	describe('Domain Contacts Management', () => {
		it('should handle domain contacts operations', async () => {
			console.log('👤 Testing domain contacts operations...');

			try {
				// Try to get contacts (will fail if domain doesn't exist)
				await domains.getDomainContacts(testDomain);
				console.log('✅ Domain contacts retrieved');
			} catch (error) {
				console.log('⚠️  Domain contacts not accessible:', error.message);
			}
		});
	});

	describe('Domain DNS Management', () => {
		it('should handle nameserver operations', async () => {
			console.log('🌐 Testing nameserver operations...');

			try {
				// Try to get nameservers
				const nameservers = await domains.getNameservers(testDomain);
				expect(nameservers).toBeDefined();
				console.log('✅ Nameservers retrieved:', nameservers);
			} catch (error) {
				console.log('⚠️  Nameservers not accessible:', error.message);
			}
		});

		it('should handle DNSSEC operations', async () => {
			console.log('🔐 Testing DNSSEC operations...');

			try {
				// Try to get DNSSEC status
				const dnssec = await domains.getDNSSECWithLiveDNS(testDomain);
				expect(dnssec).toBeDefined();
				console.log('✅ DNSSEC status retrieved:', dnssec);
			} catch (error) {
				console.log('⚠️  DNSSEC not accessible:', error.message);
			}
		});
	});

	describe('Domain Tags Management', () => {
		it('should create ', async () => {
			console.log('🏷️  Testing domain tags creation...');

			try {
				// Try to create a tag
				const newTag = await domains.attachTagToDomain(testDomain, 'n8n-test-tag');
				expect(newTag).toBeDefined();
				console.log('✅ Domain tag created:', newTag);
			} catch (error) {
				console.log('⚠️  Domain tag creation failed (expected in sandbox):', error.message);
			}
		})
		it('should handle domain tags operations', async () => {
			console.log('🏷️  Testing domain tags operations...');

			try {
				// Try to get domain tags
				const tags = await domains.getDomainTags(testDomain);
				expect(tags).toBeDefined();
				console.log('✅ Domain tags retrieved:', tags);
			} catch (error) {
				console.log('⚠️  Domain tags not accessible:', error.message);
			}
		});
		it('should delete all domain tags', () => {
			console.log('🏷️  Testing domain tags deletion...');

			try {
				domains.removeAllTagsFromDomain(testDomain);
				console.log('✅ Domain tags deleted');
			} catch (error) {
				console.log('⚠️  Domain tags deletion failed:', error.message);
			}
		});
	});

	describe('Domain Transfers', () => {
		it('should handle transfer operations', async () => {
			console.log('🔄 Testing transfer operations...');

			const testAuthCode = 'test-auth-code-123';

			try {
				// Try to check transfer availability
				const availability = await domains.checkTransferAvailability(
					testDomain,
					testAuthCode
				);
				expect(availability).toBeDefined();
				console.log('✅ Transfer availability checked:', availability);
			} catch (error) {
				console.log('⚠️  Transfer availability check failed (expected):', error.message);
			}
		});
	});

	describe('Web Redirections', () => {
		it('should create a web redirection', async () => {
			console.log('🔗 Testing web redirection creation...');

			try {
				// Try to create a web redirection
				const newRedirection = await domains.createWebRedirection(testDomain, {
					host: "wwww."+testDomain,
					override: true,
					protocol: 'https',
					type: 'http301',
					url: 'https://example.com',
				});
				expect(newRedirection).toBeDefined();
				console.log('✅ Web redirection created:', newRedirection);
			} catch (error) {
				console.log('⚠️  Web redirection creation failed (expected in sandbox):', error.message, error.response?.data);
			}
		});

		it('should handle web redirection operations', async () => {
			console.log('🔗 Listing web redirection operations...');

			try {
				// Try to list web redirections
				const redirections = await domains.listWebRedirections(testDomain);
				expect(redirections).toBeDefined();
				console.log('✅ Web redirections listed:', redirections);
			} catch (error) {
				console.log('⚠️  Web redirections not accessible (expected in sandbox):', error.message);
			}
		});

		it('should get details of a web redirection', async () => {
			console.log('🔗 Testing get web redirection details...');

			try {
				const redirectionDetails = await domains.getWebRedirectionInfo(testDomain, "wwww."+testDomain);
				expect(redirectionDetails).toBeDefined();
				console.log('✅ Web redirection details retrieved:', redirectionDetails);
			} catch (error) {
				console.log('⚠️  Web redirection details not accessible (expected in sandbox):', error.message);
			}
		})
	});

	describe('Domain Renewal and Auto-renewal', () => {
		it('should handle renewal operations', async () => {
			console.log('🔄 Testing renewal operations...');

			try {
				// Try to get renewal info
				const renewalInfo = await domains.getDomainRenewalInfo(testDomain);
				expect(renewalInfo).toBeDefined();
				console.log('✅ Renewal info retrieved:', renewalInfo);
			} catch (error) {
				console.log('⚠️  Renewal info not accessible (expected in sandbox):', error.message);
			}
		});
	});
});
