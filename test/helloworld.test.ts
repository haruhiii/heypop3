import { sum, helloworld } from '../src/helloworld'

test('sum test', () => {
    expect(sum(1, 2, 3)).toBe(6)
})

test('hello world test', () => {
    expect(helloworld()).toBe('helloworld')
})
