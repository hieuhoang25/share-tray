import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import React, { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import HomePage from '@/app/(app)/page';

// Configure React act environment for jsdom
// @ts-expect-error globalThis IS_REACT_ACT_ENVIRONMENT flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('Home Page (Screen 1 - 01-home.html)', () => {
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

  it('renders initial curious state with phở bò and 3 reasons', async () => {
    await act(async () => {
      root.render(<HomePage />);
    });

    // Check header
    expect(container.textContent).toContain('mâm');
    expect(container.textContent).toContain('Hungry? Go here.');
    expect(container.textContent).toContain('Phở bò');
    expect(container.textContent).toContain('Phở Bà Tâm');
    expect(container.textContent).toContain('45,000₫ · about $1.70');

    // Check SVG phở illustration (92x92)
    const svg = container.querySelector('svg[width="92"][height="92"]');
    expect(svg).not.toBeNull();

    // Check Why this one, why now section with reasons
    expect(container.textContent).toContain('Why this one, why now');
    expect(container.textContent).toContain(
      'Phở is a breakfast dish here. This pot usually sells out before 10:30.'
    );

    // Check Happening now card
    expect(container.textContent).toContain('Happening now · 350 m from you');
    expect(container.textContent).toContain('A table sits down in 25 minutes');
    expect(container.textContent).toContain('See who is at the table');

    // Check Passport section
    expect(container.textContent).toContain('Your food passport');
    expect(container.textContent).toContain('3 of 12 dishes');
    expect(container.textContent).toContain(
      'Each stamp is signed by the local whose favourite you ate. Linh and Hùng wrote back to you.'
    );

    // Check Vietnamese footer link
    expect(container.textContent).toContain('Bạn là người Việt? Thêm quán quen của bạn');
  });

  it('switches to gentle level and updates recommendation to bánh mì', async () => {
    await act(async () => {
      root.render(<HomePage />);
    });

    const buttons = Array.from(container.querySelectorAll('button'));
    const gentleBtn = buttons.find((b) => b.textContent?.trim() === 'Gentle');
    expect(gentleBtn).toBeDefined();

    await act(async () => {
      gentleBtn?.click();
    });

    expect(container.textContent).toContain('Bánh mì');
    expect(container.textContent).toContain('Bánh mì Cô Nga');
    expect(container.textContent).toContain('25,000₫ · about $1');
    expect(container.textContent).toContain(
      'The easiest first meal: point at the fillings, pay, walk away.'
    );
  });

  it('switches to fearless level and updates recommendation to bún ốc', async () => {
    await act(async () => {
      root.render(<HomePage />);
    });

    const buttons = Array.from(container.querySelectorAll('button'));
    const fearlessBtn = buttons.find((b) => b.textContent?.trim() === 'Fearless');
    expect(fearlessBtn).toBeDefined();

    await act(async () => {
      fearlessBtn?.click();
    });

    expect(container.textContent).toContain('Bún ốc');
    expect(container.textContent).toContain('Bún ốc Bà Lượng');
    expect(container.textContent).toContain('35,000₫ · about $1.30');
    expect(container.textContent).toContain(
      'Almost no visitors find it. There is no sign and no menu.'
    );
  });

  it('contains navigation cards for Happening now and Borrow a Day', async () => {
    await act(async () => {
      root.render(<HomePage />);
    });

    expect(container.textContent).toContain('Happening now · 350 m from you');
    expect(container.textContent).toContain('Borrow a local’s day');

    const links = Array.from(container.querySelectorAll('a'));
    const tableLink = links.find((a) => a.getAttribute('href') === '/tables/1');
    const dayLink = links.find((a) => a.getAttribute('href') === '/days/linh-saturday');
    const contributeLink = links.find((a) => a.getAttribute('href') === '/contribute');

    expect(tableLink).toBeDefined();
    expect(dayLink).toBeDefined();
    expect(contributeLink).toBeDefined();
  });
});
