import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import React, { act } from 'react';
import { createRoot, Root } from 'react-dom/client';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '',
}));

import TogetherScreen from '@/app/(app)/together/page';
import TableDetailScreen from '@/app/(app)/tables/[id]/page';
import TableLiveScreen from '@/app/(app)/tables/[id]/live/page';
import TableAfterScreen from '@/app/(app)/tables/[id]/after/page';
import NewTableScreen from '@/app/(app)/tables/new/page';
import CompanyScreen from '@/app/(app)/company/page';
import HelpScreen from '@/app/(app)/help/page';
import DayScreen from '@/app/(app)/days/[slug]/page';
import ContributeScreen from '@/app/(app)/contribute/page';

// Configure React act environment for jsdom
// @ts-expect-error globalThis IS_REACT_ACT_ENVIRONMENT flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('Group B Screens (06-together -> 14-contribute)', () => {
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

  describe('Screen 6: Together (/together)', () => {
    it('renders header, hero happening now card, purpose chips, and tables', async () => {
      await act(async () => {
        root.render(<TogetherScreen />);
      });

      expect(container.textContent).toContain('Eat together. Leave with friends.');
      expect(container.textContent).toContain('Happening now · 350 m from you');
      expect(container.textContent).toContain('A table in 25 minutes');
      expect(container.textContent).toContain('See who is at the table');
      expect(container.textContent).toContain('What are you hoping for?');
      expect(container.textContent).toContain('Half & half bún chả');
      expect(container.textContent).toContain('Open a seat at your own table');
      expect(container.textContent).toContain('Prefer one person to a full table?');
    });

    it('filters tables when selecting purpose chip', async () => {
      await act(async () => {
        root.render(<TogetherScreen />);
      });

      const buttons = Array.from(container.querySelectorAll('button'));
      const workChip = buttons.find((b) => b.textContent?.trim() === 'Work contacts');
      expect(workChip).toBeDefined();

      await act(async () => {
        workChip?.click();
      });

      expect(container.textContent).toContain('Engineers’ hot pot');
      expect(container.textContent).toContain('Lunch with an office team');
    });
  });

  describe('Screen 7: Table Details (/tables/:id)', () => {
    it('renders table fit box, people list with initial badges, and toggle seat', async () => {
      const idPromise = Promise.resolve({ id: '1' });
      await act(async () => {
        root.render(<TableDetailScreen params={idPromise} />);
      });

      expect(container.textContent).toContain('Half & half bún chả');
      expect(container.textContent).toContain('Why this table fits you');
      expect(container.textContent).toContain('Who is at the table');
      expect(container.textContent).toContain('Thảo · host');
      expect(container.textContent).toContain('Kenji');
      expect(container.textContent).toContain('12:15 · 6 seats');
      expect(container.textContent).toContain('How the hour goes');
      expect(container.textContent).toContain('What it costs');
      expect(container.textContent).toContain('Table rules');

      // Free seat state
      expect(container.textContent).toContain('One seat is free. It could be yours.');
      const buttons = Array.from(container.querySelectorAll('button'));
      const takeBtn = buttons.find((b) => b.textContent?.trim() === 'Take the seat');
      expect(takeBtn).toBeDefined();

      await act(async () => {
        takeBtn?.click();
      });

      expect(container.textContent).toContain('You are in. See you at 12:15.');
      expect(container.textContent).toContain('Give the seat back');
    });
  });

  describe('Screen 8: Table Live (/tables/:id/live)', () => {
    it('renders conversation prompt card, prev/next, rituals, and bill split', async () => {
      const idPromise = Promise.resolve({ id: '1' });
      await act(async () => {
        root.render(<TableLiveScreen params={idPromise} />);
      });

      expect(container.textContent).toContain('No awkward silence.');
      expect(container.textContent).toContain('Card 1 of 6');
      expect(container.textContent).toContain('What did you eat for breakfast as a child?');

      const buttons = Array.from(container.querySelectorAll('button'));
      const nextBtn = buttons.find((b) => b.textContent?.trim() === 'Next card');
      expect(nextBtn).toBeDefined();

      await act(async () => {
        nextBtn?.click();
      });

      expect(container.textContent).toContain('Card 2 of 6');
      expect(container.textContent).toContain('Table rituals for bún chả');
      expect(container.textContent).toContain('Word trade: everyone teaches one word');
      expect(container.textContent).toContain('The bill, without the awkward part');
      expect(container.textContent).toContain('50,000₫ each');
      expect(container.textContent).toContain(
        'Everyone hands their share to Thảo in cash. She pays the shop.'
      );
      expect(container.textContent).toContain('We are done eating');
    });
  });

  describe('Screen 9: Table After (/tables/:id/after)', () => {
    it('renders mutual matching status, kudos, network stats, and next table teasers', async () => {
      const idPromise = Promise.resolve({ id: '1' });
      await act(async () => {
        root.render(<TableAfterScreen params={idPromise} />);
      });

      expect(container.textContent).toContain('You ate with five people.');
      expect(container.textContent).toContain('Table photo · Bún chả Ngõ 41 · 16 Nov');
      expect(container.textContent).toContain('Both said yes · contacts shared');

      const buttons = Array.from(container.querySelectorAll('button'));
      const minhanhBtn = buttons.find((b) => b.textContent?.trim() === 'Keep in touch');
      expect(minhanhBtn).toBeDefined();

      await act(async () => {
        minhanhBtn?.click();
      });

      expect(container.textContent).toContain('Waiting for their answer');
      expect(container.textContent).toContain('Leave Thảo, your host, one kind word');
      expect(container.textContent).toContain('Your table network');
      expect(container.textContent).toContain('14');
      expect(container.textContent).toContain('people kept');
      expect(container.textContent).toContain('Find my next table');
    });
  });

  describe('Screen 10: New Table (/tables/new)', () => {
    it('renders open seat form with stepper and dynamic summary', async () => {
      await act(async () => {
        root.render(<NewTableScreen />);
      });

      expect(container.textContent).toContain('Open a seat.');
      expect(container.textContent).toContain('Where are you eating?');
      expect(container.textContent).toContain('When?');
      expect(container.textContent).toContain('How many open seats?');
      expect(container.textContent).toContain('Your table card · what others see');
      expect(container.textContent).toContain('Your table, as others will see it');

      const buttons = Array.from(container.querySelectorAll('button'));
      const incBtn = buttons.find((b) => b.getAttribute('aria-label') === 'One seat more');
      expect(incBtn).toBeDefined();

      await act(async () => {
        incBtn?.click();
      });

      expect(container.textContent).toContain('3 open seats at Phở Bà Tâm');
      expect(container.textContent).toContain('Open the table');
    });
  });

  describe('Screen 11: Company (/company)', () => {
    it('switches between eat with local and hire licensed guide', async () => {
      await act(async () => {
        root.render(<CompanyScreen />);
      });

      expect(container.textContent).toContain('One local, just for you.');
      expect(container.textContent).toContain('Eat with one local');
      expect(container.textContent).toContain('Hire a licensed guide');
      expect(container.textContent).toContain('Thảo, 26');
      expect(container.textContent).toContain('Bác Hòa, 63');

      const buttons = Array.from(container.querySelectorAll('button'));
      const guideTab = buttons.find((b) => b.textContent?.trim() === 'Hire a licensed guide');
      expect(guideTab).toBeDefined();

      await act(async () => {
        guideTab?.click();
      });

      expect(container.textContent).toContain('Quang, 34');
      expect(container.textContent).toContain('Mai, 29');
      expect(container.textContent).toContain('How we keep this safe');
    });
  });

  describe('Screen 12: Help (/help)', () => {
    it('renders reasons, volunteer card, call toggle, and live captions', async () => {
      await act(async () => {
        root.render(<HelpScreen />);
      });

      expect(container.textContent).toContain('Stuck? A local picks up.');
      expect(container.textContent).toContain('What is going on?');
      expect(container.textContent).toContain('Minh Anh, 21');
      expect(container.textContent).toContain('Free right now');
      expect(container.textContent).toContain('On speaker · live captions');
      expect(container.textContent).toContain('Minh Anh to the vendor');

      const buttons = Array.from(container.querySelectorAll('button'));
      const callBtn = buttons.find((b) => b.textContent?.trim() === 'End call and say thanks');
      expect(callBtn).toBeDefined();

      await act(async () => {
        callBtn?.click();
      });

      expect(container.textContent).toContain('Call Minh Anh · free');
      expect(container.textContent).not.toContain('On speaker · live captions');
    });
  });

  describe('Screen 13: Day (/days/:slug)', () => {
    it('renders 3-stat bar, 5 timeline stops, and other borrowable days', async () => {
      await act(async () => {
        root.render(<DayScreen />);
      });

      expect(container.textContent).toContain('Borrow a local’s day');
      expect(container.textContent).toContain('Linh’s Saturday');
      expect(container.textContent).toContain('5');
      expect(container.textContent).toContain('stops');
      expect(container.textContent).toContain('2.1 km');
      expect(container.textContent).toContain('200,000₫');

      expect(container.textContent).toContain('Phở bò');
      expect(container.textContent).toContain('Cà phê trứng');
      expect(container.textContent).toContain('Bún chả');
      expect(container.textContent).toContain('Chè');
      expect(container.textContent).toContain('Ốc luộc');

      expect(container.textContent).toContain('Start Linh’s day');
      expect(container.textContent).toContain('Other days you can borrow');
    });
  });

  describe('Screen 14: Contribute (/contribute)', () => {
    it('renders Vietnamese contribute form with dot ratings and amenities', async () => {
      await act(async () => {
        root.render(<ContributeScreen />);
      });

      expect(container.textContent).toContain('Thêm quán quen của bạn');
      expect(container.textContent).toContain('Tên quán');
      expect(container.textContent).toContain('Bạn biết quán này từ đâu?');
      expect(container.textContent).toContain('Món quen của bạn');
      expect(container.textContent).toContain('Bạn hay gọi gì?');
      expect(container.textContent).toContain('Bạn trả bao nhiêu? (₫)');
      expect(container.textContent).toContain('Chấm điểm (chạm để chọn)');
      expect(container.textContent).toContain('Giá cả');
      expect(container.textContent).toContain('Thái độ phục vụ');
      expect(container.textContent).toContain('Không gian quán');
      expect(container.textContent).toContain('Quanh quán có gì tiện cho khách?');
      expect(container.textContent).toContain('Kỷ niệm của bạn với quán');
      expect(container.textContent).toContain('Gửi quán quen');
      expect(container.textContent).toContain('mâm · ăn cùng nhau ở Việt Nam');

      // Test dot rating click
      const buttons = Array.from(container.querySelectorAll('button'));
      const starBtn = buttons.find((b) => b.getAttribute('aria-label') === 'Giá cả: 2 trên 5');
      expect(starBtn).toBeDefined();

      await act(async () => {
        starBtn?.click();
      });
    });
  });
});
