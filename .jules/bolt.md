## 2024-10-10 - Svelte 5: Extracting Heavy Objects
**Learning:** Instantiating heavy objects like `Marked` inside a standard `<script>` block in Svelte 5 causes them to be recreated for every component instance. In a chat app with many messages, this can cause significant memory and CPU bloat.
**Action:** Extract heavy, stateless objects (like parsers) into a `<script module lang="ts">` block so they are instantiated as singletons.
