<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { fly } from "svelte/transition";
  import Fa from "svelte-fa";
  import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
  import { questionNumber } from "../stores/questionNumberStore";
  import questions from "../assets/questions.json";
  import Hammer from "hammerjs";

  let questionText = "";
  let transitionDirection = "";
  let previousQuestionNumber = questionNumber;

  function handleLeftClick() {
    questionNumber.update((n) => Math.max(n - 1, 1));
  }

  function handleRightClick() {
    questionNumber.update((n) => Math.min(n + 1, 37));
  }

  // Set up Hammer.js for swipe detection
  onMount(() => {
    // Create a Hammer instance attached to the document body
    const hammer = new Hammer(document.body);

    // Add event listeners for swipe left and swipe right
    hammer.on("swipeleft", handleRightClick);
    hammer.on("swiperight", handleLeftClick);

    // Return a cleanup function to remove the event listeners
    // when the component is destroyed
    return () => {
      hammer.off("swipeleft", handleRightClick);
      hammer.off("swiperight", handleLeftClick);
    };
  });

  // Reactively update the question and transition direction based on the current question number
  $: {
    if ($questionNumber > previousQuestionNumber) {
      transitionDirection = "left";
    } else if ($questionNumber < previousQuestionNumber) {
      transitionDirection = "right";
    }
    previousQuestionNumber = $questionNumber;

    // Reactively update the question text based on the current question number
    questionText = questions[$questionNumber - 1];
  }
</script>

<div class="flex items-center justify-between w-full px-5">
  <!-- Left arrow -->
  <div
    on:click={handleLeftClick}
    class="cursor-pointer hover:opacity-50 hover:scale-125"
  >
    <Fa
      icon={faAngleLeft}
      class="text-4xl md:text-6xl text-gray-900 dark:text-gray-200"
    />
  </div>

  <!-- Question Text -->
  <div
    class="relative flex justify-center items-center w-full h-screen overflow-hidden"
  >
    {#key $questionNumber}
      <h1
        in:fly={{
          x: transitionDirection == "right" ? -250 : 250,
          duration: 500,
        }}
        out:fly={{
          x: transitionDirection == "right" ? 250 : -250,
          duration: 500,
        }}
        class="font-sans text-xl md:text-4xl font-bold text-gray-900 dark:text-gray-200 text-center mx-8 md:mx-32 absolute"
      >
        {questionText}
      </h1>
    {/key}
  </div>

  <!-- Right arrow -->
  <div
    on:click={handleRightClick}
    class="cursor-pointer hover:opacity-50 hover:scale-125"
  >
    <Fa
      icon={faAngleRight}
      class="text-4xl md:text-6xl text-gray-900 dark:text-gray-200"
    />
  </div>
</div>
