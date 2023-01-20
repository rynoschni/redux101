const { createStore } = Redux;

console.log("Yo Joe");
const defaultState = {
  balance: 0
}

//#2 Actions
const actionIncrement = (amount) => {
  console.log("actionIncrement fired",amount)
  return {
    type: 'increment',
    payload:amount
  }
}

const actionDecrement = (amount) => {
  console.log("actionDecrement fired", amount);
  return {
    type: "decrement",
    payload: amount,
  };
};

// #3 Reducer
const account = (state = defaultState, action) => {
  console.log("account reducer is reducing!!");
  console.log("account params")
  console.log("state", state)
  console.log("action", action)
  switch (action.type) {
    case 'increment':
      console.log("increment added:")
      return {
        balance: state.balance + action.payload
      }
    
    case 'decrement':
      console.log('decrement subtracted')
      return {
        balance: state.balance - action.payload
      }
    
    default:
      return state
  }
}

//#1 Create Store
const store = createStore(
  account,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

//Need to subscribe to the store.  Tells your app it has a global state
store.subscribe(() => {
  console.log("subscribing to state changes....");
  const state = store.getState();
  const displayBalance = document.getElementById('balance');
  displayBalance.innerHTML = state.balance
})

const addButton = document.getElementById('add');
const subtractButton = document.getElementById('subtract');
const amountBox = document.getElementById('amount');

addButton.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('add button clicked')
  const amountValue = parseInt(amountBox.value)
  store.dispatch(actionIncrement(amountValue))
});

subtractButton.addEventListener("click", (e) => {
  e.preventDefault();
  const amountValue = parseInt(amount.value);
  store.dispatch(actionDecrement(amountValue));
});