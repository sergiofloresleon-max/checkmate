package com.checkmate.app.model

enum class SupportedLocale(val tag: String, val displayName: String) {
    EN("en", "English"),
    ES("es", "Español"),
    FR("fr", "Français"),
    DE("de", "Deutsch"),
    PT("pt", "Português");

    companion object {
        fun fromTag(tag: String): SupportedLocale =
            entries.firstOrNull { it.tag.equals(tag, ignoreCase = true) } ?: EN
    }
}

/**
 * Monetary amounts are stored and computed in integer cents (Long)
 * to eliminate IEEE-754 floating-point drift during N-way item splits.
 */
data class TicketItem(
    val id: String = "",
    val name: String = "",
    val priceCents: Long = 0L,
    val quantity: Int = 1,
    val category: String = "Mains",
    val claimedBy: List<String> = emptyList()
) {
    val isUnclaimed: Boolean
        get() = claimedBy.isEmpty()

    val priceFormatted: String
        get() = String.format("%.2f", priceCents / 100.0)
}

enum class TipMode {
    PRESET,
    CUSTOM
}

data class Participant(
    val id: String = "",
    val name: String = "",
    val isHost: Boolean = false,
    val localeTag: String = "en",
    val tipMode: TipMode = TipMode.PRESET,
    val tipBasisPoints: Int = 1500 // 1500 bps = 15.00%
)

data class ParticipantInvoice(
    val participantId: String,
    val participantName: String,
    val subtotalCents: Long,
    val tipBasisPoints: Int,
    val tipCents: Long,
    val totalCents: Long,
    val allocatedItems: List<AllocatedItemShare>
)

data class AllocatedItemShare(
    val itemId: String,
    val itemName: String,
    val fullPriceCents: Long,
    val splitWays: Int,
    val allocatedShareCents: Long
)

data class BillSession(
    val sessionId: String = "",
    val restaurantName: String = "",
    val shareUrl: String = "",
    val defaultLocale: String = "es",
    val items: List<TicketItem> = emptyList(),
    val participants: List<Participant> = emptyList(),
    val version: Long = 1L
) {
    val unclaimedItems: List<TicketItem>
        get() = items.filter { it.isUnclaimed }

    val allItemsClaimed: Boolean
        get() = items.isNotEmpty() && unclaimedItems.isEmpty()

    val totalReceiptCents: Long
        get() = items.sumOf { it.priceCents }
}
