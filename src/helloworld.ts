function sum(...numbers: number[]) {
  let res: number = 0
  for (const i of numbers) {
    res += i
  }
  return res
}

function helloworld() {
  return 'helloworld'
}

export { helloworld, sum }
