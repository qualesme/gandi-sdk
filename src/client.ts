import axios, { AxiosInstance } from 'axios';

export type AuthMode = 'apiKey' | 'pat';

export interface GandiClientOptions {
	baseURL?: string;
	apiKey?: string;
	pat?: string;
	authMode?: AuthMode; // default: "pat"
}

export class GandiClient {
	private http: AxiosInstance;

	constructor(opts: GandiClientOptions) {
		const baseURL = opts.baseURL ?? 'https://api.gandi.net/v5';

		// Choix du header selon mode
		let authHeader: string | undefined;
		if (opts.authMode === 'apiKey' && opts.apiKey) {
			authHeader = `Apikey ${opts.apiKey}`;
		} else if (opts.pat) {
			authHeader = `Bearer ${opts.pat}`;
		} else {
			throw new Error(
				'GandiClient requires either an apiKey (authMode=apiKey) or a pat (authMode=pat).',
			);
		}

		this.http = axios.create({
			baseURL,
			headers: {
				Authorization: authHeader,
				'Content-Type': 'application/json',
			},
		});
	}

	// @ts-ignore
	async get<T>(
		url: string,
		params?: Record<string, any>,
		headers?: Record<string, string>,
	): Promise<T> {
		return this.http.get<T>(url, { params, headers }).then((r) => r.data);
	}

	// @ts-ignore
	async post<T>(
		url: string,
		data?: any,
		params?: Record<string, any>,
		headers?: Record<string, string>,
	): Promise<T> {
		return this.http.post<T>(url, data, { params, headers }).then((r) => r.data);
	}

	// @ts-ignore
	async put<T>(
		url: string,
		data?: any,
		params?: Record<string, any>,
		headers?: Record<string, string>,
	): Promise<T> {
		return this.http.put<T>(url, data, { params, headers }).then((r) => r.data);
	}

	// @ts-ignore
	async patch<T>(
		url: string,
		data?: any,
		params?: Record<string, any>,
		headers?: Record<string, string>,
	): Promise<T> {
		return this.http.patch<T>(url, data, { params, headers }).then((r) => r.data);
	}

	// @ts-ignore
	async delete<T>(
		url: string,
		params?: Record<string, any>,
		headers?: Record<string, string>,
	): Promise<T> {
		return this.http.delete<T>(url, { params, headers }).then((r) => r.data);
	}
}
