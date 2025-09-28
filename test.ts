import {GandiClient} from "./src/client";
import {DomainsResource} from "./src/resources/domains";
import {ApiKey, OwnerData} from "./env";

(async () => {
    const client = new GandiClient({
        baseURL: "https://api.sandbox.gandi.net/v5",
        authMode: "pat",
        pat: ApiKey,
    });

    const domains = new DomainsResource(client);

    try {
        const create = await domains.createNewDomain({
            fqdn: "quales.com",
            owner: OwnerData
        })
        console.log("Domain created:", create);

        const list = await domains.listDomains({});
        const listCsv = await domains.listDomains({}, true);
        console.log("Domains:", list);
        console.log("Domains as csv:", listCsv);

        const getDomain = await domains.getDomain("quales.com");
        console.log("Get domain:", getDomain);
    } catch (err) {
        console.error("Error:", err);
        console.error("Error:", err.response.data);
    }
})();
