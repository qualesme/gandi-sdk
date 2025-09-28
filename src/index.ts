import { GandiClient, GandiClientOptions } from './client';
import { DomainsResource } from './resources/domains';
import { CertificatesResource } from './resources/certificates';
import { BillingResource } from './resources/billing';

export class GandiSDK {
	client: GandiClient;
	domains: DomainsResource;
	certificates: CertificatesResource;
	billing: BillingResource;

	constructor(opts: GandiClientOptions) {
		this.client = new GandiClient(opts);
		this.domains = new DomainsResource(this.client);
		this.certificates = new CertificatesResource(this.client);
		this.billing = new BillingResource(this.client);
	}
}

export { GandiClient, GandiClientOptions };
export { DomainsResource } from './resources/domains';
export { CertificatesResource } from './resources/certificates';
export * from './types/certificateTypes';
export * from './types/domainsTypes';
export * from './types/utils';
