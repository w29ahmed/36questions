import { writable } from "svelte/store";

// Get questionNumber from local storage, initial starting value is 1
export const questionNumber = writable(parseInt(localStorage.getItem("questionNumber") || "1"));

// Subscribe to changes and update local storage
questionNumber.subscribe(value => {
  localStorage.setItem("questionNumber", value.toString());
});