package com.checkmate.app

import com.checkmate.app.domain.SplitEngine
import com.checkmate.app.model.*
import org.junit.Assert.assertEquals
import org.junit.Test

class SplitEngineTest {

    @Test
    fun `allocateItemCents preserves exact sum when dividing $160_00 across 3 claimants`() {
        val allocation = SplitEngine.allocateItemCents(
            priceCents = 16_000L,
            claimantIds = listOf("p-sofia", "p-host", "p-diego")
        )

        assertEquals(16_000L, allocation.values.sum())
        assertEquals(5_334L, allocation["p-diego"])
        assertEquals(5_333L, allocation["p-host"])
        assertEquals(5_333L, allocation["p-sofia"])
    }
}
