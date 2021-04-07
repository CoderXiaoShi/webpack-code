
import(/* webpackChunkName: 'moduleA' */ './a.js')
    .then(({ add }) => {
        console.log(`add(1,2): ${add(1,2)}`)
    })


// // import add from './add'
// import subtract from './subtract'

// import login from './api'
// login()

// import '@css/style'

// let h1 = document.createElement('h1')
// h1.innerHTML = 'Hello word'
// document.body.appendChild(h1)

// console.log('hello word')

// import('./add')
//     .then(({ default: add }) => {
//         console.log(`add: ${add(1, 2)}`)
//     })

// console.log(`subtract: ${subtract(1, 2)}`)

// export default (x, y) => x * y;

// if (module.hot) {
//     module.hot.accept('./api', function() {
//         login()
//     })
// }
