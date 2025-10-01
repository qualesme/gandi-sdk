import { GandiClient } from '../client';
import {
	DomainsFilters,
	LinkedZoneFilters,
	LinkedZonePayload,
	UpdateLinkedZonePayload
} from "../types/linkedZoneTypes";

export class LinkedZoneResource {
	constructor(private client: GandiClient) {}

	listDomains(opts: DomainsFilters) {
		return this.client.get('/linkedzone/domains');
	}

	getDomainDetails(domain: string) {
		return this.client.get(`/linkedzone/domains/${encodeURIComponent(domain)}`);
	}

	listTasks(limit: number, offset: number, sort_by?: string) {
		const params: any = { limit, offset };
		if (sort_by) params.sort_by = sort_by;
		return this.client.get('/linkedzone/tasks', params);
	}

	getTaskDetails(taskId: string) {
		return this.client.get(`/linkedzone/tasks/${encodeURIComponent(taskId)}`);
	}

	unlinkDomains(domains: string[]) {
		return this.client.patch('/linkedzone/unlink/domains', { domains });
	}

	listZones(opts: LinkedZoneFilters) {
		return this.client.get('/linkedzone/zones', opts);
	}

	createZone(opts: LinkedZonePayload) {
		return this.client.post('/linkedzone/zones', opts);
	}

	getZoneDetails(zoneId: string, sharingId?: string) {
		const params: any = {};
		if (sharingId) params.sharing_id = sharingId;
		return this.client.get(`/linkedzone/zones/${encodeURIComponent(zoneId)}`, params);
	}

	deployUndeployZone(zoneId: string, deploy: boolean) {
		return this.client.post(`/linkedzone/zones/${encodeURIComponent(zoneId)}`, { deploy })
	}

	deployZone(zoneId: string) {
		return this.deployUndeployZone(zoneId, true);
	}

	undeployZone(zoneId: string) {
		return this.deployUndeployZone(zoneId, false);
	}

	updateZone(zoneId: string, opts: UpdateLinkedZonePayload) {
		return this.client.patch(`/linkedzone/zones/${encodeURIComponent(zoneId)}`, opts);
	}

	deleteZone(zoneId: string) {
		return this.client.delete(`/linkedzone/zones/${encodeURIComponent(zoneId)}`);
	}

	linkDomainToZone(zoneId: string, domains: string[]) {
		return this.client.patch(`/linkedzone/zones/${encodeURIComponent(zoneId)}/link/domains`, { domains });
	}
}
