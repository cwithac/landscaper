$( () => {

  //Page Load Invocation
  gameSetup.loadGame();

}); //

// console.log('Landscaper Game app.js is attached to index.html');

//INITIALIZE & GLOBAL VARIABLES
let tool;
let money;
let cost;
let amountEarned;
let days;


const $buttonRowInfo = $('<div/>').attr('id', 'buttonRowInfo');
const $buttonRowPlay = $('<div/>').attr('id', 'buttonRowPlay');
const $startButton = $('<div>Start</div>').attr('class', 'button');
const $landscapeButton = $('<div/>').attr('class', 'button').attr('id', 'landscape');
const $buyToolsButton = $('<div/>').attr('class', 'button').attr('id', 'buy');
const $restartButton = $('<div>Restart</div>').attr('class', 'button');
const $howToPlayButton = $('<div>How To Play</div>').attr('class', 'button');
const $infoStatus = $('<div/>').attr('id', 'infoStatus');
const $question = $('<div/>').attr('id', 'questionBox');
const $scoreStats = $('<div/>').attr('id', 'scoreBox');

  //IMAGES AND AUDIO
  const $mowerIcon = $('<img src="images/mower.png">Landscape</img>');
  const $buyIcon = $('<img src="images/moneybag.png">Buy Tools</img>');
  const $cash = $('<audio/>').attr('src', 'audio/cash-register.mp3');
  const $click = $('<audio/>').attr('src', 'audio/click.wav');
  const $stop = $('<audio/>').attr('src', 'audio/stop.mp3');
  const $winner = $('<audio/>').attr('src', 'audio/winner.mp3');

//GENERATING TOOL OPTIONS
class ToolOption {
  constructor(type, moneyChange, cost) {
    this.type = type;
    this.moneyChange = moneyChange;
    this.cost = cost;
  };
};

const yourTeeth = new ToolOption('your teeth', 1, 0);
const rustyScissors = new ToolOption('a pair of rusty scissors', 2, 5);
const oldTimey = new ToolOption('an old-timey push lawnmower', 25, 50);
const fancyBattery = new ToolOption('a fancy battery-powered lawnmower', 50, 250);
const studentTeam = new ToolOption('a team of students', 100, 500);

//WINNING MONEY VALUE
const winningMoney = 1000;
const winningMoneyString = '$' + winningMoney.toString().substring(0,1) + ',' + winningMoney.toString().substring(1);

//HTML CONTENT
const $container = $('<div/>').attr('id', 'container');
const $h1Title = $('<h1>The Landscaper</h1>');
  //MODAL
  const $modal = $('<div/>').attr('id', 'modal');
  const $modalText = $('<div><h2>How to Play</h2><p>Spend your days landscaping lawns!  Different tools will help you landscape faster, but you can only upgrade when you\'ve earned enough money.</p><p>Win the game when you have made ' + winningMoneyString + '!</p><hr><h3>Tools Cost:</h3><ul><li>' + rustyScissors.type + ' - $' + rustyScissors.cost + '</li><li>' + oldTimey.type + ' - $' + oldTimey.cost + '</li><li>' + fancyBattery.type + ' - $' + fancyBattery.cost + '</li><li>' + studentTeam.type + ' - $' + studentTeam.cost + '</li></ul></div>').attr('id', 'modal-textbox');
  const $closeButton = $('<div>X</div>').attr('id', 'close');

const htmlContent = {
    loadContent() {
      $('body').append($h1Title);
      $('body').append($modal);
      $modal.append($modalText);
      $modalText.prepend($closeButton);
    },
    openModal() {
      $modal.css('display', 'block');
    },
    closeModal() {
      $modal.css('display', 'none');
    }
};

//GAME SETUP
const gameSetup = {
  loadGame() {
    htmlContent.loadContent();
    $('body').append($buttonRowInfo);
    $buttonRowInfo.append($startButton, $howToPlayButton);
  },
  initializeLevel() {
    tool = yourTeeth.type;
    money = 0;
    days = 0;
    amountEarned = yourTeeth.moneyChange;
  },
  startGame() {
    $('body').append($container);
    $container.append($buttonRowPlay);
    $startButton.hide();
    gameSetup.initializeLevel();
    gameSetup.showStatus();
    gameSetup.scoreBoxInfo();
    $buttonRowInfo.append($restartButton)
    $landscapeButton.append($mowerIcon);
    $buyToolsButton.append($buyIcon);
  },
  scoreBoxInfo() {
    $scoreStats.html('<div>Money: $' + money + '</div><div>Tool: ' + tool + '</div><div>Days Passed: ' + days + '</div>');
    $container.prepend($scoreStats)
  },
  updateScoreStats() {
    $scoreStats.html('<div>Money: $' + money + '</div><div>Tool: ' + tool + '</div><div>Days Passed: ' + days + '</div>');
  },
  showStatus() {
    $infoStatus.empty();
    $infoStatus.text("Using " + tool + " will earn you $" + amountEarned + " each day!");
    $buttonRowPlay.append($landscapeButton, $buyToolsButton);
    $infoStatus.insertBefore($buttonRowPlay);
    gameSetup.questionPrompt();
  },
  questionPrompt() {
    $question.text("What do you want to do?");
    $question.insertBefore($buttonRowPlay);
  },
  resetGame() {
    $scoreStats.empty();
    $question.empty();
    $infoStatus.empty();
    $buttonRowPlay.empty();
    $startButton.show();
    $h1Title.remove();
    gameSetup.loadGame();
    $buyToolsButton.show();
    $landscapeButton.on('click', gamePlay.runLandscape);
    $buyToolsButton.on('click', gamePlay.checkForEnoughMoney);
    gameSetup.startGame();
  },
  checkForWinner() {
    if (money > winningMoney) {
      gameInfo.alertWinner();
    }
  },
  updateShowCheckFunction() {
    gameSetup.updateScoreStats();
    gameSetup.showStatus();
    gameSetup.checkForWinner();
  },
  updateShowAlertFunction() {
    gameSetup.updateScoreStats();
    gameSetup.showStatus();
    gameInfo.alertText();
  }
};

