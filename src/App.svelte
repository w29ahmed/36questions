<script lang="ts">
  import { onMount } from "svelte";
  import ThemeToggleSwitch from "./components/ThemeToggleSwitch.svelte";
  import QuestionText from "./components/QuestionText.svelte";
  import QuestionList from "./components/QuestionList.svelte";
  import "./app.css";

  // Directly initialize isDarkTheme based on localStorage or default to light theme
  let isDarkTheme: boolean = localStorage.getItem("theme") === "dark";

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
  <QuestionText />
  <QuestionList />
  <!-- Top right corner, putting it here so its on top of DOM -->
  <ThemeToggleSwitch bind:isDarkTheme />
</body>
