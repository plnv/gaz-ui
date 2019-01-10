import { TonumberPipe } from './tonumber.pipe';

describe('TonumberPipe', () => {
  it('create an instance', () => {
    const pipe = new TonumberPipe();
    expect(pipe).toBeTruthy();
  });
});
