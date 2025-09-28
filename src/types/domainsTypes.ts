import {CountryCode} from "./Utils";

export interface ChangeOwnerPayload {
    owner: Persona;
    admin?: Persona;
    bill?: Persona;
    tech?: Persona;
}

export interface Persona {
    country: CountryCode;
    email: string;
    family: string;
    given: string;
    streetaddr: string;
    type?: "individual" | "company" | "association" | "publicbody" | "reseller";
    brand_number?: string;
    city?: string;
    data_obfuscated?: boolean; // default: true
    extra_parameters?: Record<string, any>; // cf. documentation : https://api.gandi.net/docs/domains/#appendix-Contact-Extra-Parameters
    fax?: string;
    icann_contract_accepted?: boolean; // default: false
    jo_announce_number?: string;
    jo_announce_page?: string;
    jo_declaration_date?: string;
    jo_publication_date?: string;
    lang?: "en" | "es" | "fr" | "ja" | "zh-hans" | "zh-hant";
    mail_obfuscated?: boolean;
    mobile?: string;
    orgname?: string;
    phone?: string;
    siren?: string;
    state?: string;
    validation?: "pending" | "done" | "failed" | "deleted" | "none";
    zip?: string;
}

export interface LightPersona {
    country: CountryCode;
    email: string;
    streetaddr: string;
    brand_number?: string;
    city?: string;
    data_obfuscated?: boolean; // default: true
    extra_parameters?: Record<string, any>; // cf. documentation : https://api.gandi.net/docs/domains/#appendix-Contact-Extra-Parameters
    family?: string;
    fax?: string;
    given?: string;
    icann_contract_accepted?: boolean; // default: false
    jo_announce_number?: string;
    jo_announce_page?: string;
    jo_declaration_date?: string;
    jo_publication_date?: string;
    lang?: "en" | "es" | "fr" | "ja" | "zh-hans" | "zh-hant";
    mail_obfuscated?: boolean;
    mobile?: string;
    phone?: string;
    siren?: string;
    state?: string;
    validation?: "pending" | "done" | "failed" | "deleted" | "none";
    zip?: string;
}

export interface DomainAvailabilityPayload {
    name: string; // with tld, ex: example.com
    country?: CountryCode;
    currency?: string;
    duration_unit?: string;
    extension?: string;
    grid?: string;
    lang?: string;
    max_duration?: number;
    period?: string;
    processes?: string[];
    sharing_id?: string;
}

export interface ListDomainsPayload {
    fqdn?: string;
    nameserver?: "abc" | "livedns" | "other";
    page?: number;
    per_page?: number;
    resellee_id?: string;
    sharing_id?: string;
    sort_by?: string;
    tld?: string;
}

export interface CreateDomainPayload {
    fqdn: string;
    owner: Persona;
    admin?: Persona;
    bill?: Persona;
    claims?: string;
    currency?: "EUR" | "USD" | "GBP" | "TWD" | "CNY";
    duration?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    enforce_premium?: boolean;
    extra_parameters?: Record<string, any>; // cf. documentation : https://api.gandi.net/docs/domains/#appendix-Domain-Extra-Parameters
    lang?: string; // ISO-639-2
    mailbox_optin?: boolean; // default: true
    nameservers?: string[];
    nameservers_ips?: Record<string, string[]>;
    price?: number;
    resellee_id?: string;
    smd?: string;
    tech?: Persona;
    template_id?: string;
    tld_period?: string;
}

export interface AutorenewPayload {
    enabled: boolean;
    duration?: number;
    org_id?: string;
}

export interface DomainContacts {
    admin?: Persona;
    bill?: Persona;
    owner?: Persona;
    tech?: Persona;
}

export interface DnssecKeyPayload {
    algorithm: number;
    public_key: string;
    type: "none" | "zsk" | "ksk";
}
