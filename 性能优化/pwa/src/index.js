import { mul } from './test';

const add = (x, y) => x + y;

console.log(add(1, 2), mul(2, 4));

// 注册 serviceworker
// 处理兼容问题
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => {
        console.log('serviceWorker 注册成功');
      })
      .catch(() => {
        console.log('serviceWorker 注册失败');
      });
  });
}
