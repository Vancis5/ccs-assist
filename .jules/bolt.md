## 2026-10-01 - Svelte 5 Singleton Components
**Learning:** Instantiating heavy objects like markdown parsers within a Svelte component's standard script block creates a new instance for every component rendered, which can cause significant memory overhead for lists.
**Action:** Extract stateless heavy objects into a `<script module>` block so they are instantiated as singletons, reducing memory footprint and improving rendering performance.
