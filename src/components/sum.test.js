import sum from "./sum"

test('sum test', () => {
  const result = sum(1, 2)
  expect(result).toBe(3)
})

test('sum test', () => {
  const result = sum(-1, 2)
  expect(result).toBe(1)
})
