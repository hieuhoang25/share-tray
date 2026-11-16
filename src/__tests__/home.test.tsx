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
    expect(container.textContent).toContain('SHARE TRAY');
    expect(container.textContent).toContain('HUNGRY? GO HERE.');
    expect(container.textContent).toContain('PHỞ BÒ');
    expect(container.textContent).toContain('Phở Bà Tâm');
    expect(container.textContent).toContain('45,000₫ · about $1.70');

    // Check SVG phở illustration (96x96)
    const svg = container.querySelector('svg[width="96"][height="96"]');
    expect(svg).not.toBeNull();

    // Check DarkCard WHY THIS ONE, WHY NOW with yellow bullets
    expect(container.textContent).toContain('WHY THIS ONE, WHY NOW');
    expect(container.textContent).toContain(
      'Phở is a breakfast dish here. This pot usually sells out before 10:30.'
    );

    // Check Passport section
    expect(container.textContent).toContain('YOUR FOOD PASSPORT');
    expect(container.textContent).toContain('3 of 12 dishes');
    expect(container.textContent).toContain(
      'Each stamp is signed by the local whose favourite you ate. Linh and Hùng wrote back to you.'
    );

    // Check Vietnamese footer link
    expect(container.textContent).toContain('Bạn là người Việt? Thêm quán quen của bạn →');
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

    expect(container.textContent).toContain('BÁNH MÌ');
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

    expect(container.textContent).toContain('BÚN ỐC');
    expect(container.textContent).toContain('Bún ốc Bà Lượng');
    expect(container.textContent).toContain('35,000₫ · about $1.30');
    expect(container.textContent).toContain(
      'Almost no visitors find it. There is no sign and no menu.'
    );
  });

  it('contains navigation cards for Borrow a Day and Together', async () => {
    await act(async () => {
      root.render(<HomePage />);
    });

    expect(container.textContent).toContain('BORROW A LOCAL’S DAY');
    expect(container.textContent).toContain('DON’T EAT ALONE');

    const links = Array.from(container.querySelectorAll('a'));
    const dayLink = links.find((a) => a.getAttribute('href') === '/days/linh-saturday');
    const togetherLink = links.find((a) => a.getAttribute('href') === '/together');
    const contributeLink = links.find((a) => a.getAttribute('href') === '/contribute');

    expect(dayLink).toBeDefined();
    expect(togetherLink).toBeDefined();
    expect(contributeLink).toBeDefined();
  });
});
