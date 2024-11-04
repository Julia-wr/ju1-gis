let testId = document.getElementById('test');

let button = document.getElementById('testB');
button.addEventListener('click', test);
function test(event){
    testId.textContent = "You now have X€";
}


