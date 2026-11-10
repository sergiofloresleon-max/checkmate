# ADR 002: Five-Language Support (EN, ES, FR, DE, PT) Across OCR & Zero-Install Web

- **Status:** Accepted
- **Project:** CheckMate

## Context
International dining groups frequently have a host scanning a local receipt (e.g., in Mexico, France, Germany, Brazil, or the US) while guests at the same table prefer interacting with the web bill-splitting link in their own native language.

## Decision
1. **Multilingual OCR Stopword & Currency Normalization:** `ReceiptLineParser` normalizes both `.` and `,` decimal separators (`$240.00`, `€28,50`, `R$ 145,00`) and filters localized tax/subtotal/tip lines across English, Spanish, French (`Sous-total`, `TVA`, `Pourboire`), German (`Zwischensumme`, `MwSt`, `Trinkgeld`), and Portuguese (`Gorjeta`, `Taxa de serviço`).
2. **Per-Guest Locale Selection:** The Web Guest client supports instant runtime switching (`?lang=en|es|fr|de|pt`) independent of the Android host's device locale.
