import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import ticketReducer from '../features/tickets/ticketSlice'
import noteReducer from '../features/notes/noteSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
    notes: noteReducer,
  },
})



/* stuff from docs
However, the simplicity can break down when we have multiple components that need to share and use the same state, especially if those components are located in different parts of the application. Sometimes this can be solved by "lifting state up" to parent components, but that doesn't always help.

One way to solve this is to extract the shared state from the components, and put it into a centralized location outside the component tree. With this, our component tree becomes a big "view", and any component can access the state or trigger actions, no matter where they are in the tree!

By defining and separating the concepts involved in state management and enforcing rules that maintain independence between views and states, we give our code more structure and maintainability.

This is the basic idea behind Redux: a single centralized place to contain the global state in your application, and specific patterns to follow when updating that state to make the code predictable.

Immutability
"Mutable" means "changeable". If something is "immutable", it can never be changed.

JavaScript objects and arrays are all mutable by default. If I create an object, I can change the contents of its fields. If I create an array, I can change the contents as well:

const obj = { a: 1, b: 2 }
 still the same object outside, but the contents have changed
obj.b = 3

const arr = ['a', 'b']
 In the same way, we can change the contents of this array
arr.push('c')
arr[1] = 'd'

This is called mutating the object or array. It's the same object or array reference in memory, but now the contents inside the object have changed.

In order to update values immutably, your code must make copies of existing objects/arrays, and then modify the copies.

We can do this by hand using JavaScript's array / object spread operators, as well as array methods that return new copies of the array instead of mutating the original array:

Terminology:

Actions -
A typical action object might look like this:
const addTodoAction = {
  type: 'todos/todoAdded',
  payload: 'Buy milk'
}

Action Creators -
An action creator is a function that creates and returns an action object. 
We typically use these so we don't have to write the action object by hand every time:

const addTodo = text => {
  return {
    type: 'todos/todoAdded',
    payload: text
  }
}

//* Reducers
A reducer is a function that receives the current state and an action object,
decides how to update the state if necessary, and returns 
the new state: (state, action) => newState. 
You can think of a reducer as an event listener which handles 
events based on the received action (event) type.

INFO
"Reducer" functions get their name because they're similar to 
the kind of callback function you pass to the Array.reduce() method.

//*Reducers must always follow some specific rules:

They should only calculate the new state value based on the state and action arguments

They are not allowed to modify the existing state. 
Instead, they must make immutable updates, 
by copying the existing state and making changes to the copied values.

//*They must not do any asynchronous logic, calculate random values, or cause other "side effects"

The logic inside reducer functions typically follows the same series of steps:

Check to see if the reducer cares about this action
If so, make a copy of the state, update the copy with new values, and return it
Otherwise, return the existing state unchanged
Here's a small example of a reducer, showing the steps that each reducer should follow:

const initialState = { value: 0 }

function counterReducer(state = initialState, action) {
  //* Check to see if the reducer cares about this action
  if (action.type === 'counter/increment') {
    //* If so, make a copy of `state`
    return {
      ...state,
       //*and update the copy with the new value
      value: state.value + 1
    }
  }
   //*otherwise return the existing state unchanged
  return state
}

//*Store
The current Redux application state lives in an object called the store .

The store is created by passing in a reducer, and has a method called 
getState that returns the current state value:

//* example declaritions
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({ reducer: counterReducer })

console.log(store.getState())// {value: 0}

//* Dispatch
The Redux store has a method called dispatch. The only way to update the state is to call store.dispatch() and pass in an action object. The store will run its reducer function and save the new state value inside, and we can call getState() to retrieve the updated value:

store.dispatch({ type: 'counter/increment' })

console.log(store.getState())// {value: 1}


You can think of dispatching actions as "triggering an event" in the application. 
Something happened, and we want the store to know about it. 
Reducers act like event listeners, and when they hear an action they are 
interested in, they update the state in response.

//* We typically call action creators to dispatch the right action:

create the action creator
const increment = () => {
  return {
    type: 'counter/increment'
  }
}

call the action creator which update state
store.dispatch(increment())

console.log(store.getState())// {value: 2}


//* Selectors
Selectors are functions that know how to extract specific pieces of information from 
a store state value. As an application grows bigger, this can help avoid repeating logic as 
different parts of the app need to read the same data:

const selectCounterValue = state => state.value

const currentValue = selectCounterValue(store.getState())
console.log(currentValue)// 2


*/