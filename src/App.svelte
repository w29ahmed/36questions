<script lang="ts">
  import { onMount } from "svelte";
  import ThemeToggleSwitch from "./components/ThemeToggleSwitch.svelte";
  import "./app.css";

  // Directly initialize isDarkTheme based on localStorage or default to light theme
  let isDarkTheme: boolean = localStorage.getItem("theme") === "dark";

  // Reactive statement to handle theme changes
  $: {
    console.log("App.Svelte " + isDarkTheme);
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDarkTheme);
  }

  // Apply the initial theme to the document
  onMount(() => {
    document.documentElement.classList.toggle("dark", isDarkTheme);
  });
</script>

<body class="bg-red-300 dark:bg-gray-900 min-h-screen">
  <ThemeToggleSwitch bind:isDarkTheme />
</body>
