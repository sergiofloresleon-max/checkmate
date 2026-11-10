# CheckMate 🧾♟️ — Multilingual Real-Time Restaurant Bill Splitter (Android OCR + Zero-Install Web Guest)

**CheckMate** is a cross-platform mobile + web system engineered to eliminate the friction of splitting itemized restaurant receipts across groups where only the host has the mobile app installed.

Supports **5 languages** out of the box across both the Android host app, the spatial OCR receipt parser, and the zero-install guest web interface:
- 🇺🇸 **English (`en`)**
- 🇲🇽 **Español (`es`)**
- 🇫🇷 **Français (`fr`)**
- 🇩🇪 **Deutsch (`de`)**
- 🇧🇷 **Português (`pt`)**

## 🏗️ Architecture & Engineering Highlights

1. **Penny-Exact Financial Allocation (`SplitEngine` — Hamilton's Largest Remainder Method):**
   - Eliminates IEEE-754 floating-point rounding drift (`$160.00 / 3 = $53.33 * 3 = $159.99`).
   - All monetary values operate in 64-bit integer cents (`Long`). Remainder cents are distributed deterministically across sorted participant IDs so `sum(shares) === item.priceCents` is strictly preserved across both Kotlin and JavaScript runtimes (see [`docs/ADR-001-cent-allocation-hamilton.md`](docs/ADR-001-cent-allocation-hamilton.md)).
2. **Multilingual Spatial Y-Centroid Receipt OCR (`ReceiptLineParser` + CameraX + ML Kit):**
   - Clusters OCR bounding boxes by vertical Y-centroid tolerance (`±18px`) to reconstruct physical receipt rows even when captured at an angle.
   - Normalizes dot/comma decimal formats (`$240.00`, `€28,50`, `R$ 145,00`) and filters localized tax/subtotal/tip tokens (`IVA`, `TVA`, `MwSt`, `Zwischensumme`, `Pourboire`, `Gorjeta`).
3. **Zero-Install Guest Web Client (`/web-guest`):**
   - Guests open a shared URL (`https://checkmate.app/m/:sessionId?lang=en|es|fr|de|pt`), enter their name without registering, tap the dishes they consumed (supporting N-way shared appetizers), and select either a preset tip (`10%`, `15%`, `18%`, `20%`) or a custom percentage (`12.5%`).
4. **Live Host Notification Engine:**
   - Alerts the Android host in real time when orphan items remain unclaimed and triggers a completion state as soon as 100% of the receipt items have at least one owner.
