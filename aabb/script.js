let answer = generateAnswer();
let guesses = 0;

document.getElementById('checkButton').addEventListener('click', checkGuess);
document.getElementById('giveUpButton').addEventListener('click', giveUp);
document.getElementById('restartButton').addEventListener('click', restartGame);

function generateAnswer() {
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let result = '';
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    result += digits[randomIndex];
    digits.splice(randomIndex, 1);
  }
  return result;
}

function checkGuess() {
  const guess = document.getElementById('guessInput').value;
  if (guess.length !== 4 || !/^\d{4}$/.test(guess)) {
    document.getElementById('result').textContent = '請輸入4位數字。';
    return;
  }

  let a = 0, b = 0;
  for (let i = 0; i < 4; i++) {
    if (guess[i] === answer[i]) {
      a++;
    } else if (answer.includes(guess[i])) {
      b++;
    }
  }

  guesses++;
  const history = document.getElementById('history');
  const guessHistory = document.createElement('p');
  guessHistory.textContent = `${guesses} 次猜題：${guess} - ${a}A${b}B`;
  history.insertBefore(guessHistory, history.firstChild);

  if (a === 4) {
    const congratsMessage = document.createElement('p');
    congratsMessage.textContent = `恭喜你猜對了！總共猜了 ${guesses} 次。`;
    congratsMessage.classList.add('congrats');
    history.insertBefore(congratsMessage, history.firstChild);
    document.getElementById('checkButton').disabled = true;
    document.getElementById('giveUpButton').disabled = true;
    document.getElementById('giveUpButton').style.backgroundColor = 'red';
    document.getElementById('restartButton').disabled = true;
  } else {
    document.getElementById('result').textContent = `${a}A${b}B`;
  }
}

function giveUp() {
  const confirmGiveUp = confirm('您真的不玩了？');
  if (confirmGiveUp) {
    document.getElementById('result').textContent = '有空再回來喔，答案是 ' + answer;
    document.getElementById('checkButton').disabled = true;
    document.getElementById('giveUpButton').disabled = true;
    document.getElementById('giveUpButton').style.backgroundColor = 'red';
    document.getElementById('restartButton').disabled = true;
  }
}

function restartGame() {
  answer = generateAnswer();
  guesses = 0;
  document.getElementById('result').textContent = '';
  document.getElementById('history').innerHTML = '';
  document.getElementById('checkButton').disabled = false;
  document.getElementById('giveUpButton').disabled = false;
  document.getElementById('giveUpButton').style.backgroundColor = 'red';
  document.getElementById('restartButton').style.backgroundColor = 'green'; // 將「重新開始」按鈕設為綠色背景
  document.getElementById('restartButton').disabled = false;
}
