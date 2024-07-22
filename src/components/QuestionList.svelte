<script lang="ts">
  import { questionNumber } from "../stores/questionNumberStore";
  import { onMount, afterUpdate, onDestroy } from "svelte";

  let questions = Array.from({ length: 36 }, (_, i) => i + 1);
  let currentQuestion: number;

  questionNumber.subscribe(value => {
    currentQuestion = value;
  });

  // Function to scroll the list to center the current question
  function scrollToCurrent() {
    const list = document.getElementById("question-list");
    const item = document.getElementById(`question-${currentQuestion}`);
    if (list && item) {
      list.scrollLeft = item.offsetLeft - list.offsetWidth / 2 + item.offsetWidth / 2;
    }
  }

  onMount(() => {
    scrollToCurrent();
    window.addEventListener("resize", scrollToCurrent);
  });

  afterUpdate(scrollToCurrent);

  onDestroy(() => {
    window.removeEventListener("resize", scrollToCurrent);
  });
</script>

<style>
  .question-list {
    display: flex;
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none; /* Firefox */
  }
  .question-list::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
  .current {
    font-size: 1.5rem;
    font-weight: bold;
    color: #ff0000; /* Highlight color */
    transform: scale(1.2);
  }
</style>

<div id="question-list" class="question-list px-12 py-2">
  {#each questions as question}
    <div
    >
    <h1
      id={`question-${question}`}
      class="font-sans text-xl text-gray-900 dark:text-gray-200 text-center p-5 transition transform {currentQuestion === question ? "current" : ""}"
      on:click={() => questionNumber.set(question)}
    >
      {question}
    </h1>
    </div>
  {/each}
</div>