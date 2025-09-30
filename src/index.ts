import { GandiClient } from './client';
import { DomainsResource } from './resources/domains';
import { CertificatesResource } from './resources/certificates';
import { BillingResource } from './resources/billing';
import { HttpClient } from '@qualesme/http-core';

export class GandiSDK {
	client: GandiClient;
	domains: DomainsResource;
	certificates: CertificatesResource;
	billing: BillingResource;

	constructor(http: HttpClient) {
		this.client = new GandiClient(http);
		this.domains = new DomainsResource(this.client);
		this.certificates = new CertificatesResource(this.client);
		this.billing = new BillingResource(this.client);
	}
}

export { GandiClient };
export * from './resources/domains';
export * from './resources/certificates';
export * from './types/certificateTypes';
export * from './types/domainsTypes';
export * from './types/utils';
export * from './resources/billing';
export * from './types/billingTypes';
