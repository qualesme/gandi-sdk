import {GandiClient} from "../client";
import {
    AutorenewPayload,
    ChangeOwnerPayload,
    CreateDomainPayload,
    DnssecKeyPayload,
    DomainAvailabilityPayload,
    DomainContacts,
    LightPersona,
    ListDomainsPayload,
    TransferInDomainPayload,
    WebRedirectionPayload,
    WebRedirectionUpdatePayload
} from "../types/domainsTypes";
import {PaginationQS} from "../types/utils";

export class DomainsResource {
    constructor(private client: GandiClient) {
    }

    changeOwner(domain: string, opts: ChangeOwnerPayload, dryRun = false, sharingId?: any) {
        const params: any = {};
        const headers: any = {};
        if (dryRun) headers.dry_run = true;
        if (sharingId) params.sharing_id = sharingId;
        return this.client.post(
            `/domain/changeowner/${encodeURIComponent(domain)}`,
            opts,
            params,
            headers,
        );
    }

    changeOwnerFollowup(domain: string, sharingId?: any) {
        return this.client.get(
            `/domain/changeowner/${encodeURIComponent(domain)}`,
            sharingId ? {sharing_id: sharingId} : undefined,
        );
    }

    resendOwnerChangeFOA(domain: string, email: string) {
        return this.client.post(
            `/domain/changeowner/${encodeURIComponent(domain)}/foa`,
            {email},
        );
    }

    checkDomainAvailability(opts: DomainAvailabilityPayload) {
        return this.client.get(
            `/domain/check`,
            opts,
        );
    }

    listDomains(opts: ListDomainsPayload, getAsCsv = false) {
        const headers: Record<string, string> = {};
        if (getAsCsv) headers.Accept = 'text/csv';
        return this.client.get(
            `/domain/domains`,
            opts,
            headers,
        );
    }

    createNewDomain(opts: CreateDomainPayload, dryRun = false, sharingId?: any) {
        const params: any = {};
        const headers: any = {};
        if (sharingId) params.sharing_id = sharingId;
        if (dryRun) headers.dry_run = true;
        return this.client.post(
            `/domain/domains`,
            opts,
            params,
            headers
        );
    }

    deleteDomain(domain: string) {
        return this.client.delete(`/domain/domains/${encodeURIComponent(domain)}`);
    }

    getDomain(domain: string) {
        return this.client.get(`/domain/domains/${encodeURIComponent(domain)}`);
    }

    resetAuthCode(domain: string) {
        return this.client.post(`/domain/domains/${encodeURIComponent(domain)}/authinfo`);
    }

    editAutoRenew(domain: string, opts: AutorenewPayload) {
        return this.client.patch(`/domain/domains/${encodeURIComponent(domain)}/autorenew`, opts);
    }

    retrieveDomainClaims(domain: string) {
        return this.client.get(`/domain/domains/${encodeURIComponent(domain)}/claims`);
    }

    acceptRetrievedDomainClaims(domain: string) {
        return this.client.post(`/domain/domains/${encodeURIComponent(domain)}/claims`);
    }

    getDomainContacts(domain: string) {
        return this.client.get(`/domain/domains/${encodeURIComponent(domain)}/contacts`);
    }

    updateDomainContacts(domain: string, contacts: DomainContacts) {
        return this.client.put(`/domain/domains/${encodeURIComponent(domain)}/contacts`, contacts);
    }

    editDomainOwner(domain: string, contact: LightPersona, dryRun = false) {
        const headers: Record<string, string> = {};
        if (dryRun) headers.dry_run = 'true';
        return this.client.put(
            `/domain/domains/${encodeURIComponent(domain)}/contacts/owner`,
            contact,
            undefined,
            headers,
        );
    }

    getDomainCreationStatus(domain: string) {
        return this.client.get(`/domain/domains/${encodeURIComponent(domain)}/createstatus`);
    }

    getDnsKeyList(domain: string, opts?: PaginationQS) {
        return this.client.get(`/domain/domains/${encodeURIComponent(domain)}/dnskeys`, opts);
    }

