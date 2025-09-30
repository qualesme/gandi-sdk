import { HttpClient } from '@qualesme/http-core';

export type AuthMode = 'apiKey' | 'pat';

export class GandiClient {
	private http: HttpClient;

	constructor(http: HttpClient) {
		this.http = http;
	}

	// @ts-ignore
	async get<T>(
		url: string,
		params?: Record<string, any>,
		headers?: Record<string, string>,
	): Promise<T> {
		return this.http.get(url, { params, headers }).then((r) => r.data);
	}

	// @ts-ignore
	async post<T>(
		url: string,
		data?: any,
		params?: Record<string, any>,
		headers?: Record<string, string>,
	): Promise<T> {
		return this.http.post(url, data, { params, headers }).then((r) => r.data);
	}

	// @ts-ignore
	async put<T>(
		url: string,
		data?: any,
		params?: Record<string, any>,
		headers?: Record<string, string>,
	): Promise<T> {
		return this.http.put(url, data, { params, headers }).then((r) => r.data);
	}

	// @ts-ignore
	async patch<T>(
		url: string,
		data?: any,
		params?: Record<string, any>,
		headers?: Record<string, string>,
	): Promise<T> {
		return this.http.patch(url, data, { params, headers }).then((r) => r.data);
	}

	// @ts-ignore
	async delete<T>(
		url: string,
		params?: Record<string, any>,
		headers?: Record<string, string>,
	): Promise<T> {
		return this.http.delete(url, { params, headers }).then((r) => r.data);
	}
}
