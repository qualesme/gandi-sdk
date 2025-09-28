export interface DCVParametersFilters {
	altnames?: string[];
	csr?: string;
	dcv_method?: 'email' | 'dns' | 'file' | 'http' | 'https';
	package?: string;
}

export interface CertificatesFilters {
	cn?: string;
	covered_cn?: string;
	package?: string;
	page?: number;
	per_page?: number;
	sharing_id?: string;
	sort_by?:
		| 'created_at'
		| '-created_at'
		| 'updated_at'
		| '-updated_at'
		| 'started_at'
		| '-started_at'
		| 'ends_at'
		| '-ends_at'
		| 'subscription_ends_at'
		| '-subscription_ends_at';
	status?: 'pending' | 'valid' | 'revoked' | 'replaced' | 'replaced_rev' | 'expired';
}

export interface CertificatePayload {
	package: string;
	altnames?: string[];
	apex_only?: boolean;
	cn?: string;
	csr?: string;
	dcv_method?: 'email' | 'dns' | 'file' | 'http' | 'https';
	duration?: number;
	resellee_id?: string;
}

export interface CertificateRenewPayload {
	csr?: string;
	dcv_method?: string;
	duration?: number;
}

export interface CertificateUpdatePayload {
	altnames?: string[];
	csr?: string;
	dcv_method?: string;
}

export interface CertificatePackageFilters {
	category?: string;
	max_domains?: number;
	min_domains?: number;
	page?: number;
	per_page?: number;
	trustlogo?: boolean;
	warranty?: number;
	wildcard?: boolean;
}
