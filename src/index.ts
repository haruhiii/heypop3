import * as net from 'net'

const opts = {
    port: 110,
    host: '',
    timeout: 2000
}
const client = new net.Socket()
async function waitFor(
    action: 'connect' | 'user' | 'pass' | 'stat' | 'quit' | 'uidl' | 'retr',
    timeout: number,
    i?: number
) {
    return new Promise((resolve: (server: string) => void, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('timeout waiting for response'))
            client.removeListener('data', onData)
        }, timeout)
        function onData(data: Buffer) {
            clearTimeout(timer)
            resolve(data.toString())
        }
        client.once('data', onData)
        switch (action) {
            case 'connect':
                client.connect(opts)
                break
            case 'user':
                client.write('user ' + '\r\n')
                break
            case 'pass':
                client.write('pass \r\n')
                break
            case 'stat':
                client.write('stat\r\n')
                break
            case 'uidl':
                client.write('uidl\r\n')
                break
            case 'retr':
                client.write(`RETR ${i}\r\n`)
                break
        }
    })
}

!(async function go() {
    const res = await waitFor('connect', 10000)
    console.log(res)
    const res2 = await waitFor('user', 10000)
    console.log(res2)
    const res3 = await waitFor('pass', 10000)
    console.log(res3)
    const res4 = await waitFor('stat', 10000)
    console.log(res4)
    const res5 = await waitFor('uidl', 10000)
    console.log(res5)
    console.log(await waitFor('retr', 10000, 1))
    console.log(await waitFor('retr', 10000, 2))
    console.log(await waitFor('retr', 10000, 3))
    console.log(await waitFor('retr', 10000, 4))
    console.log(await waitFor('retr', 10000, 5))
    console.log(await waitFor('retr', 10000, 6))

    // const res4 = await waitFor('LIST', 2000)
    // const res4 = await waitFor('RETR', 2000)
    // const res4 = await waitFor('DELE', 2000)
    // const res4 = await waitFor('RSET', 2000)
    // const res4 = await waitFor('TOP', 2000)
    // const res4 = await waitFor('NOOP', 2000)
    // const res4 = await waitFor('QUIT', 2000)
})()
