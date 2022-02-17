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

///// Calculate Balance with Income and Expenses /////
btnIncExp.addEventListener("click", (e) => {
  // preventing default behavior
  e.preventDefault();

  // local vars
  const incomeInputValue = parseInt(incomeInput.value);
  const foodInputValue = parseInt(foodInput.value);
  const rentInputValue = parseInt(rentInput.value);
  const clothesInputValue = parseInt(clothesInput.value);

  // Total Expenses
  const totalExpValue = foodInputValue + rentInputValue + clothesInputValue;
  // Displaying total expenses on UI
  totalExp.innerText = totalExpValue;

  // Calculating Balance
  balanceValue = incomeInputValue - totalExpValue;
  // Displaying balance on UI
  balance.innerText = balanceValue;
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
