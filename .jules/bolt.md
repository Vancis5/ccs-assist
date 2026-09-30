## 2025-02-09 - Initial
**Learning:** Nothing yet.
**Action:** Explore codebase.
## 2025-02-09 - Avoid duplicate library instantiation in Svelte component scope
**Learning:** Instantiating heavy objects like `Marked` parsers inside `<script lang="ts">` of a component creates a new instance for every rendered component, leading to O(n) memory and initialization cost. Svelte 5 components still run `<script>` block code per component instance.
**Action:** Extract heavy, stateless objects (like markdown parsers, regular expressions, formatters) into `<script module>` blocks so they are singleton and shared across all instances of the component.
