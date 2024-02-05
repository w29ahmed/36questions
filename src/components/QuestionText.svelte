<script lang="ts">
  export let question =
    "If you could invite anyone in the world to dinner, who would it be?";
</script>

<div class="centered-container p-12 md:p-36">
  <h1
    class="font-sans text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-200"
  >
    {question}
  </h1>
</div>

<style>
  .centered-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Use the full height of the viewport */
    text-align: center;
  }
</style>
