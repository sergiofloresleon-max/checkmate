package com.checkmate.app.ocr

import com.checkmate.app.model.TicketItem
import java.util.UUID
import kotlin.math.abs
import kotlin.math.roundToLong

data class SpatialTextElement(
    val text: String,
    val centerY: Float,
    val leftX: Float
)

/**
 * Reconstructs physical receipt rows from skewed camera captures and filters out
 * summary, tax, and payment lines across 5 supported languages:
 * English (EN), Spanish (ES), French (FR), German (DE), and Portuguese (PT).
 */
class ReceiptLineParser(
    private val verticalLineTolerancePx: Float = 18.0f
) {
    // Supports $, €, £, R$ and both dot/comma decimal separators (e.g. 240.00 or 24,50)
    private val lineItemRegex = Regex(
        pattern = """^(?:(\d+)\s*[xX*]?\s+)?(.+?)\s+(?:R\$|\$|€|£)?\s*(\d{1,5}[.,]\d{2})$"""
    )

    private val multilingualSummaryStopwords = setOf(
        // English
        "subtotal", "sub-total", "total", "tax", "vat", "sales tax", "tip", "gratuity", "change", "cash",
        // Spanish
        "iva", "impuesto", "propina", "servicio", "efectivo", "cambio", "tarjeta",
        // French
        "sous-total", "somme", "tva", "pourboire", "service compris", "espèces", "carte",
        // German
        "zwischensumme", "gesamt", "summe", "mwst", "mehrwertsteuer", "trinkgeld", "bar", "rückgeld",
        // Portuguese
        "gorjeta", "taxa de serviço", "troco", "dinheiro", "cartão"
    )

    fun clusterAndParseSpatially(elements: List<SpatialTextElement>): List<TicketItem> {
        if (elements.isEmpty()) return emptyList()

        val sortedByY = elements.sortedBy { it.centerY }
        val reconstructedRows = mutableListOf<MutableList<SpatialTextElement>>()

        for (element in sortedByY) {
            val matchingRow = reconstructedRows.lastOrNull { row ->
                val avgY = row.map { it.centerY }.average().toFloat()
                abs(element.centerY - avgY) <= verticalLineTolerancePx
            }
            if (matchingRow != null) {
                matchingRow.add(element)
            } else {
                reconstructedRows.add(mutableListOf(element))
            }
        }

        val rawLines = reconstructedRows.map { row ->
            row.sortedBy { it.leftX }.joinToString(" ") { it.text.trim() }
        }

        return parseRawTextLines(rawLines)
    }

    fun parseRawTextLines(lines: List<String>): List<TicketItem> {
        val items = mutableListOf<TicketItem>()

        for (rawLine in lines) {
            val cleaned = rawLine.trim().replace(Regex("""\s+"""), " ")
            val match = lineItemRegex.find(cleaned) ?: continue

            val qtyStr = match.groupValues[1]
            val quantity = qtyStr.toIntOrNull()?.coerceAtLeast(1) ?: 1
            val rawName = match.groupValues[2].trim()
            val priceStr = match.groupValues[3].replace(",", ".")

            if (isMultilingualSummaryLine(rawName)) continue

            val priceMajor = priceStr.toDoubleOrNull() ?: continue
            val priceCents = (priceMajor * 100.0).roundToLong()

            if (priceCents > 0L) {
                items.add(
                    TicketItem(
                        id = "item-${UUID.randomUUID().toString().take(8)}",
                        name = if (quantity > 1) "$rawName (x$quantity)" else rawName,
                        priceCents = priceCents,
                        quantity = quantity
                    )
                )
            }
        }
        return items
    }

    private fun isMultilingualSummaryLine(name: String): Boolean {
        val normalized = name.lowercase().trim()
        return multilingualSummaryStopwords.any { token -> normalized.contains(token) }
    }
}
