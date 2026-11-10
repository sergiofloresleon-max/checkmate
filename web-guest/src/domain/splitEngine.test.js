import { describe, it, expect } from 'vitest';
import { allocateExactCents } from './splitEngine';

describe('CheckMate allocateExactCents (Hamilton Method)', () => {
  it('never loses a cent when splitting $160.00 three ways', () => {
    const shares = allocateExactCents(160.0, ['p-sofia', 'p-host', 'p-diego']);
    expect(shares['p-diego']).toBe(53.34);
    expect(shares['p-host']).toBe(53.33);
    expect(shares['p-sofia']).toBe(53.33);

    const sum = Object.values(shares).reduce((a, b) => a + Math.round(b * 100), 0);
    expect(sum).toBe(16000);
  });
});
