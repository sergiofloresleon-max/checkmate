package com.checkmate.app.domain

import com.checkmate.app.model.*
import kotlin.math.roundToLong

/**
 * CheckMate Deterministic Financial Allocation Engine (Hamilton's Largest Remainder Method).
 *
 * Engineering Invariant:
 * For every claimed item i, sum_{p in claimedBy(i)} share(i, p) == item.priceCents.
 */
object SplitEngine {

    fun allocateItemCents(priceCents: Long, claimantIds: List<String>): Map<String, Long> {
        require(priceCents >= 0L) { "Item priceCents cannot be negative: $priceCents" }
        val uniqueClaimants = claimantIds.distinct().sorted()
        val n = uniqueClaimants.size
        if (n == 0) return emptyMap()

        val baseShare = priceCents / n
        val remainder = (priceCents % n).toInt()

        return buildMap(n) {
            uniqueClaimants.forEachIndexed { index, participantId ->
                val extraCent = if (index < remainder) 1L else 0L
                put(participantId, baseShare + extraCent)
            }
        }
    }

    fun computeSessionInvoices(session: BillSession): Map<String, ParticipantInvoice> {
        val itemAllocations: Map<String, Map<String, Long>> = session.items.associate { item ->
            item.id to allocateItemCents(item.priceCents, item.claimedBy)
        }

        return session.participants.associate { participant ->
            val myShares = mutableListOf<AllocatedItemShare>()
            var subtotalCents = 0L

            for (item in session.items) {
                val shareCents = itemAllocations[item.id]?.get(participant.id)
                if (shareCents != null) {
                    subtotalCents += shareCents
                    myShares.add(
                        AllocatedItemShare(
                            itemId = item.id,
                            itemName = item.name,
                            fullPriceCents = item.priceCents,
                            splitWays = item.claimedBy.distinct().size,
                            allocatedShareCents = shareCents
                        )
                    )
                }
            }

            val tipCents = ((subtotalCents * participant.tipBasisPoints) / 10_000.0).roundToLong()
            val totalCents = subtotalCents + tipCents

            participant.id to ParticipantInvoice(
                participantId = participant.id,
                participantName = participant.name,
                subtotalCents = subtotalCents,
                tipBasisPoints = participant.tipBasisPoints,
                tipCents = tipCents,
                totalCents = totalCents,
                allocatedItems = myShares
            )
        }
    }
}
