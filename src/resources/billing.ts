import { GandiClient } from '../client';
import { BillingPayload } from '../types/billingTypes';

export class BillingResource {
	constructor(private client: GandiClient) {}

	getAccountInfo() {
		return this.client.get('/billing/info');
	}

	getSharingAccountInfo(sharingId: string) {
		return this.client.get(`/billing/info/${sharingId}`);
	}

	getProductCatalogPrices(type: string, opts: BillingPayload) {
		return this.client.get(`/billing/prices/${type}`, opts);
	}
}
