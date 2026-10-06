## 2026-10-06 - Svelte <script module> Typescript Support
**Learning:** When moving TypeScript code from <script lang="ts"> into a <script module> block, the module block must also have lang="ts" attribute (i.e. <script module lang="ts">) or else the Svelte compiler will try to parse it as plain JS and crash on type assertions.
**Action:** Always verify that <script module> has the correct lang attribute when handling TS logic.
