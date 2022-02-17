// Get All input fields
const incomeInput = document.getElementById("income-input");
const foodInput = document.getElementById("food-input");
const rentInput = document.getElementById("rent-input");
const clothesInput = document.getElementById("clothes-input");
const savingInput = document.getElementById("saving-input");

// Get All buttons
const btnIncExp = document.getElementById("btn-inc-exp");
const btnSaving = document.getElementById("btn-saving");

// Get All Output Displays
const totalExp = document.getElementById("total-exp");
const balance = document.getElementById("balance");
const savingAmount = document.getElementById("saving-amount");
const remainingBalance = document.getElementById("remaining-balance");
const errorDisplays = document.getElementsByClassName("error-display");

// Global Vars
let balanceValue = 0;
let incomeInputValue = 0;
let errors = {};

//////////// Calculate Balance with Income and Expenses //////////////
btnIncExp.addEventListener("click", (e) => {
  // preventing default behavior
  e.preventDefault();

  // clear error displays
  clearErrorDisplays();

  validateInput(incomeInput, "Income should be a number and greater than 0", 1);
  validateInput(foodInput, "food cost should be a number");
  validateInput(rentInput, "food cost should be a number");
  validateInput(clothesInput, "clothes cost should be a number");

  // return if there is an error
  if (Object.keys(errors).length > 0) return displayThenClearErrors();

  // local vars
  incomeInputValue = parseInt(incomeInput.value);
  const foodInputValue = parseInt(foodInput.value);
  const rentInputValue = parseInt(rentInput.value);
  const clothesInputValue = parseInt(clothesInput.value);

  // Calculate total Expenses
  const totalExpValue = foodInputValue + rentInputValue + clothesInputValue;
  // Calculate total Balance
  balanceValue = incomeInputValue - totalExpValue;

  // return if expenses is greater than income
  if (totalExpValue > incomeInputValue) {
    errors[incomeInput.id] = "Income should be greater than total Expenses";
    return displayThenClearErrors();
  }

  // Displaying total expenses on UI
  totalExp.innerText = totalExpValue.toFixed(2);
  // Displaying balance on UI
  balance.innerText = balanceValue.toFixed(2);
});

////////////// Calculate Saving with balance and saving percentage /////////////
btnSaving.addEventListener("click", (e) => {
  // preventing default behavior
  e.preventDefault();
  // clear error displays
  clearErrorDisplays();

  // validate input
  validateInput(
    savingInput,
    "Saving Percent should be a number, and less than 100",
    0,
    99
  );

  // validate again in balance is 0 or less
  if (balanceValue <= 0)
    validateInput(savingInput, "Please calculate balance first");

  // return if there is an error
  if (Object.keys(errors).length > 0) return displayThenClearErrors();

  // local vars
  const savingInputValue = parseInt(savingInput.value);

  // calculating saving
  const savingPercent = savingInputValue / 100;
  const savingAmountValue = incomeInputValue * savingPercent;
  const availableSavingPercent = (balanceValue / incomeInputValue) * 100;

  // return if saving amount more than the balance you have
  if (savingAmountValue > balanceValue) {
    errors[savingInput.id] = `You cannot save more than ${Math.floor(
      availableSavingPercent
    )} percent of your income`;

    // return if there is an error
    if (Object.keys(errors).length > 0) return displayThenClearErrors();
  }

  // Calculate remaining Balance
  const remainingBalanceValue = balanceValue - savingAmountValue;

  // Display saving amount on UI
  savingAmount.innerText = savingAmountValue.toFixed(2);

  // Display remaining balance amount on UI
  remainingBalance.innerText = remainingBalanceValue.toFixed(2);
});

// validate input
function validateInput(domInput, errorText, min = 0, max = Infinity) {
  if (
    isNaN(parseInt(domInput.value)) ||
    parseInt(domInput.value) < min ||
    parseInt(domInput.value) > max
  ) {
    errors[domInput.id] = errorText;
  }
}

// display then clear errors
function displayThenClearErrors() {
  // Display  errors
  displayErrors();

  // Clear Errors
  clearErrors();
}

// clear all errors
function clearErrors() {
  for (const key in errors) {
    delete errors[key];
  }
}

// display errors in dom
function displayErrors() {
  for (const err in errors) {
    // console.log(err);
    const target = document.getElementById(err + "-error");
    // show error
    target.classList.remove("hidden");
    // push error text
    target.innerText = errors[err];
  }
}

// clear all dom error display
function clearErrorDisplays() {
  for (const ed of errorDisplays) {
    ed.classList.add("hidden");
  }
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
