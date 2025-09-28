import { GandiClient } from '../client';
import {
	CertificatePackageFilters,
	CertificatePayload,
	CertificateRenewPayload,
	CertificatesFilters,
	DCVParametersFilters,
} from '../types/certificateTypes';

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
		return this.client.get(`/certificate/issued-certs/${encodeURIComponent(id)}`);
	}

	renewCertificate(id: string, opts: CertificateRenewPayload, dryRun = false, sharingId?: any) {
		const headers: any = {};
		const params: any = {};
		if (dryRun) headers.dry_run = true;
		if (sharingId) params.sharing_id = sharingId;
		return this.client.post(
			`/certificate/issued-certs/${encodeURIComponent(id)}`,
			opts,
			params,
			headers,
		);
	}

	updateCertificate(id: string, opts: CertificateRenewPayload, dryRun = false, sharingId?: any) {
		const headers: any = {};
		const params: any = {};
		if (dryRun) headers.dry_run = true;
		if (sharingId) params.sharing_id = sharingId;
		return this.client.put(
			`/certificate/issued-certs/${encodeURIComponent(id)}`,
			opts,
			params,
			headers,
		);
	}
	revokeCertificate(id: string, sharingId?: any) {
		const params: any = {};
		if (sharingId) params.sharing_id = sharingId;
		return this.client.delete(`/certificate/issued-certs/${encodeURIComponent(id)}`, params);
	}

	retrieveCertificate(id: string) {
		return this.client.get(`/certificate/issued-certs/${encodeURIComponent(id)}/crt`);
	}

	resendCertificateDCV(id: string, sharingId?: any) {
		const params: any = {};
		if (sharingId) params.sharing_id = sharingId;
		return this.client.put(
			`/certificate/issued-certs/${encodeURIComponent(id)}/dcv`,
			undefined,
			params,
		);
	}

	updateCertificateDCVMethod(
		id: string,
		method: 'email' | 'dns' | 'file' | 'http' | 'https',
		sharingId?: any,
	) {
		const params: any = {};
		if (sharingId) params.sharing_id = sharingId;
		return this.client.patch(
			`/certificate/issued-certs/${encodeURIComponent(id)}/dcv`,
			{dcv_method: method},
			params,
		);
	}

	retrieveCertificateDCVParameters(id: string, ops: DCVParametersFilters) {
		return this.client.post(`/certificate/issued-certs/${encodeURIComponent(id)}/dcv_params`, ops);
	}

	getCertificateTags(id: string) {
		return this.client.get(`/certificate/issued-certs/${encodeURIComponent(id)}/tags`);
	}

	addCertificateTag(id: string, tag: string) {
		return this.client.post(`/certificate/issued-certs/${encodeURIComponent(id)}/tags`, {tag});
	}

	replaceAllCertificateTags(id: string, tags: string[]) {
		return this.client.put(`/certificate/issued-certs/${encodeURIComponent(id)}/tags`, {tags});
	}

	updateSomeCertificateTags(id: string, add: string[], remove: string[]) {
		return this.client.patch(`/certificate/issued-certs/${encodeURIComponent(id)}/tags`, {
			add,
			remove,
		});
	}

	removeAllCertificateTags(id: string) {
		return this.client.delete(`/certificate/issued-certs/${encodeURIComponent(id)}/tags`);
	}

	getCertificatePackages(opts?: CertificatePackageFilters) {
		return this.client.get(`/certificate/packages`, opts);
	}

	getCertificatePackageInfo(packageName: string) {
		return this.client.get(`/certificate/packages/${encodeURIComponent(packageName)}`);
	}

	getIntermediateCertificateByFilename(filename: string, acceptPemFile = false) {
		const headers = acceptPemFile ? {Accept: 'application/x-pem-file'} : undefined;
		return this.client.get(
			`/certificate/pem/-/${encodeURIComponent(filename)}`,
			undefined,
			headers,
		);
	}

	getIntermediateCertificate(type: string, provider?: string, acceptPemFile = false) {
		const params: any = {};
		if (provider) params.provider = provider;
		const headers = acceptPemFile ? {Accept: 'application/x-pem-file'} : undefined;
		return this.client.get(`/certificate/pem/${encodeURIComponent(type)}`, params, headers);
	}
}