//GAME PLAY
const gamePlay = {
  runLandscape() {
    days ++;
    if (money < winningMoney) {
      $click.get(0).play();
      switch (tool) {
        case yourTeeth.type:
          money += yourTeeth.moneyChange;
          amountEarned = yourTeeth.moneyChange;
          gameSetup.updateShowCheckFunction();
          break;
        case rustyScissors.type:
          money += rustyScissors.moneyChange;
          amountEarned = rustyScissors.moneyChange;
          gameSetup.updateShowCheckFunction();
          break;
        case oldTimey.type:
          money += oldTimey.moneyChange;
          amountEarned = oldTimey.moneyChange;
          gameSetup.updateShowCheckFunction();
          break;
        case fancyBattery.type:
          money += fancyBattery.moneyChange;
          amountEarned = fancyBattery.moneyChange;
          gameSetup.updateShowCheckFunction();
          break;
        case studentTeam.type:
          money += studentTeam.moneyChange;
          amountEarned = studentTeam.moneyChange;
          gameSetup.updateShowCheckFunction();
          break;
      }
    } else {
      gameInfo.alertWinner();
    }
  },
  checkForEnoughMoney() {
    if ((money >= studentTeam.cost) && (tool === fancyBattery.type)) {
        gamePlay.buyOptions.buyTeamOfStudents();
    } else if ((money >= fancyBattery.cost) && (tool === oldTimey.type)){
        gamePlay.buyOptions.buyFancyBattery();
    } else if ((money >= oldTimey.cost) && (tool === rustyScissors.type)){
        gamePlay.buyOptions.buyOldTimey();
    } else if ((money >= rustyScissors.cost) && (tool === yourTeeth.type)) {
        gamePlay.buyOptions.buyScissors();
    } else {
      $stop.get(0).play();
      $infoStatus.text("Sorry, you don't have enough money to buy a new tool yet!");
    }
  },
  buyOptions: {
    buyScissors() {
      $cash.get(0).play();
      cost = rustyScissors.cost;
      money -= cost;
      tool = rustyScissors.type;
      amountEarned = rustyScissors.moneyChange;
      gameSetup.updateShowAlertFunction();
    },
    buyOldTimey() {
      $cash.get(0).play();
      cost = oldTimey.cost;
      money -= cost;
      tool = oldTimey.type;
      amountEarned = oldTimey.moneyChange;
      gameSetup.updateShowAlertFunction();
    },
    buyFancyBattery() {
      $cash.get(0).play();
      cost = fancyBattery.cost;
      money -= cost;
      tool = fancyBattery.type;
      amountEarned = fancyBattery.moneyChange;
      gameSetup.updateShowAlertFunction();
    },
    buyTeamOfStudents() {
      $cash.get(0).play();
      cost = studentTeam.cost;
      money -= cost;
      tool = studentTeam.type;
      amountEarned = studentTeam.moneyChange;
      gameSetup.updateShowAlertFunction();
      $buyToolsButton.hide();
    }
  }
};

//GAME INFO
const gameInfo = {
  alertText() {
    if (tool === studentTeam.type) {
      $infoStatus.text("You have hired " + tool + " for $" + cost +"!  Using this tool will earn you $" + amountEarned + " each day!");
    } else {
      $infoStatus.text("You have purchased " + tool + " for $" + cost +"!  Using this tool will earn you $" + amountEarned + " each day!");
    }
  },
  alertWinner() {
    $winner.get(0).play();
    $infoStatus.text("Congratulations!  In " + days + " days you have made $" + money + " with the help of your tools!  You have won the game!");
    $question.empty();
    $buttonRowPlay.empty();
  }
};

//EVENT LISTENERS
$startButton.on('click', gameSetup.startGame);
$restartButton.on('click', gameSetup.resetGame);

$landscapeButton.on('click', gamePlay.runLandscape);
$buyToolsButton.on('click', gamePlay.checkForEnoughMoney);
$howToPlayButton.on('click', htmlContent.openModal);
$closeButton.on('click', htmlContent.closeModal);
