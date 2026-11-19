import React, { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  Button,
  Chip,
  Card,
  DarkCard,
  NoteBox,
  NumberedStep,
  ScoreBar,
  SeatDots,
  SeatLegend,
  TableRing,
  ScreenHeader,
} from '@/components/ui';

// @ts-expect-error globalThis IS_REACT_ACT_ENVIRONMENT flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('Shared UI Components', () => {
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

  it('renders Button with variants and touch targets', async () => {
    await act(async () => {
      root.render(
        <div>
          <Button variant="primary-coral">Coral Button</Button>
          <Button variant="primary-jade">Jade Button</Button>
          <Button variant="mint">Mint Button</Button>
        </div>
      );
    });

    expect(container.textContent).toContain('Coral Button');
    expect(container.textContent).toContain('Jade Button');
    expect(container.textContent).toContain('Mint Button');
  });

  it('renders Chip with aria-pressed states', async () => {
    await act(async () => {
      root.render(
        <div>
          <Chip label="Gentle" selected={true} />
          <Chip label="Curious" selected={false} />
        </div>
      );
    });

    const buttons = container.querySelectorAll('button');
    expect(buttons[0].getAttribute('aria-pressed')).toBe('true');
    expect(buttons[1].getAttribute('aria-pressed')).toBe('false');
  });

  it('renders Cards and callouts correctly', async () => {
    await act(async () => {
      root.render(
        <div>
          <Card>Standard Card</Card>
          <DarkCard>Dark Jade Card</DarkCard>
          <NoteBox>Note Warning</NoteBox>
        </div>
      );
    });

    expect(container.textContent).toContain('Standard Card');
    expect(container.textContent).toContain('Dark Jade Card');
    expect(container.textContent).toContain('Note Warning');
  });

  it('renders NumberedStep and ScoreBar', async () => {
    await act(async () => {
      root.render(
        <div>
          <NumberedStep number="1" title="The broth" description="Slow cooked bones." />
          <ScoreBar label="Price" score={4.7} />
        </div>
      );
    });

    expect(container.textContent).toContain('1');
    expect(container.textContent).toContain('The broth');
    expect(container.textContent).toContain('Slow cooked bones.');
    expect(container.textContent).toContain('Price');
    expect(container.textContent).toContain('4.7');
  });

  it('renders SeatDots, SeatLegend and TableRing', async () => {
    await act(async () => {
      root.render(
        <div>
          <SeatDots locals={3} travellers={2} free={1} />
          <SeatLegend />
          <TableRing locals={3} travellers={2} free={1} />
        </div>
      );
    });

    expect(container.textContent).toContain('Local');
    expect(container.textContent).toContain('Traveller');
    expect(container.textContent).toContain('Free seat');
  });

  it('renders ScreenHeader with back button and title', async () => {
    await act(async () => {
      root.render(
        <ScreenHeader
          title="Phở Bà Tâm"
          subtitle="Beef noodle soup"
          variant="jade"
          backHref="/dishes"
          backLabel="All phở places"
        />
      );
    });

    expect(container.textContent).toContain('Phở Bà Tâm');
    expect(container.textContent).toContain('Beef noodle soup');
    expect(container.textContent).toContain('All phở places');
  });
});
