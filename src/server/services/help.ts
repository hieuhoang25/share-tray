import { getRepos } from '@/server/repositories';
import { callProvider } from '@/server/providers/call';
import type { HelpRequest } from '@/types/domain';

export class HelpService {
  async createRequest(params: {
    travellerId: string;
    reason: string;
    placeId?: string;
    lat?: number;
    lng?: number;
    orderSnapshot?: Record<string, unknown>;
  }): Promise<HelpRequest> {
    const repos = getRepos();
    const help = await repos.helpRequests.create({
      traveller_id: params.travellerId,
      reason: params.reason,
      place_id: params.placeId,
      lat: params.lat,
      lng: params.lng,
      order_snapshot: params.orderSnapshot,
      status: 'waiting',
    });

    return help;
  }

  async acceptRequest(helpId: string, volunteerId: string): Promise<HelpRequest> {
    const repos = getRepos();
    const volunteer = await repos.profiles.getByUserId(volunteerId);
    if (!volunteer || !volunteer.is_volunteer) {
      throw new Error('Only registered volunteers can accept help calls');
    }

    const session = await callProvider.createCallRoom(helpId);
    const updated = await repos.helpRequests.update(helpId, {
      volunteer_id: volunteerId,
      status: 'accepted',
      call_url: session.callUrl,
    });

    return updated;
  }

  /**
   * Location security rule: Only the traveller who created the request
   * or the assigned volunteer can view the exact GPS coordinates.
   */
  filterLocationForUser(help: HelpRequest, requestingUserId: string): Partial<HelpRequest> {
    const isAuthorized =
      requestingUserId === help.traveller_id ||
      (help.volunteer_id && requestingUserId === help.volunteer_id);

    if (isAuthorized) {
      return help;
    }

    const sanitized = { ...help };
    delete sanitized.lat;
    delete sanitized.lng;
    return sanitized;
  }
}

export const helpService = new HelpService();
