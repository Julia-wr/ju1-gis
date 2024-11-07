const keineGleich = 0;
const zweiGleich = 2;
const dreiGleich = 20;
const jackpot = 50;









let currentDisplayMoney = document.getElementById('currentDisplayMoney');

let buttonCharge = document.getElementById('chargeB');
buttonCharge?.addEventListener('click', chargeB, false);
function chargeB(event){
    var money = document.getElementById('money').value;
    currentDisplayMoney.textContent = "You now have "+ money + "€";
}
//Button for 1€ bet starts Spin
let buBet1Spin = document.getElementById('bet1Spin');
buBet1Spin?.addEventListener('click', bet1Spin, false);
function bet1Spin(event) {
    doSpin(1);
}
//Button for a bet higher than 1€ starts spin
let buBetHigher1Spin = document.getElementById('betHigher1Spin');
buBetHigher1Spin?.addEventListener('click', betHigher1Spin, false);
function bet1Spin(event) {
    doSpin(document.getElementById('betHigher1').value);
}

//Spin the Slot Machine
function doSpin(bet) {
    //!!insert current money check, to see if user has enough money!!
    var slotImages = ["Slot Pics/Seven.jpg", "Slot Pics/Bell.jpg", "Slot Pics/Cherry.jpg", "Slot Pics/Grape.jpg", "Slot Pics/lemon.jpg", "Slot Pics/Orange.jpg", "Slot Pics/Plum.jpg", "Slot Pics/Strawberry.jpg", "Slot Pics/Watermelon.jpg"];
    //create random numbers to select pictures randomly
	var image1 = Math.floor((Math.random() * 9));
	var image2 = Math.floor((Math.random() * 9));
    var image3 = Math.floor((Math.random() * 9));	
    
    document.getElementById('slotImage1').src = slotImages[image1];
    document.getElementById('slotImage2').src = slotImages[image2];
    document.getElementById('slotImage3').src = slotImages[image3];

}



const momentPerson = {
    name: 'Nina',
    email: 'ninagh@gmx.com',
    money: 28,
    highscore: 0
}

