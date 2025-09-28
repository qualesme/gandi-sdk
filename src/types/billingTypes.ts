export interface BillingPayload {
	name: string[];
	active_phase?: boolean;
	country?: string;
	currency?: string;
	discounts?: string[];
	duration_unit?: string;
	extension?: string;
	features?: boolean;
	grid?: string;
	lang?: string;
	max_duration?: number;
	page?: number;
	per_page?: number;
	prices_at?: string;
	sharing_id?: string;
}
