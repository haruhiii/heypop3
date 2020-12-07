import pop3 from '../src/index'

const p = new pop3({
    host: 'pop3.163.com',
    port: 110
})

test('connect test', async () => {
    expect(await p.connect()).toMatch(/Welcome to coremail Mail Pop3 Server.*/)
})

test('login test 2', async () => {
    expect(await p.login('heypop3', 'heypop3')).toThrowError()
})
