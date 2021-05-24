import { Test } from '@nestjs/testing';
import { Trail as Trails } from './parks.entity';

describe('Trails test', () => {

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [Trails]
    }).compile();
  });
});

/* describe('Trail.genRandom test', () => {
  it('should return random number', async () => {
    // Your test here...
  });
}); */
