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
    scrollbar-width: none; /* Firefox: Hide scrollbar */
  }
  .question-list::-webkit-scrollbar {
    display: none; /* Safari and Chrome: Hide scrollbar */
  }
</style>

<div class="fixed bottom-0 w-full flex justify-center">
  <div id="question-list" class="question-list px-12 py-2">
    {#each questions as question}
      <h1
        id={`question-${question}`}
        class="font-sans text-xl text-gray-900 dark:text-gray-200 text-center p-5
          transition-transform duration-300 ease-in-out cursor-pointer
          {currentQuestion === question ? 'text-2xl font-bold scale-150' : ''}"
        on:click={() => questionNumber.set(question)}
      >
        {question}
      </h1>
    {/each}
  </div>
</div>