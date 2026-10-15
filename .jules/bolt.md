## 2026-10-15 - Svelte 5 Singletons for Heavy Objects
**Learning:** In Svelte 5 components, object instantiations inside the `<script>` block run per-component-instance. Heavy, stateless objects (like `Marked` parsers) should be moved to a `<script module>` block so they become singletons, saving memory and improving instantiation performance.
**Action:** When extracting TypeScript code into a `<script module>` block in Svelte components, always include the `lang="ts"` attribute (e.g., `<script module lang="ts">`) to prevent build-breaking type checking regressions.
