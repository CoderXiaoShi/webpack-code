function add(x, y) {
    return x + y
}

console.log(add(1, 2))


import './style/iconfont.css'
import './style/index.less';
import print from './print'

print()

const addImg = (src) => {
    let img = new Image()
    img.src = src
    document.body.appendChild(img)
}

import img1 from './1.jpeg'
import img2 from './2.jpeg'

addImg(img1)
addImg(img2)

if (module.hot) {
    module.hot.accept('./print.js', function(m) {
        console.log('发现变化', m)
        print()
    })
}
