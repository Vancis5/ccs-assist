## 2024-10-24 - Svelte Marked Parser Optimization
**Learning:** Instantiating `Marked` inside a standard Svelte `<script>` block means a new parser instance is created for every single message component in the chat. Since the `Marked` configuration is stateless here, this causes unnecessary garbage collection and memory usage as the chat history grows.
**Action:** Move stateless parser instances into a `<script module>` block so they are instantiated exactly once and shared across all component instances.
