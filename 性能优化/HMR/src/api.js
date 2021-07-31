
export default () => {
    console.log('do login !!~~')
    let xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.response)
        }
    }

    xhr.open('GET', '/api/sentences');
    xhr.send();
    
    console.log('login send')
}
