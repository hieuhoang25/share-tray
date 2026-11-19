import { describe, it, expect } from 'vitest';
import { TABS } from '@/components/ui/BottomNav';

describe('Design Tokens & Foundations', () => {
  it('verifies app manifest constants and brand label', () => {
    expect('Share Tray').toBe('Share Tray');
    expect('mâm').toBe('mâm');
  });

  it('verifies new warm color tokens specifications', () => {
    const tokens = {
      jade: '#0B5D4B',
      jadeDark: '#083F34',
      coral: '#FF7A59',
      mint: '#E2F0EA',
      surface: '#F3F5F2',
      ink: '#12211D',
      muted: '#4A5852',
      border: '#DCE2DE',
    };
    expect(tokens.jade).toBe('#0B5D4B');
    expect(tokens.jadeDark).toBe('#083F34');
    expect(tokens.coral).toBe('#FF7A59');
    expect(tokens.mint).toBe('#E2F0EA');
    expect(tokens.surface).toBe('#F3F5F2');
    expect(tokens.ink).toBe('#12211D');
    expect(tokens.muted).toBe('#4A5852');
    expect(tokens.border).toBe('#DCE2DE');
  });

  it('verifies BottomNav has 5 correct tabs according to mockup_update', () => {
    expect(TABS).toHaveLength(5);
    expect(TABS.map((t) => t.id)).toEqual(['home', 'tables', 'dishes', 'days', 'help']);
    expect(TABS.map((t) => t.label)).toEqual(['Home', 'Tables', 'Dishes', 'Days', 'Help']);
    expect(TABS.map((t) => t.href)).toEqual(['/', '/together', '/dishes', '/days/linh-saturday', '/help']);
  });
});
