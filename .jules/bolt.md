## 2026-10-05 - Svelte 5 Stateless Singletons
**Learning:** In Svelte 5, heavy stateless objects instantiated inside a normal `<script>` block are recreated for every component instance, which can cause significant memory and CPU overhead in list-rendered components like chat messages.
**Action:** Extract heavy, stateless objects (like markdown parsers) into `<script module>` blocks so they are instantiated as singletons.
