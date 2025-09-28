import {GandiClient} from "../client";
import {CertificatePayload, CertificatesFilters, DCVParametersFilters} from "../types/certificateTypes";

export class CertificatesResource {
	constructor(private client: GandiClient) {
	}

	retrieveDCVParameters(opts?: DCVParametersFilters) {
		return this.client.get(`/certificate/dcv_params`, opts);
	}

	listCertificates(opts?: CertificatesFilters, getAsCsv = false) {
		const headers = getAsCsv ? {Accept: 'text/csv'} : undefined;
		return this.client.get(`/certificate/issued-certs`, opts, headers);
	}

	createCertificate(opts: CertificatePayload, dryRun = false, sharingId?: any) {
		const headers: any = {};
		const params: any = {};
		if (dryRun) headers.dry_run = true;
		if (sharingId) params.sharing_id = sharingId;
		return this.client.post(`/certificate/issued-certs`, opts, params, headers);
	}

	getCertificate(id: string) {
		return this.client.get(`/certificate/issued-certs/${id}`);
	}
}
