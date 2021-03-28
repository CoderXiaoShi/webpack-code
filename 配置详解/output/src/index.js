// import add from './add'
import subtract from './subtract'

console.log('hello word')

import('./add')
    .then(({ default: add }) => {
        console.log(`add: ${add(1, 2)}`)
    })

console.log(`subtract: ${subtract(1, 2)}`)

export default (x, y) => x * y;
