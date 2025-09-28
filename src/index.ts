import {GandiClient, GandiClientOptions} from "./client";
import {DomainsResource} from "./resources/domains";
import {CertificatesResource} from "./resources/certificates";

export class GandiSDK {
    domains: DomainsResource;
	certificates: CertificatesResource;

    constructor(opts: GandiClientOptions) {
        const client = new GandiClient(opts);
        this.domains = new DomainsResource(client);
		this.certificates = new CertificatesResource(client);
    }
}
