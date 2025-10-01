export interface DomainsFilters {
	limit: number;
	offset: number;
	name?: string;
	sharing_id?: string;
	sort_by?: string;
	zone_id?: string;
}

export interface LinkedZoneFilters {
	limit: number;
	offset: number;
	sharing_id?: string;
	sort_by?: string;
}

export interface LinkedZoneRecord {
	name: string;
	ttl: number;
	type: string; // e.g., "A", "CNAME", "TXT", etc.
	values: Array<string>;
}

export interface LinkedZonePayload {
	name: string;
	default_records?: boolean;
	record_list?: Array<LinkedZoneRecord>;
	record_text?: string;
}

export interface UpdateLinkedZonePayload extends Partial<LinkedZonePayload> {}
