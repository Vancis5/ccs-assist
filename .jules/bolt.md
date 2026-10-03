## 2024-05-24 - Svelte 5 Singleton Extraction for Heavy Stateless Objects
**Learning:** Instantiating heavy stateless objects like markdown parsers within `<script>` blocks in Svelte components means they get re-created for every component instance. In scenarios with many components (e.g., chat messages), this causes unnecessary memory usage and performance overhead.
**Action:** Extract heavy, stateless objects (like `Marked` parsers, configuration objects) into a `<script module>` block in Svelte 5 so they act as true singletons, initialized only once.
