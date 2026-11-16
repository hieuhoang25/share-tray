import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import React, { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import DishesScreen from '@/app/(app)/dishes/page';
import PlaceScreen from '@/app/(app)/places/[slug]/page';
import OrderScreen from '@/app/(app)/places/[slug]/order/page';
import GuideScreen from '@/app/(app)/places/[slug]/guide/page';

// Configure React act environment for jsdom
// @ts-expect-error globalThis IS_REACT_ACT_ENVIRONMENT flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('Group A Screens (02-dishes -> 05-guide)', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  describe('Screen 2: Dishes (/dishes)', () => {
    it('renders header, dish chips, explanatory note, and place cards with scores', async () => {
      await act(async () => {
        root.render(<DishesScreen />);
      });

      expect(container.textContent).toContain('WHAT ARE YOU CRAVING?');
      expect(container.textContent).toContain('Phở');
      expect(container.textContent).toContain('Bún chả');
      expect(container.textContent).toContain('Ốc');
      expect(container.textContent).toContain('Cà phê');
      expect(container.textContent).toContain('Ranked only by Vietnamese people who eat there.');

      // Default is Phở
      expect(container.textContent).toContain('Phở Bà Tâm');
      expect(container.textContent).toContain('4.5');
      expect(container.textContent).toContain('23 locals eat here');
      expect(container.textContent).toContain('Known for');
      expect(container.textContent).toContain('Price 4.7 · Service 4.2 · Space 3.9');
      expect(container.textContent).toContain('Curious');
    });

    it('switches dishes when clicking a dish chip', async () => {
      await act(async () => {
        root.render(<DishesScreen />);
      });

      const buttons = Array.from(container.querySelectorAll('button'));
      const bunchaBtn = buttons.find((b) => b.textContent?.trim() === 'Bún chả');
      expect(bunchaBtn).toBeDefined();

      await act(async () => {
        bunchaBtn?.click();
      });

      expect(container.textContent).toContain('Bún chả Ngõ 41');
      expect(container.textContent).toContain('Bún chả Cô Dung');
      expect(container.textContent).toContain('28 locals eat here');
    });
  });

  describe('Screen 3: Place Details (/places/:slug)', () => {
    it('renders red header, why locals praise it, downside, score bars, usual card, around here, and CTAs', async () => {
      const slugPromise = Promise.resolve({ slug: 'pho-ba-tam' });

      await act(async () => {
        root.render(<PlaceScreen params={slugPromise} />);
      });

      expect(container.textContent).toContain('All phở places');
      expect(container.textContent).toContain('PHỞ BÀ TÂM');
      expect(container.textContent).toContain('4.5 from 23 locals');
      expect(container.textContent).toContain('Curious level');
      expect(container.textContent).toContain('Open until 10:30');

      // Praises & Downside
      expect(container.textContent).toContain('WHY LOCALS PRAISE IT');
      expect(container.textContent).toContain('The broth');
      expect(container.textContent).toContain('The honest downside');

      // Score bars
      expect(container.textContent).toContain('Price');
      expect(container.textContent).toContain('4.7');
      expect(container.textContent).toContain('Service');
      expect(container.textContent).toContain('4.2');
      expect(container.textContent).toContain('Space');
      expect(container.textContent).toContain('3.9');

      // Usual card
      expect(container.textContent).toContain('ORDER “THE USUAL” · WALK IN AS A FRIEND');
      expect(container.textContent).toContain('Cháu là bạn của Linh. Cho cháu như Linh hay ăn ạ.');
      expect(container.textContent).toContain('Show this card at the shop');

      // Around here tabs
      expect(container.textContent).toContain('AROUND HERE');
      expect(container.textContent).toContain('Văn Miếu (Temple of Literature)');

      // Reviews
      expect(container.textContent).toContain('WHAT LOCALS SAY');
      expect(container.textContent).toContain('Linh, 29');

      // Open seats
      expect(container.textContent).toContain('OPEN SEATS AT THIS SHOP');
      expect(container.textContent).toContain('Tomorrow 08:00 · two seats free');

      // 3 Bottom CTAs
      expect(container.textContent).toContain('Walk me through it, step by step');
      expect(container.textContent).toContain('Open a seat and eat here with others');
      expect(container.textContent).toContain('Stuck? Call a local');
    });

    it('toggles review language between translated and original', async () => {
      const slugPromise = Promise.resolve({ slug: 'pho-ba-tam' });

      await act(async () => {
        root.render(<PlaceScreen params={slugPromise} />);
      });

      const buttons = Array.from(container.querySelectorAll('button'));
      const translateBtn = buttons.find((b) =>
        b.textContent?.includes('Translated from Vietnamese · tap to see the original')
      );
      expect(translateBtn).toBeDefined();

      await act(async () => {
        translateBtn?.click();
      });

      expect(container.textContent).toContain('Mình dắt bạn ở xa đến đây đầu tiên');
    });
  });

  describe('Screen 4: Order (/places/:slug/order)', () => {
    it('renders header, food rules, menu stepper, and vendor card with replies', async () => {
      const slugPromise = Promise.resolve({ slug: 'pho-ba-tam' });

      await act(async () => {
        root.render(<OrderScreen params={slugPromise} />);
      });

      expect(container.textContent).toContain('YOU ARE STANDING AT');
      expect(container.textContent).toContain('PHỞ BÀ TÂM');
      expect(container.textContent).toContain('Your food rules: no peanuts · no pork');
      expect(container.textContent).toContain('Order Linh’s usual in one tap');

      // Check menu items
      expect(container.textContent).toContain('Phở tái');
      expect(container.textContent).toContain('Quẩy');
      expect(container.textContent).toContain('YOUR ORDER');

      // Vendor card
      expect(container.textContent).toContain('TURN YOUR PHONE TO THE VENDOR');
      expect(container.textContent).toContain('Cháu không ăn được lạc và thịt lợn.');
      expect(container.textContent).toContain('Đúng rồi');
      expect(container.textContent).toContain('Hết món');
      expect(container.textContent).toContain('Đợi chút');

      // Vendor reply simulation
      const replyButtons = Array.from(container.querySelectorAll('button')).filter(
        (b) => b.textContent?.trim() === 'Đúng rồi'
      );
      expect(replyButtons.length).toBeGreaterThan(0);

      await act(async () => {
        replyButtons[0].click();
      });

      expect(container.textContent).toContain('The vendor answered');
      expect(container.textContent).toContain('Yes, that is right. Take a seat.');
    });

    it('handles clicking Linh’s usual in one tap', async () => {
      const slugPromise = Promise.resolve({ slug: 'pho-ba-tam' });

      await act(async () => {
        root.render(<OrderScreen params={slugPromise} />);
      });

      const usualBtn = Array.from(container.querySelectorAll('button')).find((b) =>
        b.textContent?.includes('Order Linh’s usual in one tap')
      );
      expect(usualBtn).toBeDefined();

      await act(async () => {
        usualBtn?.click();
      });

      expect(container.textContent).toContain('Cháu là bạn của Linh. Cho cháu như Linh hay ăn:');
      expect(container.textContent).toContain('phở tái nạm');
      expect(container.textContent).toContain('quẩy');
    });
  });

  describe('Screen 5: Guide (/places/:slug/guide)', () => {
    it('switches across Find, Eat, and Pay tabs correctly', async () => {
      const slugPromise = Promise.resolve({ slug: 'pho-ba-tam' });

      await act(async () => {
        root.render(<GuideScreen params={slugPromise} />);
      });

      // Default: Find tab
      expect(container.textContent).toContain('THE LAST 50 METRES');
      expect(container.textContent).toContain('Open and still serving · confirmed by a local 20 min ago');
      expect(container.textContent).toContain('Quán phở Bà Tâm ở đâu ạ?');
      expect(container.textContent).toContain('I’m here. Help me order');

      // Switch to Eat tab
      const tabButtons = Array.from(container.querySelectorAll('button'));
      const eatBtn = tabButtons.find((b) => b.textContent?.trim() === '2 Eat it');
      expect(eatBtn).toBeDefined();

      await act(async () => {
        eatBtn?.click();
      });

      expect(container.textContent).toContain('EAT IT LIKE A LOCAL');
      expect(container.textContent).toContain('Taste the broth first');
      expect(container.textContent).toContain('What is on the table (all free)');
      expect(container.textContent).toContain('Chanh');
      expect(container.textContent).toContain('Giấm tỏi');
      expect(container.textContent).toContain('Worried about your stomach?');

      // Switch to Pay tab
      const payBtn = Array.from(container.querySelectorAll('button')).find(
        (b) => b.textContent?.trim() === '3 Pay'
      );
      expect(payBtn).toBeDefined();

      await act(async () => {
        payBtn?.click();
      });

      expect(container.textContent).toContain('PAY THE LOCAL PRICE');
      expect(container.textContent).toContain('What locals paid here this month');
      expect(container.textContent).toContain('40,000–55,000₫');
      expect(container.textContent).toContain('For 55,000₫, hand over this');
      expect(container.textContent).toContain('Careful: two blue notes, 25 times apart');
      expect(container.textContent).toContain('What did you pay?');
      expect(container.textContent).toContain('Stamp earned, signed by Linh');
      expect(container.textContent).toContain('Find my next dish');
    });
  });
});
