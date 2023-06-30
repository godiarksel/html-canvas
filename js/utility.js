const collisionDetect = ({pOne, pTwo}) => {
    return (        
        pOne.attackBox.position.x + pOne.attackBox.width >= pTwo.position.x && 
        pOne.attackBox.position.x <= pTwo.position.x + pTwo.width &&
        pOne.attackBox.position.y + pOne.attackBox.height >= pTwo.position.y &&
        pOne.attackBox.position.y <= pTwo.position.y + pTwo.height)
}

const pickWinner = ({playerOne, playerTwo, timerId}) => {
    clearTimeout(timerId);
    document.querySelector('#textDisplayer').style.display = 'flex';
    if(playerOne.health === playerTwo.health) {
        document.querySelector('#textDisplayer').innerHTML = 'tie';  
    } else if(playerOne.health > playerTwo.health){
        document.querySelector('#textDisplayer').innerHTML = 'player one wins';
    } else if(playerOne.health < playerTwo.health){
        document.querySelector('#textDisplayer').innerHTML = 'player two wins';
    }
}

let timer = 10;
let timerId;
const timerCounter = () => {
    if (timer > 0){
        timerId = setTimeout(timerCounter, 1000);
        timer--;
        document.querySelector('#timer').innerHTML = timer;
    } 

    if(timer === 0) {
        pickWinner({playerOne, playerTwo, timerId});
    }
}