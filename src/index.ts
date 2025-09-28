import {GandiClient} from "./client";
import {DomainsResource} from "./resources/domains";

export class GandiSDK {
    domains: DomainsResource;

    constructor(apiKey: string) {
        const client = new GandiClient({
            apiKey: "",
            authMode: "pat" // default: "pat"
        });
        this.domains = new DomainsResource(client);
        // plus tard: this.dns = new DNSResource(client), etc.
    }
}
