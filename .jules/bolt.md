## 2024-06-25 - Svelte 5 Script Module Singletons
**Learning:** In Svelte 5, heavy, stateless objects (like a `Marked` markdown parser) should be extracted into `<script module lang="ts">` blocks. This allows them to be instantiated as singletons rather than re-created for every component instance, saving memory and improving rendering performance for lists of components (like chat messages).
**Action:** Always check if heavy static configurations or class instantiations inside standard `<script>` blocks can be moved to `<script module>` blocks to avoid per-instance allocation overhead.
