import { describe, it, expect, beforeEach } from 'vitest';
import { helpService } from '@/server/services/help';
import { store } from '@/server/repositories/mock/store';
import { buildVendorCard, recommendNow } from '@/server/services/food';

describe('Help & Food Services', () => {
  beforeEach(() => {
    store.reset();
  });

  it('creates help request and protects GPS coordinates from unauthorized users', async () => {
    const req = await helpService.createRequest({
      travellerId: 'user-kenji',
      reason: 'I cannot order',
      lat: 21.0362,
      lng: 105.8344,
    });

    expect(req.status).toBe('waiting');
    expect(req.lat).toBe(21.0362);

    // Volunteer accepts
    const accepted = await helpService.acceptRequest(req.id, 'user-minhanh');
    expect(accepted.status).toBe('accepted');
    expect(accepted.call_url).toContain('meet.jit.si');

    // Authorized check: traveller sees coordinates
    const forTraveller = helpService.filterLocationForUser(accepted, 'user-kenji');
    expect(forTraveller.lat).toBe(21.0362);

    // Authorized check: assigned volunteer sees coordinates
    const forVolunteer = helpService.filterLocationForUser(accepted, 'user-minhanh');
    expect(forVolunteer.lat).toBe(21.0362);

    // Unauthorized check: third party does NOT see coordinates
    const forStranger = helpService.filterLocationForUser(accepted, 'user-stranger');
    expect(forStranger.lat).toBeUndefined();
    expect(forStranger.lng).toBeUndefined();
  });

  it('builds authentic vendor card with allergy warnings', () => {
    const card = buildVendorCard({
      items: [
        { name_vi: 'Phở tái', count: 1, price: 45000 },
        { name_vi: 'Quẩy giòn', count: 2, price: 20000 },
      ],
      foodRules: ['no_pork', 'no_peanut'],
      totalVnd: 65000,
    });

    expect(card.orderHeader).toBe('Cho cháu:');
    expect(card.itemsText).toContain('1 × Phở tái, 2 × Quẩy giòn');
    expect(card.allergyNotice).toContain('thịt lợn và lạc');
    expect(card.totalPrompt).toBe('Tổng 65.000₫, đúng không ạ?');
  });

  it('recommends right place based on brave level', async () => {
    const result = await recommendNow({ level: 'curious' });
    expect(result).not.toBeNull();
    expect(result?.place.name).toBe('Phở Bà Tâm');
    expect(result?.reasons.length).toBe(3);
  });
});