    createDnsKey(domain: string, key: DnssecKeyPayload) {
        return this.client.post(`/domain/domains/${encodeURIComponent(domain)}/dnskeys`, key);
    }

    replaceDnsKey(domain: string, opts: { keys: DnssecKeyPayload[] }) {
        return this.client.put(`/domain/domains/${encodeURIComponent(domain)}/dnskeys`, opts);
    }

    deleteDnsKey(domain: string, keyId: string | number) {
        return this.client.delete(
            `/domain/domains/${encodeURIComponent(domain)}/dnskeys/${encodeURIComponent(String(keyId))}`,
        );
    }

    getGlueRecords(domain: string, opts?: PaginationQS) {
        return this.client.get(`/domain/domains/${encodeURIComponent(domain)}/hosts`, opts);
    }

    createGlueRecord(domain: string, opts: { ips: string[], name: string }) {
        return this.client.post(`/domain/domains/${encodeURIComponent(domain)}/hosts`, opts);
    }

    getGlueRecord(domain: string, name: string) {
        return this.client.get(
            `/domain/domains/${encodeURIComponent(domain)}/hosts/${encodeURIComponent(name)}`,
        );
    }

    updateGlueRecord(domain: string, name: string, opts: { ips: string[] }) {
        return this.client.put(
            `/domain/domains/${encodeURIComponent(domain)}/hosts/${encodeURIComponent(name)}`,
            opts,
        );
    }

    deleteGlueRecord(domain: string, name: string) {
        return this.client.delete(
            `/domain/domains/${encodeURIComponent(domain)}/hosts/${encodeURIComponent(name)}`,
        );
    }

    getDNSSECWithLiveDNS(domain: string) {
        return this.client.get(`/domain/domains/${encodeURIComponent(domain)}/livedns/dnssec`);
    }

    activateDNSSECWithLiveDNS(domain: string, sharingId?: any) {
        const params: any = {};
        if (sharingId) params.sharing_id = sharingId;
        return this.client.post(`/domain/domains/${encodeURIComponent(domain)}/livedns/dnssec`, undefined, params);
    }

    disableDNSSECWithLiveDNS(domain: string, sharingId?: any) {
        const params: any = {};
        if (sharingId) params.sharing_id = sharingId;
        return this.client.delete(`/domain/domains/${encodeURIComponent(domain)}/livedns/dnssec`, params);
    }

    getNameservers(domain: string) {
        return this.client.get(`/domain/domains/${encodeURIComponent(domain)}/nameservers`);
    }

    setNameservers(domain: string, opts: { nameservers: string[] }) {
        return this.client.put(`/domain/domains/${encodeURIComponent(domain)}/nameservers`, opts);
    }

    resentReachabilityEmail(domain: string) {
        return this.client.patch(`/domain/domains/${encodeURIComponent(domain)}/reachability`, {"action": "resend"});
    }

    getDomainRenewalInfo(domain: string) {
        return this.client.get(`/domain/domains/${encodeURIComponent(domain)}/renewal`);
    }

    renewDomain(domain: string, duration: number, dryRun = false, sharingId?: any) {
        const params: any = {};
        const headers: any = {};
        if (dryRun) headers.dry_run = true;
        if (sharingId) params.sharing_id = sharingId;
        return this.client.post(
            `/domain/domains/${encodeURIComponent(domain)}/renewal`,
            {duration},
            params,
            headers,
        );
    }

    getDomainRestoreInfo(domain: string) {
        return this.client.get(`/domain/domains/${encodeURIComponent(domain)}/restore`);
    }

    // Check documentation : https://docs.gandi.net/en/domain_names/renew/restore.html
    restoreDomain(domain: string, body: any, sharingId?: any) {
        const params: any = {};
        if (sharingId) params.sharing_id = sharingId;
        return this.client.post(
            `/domain/domains/${encodeURIComponent(domain)}/restore`,
            body,
            params,
        );
    }

