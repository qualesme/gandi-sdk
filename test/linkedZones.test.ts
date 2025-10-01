import { describe, expect, it } from 'vitest';
// @ts-ignore
import { createTestClient } from './setup';
import { LinkedZonePayload } from "../src";

describe('Linked Zones API Tests', () => {
	const {linkedZone} = createTestClient();
	let createdZoneId: string;

	it('should create a zone', async () => {
		try {
			const zone = await linkedZone.createZone(<LinkedZonePayload> {
				name: 'test-cs27k39a13p.com',
				default_records: false,
				record_text: 'www 3600 IN A 1.2.3.4'
			});

			expect(zone).toBeDefined();
			console.log('✅ Zone created:', zone);
		} catch (error) {
			console.error('❌ Error creating zone:', error);
		}
	});

	it('should get a list of zones', async () => {
		try {
			const zones = await linkedZone.listZones({ limit: 10, offset: 0 });
			expect(zones).toBeDefined();
			console.log('✅ Zones listed:', zones);
			if (Array.isArray(zones) && zones.length > 0) {
				console.log('✅ Zone ID:', zones[0]?.id);
				createdZoneId = zones[0]?.id;
			}
		} catch (error) {
			console.error('❌ Error retrieving zones:', error);
		}
	});

	it('should link a domain to the zone', async () => {
		try	{
			const result = await linkedZone.linkDomainToZone(createdZoneId, ['test-2gvetidioe9.com', 'test-1ky1p35i2io.com']);
			expect(result).toBeDefined();
			console.log('✅ Domain linked to zone:', result);
		} catch (error) {
			console.error('❌ Error linking domain to zone:', error);
		}
	});

	it('should give details of linked domains and contain test-2gvetidioe9.com', async () => {
		try {
			const zone = await linkedZone.getZoneDetails(createdZoneId);
			expect(zone).toBeDefined();
			// @ts-ignore
			console.log('✅ Details of linked domains:', zone.domains);
		} catch (error) {
			console.error('❌ Error retrieving linked domains:', error);
		}
	});

	it('should unlink a domain from the zone', async () => {
		try {
			const result = await linkedZone.unlinkDomains(['test-2gvetidioe9.com']);
			expect(result).toBeDefined();
			console.log('✅ Domain unlinked from zone:', result);
		} catch (error) {
			console.error('❌ Error unlinking domain from zone:', error);
		}
	});

	it('should give details of linked domains and NOT contain test-2gvetidioe9.com', async () => {
		try {
			const zone = await linkedZone.getZoneDetails(createdZoneId);
			expect(zone).toBeDefined();
			// @ts-ignore
			console.log('✅ Details of linked domains:', zone.domains);
		} catch (error) {
			console.error('❌ Error retrieving linked domains:', error);
		}
	});

	it('should deploy the zone', async () => {
		try {
			const result = await linkedZone.deployZone(createdZoneId);
			expect(result).toBeDefined();
			console.log('✅ Zone deployed:', result);
		} catch (error) {
			console.error('❌ Error deploying zone:', error);
		}
	});

	it('should un deploy the zone', async () => {
		try {
			const result = await linkedZone.undeployZone(createdZoneId);
			expect(result).toBeDefined();
			console.log('✅ Zone undeployed:', result);
		} catch (error) {
			console.error('❌ Error undeploying zone:', error);
		}
	});

	it('should list tasks', async () => {
		try {
			const tasks = await linkedZone.listTasks(10, 0);
			expect(tasks).toBeDefined();
			console.log('✅ Tasks listed:', tasks);
		} catch (error) {
			console.error('❌ Error listing tasks:', error);
		}
	});
});
