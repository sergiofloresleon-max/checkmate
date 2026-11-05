package com.checkmate.app

import com.checkmate.app.ocr.ReceiptLineParser
import org.junit.Assert.assertEquals
import org.junit.Test

class ReceiptLineParserTest {

    private val parser = ReceiptLineParser()

    @Test
    fun `parseRawTextLines handles EN ES FR DE PT currencies and filters localized tax lines`() {
        val sampleLines = listOf(
            "2 Tacos Gaonera $240.00",
            "1 Magret de Canard €28,50",
            "1 Wiener Schnitzel €22,90",
            "1 Picanha na Brasa R$ 145,00",
            "Sous-total €28,50",
            "Zwischensumme €22,90",
            "MwSt 19% €4,35",
            "Gorjeta sugerida R$ 14,50"
        )

        val parsed = parser.parseRawTextLines(sampleLines)
        assertEquals(4, parsed.size)
        assertEquals("Tacos Gaonera (x2)", parsed[0].name)
        assertEquals(24_000L, parsed[0].priceCents)
        assertEquals("Magret de Canard", parsed[1].name)
        assertEquals(2_850L, parsed[1].priceCents)
        assertEquals("Wiener Schnitzel", parsed[2].name)
        assertEquals(2_290L, parsed[2].priceCents)
        assertEquals("Picanha na Brasa", parsed[3].name)
        assertEquals(14_500L, parsed[3].priceCents)
    }
}
