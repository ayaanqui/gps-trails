import { Test } from '@nestjs/testing';
import { Trail } from './trail';
import { Trail as Trails } from './trails.entity';

describe('Trails test', () => {

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [Trails]
    }).compile();
  });
});

describe('Trail.genRandom test', () => {
  it('should return random number', async () => {
    expect(Trail.genRandom(0, 10) == Trail.genRandom(11, 20)).toBe(false);
    expect(Trail.genRandom(-54154, 1541) < Trail.genRandom(1542, 45135)).toBe(true);
    expect(Trail.genRandom(54654, 456546) > Trail.genRandom(0, 41561)).toBe(true);
  });
});


describe('Trail.genRandomDec test', () => {
  it('should return random number', async () => {
    expect(Trail.genRandomDec(0, 10, 2) == Trail.genRandomDec(0, 10, 3)).toBe(false);
    expect(Trail.genRandomDec(0, 10, 2) < Trail.genRandomDec(10, 30, 3)).toBe(true);
    expect(Trail.genRandomDec(4848, 74515, 3) > Trail.genRandomDec(-15162, 4847, 3)).toBe(true);
  });
});
