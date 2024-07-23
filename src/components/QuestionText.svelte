<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import Fa from "svelte-fa";
  import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
  import { questionNumber } from "../stores/questionNumberStore";
  import questions from "../assets/questions.json";

  let question = "";

  function handleLeftClick() {
    questionNumber.update(n => Math.max(n - 1, 1));
  }

  function handleRightClick() {
    questionNumber.update(n => Math.min(n + 1, 36));
  }

  // Reactively update the question based on the current question number
  $: question = questions[$questionNumber - 1];
</script>

<div class="flex items-center justify-between w-full px-5">
  <!-- Left arrow -->
  <div on:click={handleLeftClick} class="cursor-pointer hover:opacity-50 hover:scale-125">
    <Fa icon={faAngleLeft} class="text-5xl text-gray-900 dark:text-gray-200" />
  </div>

  <!-- Question Text -->
  <h1 class="font-sans text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-200 text-center mx-8 md:mx-16">
    {question}
  </h1>

  <!-- Right arrow -->
  <div on:click={handleRightClick} class="cursor-pointer hover:opacity-50 hover:scale-125">
    <Fa icon={faAngleRight} class="text-5xl text-gray-900 dark:text-gray-200" />
  </div>
</div>
