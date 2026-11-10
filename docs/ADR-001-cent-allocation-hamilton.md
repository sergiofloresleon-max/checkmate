# ADR 001: Penny-Exact Allocation via Hamilton's Largest Remainder Method

- **Status:** Accepted
- **Project:** CheckMate

## Context
When multiple restaurant guests share an appetizer or pitcher (e.g., *Queso Fundido* at `$160.00` split 3 ways), naive IEEE-754 floating-point arithmetic yields `$53.3333...`, which rounds to `$53.33` per person (`$159.99` total, losing `$0.01`).

## Decision
Represent all monetary values as 64-bit integer cents (`Long` in Kotlin, integer cents in JS) and apply **Hamilton's Largest Remainder Method** across deterministically sorted participant IDs (`claimantIds.distinct().sorted()`).
