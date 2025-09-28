import { describe, expect, it } from 'vitest';
import { createTestClient } from './setup';

describe('Billing API Tests', () => {
	const {billing} = createTestClient();

	it('should check domain availability', async () => {
		const info = await billing.getAccountInfo();

		expect(info).toBeDefined();
		console.log('✅ Billing information	retrieved:', info);
	});
});
