## 2024-03-24 - Svelte 5 Object Instantiation Bottlenecks
**Learning:** Instantiating heavy, stateless dependencies (like `Marked`) inside a standard `<script lang="ts">` block in a Svelte component means they are re-instantiated for every component instance rendered. In lists or repeated elements (like chat messages), this scales poorly and increases memory/CPU overhead per item.
**Action:** Always extract static, stateless instances and their configurations into `<script module>` blocks to leverage them as singletons across all component instances.
