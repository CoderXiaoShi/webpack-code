// import add from './add'

import login from './api'
login()

import './access/css/style.css'

let h1 = document.createElement('h1')
h1.innerHTML = 'Hello word'
document.body.appendChild(h1)

console.log('hello word')

export default (x, y) => x * y;

if (module.hot) {
    module.hot.accept('./api', function() {
        login()
    })
}
