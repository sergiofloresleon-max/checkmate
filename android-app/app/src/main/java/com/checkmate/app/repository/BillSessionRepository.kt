package com.checkmate.app.repository

import com.checkmate.app.model.BillSession
import com.google.firebase.firestore.FieldValue
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.tasks.await

class BillSessionRepository(
    private val firestore: FirebaseFirestore = FirebaseFirestore.getInstance()
) {
    fun observeSession(sessionId: String): Flow<BillSession> = callbackFlow {
        val registration = firestore.collection("sessions")
            .document(sessionId)
            .addSnapshotListener { snapshot, error ->
                if (error != null || snapshot == null || !snapshot.exists()) return@addSnapshotListener
                val session = snapshot.toObject(BillSession::class.java)
                if (session != null) {
                    trySend(session)
                }
            }
        awaitClose { registration.remove() }
    }

    suspend fun toggleItemClaimAtomic(
        sessionId: String,
        itemId: String,
        participantId: String
    ) {
        val docRef = firestore.collection("sessions").document(sessionId)
        firestore.runTransaction { transaction ->
            val snapshot = transaction.get(docRef)
            val session = snapshot.toObject(BillSession::class.java)
                ?: throw IllegalStateException("Session $sessionId not found")

            val updatedItems = session.items.map { item ->
                if (item.id != itemId) return@map item
                val updatedClaims = if (item.claimedBy.contains(participantId)) {
                    item.claimedBy - participantId
                } else {
                    item.claimedBy + participantId
                }
                item.copy(claimedBy = updatedClaims)
            }

            transaction.update(
                docRef,
                mapOf(
                    "items" to updatedItems,
                    "version" to FieldValue.increment(1)
                )
            )
        }.await()
    }
}
