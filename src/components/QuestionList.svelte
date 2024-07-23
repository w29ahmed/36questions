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
      const outerWrapper = document.querySelector('.outer-wrapper');
      const padding = parseFloat(getComputedStyle(outerWrapper).paddingLeft);
      list.scrollLeft = item.offsetLeft - list.offsetWidth / 2 + item.offsetWidth / 2 - padding;
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
  .outer-wrapper {
    display: flex;
    justify-content: center;
    overflow-x: hidden;
  }

  .inner-wrapper {
    display: flex;
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none; /* Firefox: Hide scrollbar */
  }

  .inner-wrapper::-webkit-scrollbar {
    display: none; /* Safari and Chrome: Hide scrollbar */
  }

  .question-list {
    display: flex;
    justify-content: center;
    flex-shrink: 0;
  }
</style>

<div class="fixed bottom-0 w-full">
  <div class="outer-wrapper px-12">
    <div class="inner-wrapper" id="question-list">
      {#each questions as question}
        <h1
          id={`question-${question}`}
          class="font-sans text-xl text-gray-900 dark:text-gray-200 text-center p-5
            transition-transform duration-300 ease-in-out cursor-pointer
            {currentQuestion === question ? "text-2xl font-bold scale-150" : "opacity-50 hover:opacity-100"}"
          on:click={() => questionNumber.set(question)}
        >
          {question}
        </h1>
      {/each}
    </div>
  </div>
</div>