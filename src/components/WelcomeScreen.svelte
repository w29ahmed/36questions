<script lang="ts">
  export let startButtonClicked: boolean;
</script>

<div class="flex flex-col items-center justify-center min-h-screen px-4">
  <!-- Top Row: Text -->
  <div>
    <p
      class="font-sans text-md md:text-2xl text-center font-bold text-gray-900 dark:text-gray-200 p-6 mx-4 md:mx-32"
    >
      Welcome to 36 Questions, inspired by the
      <a
        href="https://web.archive.org/web/20200812060110/https://www.nytimes.com/2015/01/09/style/no-37-big-wedding-or-small.html"
        class="underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        New York Times article</a
      >. This app guides you through thought-provoking questions to foster
      intimacy and understanding with a partner or a new acquaintance. Dive in
      and see where it takes you!
    </p>
  </div>

  <!-- Bottom Row: Start Button -->
  <div>
    <div class="flex items-center justify-center">
      <button
        on:click={() => (startButtonClicked = true)}
        class="px-8 py-1 bg-red-500 text-white text-lg md:text-2xl rounded-lg hover:bg-red-700 transition hover:scale-125"
      >
        Start
      </button>
    </div>
  </div>
</div>

<style>
  /* Dark mode transition on link is slower than the rest of the text for some reason, so just disable it so its not noticeable */
  a {
    transition: none;
  }
</style>
