import test from 'ava';
import { join } from 'path';
import { getIndexes } from '../src/helpers';

test('getIndexes', t => {
  const actual = getIndexes('test/root', { ignore: ['**/*.spec.ts'] });

  const root = join('test', 'root');
  const rootA = join(root, 'a');
  const rootA1 = join(rootA, 'a1');
  const rootA2 = join(rootA1, 'a2');
  const rootB = join(root, 'b');
  const rootB1 = join(rootB, 'b1');
  const rootB2 = join(rootB1, 'b2');
  const indexTs = 'index.ts';

  const expected = [
    {
      export: 'export * from \'./a1x\';',
      path: join(rootA1, indexTs),
    },
    {
      export: 'export * from \'./a1/index\';',
      path: join(rootA, indexTs),
    },
    {
      export: 'export * from \'./a1y\';',
      path: join(rootA1, indexTs),
    },
    {
      export: 'export * from \'./a2x\';',
      path: join(rootA2, indexTs),
    },
    {
      export: 'export * from \'./a2/index\';',
      path: join(rootA1, indexTs),
    },
    {
      export: 'export * from \'./a2y\';',
      path: join(rootA2, indexTs),
    },
    {
      export: 'export * from \'./ay\';',
      path: join(rootA, indexTs),
    },
    {
      export: 'export * from \'./testcomponent\';',
      path: join(rootA, indexTs),
    },
    {
      export: 'export * from \'./b1x\';',
      path: join(rootB1, indexTs),
    },
    {
      export: 'export * from \'./b1/index\';',
      path: join(rootB, indexTs),
    },
    {
      export: 'export * from \'./b1y\';',
      path: join(rootB1, indexTs),
    },
    {
      export: 'export * from \'./b2x\';',
      path: join(rootB2, indexTs),
    },
    {
      export: 'export * from \'./b2/index\';',
      path: join(rootB1, indexTs),
    },
    {
      export: 'export * from \'./b2y\';',
      path: join(rootB2, indexTs),
    },
    {
      export: 'export * from \'./bx\';',
      path: join(rootB, indexTs),
    },
    {
      export: 'export * from \'./by\';',
      path: join(rootB, indexTs),
    },
  ];

  t.deepEqual(actual, expected);
});
