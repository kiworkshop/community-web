import BigNumber from 'bignumber.js';
const JSONbig = require('json-bigint');

describe('json-bigint test', () => {
  test('smallNumber_parse_number', () => {
    const str = '{"id": 1}'
    const result = JSONbig.parse(str);

    expect(BigNumber.isBigNumber(result.id)).toBe(false);
  })

  test('bigNumber_parse_BigNumber', () => {
    const str = '{"id": 9223372036854775807}'
    const result = JSONbig.parse(str);

    const { id } = result;

    expect(BigNumber.isBigNumber(id)).toBe(true);
  })
})