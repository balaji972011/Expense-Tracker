`use strict`;
const balanceEl = document.getElementById(`balance`);
const incomeEl = document.getElementById(`income`);
const expenseEl = document.getElementById(`expense`);
const recentTransactionEl = document.getElementById(`recent-transaction`);
const formEl = document.getElementById(`form`);
const transactionEl = document.getElementById(`transaction`);
const amountEl = document.getElementById(`amount`);

let transactions = [];
transactions =
  localStorage.getItem(`transactions`) != null
    ? JSON.parse(localStorage.getItem(`transactions`))
    : [];

const init = function () {
  recentTransactionEl.innerHTML = null;
  transactions.forEach(displayTransactions);
};

const displayTransactions = function (transaction) {
  const itemEl = document.createElement(`li`);
  itemEl.classList.add(transaction.amount < 0 ? `minus` : `plus`);
  itemEl.innerHTML = `${transaction.transaction} <span>${transaction.amount}</span><button class="delete-btn" onclick="deleteTransaction(${transaction.id})">x</button>`;
  recentTransactionEl.appendChild(itemEl);
};

const deleteTransaction = function (id) {
  transactions = transactions.filter((el) => el.id !== id);
  localStorage.setItem(`transactions`, JSON.stringify(transactions));
  init();
  updateValues();
};

const updateValues = function () {
  const currency = transactions.map((el) => el.amount);
  const income = currency
    .filter((el) => el > 0)
    .reduce((acc, el) => acc + el, 0);
  const expense = currency
    .filter((el) => el < 0)
    .reduce((acc, el) => acc + el, 0);
  const total = income + expense;
  incomeEl.innerText = `₹${income}`;
  expenseEl.innerText = `₹${expense}`;
  balanceEl.innerText = `₹${total}`;
};

formEl.addEventListener(`submit`, (e) => {
  e.preventDefault();
  if (transactionEl.value.trim() === `` || amountEl.value.trim() === ``) {
    alert(`Enter valid input`);
  } else {
    const item = {
      id: new Date().valueOf(),
      transaction: transactionEl.value,
      amount: Number(amountEl.value),
    };
    transactions.push(item);
    localStorage.setItem(`transactions`, JSON.stringify(transactions));
    displayTransactions(item);
    updateValues();
    transactionEl.value = null;
    amountEl.value = null;
  }
});

init();
