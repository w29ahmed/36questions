<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { fly } from "svelte/transition";
  import Fa from "svelte-fa";
  import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
  import { questionNumber } from "../stores/questionNumberStore";
  import questions from "../assets/questions.json";
  import Hammer from "hammerjs";

  let question = "";

  function handleLeftClick() {
    questionNumber.update(n => Math.max(n - 1, 1));
  }

  function handleRightClick() {
    questionNumber.update(n => Math.min(n + 1, 36));
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

  // Reactively update the question based on the current question number
  $: question = questions[$questionNumber - 1];
</script>

<div class="flex items-center justify-between w-full px-5">
  <!-- Left arrow -->
  <div on:click={handleLeftClick} class="cursor-pointer hover:opacity-50 hover:scale-125">
    <Fa icon={faAngleLeft} class="text-5xl text-gray-900 dark:text-gray-200" />
  </div>

  <!-- Question Text -->
  <div class="relative flex justify-center items-center w-full h-64 overflow-hidden">
      {#key $questionNumber}
      <h1
        in:fly={{ x: -250, duration: 350 }}
        out:fly={{ x: 250, duration: 350 }}
        class="font-sans text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-200 text-center mx-8 md:mx-16 absolute"
      >
        {question}
      </h1>
    {/key}
  </div>

  <!-- Right arrow -->
  <div on:click={handleRightClick} class="cursor-pointer hover:opacity-50 hover:scale-125">
    <Fa icon={faAngleRight} class="text-5xl text-gray-900 dark:text-gray-200" />
  </div>
</div>
