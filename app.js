const keineGleich = 0;
const zweiGleich = 1.5;
const dreiGleich = 10;

let win;

//Changes current money value and saves name
let buttonCharge = document.getElementById('chargeB');
buttonCharge?.addEventListener('click', chargeB, false);
function chargeB(event){
    checkBoxes() ? null : userAlertWrongInput();
    //saves name
    var nameBefore = sessionStorage.getItem('name');
    sessionStorage.setItem('name', document.getElementById('name').value);
    //set money variable
    if(nameBefore != sessionStorage.getItem('name')){
        sessionStorage.setItem('money', 0);
    }
    sessionStorage.setItem('money', +document.getElementById('money').value + +sessionStorage.getItem('money'));
    currentDisplayMoney.textContent = "You now have "+ sessionStorage.getItem('money') + "€";
}

//checks if user put something in the charging boxes
let wrongInputDisplay = document.getElementById('wrongInputDisplay');
function checkBoxes(){
    if(document.getElementById('name').value == ""
    || document.getElementById('money').value == ""){
        wrongInputDisplay.textContent = "Please enter both name and amout to be charged!";  
        return false;
    }
    return true;
}

//Button for 1€ bet starts Spin
let buBet1Spin = document.getElementById('bet1Spin');
buBet1Spin?.addEventListener('click', bet1Spin, false);
function bet1Spin(event) {
    checkBet(1) ? doSpin(1) : null;
}

//Button for a bet higher than 1€ starts spin
let buBetHigher1Spin = document.getElementById('betHigher1Spin');
buBetHigher1Spin?.addEventListener('click', betHigher1Spin, false);
function betHigher1Spin(event) {
    checkBet(document.getElementById('betHigher1').value) ? doSpin(document.getElementById('betHigher1').value) : null;
}

//Spin the Slot Machine
function doSpin(bet) {
    
    var slotImages = ["Slot Pics/Seven.jpg", "Slot Pics/Bell.jpg", "Slot Pics/Cherry.jpg", "Slot Pics/Grape.jpg", "Slot Pics/lemon.jpg", "Slot Pics/Orange.jpg", "Slot Pics/Plum.jpg", "Slot Pics/Strawberry.jpg", "Slot Pics/Watermelon.jpg"];
    //create random numbers to select pictures randomly
	var image1 = Math.floor((Math.random() * 9));
	var image2 = Math.floor((Math.random() * 9));
    var image3 = Math.floor((Math.random() * 9));	
    
    document.getElementById('slotImage1').src = slotImages[image1];
    document.getElementById('slotImage2').src = slotImages[image2];
    document.getElementById('slotImage3').src = slotImages[image3];

    checkWin(image1, image2, image3, bet);

}

//Check if Player won and adds win to players wallet or deducts lost bet
let winLoseDisplay = document.getElementById('winLoseDisplay');
function checkWin(x, y, z, bet) {
    if(x == y && y == z) {
        win = +bet * +dreiGleich;
        sessionStorage.setItem('money', +sessionStorage.getItem('money') + +win);
        winLoseDisplay.textContent = "Congratulations you got the jackpot!! You win " + win + "€";
        checkHighscore(win);
    }
    if(x == y || y == z || x == z) {
        win = +bet * +zweiGleich;
        sessionStorage.setItem('money', +sessionStorage.getItem('money') + +win);
        winLoseDisplay.textContent = "You won " + win + "€";
        checkHighscore(win);
    }
    else{
        sessionStorage.setItem('money', +sessionStorage.getItem('money') - +bet);
        winLoseDisplay.textContent = "Unfortunately you lost...";
    }
}

//Check if Player hat enough money to spin with entered bet
function checkBet(bet){
    if(parseInt(sessionStorage.getItem('money')) < parseInt(bet)){
        winLoseDisplay.textContent = "You don't have enough money, please charge some money to continue playing.";
        return false;
    }
    else{
        return true;
    }
}

//checks if a new highscore was set
async function checkHighscore(win){
    let highscoreList = await getHighscores();
    if(highscoreList.length < 10){
        newHighscroe(win, highscoreList.length);
    }
    else{
        for(let i = 0; i <= highscoreList.length - 1; i++){
            if(win >= highscoreList[i].amount){
                newHighscroe(win, i);
                i = highscoreList.length + 1;
            }
        }
    }
}

//set new highscore !unfinished!
async function newHighscroe(highscore, position){
    alert('Congratulations, you set a new highscore! You are now on Place ' + ++position + '!');
    var newHighscore = {name: sessionStorage.getItem('name'), amount: highscore};
    await addHighscore(newHighscore);
}

//print current the highscores and money display
let currentDisplayMoney = document.getElementById('currentDisplayMoney');
window.onload = async function() {
    let highscoreList = await getHighscores();
    if(document.getElementById(1) != undefined){
        console.log(highscoreList);
        for(k = 0; k <= highscoreList.length - 1; k++){
            document.getElementById(k + 1).textContent = highscoreList[k].name + " - - - - - - - - - - - - - - - - - - - - - - - - - - " 
            + highscoreList[k].amount + "€";
            }
        }
    if(currentDisplayMoney != undefined && sessionStorage.getItem('money') != null && sessionStorage.getItem('name') != null){
        currentDisplayMoney.textContent = sessionStorage.getItem('name') + 
        ", you currently have " + sessionStorage.getItem('money') + "€";
    }   
}

async function addHighscore(newHighscore) {
    let jsonString = JSON.stringify(newHighscore);
    const response = await fetch('http://localhost:3000/highscore', {
        method: 'POST',
        body: jsonString,
      });
}

async function getHighscores(){
    const response = await fetch('http://localhost:3000/highscore');
    const data = await response.json();
    data.sort(function(a, b) {return b.amount - a.amount});
    return data;
}

reset?.addEventListener('click', resetHighscores, false);
async function resetHighscores(){
    const response = await fetch('http://localhost:3000/clearAll', {});
}