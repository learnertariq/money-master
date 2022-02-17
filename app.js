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

// Global Vars
let balanceValue = 0;
let errors = {};

///// Calculate Balance with Income and Expenses /////
btnIncExp.addEventListener("click", (e) => {
  // preventing default behavior
  e.preventDefault();

  // local vars
  const incomeInputValue = parseInt(incomeInput.value);
  const foodInputValue = parseInt(foodInput.value);
  const rentInputValue = parseInt(rentInput.value);
  const clothesInputValue = parseInt(clothesInput.value);

  console.log(parseInt(incomeInput.value));
  console.log(typeof parseInt(incomeInput.value));
  validateInput(
    incomeInput,
    "Income should be greater than 0 and type number",
    1
  );
  validateInput(foodInput, "food cost should be a number");
  validateInput(rentInput, "food cost should be a number");
  validateInput(clothesInput, "clothes cost should be a number");

  // Total Expenses
  const totalExpValue = foodInputValue + rentInputValue + clothesInputValue;
  // Displaying total expenses on UI
  totalExp.innerText = totalExpValue;

  // Calculating Balance
  balanceValue = incomeInputValue - totalExpValue;
  // Displaying balance on UI
  balance.innerText = balanceValue;

  // Display  errors
  const p = document.getElementById(incomeInput.id)
  console.log(p);
  
  // Clear Errors
  clearErrors();
});

///// Calculate Saving with balance and saving percentage /////
btnSaving.addEventListener("click", (e) => {
  // preventing default behavior
  e.preventDefault();

  // local vars
  const savingInputValue = parseInt(savingInput.value);

  // calculating saving
  const savingPercent = savingInputValue / 100;
  const savingAmountValue = balanceValue * savingPercent;

  // Calculate remaining Balance
  const remainingBalanceValue = balanceValue - savingAmountValue;

  // Display saving amount on UI
  savingAmount.innerText = savingAmountValue;

  // Display remaining balance amount on UI
  remainingBalance.innerText = remainingBalanceValue;
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

// clear all errors
function clearErrors() {
  for (const key in errors) {
    delete errors[key];
  }
}