    transferLock(domain: string, lock: boolean) {
        return this.client.patch(
            `/domain/domains/${encodeURIComponent(domain)}/status`,
            {clientTransferProhibited: lock},
        );
    }

    getDomainTags(domain: string) {
        return this.client.get(`/domain/domains/${encodeURIComponent(domain)}/tags`);
    }

    attachTagToDomain(domain: string, tag: string) {
        return this.client.post(`/domain/domains/${encodeURIComponent(domain)}/tags`, {tag});
    }

    updateAllTagsForDomain(domain: string, tags: string[]) {
        return this.client.put(`/domain/domains/${encodeURIComponent(domain)}/tags`, {tags});
    }

    updateSomeTagsForDomain(domain: string, add: string[], remove: string[]) {
        return this.client.patch(`/domain/domains/${encodeURIComponent(domain)}/tags`, {add, remove});
    }

    removeAllTagsFromDomain(domain: string) {
        return this.client.delete(`/domain/domains/${encodeURIComponent(domain)}/tags`);
    }

    acceptOrDeclineDomainTransfer(domain: string, accept: boolean, authInfo: string) {
        return this.client.post(
            `/domain/domains/${encodeURIComponent(domain)}/transferout`,
            {accept, authInfo},
        );
    }

    listWebRedirections(domain: string, opts?: PaginationQS, getAsCsv = false) {
        const headers: Record<string, string> = {};
        if (getAsCsv) headers.Accept = 'text/csv';
        return this.client.get(`/domain/domains/${encodeURIComponent(domain)}/webredirs`, opts, headers);
    }

    createWebRedirection(domain: string, opts: WebRedirectionPayload, qs?: PaginationQS) {
        return this.client.post(
            `/domain/domains/${encodeURIComponent(domain)}/webredirs`,
            opts,
            qs,
        );
    }

    getWebRedirectionInfo(domain: string, host: string) {
        return this.client.get(
            `/domain/domains/${encodeURIComponent(domain)}/webredirs/${encodeURIComponent(host)}`,
        );
    }

    updateWebRedirection(domain: string, name: string, opts: WebRedirectionUpdatePayload) {
        return this.client.patch(
            `/domain/domains/${encodeURIComponent(domain)}/webredirs/${encodeURIComponent(name)}`,
            opts,
        );
    }

    deleteWebRedirection(domain: string, host: string) {
        return this.client.delete(
            `/domain/domains/${encodeURIComponent(domain)}/webredirs/${encodeURIComponent(host)}`,
        );
    }

    listAvailableTlds(opts?: { category?: string, page?: number, per_page?: number }) {
        return this.client.get(`/domain/tlds`, opts);
    }

    getTldInfo(tld: string) {
        return this.client.get(`/domain/tlds/${encodeURIComponent(tld)}`);
    }

    transferDomainToGandi(opts: TransferInDomainPayload, dryRun = false, sharingId?: any) {
        const params: any = {};
        const headers: any = {};
        if (sharingId) params.sharing_id = sharingId;
        if (dryRun) headers.dry_run = true;
        return this.client.post(
            `/domain/transferin`,
            opts,
            params,
            headers
        );
    }

    getTransferInStatus(domain: string) {
        return this.client.get(`/domain/transferin/${encodeURIComponent(domain)}`);
    }

    relaunchTransferIn(domain: string) {
        return this.client.put(`/domain/transferin/${encodeURIComponent(domain)}`);
    }

    updateAuthInfo(domain: string, authinfo: string, sharingId?: any) {
        const params: any = {};
        if (sharingId) params.sharing_id = sharingId;
        return this.client.put(
            `/domain/transferin/${encodeURIComponent(domain)}/authinfo`,
            {authinfo},
            params,
        );
    }

    checkTransferAvailability(domain: string, authinfo: string) {
        return this.client.post(
            `/domain/transferin/${encodeURIComponent(domain)}/available`,
            {authinfo},
        );
    }

    resendTransferFOA(domain: string, email: string) {
        return this.client.post(
            `/domain/transferin/${encodeURIComponent(domain)}/foa`,
            {email},
        );
    }
}
