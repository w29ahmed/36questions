<script lang="ts">
  import Fa from "svelte-fa";
  import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

  export let question =
    "If you could invite anyone in the world to dinner, who would it be?";

  function handleLeftClick() {
    console.log("Left arrow clicked");
  }

  function handleRightClick() {
    console.log("Right arrow clicked");
  }
</script>

<div class="flex items-center justify-between w-full h-screen px-5">
  <!-- Left arrow -->
  <div on:click={handleLeftClick} class="cursor-pointer hover:opacity-50">
    <Fa icon={faAngleLeft} class="text-5xl text-gray-900 dark:text-gray-200 hover:opacity-50" />
  </div>

  <!-- Question Text -->
  <h1 class="font-sans text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-200 text-center mx-8 md:mx-16">
    {question}
  </h1>

  <!-- Right arrow -->
  <div on:click={handleRightClick} class="cursor-pointer hover:opacity-50">
    <Fa icon={faAngleRight} class="text-5xl text-gray-900 dark:text-gray-200" />
  </div>
</div>


<style>
</style>
