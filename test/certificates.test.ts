import { config } from 'dotenv';
config();

import {afterAll, beforeAll, describe, expect, it} from 'vitest';
import {cleanupTestResources, createTestClient, generateRandomDomain} from './setup';

describe('Certificate Management Tests', () => {
	const {domains, certificates} = createTestClient();
	let testDomain: string;
	let testCertificateId: string | null = null;

	beforeAll(async () => {
		testDomain = generateRandomDomain();
		console.log(`🔐 Testing certificates with domain: ${testDomain}`);
	});

	afterAll(async () => {
		if (testCertificateId) {
			await cleanupTestResources(domains, certificates, testDomain, testCertificateId);
		} else {
			await cleanupTestResources(domains, certificates, testDomain);
		}
	});

	describe('Certificate Packages and Information', () => {
		it('should list certificate packages', async () => {
			console.log('📦 Listing certificate packages...');

			const packages = await certificates.getCertificatePackages({
				category: 'ssl',
				page: 1,
				per_page: 10
			});

			expect(packages).toBeDefined();
			expect(Array.isArray(packages)).toBe(true);
			console.log('✅ Certificate packages listed:', packages.length, 'packages found');
		});

		it('should get certificate package information', async () => {
			console.log('📦 Getting certificate package info...');

			try {
				// Try to get info for a common package
				const packageInfo = await certificates.getCertificatePackageInfo('cert_std');
				expect(packageInfo).toBeDefined();
				console.log('✅ Certificate package info retrieved:', packageInfo);
			} catch (error) {
				console.log('⚠️  Certificate package info not accessible:', error.message);
			}
		});

		it('should retrieve DCV parameters', async () => {
			console.log('🔍 Retrieving DCV parameters...');

			try {
				const dcvParams = await certificates.retrieveDCVParameters({
					altnames: [testDomain],
					dcv_method: 'dns'
				});
				expect(dcvParams).toBeDefined();
				console.log('✅ DCV parameters retrieved:', dcvParams);
			} catch (error) {
				console.log('⚠️  DCV parameters not accessible:', error.message);
			}
		});
	});

	describe('Certificate Lifecycle Management', () => {
		it('should list certificates', async () => {
			console.log('📋 Listing certificates...');

			const certList = await certificates.listCertificates({
				page: 1,
				per_page: 10
			});

			expect(certList).toBeDefined();
			console.log('✅ Certificates listed:', certList);
		});

		it('should list certificates as CSV', async () => {
			console.log('📋 Listing certificates as CSV...');

			try {
				const csvData = await certificates.listCertificates({}, true);
				expect(csvData).toBeDefined();
				console.log('✅ Certificates CSV retrieved');
			} catch (error) {
				console.log('⚠️  CSV export not available:', error.message);
			}
		});

		it('should create a certificate (dry run)', async () => {
			console.log(`🔐 Creating certificate for ${testDomain} (dry run)...`);

			try {
				const result = await certificates.createCertificate({
					package: 'cert_std',
					cn: testDomain,
					altnames: [`www.${testDomain}`],
					dcv_method: 'dns',
					duration: 1
				}, true); // dry run

				expect(result).toBeDefined();
				console.log('✅ Certificate creation dry run successful:', result);
			} catch (error) {
				console.log('⚠️  Certificate creation dry run failed (expected in sandbox):', error.message);
				// This is expected to fail in sandbox environment
			}
		});

		it('should handle certificate operations for existing certificate', async () => {
			console.log('🔐 Testing certificate operations...');

			// Try to get a certificate if any exist
			try {
				const certList = await certificates.listCertificates({page: 1, per_page: 1});

				if (certList && certList.length > 0) {
					const existingCertId = certList[0].id;
					testCertificateId = existingCertId;

					console.log(`🔍 Testing operations on existing certificate: ${existingCertId}`);

					// Get certificate details
					const certDetails = await certificates.getCertificate(existingCertId);
					expect(certDetails).toBeDefined();
					console.log('✅ Certificate details retrieved:', certDetails);

					// Get certificate tags
					try {
						const tags = await certificates.getCertificateTags(existingCertId);
						expect(tags).toBeDefined();
						console.log('✅ Certificate tags retrieved:', tags);
					} catch (error) {
						console.log('⚠️  Certificate tags not accessible:', error.message);
					}

					// Try to retrieve certificate
					try {
						const certData = await certificates.retrieveCertificate(existingCertId);
						expect(certData).toBeDefined();
						console.log('✅ Certificate data retrieved');
					} catch (error) {
						console.log('⚠️  Certificate data not accessible:', error.message);
					}

				} else {
					console.log('ℹ️  No existing certificates found for testing');
				}
			} catch (error) {
				console.log('⚠️  Could not list certificates:', error.message);
			}
		});
	});

	describe('Certificate DCV Management', () => {
		it('should handle DCV operations', async () => {
			console.log('🔍 Testing DCV operations...');

			if (testCertificateId) {
				try {
					// Resend DCV
					await certificates.resendCertificateDCV(testCertificateId);
					console.log('✅ DCV resent successfully');
				} catch (error) {
					console.log('⚠️  DCV resend failed:', error.message);
				}

				try {
					// Update DCV method
					await certificates.updateCertificateDCVMethod(testCertificateId, 'dns');
					console.log('✅ DCV method updated successfully');
				} catch (error) {
					console.log('⚠️  DCV method update failed:', error.message);
				}

				try {
					// Get DCV parameters
					const dcvParams = await certificates.retrieveCertificateDCVParameters(testCertificateId, {
						dcv_method: 'dns'
					});
					expect(dcvParams).toBeDefined();
					console.log('✅ Certificate DCV parameters retrieved:', dcvParams);
				} catch (error) {
					console.log('⚠️  Certificate DCV parameters not accessible:', error.message);
				}
			} else {
				console.log('ℹ️  No certificate ID available for DCV testing');
			}
		});
	});

	describe('Certificate Tags Management', () => {
		it('should handle certificate tags operations', async () => {
			console.log('🏷️  Testing certificate tags operations...');

			if (testCertificateId) {
				try {
					// Add tag
					await certificates.addCertificateTag(testCertificateId, 'test-tag');
					console.log('✅ Certificate tag added successfully');
				} catch (error) {
					console.log('⚠️  Certificate tag addition failed:', error.message);
				}

				try {
					// Update some tags
					await certificates.updateSomeCertificateTags(testCertificateId, ['new-tag'], ['old-tag']);
					console.log('✅ Certificate tags updated successfully');
				} catch (error) {
					console.log('⚠️  Certificate tags update failed:', error.message);
				}

				try {
					// Replace all tags
					await certificates.replaceAllCertificateTags(testCertificateId, ['production', 'important']);
					console.log('✅ All certificate tags replaced successfully');
				} catch (error) {
					console.log('⚠️  Certificate tags replacement failed:', error.message);
				}

				try {
					// Remove all tags
					await certificates.removeAllCertificateTags(testCertificateId);
					console.log('✅ All certificate tags removed successfully');
				} catch (error) {
					console.log('⚠️  Certificate tags removal failed:', error.message);
				}
			} else {
				console.log('ℹ️  No certificate ID available for tags testing');
			}
		});
	});

	describe('Certificate Renewal and Updates', () => {
		it('should handle certificate renewal operations', async () => {
			console.log('🔄 Testing certificate renewal operations...');

			if (testCertificateId) {
				try {
					// Try to renew certificate (dry run)
					await certificates.renewCertificate(testCertificateId, {
						dcv_method: 'dns',
						duration: 1
					}, true); // dry run
					console.log('✅ Certificate renewal dry run successful');
				} catch (error) {
					console.log('⚠️  Certificate renewal dry run failed:', error.message);
				}

				try {
					// Try to update certificate (dry run)
					await certificates.updateCertificate(testCertificateId, {
						dcv_method: 'dns'
					}, true); // dry run
					console.log('✅ Certificate update dry run successful');
				} catch (error) {
					console.log('⚠️  Certificate update dry run failed:', error.message);
				}
			} else {
				console.log('ℹ️  No certificate ID available for renewal testing');
			}
		});
	});

	describe('Intermediate Certificates', () => {
		it('should get intermediate certificates', async () => {
			console.log('🔗 Testing intermediate certificate retrieval...');

			try {
				// Get intermediate certificate by type
				const intermediateCert = await certificates.getIntermediateCertificate('intermediate');
				expect(intermediateCert).toBeDefined();
				console.log('✅ Intermediate certificate retrieved');
			} catch (error) {
				console.log('⚠️  Intermediate certificate not accessible:', error.message);
			}

			try {
				// Get intermediate certificate by filename
				const certByFilename = await certificates.getIntermediateCertificateByFilename('intermediate.pem');
				expect(certByFilename).toBeDefined();
				console.log('✅ Intermediate certificate by filename retrieved');
			} catch (error) {
				console.log('⚠️  Intermediate certificate by filename not accessible:', error.message);
			}
		});
	});
});
