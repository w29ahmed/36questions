<script lang="ts">
  import Fa from "svelte-fa";
  import { faMoon } from "@fortawesome/free-solid-svg-icons";
  import { faSun } from "@fortawesome/free-solid-svg-icons";
  import Switch from "svelte-switch";

  export let isDarkTheme: boolean;

  function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    console.log("toggleTheme " + isDarkTheme);
  }
</script>

<div class="absolute top-0 right-0 p-4">
  <Switch
    on:change={toggleTheme}
    checked={isDarkTheme}
    onColor="#814ad8"
    offColor="#475569"
  >
    <div slot="checkedIcon" class="flex items-center justify-center h-full">
      <Fa icon={faMoon} class="text-slate-50" />
    </div>
    <div slot="unCheckedIcon" class="flex items-center justify-center h-full">
      <Fa icon={faSun} class="text-amber-200" />
    </div>
  </Switch>
</div>
