<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import ThemeToggleSwitch from "./components/ThemeToggleSwitch.svelte";
  import QuestionText from "./components/QuestionText.svelte";
  import QuestionList from "./components/QuestionList.svelte";
  import WelcomeScreen from "./components/WelcomeScreen.svelte";

  import "./app.css";

  // Directly initialize isDarkTheme based on localStorage or default to light theme
  let isDarkTheme: boolean = localStorage.getItem("theme") === "dark";

  let startButtonClicked: boolean = false;

  // Reactive statement to handle theme changes
  $: {
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDarkTheme);
  }

  // Apply the initial theme to the document
  onMount(() => {
    document.documentElement.classList.toggle("dark", isDarkTheme);
  });
</script>

<body class="bg-red-300 dark:bg-gray-900 min-h-screen flex flex-col">
  {#if startButtonClicked}
    <div in:fade={{ duration: 250 }}>
      <QuestionText />
      <QuestionList />
    </div>
  {:else}
    <div out:fade={{ duration: 250 }}>
      <WelcomeScreen bind:startButtonClicked />
    </div>
  {/if}

  <!-- Top right corner, putting it here so its on top of DOM -->
  <ThemeToggleSwitch bind:isDarkTheme />
</body>

<style>
  body {
    /* Extend background color to safe area */
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  }
</style>
