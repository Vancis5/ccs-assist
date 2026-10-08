## 2024-05-18 - Extracted Marked object to script module
**Learning:** Instantiating heavy objects like `Marked` in a Svelte component script block creates a new instance for every component render, which is a performance bottleneck for long lists like Chat Messages. Using `<script module>` allows creating a singleton shared across all instances.
**Action:** Extract stateless heavy objects to `<script module>` blocks to reduce memory overhead.
