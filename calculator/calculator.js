var displayElement = document.getElementById("display");
var calculatorButtons = document.querySelectorAll("#calculator button");
var equalsButton = document.getElementById("equals");
var clearButton = document.getElementById("clear");

var currentExpression = "";
var result = 0;

function updateDisplay(value) {
  displayElement.textContent = value;
}

function clearDisplay() {
  currentExpression = "";
  result = 0;
  updateDisplay(result);
}

function calculate() {
  try {
    result = eval(currentExpression);
    updateDisplay(result);
  } catch (error) {
    updateDisplay("Error");
  }
}

function handleButtonClick(event) {
  var buttonValue = event.target.textContent;

  if (buttonValue === "=") {
    calculate();
  } else if (buttonValue === "C") {
    clearDisplay();
  } else {
    currentExpression += buttonValue;
    updateDisplay(currentExpression);
  }
}

calculatorButtons.forEach(function (button) {
  button.addEventListener("click", handleButtonClick);
});
