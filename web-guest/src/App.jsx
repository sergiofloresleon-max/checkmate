import React, { useState, useMemo } from 'react';
import {
  Camera,
  Share2,
  UserPlus,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  Sparkles,
  Plus,
  Trash2,
  Copy,
  Check,
  Smartphone,
  Globe,
  Percent,
  Bell,
  RefreshCw,
  Split,
  Eye,
  Github,
  QrCode,
  Upload,
  Award,
  Terminal,
  ShieldCheck,
  GitBranch,
  FileCode2,
  Languages
} from 'lucide-react';

const I18N = {
  es: {
    flag: '🇲🇽',
    label: 'Español',
    badgeSync: 'Android + Web Sync • 5 Idiomas',
    subtitle: 'Escaneo de ticket con IA, liga para invitados sin app y motor exacto Hamilton (Cents)',
    tabSplit: 'Vista Simultánea',
    tabAndroid: 'App Android (Anfitrión)',
    tabWeb: 'Web Invitado (Liga)',
    tabArch: 'Repo GitHub & Stack',
    statusAllClaimed: '¡Notificación al Anfitrión: Todos los ítems del ticket tienen dueño!',
    statusMissingPrefix: 'Alerta al Anfitrión: Faltan',
    statusMissingSuffix: 'platillo(s) por reclamar',
    statusAssignedOf: 'ítems asignados',
    claimRemainingBtn: 'Asignar faltantes a',
    claimRemainingSuffix: 'para probar el 100%',
    ticketSubtotal: 'Subtotal Ticket:',
    hostSectionTitle: '1. App Android — Persona que detona la cuenta',
    activeTableFolio: 'Mesa Activa • Folio',
    scanTaqueria: 'Escanear Ticket (Taquería)',
    scanItaliano: 'Escanear Otro (Italiano)',
    addItemShort: 'Ítem',
    shareLinkLabel: 'Liga para enviar por WhatsApp / SMS',
    copied: 'Copiada',
    shareLinkBtn: 'Compartir Liga',
    allClaimedTitle: '¡Todos los ítems fueron reclamados!',
    allClaimedBadge: '100% ASIGNADO',
    allClaimedDesc: 'Ningún platillo quedó sin dueño. La cuenta está lista para cerrarse y cada comensal ya tiene su total exacto al centavo.',
    missingOwnerTitlePrefix: 'Faltan',
    missingOwnerTitleSuffix: 'ítem(s) por tener dueño',
    pendingBadge: 'PENDIENTE',
    nobodyClaimedYet: 'Aún nadie ha reclamado:',
    ticketItemsHeader: 'Platillos del Ticket',
    tapToClaimHost: 'Toca para reclamar como Anfitrión',
    unclaimedBadge: 'Sin dueño',
    splitBetween: 'Dividido entre',
    waitingSelection: 'Esperando que alguien lo seleccione...',
    mineHost: '✓ Mío (Anfitrión)',
    iAteThis: '+ Yo comí esto',
    hostTipLabel: 'Tu Propina (Anfitrión):',
    otherTipPlaceholder: 'Otro',
    tableSummaryHeader: 'Resumen de la Mesa por Persona',
    itemsWord: 'ítems',
    tipWord: 'Propina',
    totalCollectedWithTips: 'Total Recaudado (con propinas)',
    totalTipsLabel: 'Propinas Totales',
    webSectionTitle: '2. Interfaz Web — Invitados que abren la liga',
    noInstallNeeded: 'Sin instalar nada • Entra como invitado',
    instantWebBadge: 'Web Instantánea',
    guestAccessBadge: 'Acceso como Invitado',
    whoAreYouTitle: '¿Quién eres en la mesa?',
    joinNewGuestBtn: 'Entrar como nuevo invitado',
    guestNamePlaceholder: 'Escribe tu nombre (ej. Carlos, Ana...)',
    joinBillBtn: 'Unirme a la cuenta',
    selectConsumedPrefix: 'Selecciona lo que consumiste como',
    sharedSplitsCentNote: 'Si varios tocan un ítem, se divide al centavo',
    ticketPriceLabel: 'Precio ticket:',
    sharedBetweenBadge: 'Compartido entre',
    nobodyClaimedBadge: 'Nadie lo ha reclamado',
    yourExactShare: 'Tu parte exacta',
    itemTotal: 'Total ítem',
    chooseTipPercent: 'Elige tu porcentaje de propina:',
    customTipQuestion: '¿Propina personalizada (% específico)?',
    yourConsumption: 'Tu consumo',
    yourTip: 'Tu propina',
    yourExactTotalToPay: 'Tu Parte Exacta a Pagar',
    calculatedFor: 'Calculado para',
    modalAddTitle: 'Agregar platillo o bebida al ticket',
    modalAddDesc: 'Si algún ítem del ticket físico faltó o pidieron algo extra, agrégalo aquí.',
    dishNameLabel: 'Nombre del platillo / bebida',
    dishNamePlaceholder: 'Ej. Orden de Pastor o Carajillo',
    priceLabel: 'Precio ($)',
    categoryLabel: 'Categoría',
    cancelBtn: 'Cancelar',
    confirmAddBtn: 'Agregar al Ticket',
    qrModalTitle: 'Escanea o comparte la liga',
    qrModalDesc: 'Tus amigos no necesitan instalar la aplicación Android; entran directo desde su navegador móvil como invitados en su propio idioma.',
    closeBtn: 'Cerrar',
    categories: {
      Alimentos: 'Alimentos',
      Entradas: 'Entradas',
      Bebidas: 'Bebidas',
      Postres: 'Postres'
    }
  },
  en: {
    flag: '🇺🇸',
    label: 'English',
    badgeSync: 'Android + Web Sync • 5 Languages',
    subtitle: 'AI receipt OCR, zero-install guest web link & penny-exact Hamilton split engine',
    tabSplit: 'Split View',
    tabAndroid: 'Android App (Host)',
    tabWeb: 'Guest Web (Link)',
    tabArch: 'GitHub Repo & Stack',
    statusAllClaimed: 'Host Notification: All receipt items have been claimed!',
    statusMissingPrefix: 'Host Alert:',
    statusMissingSuffix: 'item(s) still unclaimed',
    statusAssignedOf: 'items assigned',
    claimRemainingBtn: 'Assign remaining to',
    claimRemainingSuffix: 'to test 100%',
    ticketSubtotal: 'Receipt Subtotal:',
    hostSectionTitle: '1. Android App — Host who triggers the bill split',
    activeTableFolio: 'Active Table • Receipt',
    scanTaqueria: 'Scan Receipt (Tacos)',
    scanItaliano: 'Scan Another (Italian)',
    addItemShort: 'Item',
    shareLinkLabel: 'Shareable link for WhatsApp / SMS',
    copied: 'Copied',
    shareLinkBtn: 'Share Link',
    allClaimedTitle: 'All items have been claimed!',
    allClaimedBadge: '100% ASSIGNED',
    allClaimedDesc: 'No dish is left without an owner. The bill is ready to close and every guest has their penny-exact total.',
    missingOwnerTitlePrefix: 'Missing owner for',
    missingOwnerTitleSuffix: 'item(s)',
    pendingBadge: 'PENDING',
    nobodyClaimedYet: 'Still unclaimed:',
    ticketItemsHeader: 'Receipt Items',
    tapToClaimHost: 'Tap to claim as Host',
    unclaimedBadge: 'Unclaimed',
    splitBetween: 'Split between',
    waitingSelection: 'Waiting for someone to claim...',
    mineHost: '✓ Mine (Host)',
    iAteThis: '+ I had this',
    hostTipLabel: 'Your Tip (Host):',
    otherTipPlaceholder: 'Custom',
    tableSummaryHeader: 'Table Breakdown per Person',
    itemsWord: 'items',
    tipWord: 'Tip',
    totalCollectedWithTips: 'Total Collected (with tips)',
    totalTipsLabel: 'Total Tips',
    webSectionTitle: '2. Web Interface — Guests opening the shared link',
    noInstallNeeded: 'Zero install • Join as guest',
    instantWebBadge: 'Instant Web',
    guestAccessBadge: 'Guest Access',
    whoAreYouTitle: 'Who are you at the table?',
    joinNewGuestBtn: 'Join as new guest',
    guestNamePlaceholder: 'Enter your name (e.g. Alex, Sam...)',
    joinBillBtn: 'Join bill',
    selectConsumedPrefix: 'Select what you had as',
    sharedSplitsCentNote: 'Shared items split to the exact cent',
    ticketPriceLabel: 'Receipt price:',
    sharedBetweenBadge: 'Shared by',
    nobodyClaimedBadge: 'Unclaimed yet',
    yourExactShare: 'Your exact share',
    itemTotal: 'Item total',
    chooseTipPercent: 'Choose your tip percentage:',
    customTipQuestion: 'Custom tip (specific %)?',
    yourConsumption: 'Your items',
    yourTip: 'Your tip',
    yourExactTotalToPay: 'Your Exact Total Due',
    calculatedFor: 'Calculated for',
    modalAddTitle: 'Add dish or drink to receipt',
    modalAddDesc: 'If an item was missed by OCR or ordered later, add it here.',
    dishNameLabel: 'Dish / drink name',
    dishNamePlaceholder: 'E.g. Guacamole or Espresso',
    priceLabel: 'Price ($)',
    categoryLabel: 'Category',
    cancelBtn: 'Cancel',
    confirmAddBtn: 'Add to Receipt',
    qrModalTitle: 'Scan or share the link',
    qrModalDesc: 'Your friends do not need the Android app; they join right from their mobile browser in their preferred language.',
    closeBtn: 'Close',
    categories: {
      Alimentos: 'Mains',
      Entradas: 'Starters',
      Bebidas: 'Drinks',
      Postres: 'Desserts'
    }
  },
  fr: {
    flag: '🇫🇷',
    label: 'Français',
    badgeSync: 'Sync Android + Web • 5 Langues',
    subtitle: 'Scan de ticket par IA, lien invité sans appli et partage au centime près (Hamilton)',
    tabSplit: 'Vue Simultanée',
    tabAndroid: 'Appli Android (Hôte)',
    tabWeb: 'Web Invité (Lien)',
    tabArch: 'Dépôt GitHub & Stack',
    statusAllClaimed: 'Notification Hôte : Tous les articles du ticket sont attribués !',
    statusMissingPrefix: 'Alerte Hôte :',
    statusMissingSuffix: 'plat(s) sans propriétaire',
    statusAssignedOf: 'articles attribués',
    claimRemainingBtn: 'Attribuer le reste à',
    claimRemainingSuffix: 'pour tester 100%',
    ticketSubtotal: 'Sous-total Ticket :',
    hostSectionTitle: "1. Appli Android — L'hôte qui lance le partage",
    activeTableFolio: 'Table Active • Ticket',
    scanTaqueria: 'Scanner Ticket (Tacos)',
    scanItaliano: 'Scanner Autre (Italien)',
    addItemShort: 'Article',
    shareLinkLabel: 'Lien à partager par WhatsApp / SMS',
    copied: 'Copié',
    shareLinkBtn: 'Partager Lien',
    allClaimedTitle: 'Tous les articles ont été réclamés !',
    allClaimedBadge: '100% ATTRIBUÉ',
    allClaimedDesc: "Aucun plat n'est sans propriétaire. L'addition est prête à être réglée au centime près.",
    missingOwnerTitlePrefix: 'Il manque un propriétaire pour',
    missingOwnerTitleSuffix: 'article(s)',
    pendingBadge: 'EN ATTENTE',
    nobodyClaimedYet: 'Non réclamés :',
    ticketItemsHeader: 'Articles du Ticket',
    tapToClaimHost: 'Toucher pour réclamer (Hôte)',
    unclaimedBadge: 'Non attribué',
    splitBetween: 'Partagé entre',
    waitingSelection: "En attente d'un convive...",
    mineHost: '✓ À moi (Hôte)',
    iAteThis: "+ J'ai pris ça",
    hostTipLabel: 'Votre Pourboire (Hôte) :',
    otherTipPlaceholder: 'Autre',
    tableSummaryHeader: 'Résumé de la Table par Personne',
    itemsWord: 'articles',
    tipWord: 'Pourboire',
    totalCollectedWithTips: 'Total Réuni (avec pourboires)',
    totalTipsLabel: 'Total Pourboires',
    webSectionTitle: '2. Interface Web — Invités ouvrant le lien',
    noInstallNeeded: 'Sans installation • Mode invité',
    instantWebBadge: 'Web Instantané',
    guestAccessBadge: 'Accès Invité',
    whoAreYouTitle: 'Qui êtes-vous à table ?',
    joinNewGuestBtn: 'Rejoindre comme invité',
    guestNamePlaceholder: 'Votre prénom (ex. Claire, Marc...)',
    joinBillBtn: 'Rejoindre la table',
    selectConsumedPrefix: 'Sélectionnez vos plats en tant que',
    sharedSplitsCentNote: 'Les plats partagés sont divisés au centime près',
    ticketPriceLabel: 'Prix ticket :',
    sharedBetweenBadge: 'Partagé par',
    nobodyClaimedBadge: 'Non réclamé',
    yourExactShare: 'Votre part exacte',
    itemTotal: 'Total article',
    chooseTipPercent: 'Choisissez votre pourboire (%) :',
    customTipQuestion: 'Pourboire personnalisé (% précis) ?',
    yourConsumption: 'Votre consommation',
    yourTip: 'Votre pourboire',
    yourExactTotalToPay: 'Votre Part Exacte à Payer',
    calculatedFor: 'Calculé pour',
    modalAddTitle: 'Ajouter un plat ou une boisson',
    modalAddDesc: 'Ajoutez manuellement tout article manquant sur le ticket.',
    dishNameLabel: 'Nom du plat / boisson',
    dishNamePlaceholder: 'Ex. Tartare ou Café',
    priceLabel: 'Prix ($)',
    categoryLabel: 'Catégorie',
    cancelBtn: 'Annuler',
    confirmAddBtn: 'Ajouter au Ticket',
    qrModalTitle: 'Scannez ou partagez le lien',
    qrModalDesc: "Vos amis n'ont pas besoin de l'application Android ; ils rejoignent directement depuis leur navigateur mobile.",
    closeBtn: 'Fermer',
    categories: {
      Alimentos: 'Plats',
      Entradas: 'Entrées',
      Bebidas: 'Boissons',
      Postres: 'Desserts'
    }
  },
  de: {
    flag: '🇩🇪',
    label: 'Deutsch',
    badgeSync: 'Android + Web Sync • 5 Sprachen',
    subtitle: 'KI-Kassenbon-Scan, Gäste-Weblink ohne App & centgenaue Hamilton-Aufteilung',
    tabSplit: 'Geteilte Ansicht',
    tabAndroid: 'Android-App (Gastgeber)',
    tabWeb: 'Gäste-Web (Link)',
    tabArch: 'GitHub-Repo & Stack',
    statusAllClaimed: 'Gastgeber-Info: Alle Positionen auf dem Bon sind zugewiesen!',
    statusMissingPrefix: 'Gastgeber-Warnung: Noch',
    statusMissingSuffix: 'Position(en) ohne Besitzer',
    statusAssignedOf: 'Positionen zugewiesen',
    claimRemainingBtn: 'Offene zuweisen an',
    claimRemainingSuffix: 'für 100%-Test',
    ticketSubtotal: 'Zwischensumme Bon:',
    hostSectionTitle: '1. Android-App — Gastgeber, der die Rechnung teilt',
    activeTableFolio: 'Aktiver Tisch • Bon',
    scanTaqueria: 'Bon scannen (Taquería)',
    scanItaliano: 'Anderen Bon (Italienisch)',
    addItemShort: 'Position',
    shareLinkLabel: 'Link für WhatsApp / SMS teilen',
    copied: 'Kopiert',
    shareLinkBtn: 'Link teilen',
    allClaimedTitle: 'Alle Positionen wurden übernommen!',
    allClaimedBadge: '100% ZUGEWIESEN',
    allClaimedDesc: 'Kein Gericht ist mehr offen. Die Rechnung kann centgenau abgeschlossen werden.',
    missingOwnerTitlePrefix: 'Noch',
    missingOwnerTitleSuffix: 'Position(en) ohne Besitzer',
    pendingBadge: 'OFFEN',
    nobodyClaimedYet: 'Noch nicht ausgewählt:',
    ticketItemsHeader: 'Bon-Positionen',
    tapToClaimHost: 'Tippen zum Übernehmen (Gastgeber)',
    unclaimedBadge: 'Offen',
    splitBetween: 'Geteilt durch',
    waitingSelection: 'Wartet auf Auswahl...',
    mineHost: '✓ Meins (Gastgeber)',
    iAteThis: '+ Hatte ich',
    hostTipLabel: 'Dein Trinkgeld (Gastgeber):',
    otherTipPlaceholder: 'Frei',
    tableSummaryHeader: 'Tischübersicht pro Person',
    itemsWord: 'Pos.',
    tipWord: 'Trinkgeld',
    totalCollectedWithTips: 'Gesamtsumme (inkl. Trinkgeld)',
    totalTipsLabel: 'Trinkgeld gesamt',
    webSectionTitle: '2. Web-Oberfläche — Gäste über den geteilten Link',
    noInstallNeeded: 'Keine Installation • Als Gast beitreten',
    instantWebBadge: 'Sofort-Web',
    guestAccessBadge: 'Gastzugang',
    whoAreYouTitle: 'Wer bist du am Tisch?',
    joinNewGuestBtn: 'Als neuer Gast beitreten',
    guestNamePlaceholder: 'Dein Name (z. B. Lukas, Anna...)',
    joinBillBtn: 'Beitreten',
    selectConsumedPrefix: 'Wähle deine Positionen als',
    sharedSplitsCentNote: 'Geteilte Gerichte werden centgenau aufgeteilt',
    ticketPriceLabel: 'Bon-Preis:',
    sharedBetweenBadge: 'Geteilt durch',
    nobodyClaimedBadge: 'Noch offen',
    yourExactShare: 'Dein exakter Anteil',
    itemTotal: 'Gesamtpreis',
    chooseTipPercent: 'Trinkgeld-Prozentsatz wählen:',
    customTipQuestion: 'Individuelles Trinkgeld (genauer %)?',
    yourConsumption: 'Dein Verzehr',
    yourTip: 'Dein Trinkgeld',
    yourExactTotalToPay: 'Dein Exakter Zahlbetrag',
    calculatedFor: 'Berechnet für',
    modalAddTitle: 'Gericht oder Getränk hinzufügen',
    modalAddDesc: 'Falls eine Position auf dem Bon fehlt, füge sie hier hinzu.',
    dishNameLabel: 'Name des Gerichts / Getränks',
    dishNamePlaceholder: 'z. B. Bruschetta oder Espresso',
    priceLabel: 'Preis ($)',
    categoryLabel: 'Kategorie',
    cancelBtn: 'Abbrechen',
    confirmAddBtn: 'Zum Bon hinzufügen',
    qrModalTitle: 'QR-Code scannen oder Link teilen',
    qrModalDesc: 'Deine Freunde brauchen keine App; sie öffnen einfach den Link im mobilen Browser.',
    closeBtn: 'Schließen',
    categories: {
      Alimentos: 'Hauptgerichte',
      Entradas: 'Vorspeisen',
      Bebidas: 'Getränke',
      Postres: 'Desserts'
    }
  },
  pt: {
    flag: '🇧🇷',
    label: 'Português',
    badgeSync: 'Android + Web Sync • 5 Idiomas',
    subtitle: 'Leitura de conta com IA, link web para convidados sem app e divisão exata (Hamilton)',
    tabSplit: 'Visão Simultânea',
    tabAndroid: 'App Android (Anfitrião)',
    tabWeb: 'Web Convidado (Link)',
    tabArch: 'Repo GitHub & Stack',
    statusAllClaimed: 'Notificação ao Anfitrião: Todos os itens da conta têm dono!',
    statusMissingPrefix: 'Alerta ao Anfitrião: Faltam',
    statusMissingSuffix: 'item(ns) para reclamar',
    statusAssignedOf: 'itens atribuídos',
    claimRemainingBtn: 'Atribuir restantes a',
    claimRemainingSuffix: 'para testar 100%',
    ticketSubtotal: 'Subtotal da Conta:',
    hostSectionTitle: '1. App Android — Pessoa que inicia a divisão',
    activeTableFolio: 'Mesa Ativa • Conta',
    scanTaqueria: 'Escanear Conta (Taqueria)',
    scanItaliano: 'Escanear Outra (Italiano)',
    addItemShort: 'Item',
    shareLinkLabel: 'Link para enviar por WhatsApp / SMS',
    copied: 'Copiado',
    shareLinkBtn: 'Compartilhar Link',
    allClaimedTitle: 'Todos os itens foram reclamados!',
    allClaimedBadge: '100% ATRIBUÍDO',
    allClaimedDesc: 'Nenhum prato ficou sem dono. A conta está pronta para fechar com precisão de centavos.',
    missingOwnerTitlePrefix: 'Faltam',
    missingOwnerTitleSuffix: 'item(ns) sem dono',
    pendingBadge: 'PENDENTE',
    nobodyClaimedYet: 'Ainda ninguém selecionou:',
    ticketItemsHeader: 'Itens da Conta',
    tapToClaimHost: 'Toque para marcar como Anfitrião',
    unclaimedBadge: 'Sem dono',
    splitBetween: 'Dividido entre',
    waitingSelection: 'Aguardando alguém selecionar...',
    mineHost: '✓ Meu (Anfitrião)',
    iAteThis: '+ Eu consumi isto',
    hostTipLabel: 'Sua Gorjeta (Anfitrião):',
    otherTipPlaceholder: 'Outro',
    tableSummaryHeader: 'Resumo da Mesa por Pessoa',
    itemsWord: 'itens',
    tipWord: 'Gorjeta',
    totalCollectedWithTips: 'Total Arrecadado (com gorjetas)',
    totalTipsLabel: 'Gorjetas Totais',
    webSectionTitle: '2. Interface Web — Convidados que abrem o link',
    noInstallNeeded: 'Sem instalar nada • Entre como convidado',
    instantWebBadge: 'Web Instantânea',
    guestAccessBadge: 'Acesso Convidado',
    whoAreYouTitle: 'Quem é você na mesa?',
    joinNewGuestBtn: 'Entrar como novo convidado',
    guestNamePlaceholder: 'Digite seu nome (ex. Lucas, Júlia...)',
    joinBillBtn: 'Entrar na conta',
    selectConsumedPrefix: 'Selecione o que consumiu como',
    sharedSplitsCentNote: 'Itens compartilhados são divididos ao centavo exato',
    ticketPriceLabel: 'Preço na conta:',
    sharedBetweenBadge: 'Compartilhado por',
    nobodyClaimedBadge: 'Ninguém selecionou',
    yourExactShare: 'Sua parte exata',
    itemTotal: 'Total do item',
    chooseTipPercent: 'Escolha sua porcentagem de gorjeta:',
    customTipQuestion: 'Gorjeta personalizada (% específico)?',
    yourConsumption: 'Seu consumo',
    yourTip: 'Sua gorjeta',
    yourExactTotalToPay: 'Sua Parte Exata a Pagar',
    calculatedFor: 'Calculado para',
    modalAddTitle: 'Adicionar prato ou bebida à conta',
    modalAddDesc: 'Se faltou algum item na leitura da câmera, adicione aqui.',
    dishNameLabel: 'Nome do prato / bebida',
    dishNamePlaceholder: 'Ex. Picanha ou Caipirinha',
    priceLabel: 'Preço ($)',
    categoryLabel: 'Categoria',
    cancelBtn: 'Cancelar',
    confirmAddBtn: 'Adicionar à Conta',
    qrModalTitle: 'Escaneie ou compartilhe o link',
    qrModalDesc: 'Seus amigos não precisam instalar o app Android; entram direto pelo navegador do celular.',
    closeBtn: 'Fechar',
    categories: {
      Alimentos: 'Pratos',
      Entradas: 'Entradas',
      Bebidas: 'Bebidas',
      Postres: 'Sobremesas'
    }
  }
};

const PRESET_TICKETS = {
  taqueria: {
    restaurant: 'Taquería El Califa de León',
    address: 'Av. Ribera de San Cosme 56, CDMX',
    date: '10 Nov 2026 • 21:15',
    folio: 'CHK-4829',
    items: [
      { id: 'item-1', name: 'Orden Tacos de Gaonera (3 pzas)', price: 240.00, category: 'Alimentos' },
      { id: 'item-2', name: 'Costilla de Res Asada', price: 195.00, category: 'Alimentos' },
      { id: 'item-3', name: 'Guacamole con Totopos al Centro', price: 135.00, category: 'Entradas' },
      { id: 'item-4', name: 'Queso Fundido con Chorizo', price: 160.00, category: 'Entradas' },
      { id: 'item-5', name: 'Cerveza Artesanal IPA', price: 95.00, category: 'Bebidas' },
      { id: 'item-6', name: 'Margarita de Mezcal Jamaica', price: 165.00, category: 'Bebidas' },
      { id: 'item-7', name: 'Agua de Horchata Grande', price: 65.00, category: 'Bebidas' },
      { id: 'item-8', name: 'Flan Napolitano Casero', price: 90.00, category: 'Postres' }
    ]
  },
  italiano: {
    restaurant: 'Trattoria Bella Napoli',
    address: 'Polanco IV Secc, CDMX',
    date: '10 Nov 2026 • 20:30',
    folio: 'CHK-9012',
    items: [
      { id: 'item-101', name: 'Pizza Margherita D.O.P. (Share)', price: 290.00, category: 'Alimentos' },
      { id: 'item-102', name: 'Fettuccine al Tartufo Nero', price: 340.00, category: 'Alimentos' },
      { id: 'item-103', name: 'Lasagna Tradizionale Bolognese', price: 280.00, category: 'Alimentos' },
      { id: 'item-104', name: 'Carpaccio di Salmone', price: 245.00, category: 'Entradas' },
      { id: 'item-105', name: 'Chianti Classico Red Wine', price: 175.00, category: 'Bebidas' },
      { id: 'item-106', name: 'Aperol Spritz', price: 185.00, category: 'Bebidas' },
      { id: 'item-107', name: 'Tiramisù Classico', price: 150.00, category: 'Postres' }
    ]
  }
};

const AVATAR_COLORS = [
  'bg-emerald-500 text-white',
  'bg-indigo-500 text-white',
  'bg-amber-500 text-white',
  'bg-rose-500 text-white',
  'bg-cyan-500 text-white',
  'bg-purple-500 text-white'
];

/**
 * Largest Remainder Method (Hamilton's Method) in exact integer cents (Long/Int)
 * Guarantees sum(shares) === totalCents with zero IEEE-754 floating-point drift.
 */
function allocateExactCents(priceDollars, claimantIds) {
  const n = claimantIds.length;
  if (n === 0) return {};
  const totalCents = Math.round(priceDollars * 100);
  const baseCents = Math.floor(totalCents / n);
  const remainder = totalCents - baseCents * n;

  const sortedIds = [...claimantIds].sort();
  const result = {};
  sortedIds.forEach((id, idx) => {
    const cents = baseCents + (idx < remainder ? 1 : 0);
    result[id] = cents / 100;
  });
  return result;
}

export default function App() {
  // Active Language ('es' | 'en' | 'fr' | 'de' | 'pt')
  const [lang, setLang] = useState('es');
  const t = I18N[lang] || I18N.es;

  // Navigation & View Mode ('split', 'android', 'web', 'architecture')
  const [viewMode, setViewMode] = useState('split');

  // Ticket State
  const [ticketInfo, setTicketInfo] = useState({
    restaurant: PRESET_TICKETS.taqueria.restaurant,
    address: PRESET_TICKETS.taqueria.address,
    date: PRESET_TICKETS.taqueria.date,
    folio: PRESET_TICKETS.taqueria.folio
  });

  const [items, setItems] = useState([
    { id: 'item-1', name: 'Orden Tacos de Gaonera (3 pzas)', price: 240.00, category: 'Alimentos', claimedBy: ['p-host'] },
    { id: 'item-2', name: 'Costilla de Res Asada', price: 195.00, category: 'Alimentos', claimedBy: ['p-sofia'] },
    { id: 'item-3', name: 'Guacamole con Totopos al Centro', price: 135.00, category: 'Entradas', claimedBy: ['p-host', 'p-sofia', 'p-diego'] },
    { id: 'item-4', name: 'Queso Fundido con Chorizo', price: 160.00, category: 'Entradas', claimedBy: ['p-host', 'p-sofia', 'p-diego'] },
    { id: 'item-5', name: 'Cerveza Artesanal IPA', price: 95.00, category: 'Bebidas', claimedBy: ['p-host'] },
    { id: 'item-6', name: 'Margarita de Mezcal Jamaica', price: 165.00, category: 'Bebidas' },
    { id: 'item-7', name: 'Agua de Horchata Grande', price: 65.00, category: 'Bebidas', claimedBy: ['p-diego'] },
    { id: 'item-8', name: 'Flan Napolitano Casero', price: 90.00, category: 'Postres', claimedBy: [] }
  ].map((it) => ({ ...it, claimedBy: it.claimedBy || (it.id === 'item-6' ? ['p-sofia'] : []) })));

  // Participants (Host + Web Guests)
  const [participants, setParticipants] = useState([
    {
      id: 'p-host',
      name: 'Host (Android)',
      isHost: true,
      color: AVATAR_COLORS[0],
      tipMode: 'preset',
      tipPercent: 15,
      customTip: '15'
    },
    {
      id: 'p-sofia',
      name: 'Sofía (Web)',
      isHost: false,
      color: AVATAR_COLORS[1],
      tipMode: 'preset',
      tipPercent: 15,
      customTip: '15'
    },
    {
      id: 'p-diego',
      name: 'Diego (Web)',
      isHost: false,
      color: AVATAR_COLORS[2],
      tipMode: 'custom',
      tipPercent: 12.5,
      customTip: '12.5'
    }
  ]);

  // Active Guest in the Web View
  const [activeGuestId, setActiveGuestId] = useState('p-sofia');
  const [newGuestName, setNewGuestName] = useState('');
  const [isJoiningAsNewGuest, setIsJoiningAsNewGuest] = useState(false);

  // Camera / OCR Simulation State
  const [isScanning, setIsScanning] = useState(false);
  const [scanStepText, setScanStepText] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Alimentos');

  // Share Link & Notification Toasts
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSurveyKey, setCopiedSurveyKey] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const shareUrl = `https://checkmate.app/m/${ticketInfo.folio.toLowerCase()}?lang=${lang}`;

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Calculations
  const unclaimedItems = useMemo(() => {
    return items.filter((item) => item.claimedBy.length === 0);
  }, [items]);

  const allItemsClaimed = items.length > 0 && unclaimedItems.length === 0;

  const subtotalGeneral = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price, 0);
  }, [items]);

  // Per-participant breakdown using Hamilton's Exact Cent Allocation
  const participantBreakdowns = useMemo(() => {
    const map = {};
    participants.forEach((p) => {
      let personSubtotalCents = 0;
      const myItems = [];

      items.forEach((item) => {
        if (item.claimedBy.includes(p.id)) {
          const exactShares = allocateExactCents(item.price, item.claimedBy);
          const sharePrice = exactShares[p.id] || 0;
          personSubtotalCents += Math.round(sharePrice * 100);
          myItems.push({
            ...item,
            splitCount: item.claimedBy.length,
            sharePrice
          });
        }
      });

      const personSubtotal = personSubtotalCents / 100;
      const effectiveTipPercent =
        p.tipMode === 'custom'
          ? Math.max(0, parseFloat(p.customTip) || 0)
          : p.tipPercent;
      const tipAmountCents = Math.round(personSubtotalCents * (effectiveTipPercent / 100));
      const tipAmount = tipAmountCents / 100;
      const total = (personSubtotalCents + tipAmountCents) / 100;

      map[p.id] = {
        subtotal: personSubtotal,
        tipPercent: effectiveTipPercent,
        tipAmount,
        total,
        items: myItems
      };
    });
    return map;
  }, [items, participants]);

  const totalClaimedWithTips = useMemo(() => {
    return Object.values(participantBreakdowns).reduce(
      (sum, b) => sum + b.total,
      0
    );
  }, [participantBreakdowns]);

  const totalTipsCollected = useMemo(() => {
    return Object.values(participantBreakdowns).reduce(
      (sum, b) => sum + b.tipAmount,
      0
    );
  }, [participantBreakdowns]);

  // Toggle item claim for a given participant
  const toggleClaimItem = (itemId, personId) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        const alreadyClaimed = item.claimedBy.includes(personId);
        const updatedClaims = alreadyClaimed
          ? item.claimedBy.filter((id) => id !== personId)
          : [...item.claimedBy, personId];
        return { ...item, claimedBy: updatedClaims };
      })
    );
  };

  // Claim all remaining unclaimed items for active guest or host
  const claimAllUnclaimed = (personId) => {
    if (unclaimedItems.length === 0) return;
    setItems((prev) =>
      prev.map((item) => {
        if (item.claimedBy.length === 0) {
          return { ...item, claimedBy: [personId] };
        }
        return item;
      })
    );
    const person = participants.find((p) => p.id === personId);
    triggerToast(
      `CheckMate: ${person ? person.name : 'Guest'} → 100% claimed!`
    );
  };

  // Simulate Camera OCR Ticket Scanning
  const handleSimulateCameraScan = (presetKey) => {
    setIsScanning(true);
    setScanStepText('CameraX + ML Kit Spatial OCR (EN/ES/FR/DE/PT)...');
    setTimeout(() => {
      const preset = PRESET_TICKETS[presetKey];
      setTicketInfo({
        restaurant: preset.restaurant,
        address: preset.address,
        date: preset.date,
        folio: preset.folio
      });
      setItems(
        preset.items.map((it, idx) => ({
          ...it,
          claimedBy: idx === 0 ? ['p-host'] : []
        }))
      );
      setIsScanning(false);
      setScanStepText('');
      triggerToast(`CheckMate OCR: "${preset.restaurant}" OK.`);
    }, 1100);
  };

  // Add manual item to ticket
  const handleAddItem = (e) => {
    e.preventDefault();
    const parsedPrice = parseFloat(newItemPrice);
    if (!newItemName.trim() || isNaN(parsedPrice) || parsedPrice <= 0) return;

    const newItem = {
      id: `item-${Date.now()}`,
      name: newItemName.trim(),
      price: parsedPrice,
      category: newItemCategory,
      claimedBy: []
    };

    setItems((prev) => [...prev, newItem]);
    setNewItemName('');
    setNewItemPrice('');
    setShowAddModal(false);
    triggerToast(`+ "${newItem.name}" ($${newItem.price.toFixed(2)})`);
  };

  // Remove item from ticket
  const handleDeleteItem = (itemId) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  // Add a new Guest via Web Interface
  const handleJoinAsGuest = (e) => {
    e.preventDefault();
    const trimmed = newGuestName.trim();
    if (!trimmed) return;
    const newId = `p-guest-${Date.now()}`;
    const color = AVATAR_COLORS[participants.length % AVATAR_COLORS.length];
    const newParticipant = {
      id: newId,
      name: trimmed,
      isHost: false,
      color,
      tipMode: 'preset',
      tipPercent: 15,
      customTip: '15'
    };
    setParticipants((prev) => [...prev, newParticipant]);
    setActiveGuestId(newId);
    setNewGuestName('');
    setIsJoiningAsNewGuest(false);
    triggerToast(`CheckMate Web: ${trimmed} joined!`);
  };

  // Update tip settings for a participant
  const updateParticipantTipPreset = (personId, percent) => {
    setParticipants((prev) =>
      prev.map((p) =>
        p.id === personId
          ? { ...p, tipMode: 'preset', tipPercent: percent, customTip: String(percent) }
          : p
      )
    );
  };

  const updateParticipantCustomTip = (personId, rawValue) => {
    setParticipants((prev) =>
      prev.map((p) =>
        p.id === personId
          ? {
              ...p,
              tipMode: 'custom',
              customTip: rawValue,
              tipPercent: Math.max(0, parseFloat(rawValue) || 0)
            }
          : p
      )
    );
  };

  // Copy Link handler
  const handleCopyLink = () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl);
      }
    } catch (err) {
      // Fallback for sandboxed iframe
    }
    setCopiedLink(true);
    triggerToast(`${t.copied}: ${shareUrl}`);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyText = (key, text) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      }
    } catch (err) {
      // Fallback
    }
    setCopiedSurveyKey(key);
    triggerToast('Copied to clipboard!');
    setTimeout(() => setCopiedSurveyKey(null), 2500);
  };

  const activeGuest =
    participants.find((p) => p.id === activeGuestId) || participants[0];
  const activeGuestBreakdown = participantBreakdowns[activeGuest.id] || {
    subtotal: 0,
    tipPercent: 15,
    tipAmount: 0,
    total: 0,
    items: []
  };

  const getInitials = (name) => {
    return name
      .replace(/\(.*\)/, '')
      .trim()
      .split(' ')
      .map((w) => w[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Global Navigation, Brand & Language Switcher */}
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-900/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-900/40">
              <Receipt className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg tracking-tight text-white">
                  CheckMate
                </h1>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  {t.badgeSync}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {t.subtitle}
              </p>
            </div>
          </div>

          {/* Language Selector (EN, ES, FR, DE, PT) + View Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <div
              className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800"
              role="group"
              aria-label="Language selector"
            >
              <Languages className="w-3.5 h-3.5 text-emerald-400 mx-1.5" />
              {Object.entries(I18N).map(([code, meta]) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold uppercase transition cursor-pointer ${
                    lang === code
                      ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title={meta.label}
                >
                  {meta.flag} {code}
                </button>
              ))}
            </div>

            <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700/70">
              <button
                type="button"
                onClick={() => setViewMode('split')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                  viewMode === 'split'
                    ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Split className="w-3.5 h-3.5" />
                <span>{t.tabSplit}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('android')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                  viewMode === 'android'
                    ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>{t.tabAndroid}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('web')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                  viewMode === 'web'
                    ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{t.tabWeb}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('architecture')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                  viewMode === 'architecture'
                    ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Github className="w-3.5 h-3.5" />
                <span>{t.tabArch}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 max-w-md bg-slate-900 border border-emerald-500/50 text-emerald-200 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Real-time Status Bar (Shows live claim progress across both views) */}
      <div className="bg-slate-900/60 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            {allItemsClaimed ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {t.statusAllClaimed}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                {t.statusMissingPrefix} {unclaimedItems.length} {t.statusMissingSuffix}
              </span>
            )}
            <span className="text-slate-400 hidden sm:inline">
              • {items.length - unclaimedItems.length} / {items.length} {t.statusAssignedOf}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {!allItemsClaimed && (
              <button
                type="button"
                onClick={() => claimAllUnclaimed(activeGuest.id)}
                className="text-xs font-semibold text-amber-300 hover:text-amber-200 underline underline-offset-4 cursor-pointer"
              >
                {t.claimRemainingBtn} {activeGuest.name.split(' ')[0]} {t.claimRemainingSuffix}
              </button>
            )}
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
              <span className="text-slate-400">{t.ticketSubtotal}</span>
              <span className="font-bold text-white">${subtotalGeneral.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {viewMode === 'architecture' ? (
          /* GitHub Repository, Engineering Trade-offs & Application Kit View */
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    <Award className="w-4 h-4" />
                    Optimizado para "Software Engineer: build your own project with AI ($60 - $100/hr)"
                  </span>
                  <h2 className="text-2xl font-bold text-white mt-1">
                    Repositorio Monorepo Sustancial: <code className="text-emerald-300">checkmate</code>
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Incluye soporte nativo para 5 idiomas (<strong>EN, ES, FR, DE, PT</strong>) tanto en los recursos Android (<code>res/values-*</code>) y en el motor OCR multilingüe (<code>ReceiptLineParser</code>) como en el cliente web para invitados.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setViewMode('split')}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs flex items-center gap-2 transition cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>{t.tabSplit}</span>
                </button>
              </div>

              {/* 3 Architecture Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>1. Exactitud Financiera (Hamilton Method)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Al dividir el <strong>Queso Fundido ($160.00)</strong> entre 3 personas, un <code>float</code> ingenuo da <code>$53.33 × 3 = $159.99</code> (se pierde $0.01). Nuestro <code>SplitEngine</code> opera en centavos enteros (<code>Long</code>) con el <strong>Método de Hamilton</strong>: asigna <code>$53.34</code>, <code>$53.33</code> y <code>$53.33</code> de forma determinista.
                  </p>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm mb-2">
                    <Languages className="w-4 h-4" />
                    <span>2. OCR y UI en 5 Idiomas (EN, ES, FR, DE, PT)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    El parser espacial <code>ReceiptLineParser</code> filtra automáticamente palabras clave de impuestos, subtotales y propinas en los 5 idiomas (<em>Subtotal, Somme, Zwischensumme, MwSt, TVA, Gorjeta, Trinkgeld, Pourboire</em>) y normaliza separadores decimales (<code>.</code> y <code>,</code>).
                  </p>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2">
                    <Terminal className="w-4 h-4" />
                    <span>3. Concurrencia Atómica + Suite JUnit/Vitest</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Transacciones atómicas con control optimista de versiones en Firestore para evitar condiciones de carrera cuando múltiples invitados reclaman platillos simultáneamente desde la web.
                  </p>
                </div>
              </div>

              {/* Copy-Paste Survey Answers for the Application */}
              <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <FileCode2 className="w-4 h-4 text-emerald-400" />
                      Respuestas listas para el "Short Project Submission Survey" (CheckMate)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Actualizadas con el nombre CheckMate y la arquitectura multilingüe (EN, ES, FR, DE, PT).
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      key: 'desc',
                      title: 'Project Description / What are you building?',
                      content:
                        'CheckMate is a cross-platform, multilingual (EN, ES, FR, DE, PT) real-time restaurant bill-splitting system consisting of a native Android host application (Kotlin, Jetpack Compose, CameraX, ML Kit OCR) and a zero-install React/Vite guest web client synchronized via Cloud Firestore. A single host scans a physical paper receipt with their phone camera to extract line items and prices on-device, then shares a short session URL/QR code. Guests join from any mobile browser in their preferred language without creating an account, claim individual or shared items concurrently, configure preset or custom tip percentages, and trigger real-time host notifications when orphan items remain or when 100% of the receipt is allocated.'
                    },
                    {
                      key: 'tradeoffs',
                      title: 'Engineering Trade-offs & Technical Complexity (Crucial for $60-$100/hr screening)',
                      content:
                        '1) Penny-Exact Financial Allocation (Hamilton Largest Remainder Method): Naive IEEE-754 floating-point division of shared items (e.g., $160.00 / 3 ways) loses cents ($53.33 * 3 = $159.99). Both our Kotlin and JavaScript engines operate strictly in integer cents (Long) and distribute remainder cents deterministically across sorted participant IDs so sum(shares) === itemPriceCents is an enforced invariant.\n2) Multilingual Spatial Bounding-Box Receipt Parsing (EN/ES/FR/DE/PT): Standard OCR reads receipts top-to-bottom but skews multi-column item names and prices. Our ReceiptLineParser groups ML Kit TextLines by Y-axis centroid tolerance, normalizes European/Latin decimal separators, and filters localized summary/tax tokens (IVA, MwSt, TVA, Zwischensumme, Pourboire, Gorjeta).\n3) Optimistic Concurrency Control: Concurrent guest claims use versioned Firestore transactions rather than full-array overwrites.'
                    },
                    {
                      key: 'next',
                      title: 'What will you build next with the AI coding assistant in your terminal?',
                      content:
                        'During upcoming terminal coding sessions, I am implementing: (1) perspective-warped receipt line reconstruction using 2D bounding-box homography for tilted camera captures, (2) multi-currency & localized tax/VAT (IVA/TVA/MwSt) inclusive vs. exclusive pre-tip calculation engines, (3) offline-first IndexedDB/Room mutation queues with automatic reconnection replay, and (4) deep-link payment settlement hooks.'
                    }
                  ].map((block) => (
                    <div
                      key={block.key}
                      className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-emerald-300">
                          {block.title}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyText(block.key, block.content)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold transition cursor-pointer"
                        >
                          {copiedSurveyKey === block.key ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy English Answer</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-slate-300 whitespace-pre-line font-mono leading-relaxed">
                        {block.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Interactive Simulator Grid (Split or Single View) */
          <div
            className={`grid gap-6 ${
              viewMode === 'split'
                ? 'grid-cols-1 lg:grid-cols-12'
                : 'grid-cols-1 max-w-2xl mx-auto'
            }`}
          >
            {/* LEFT PANEL: ANDROID HOST APP */}
            {(viewMode === 'split' || viewMode === 'android') && (
              <section
                className={`${
                  viewMode === 'split' ? 'lg:col-span-6' : 'w-full'
                } flex flex-col`}
              >
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4" />
                      {t.hostSectionTitle}
                    </h2>
                  </div>
                  <span className="text-xs text-slate-400">
                    Kotlin / Jetpack Compose
                  </span>
                </div>

                {/* Android Phone Frame */}
                <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
                  {/* Android Status Bar */}
                  <div className="bg-slate-950 px-5 py-2 flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/80">
                    <span className="font-semibold text-slate-300">CheckMate • {t.flag} {lang.toUpperCase()}</span>
                    <div className="flex items-center gap-2">
                      <span>5G</span>
                      <span>100% 🔋</span>
                    </div>
                  </div>

                  {/* App Header & Camera OCR Action */}
                  <div className="p-5 bg-gradient-to-b from-slate-900 to-slate-900/50 border-b border-slate-800">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                          {t.activeTableFolio} #{ticketInfo.folio}
                        </span>
                        <h3 className="text-lg font-bold text-white mt-0.5">
                          {ticketInfo.restaurant}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {ticketInfo.address} • {ticketInfo.date}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowQRModal(true)}
                        className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
                        title="QR Code"
                      >
                        <QrCode className="w-5 h-5 text-emerald-400" />
                      </button>
                    </div>

                    {/* Camera Scan / Preset Switcher Bar */}
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        disabled={isScanning}
                        onClick={() => handleSimulateCameraScan('taqueria')}
                        className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs shadow-lg shadow-emerald-950/50 transition cursor-pointer disabled:opacity-50"
                      >
                        <Camera className="w-4 h-4 stroke-[2.2]" />
                        <span>{t.scanTaqueria}</span>
                      </button>

                      <button
                        type="button"
                        disabled={isScanning}
                        onClick={() => handleSimulateCameraScan('italiano')}
                        className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-medium text-xs border border-slate-700 transition cursor-pointer disabled:opacity-50"
                      >
                        <Upload className="w-4 h-4 text-emerald-400" />
                        <span>{t.scanItaliano}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowAddModal(true)}
                        className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 font-semibold text-xs border border-slate-700 flex items-center gap-1 transition cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{t.addItemShort}</span>
                      </button>
                    </div>

                    {/* OCR Scanning Progress Overlay */}
                    {isScanning && (
                      <div className="mt-3 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center gap-3">
                        <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin shrink-0" />
                        <span className="text-xs text-emerald-200 font-medium">
                          {scanStepText}
                        </span>
                      </div>
                    )}

                    {/* Share Link Box */}
                    <div className="mt-4 p-3 rounded-xl bg-slate-950/90 border border-slate-800 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                          {t.shareLinkLabel}
                        </div>
                        <div className="text-xs font-mono text-emerald-300 truncate">
                          {shareUrl}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition cursor-pointer"
                      >
                        {copiedLink ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{t.copied}</span>
                          </>
                        ) : (
                          <>
                            <Share2 className="w-3.5 h-3.5" />
                            <span>{t.shareLinkBtn}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* HOST REAL-TIME NOTIFICATION CENTER (CRITICAL FEATURE) */}
                  <div className="px-5 pt-4">
                    {allItemsClaimed ? (
                      <div className="p-4 rounded-2xl bg-emerald-500/15 border-2 border-emerald-500/50 flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-emerald-500 text-slate-950 shrink-0 mt-0.5">
                          <Bell className="w-5 h-5 stroke-[2.5]" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-emerald-300">
                              {t.allClaimedTitle}
                            </h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500 text-slate-950">
                              {t.allClaimedBadge}
                            </span>
                          </div>
                          <p className="text-xs text-emerald-100/90 mt-1">
                            {t.allClaimedDesc}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-amber-500/15 border-2 border-amber-500/40 flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-amber-500 text-slate-950 shrink-0 mt-0.5">
                          <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-sm font-bold text-amber-300">
                              {t.missingOwnerTitlePrefix} {unclaimedItems.length} {t.missingOwnerTitleSuffix}
                            </h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/30 text-amber-200">
                              {t.pendingBadge}
                            </span>
                          </div>
                          <p className="text-xs text-amber-100/80 mt-1">
                            {t.nobodyClaimedYet}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {unclaimedItems.map((u) => (
                              <span
                                key={u.id}
                                className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-amber-950/90 text-amber-200 border border-amber-500/30"
                              >
                                <span>{u.name}</span>
                                <span className="font-bold text-amber-400">
                                  (${u.price.toFixed(0)})
                                </span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Itemized Ticket List on Android Host */}
                  <div className="p-5 space-y-2.5 flex-1">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span className="font-semibold uppercase tracking-wider">
                        {t.ticketItemsHeader} ({items.length})
                      </span>
                      <span>{t.tapToClaimHost}</span>
                    </div>

                    {items.map((item) => {
                      const isUnclaimed = item.claimedBy.length === 0;
                      const hostClaimed = item.claimedBy.includes('p-host');
                      const exactShares = allocateExactCents(item.price, item.claimedBy);

                      return (
                        <div
                          key={item.id}
                          className={`p-3 rounded-xl border transition ${
                            isUnclaimed
                              ? 'bg-amber-950/20 border-amber-500/40'
                              : 'bg-slate-950/70 border-slate-800'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-semibold text-white">
                                  {item.name}
                                </span>
                                {isUnclaimed && (
                                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                    {t.unclaimedBadge}
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                                <span>{t.categories[item.category] || item.category}</span>
                                {item.claimedBy.length > 1 && (
                                  <span className="text-emerald-400 font-medium">
                                    • {t.splitBetween} {item.claimedBy.length} (Hamilton)
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-white">
                                ${item.price.toFixed(2)}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleDeleteItem(item.id)}
                                className="p-1 text-slate-500 hover:text-rose-400 transition cursor-pointer"
                                title="Delete item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Claim Avatars & Host Quick Toggle */}
                          <div className="mt-2.5 pt-2 border-t border-slate-800/70 flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {item.claimedBy.length === 0 ? (
                                <span className="text-[11px] text-amber-400/90 italic">
                                  {t.waitingSelection}
                                </span>
                              ) : (
                                item.claimedBy.map((pid) => {
                                  const person = participants.find(
                                    (p) => p.id === pid
                                  );
                                  if (!person) return null;
                                  const exactAmount = exactShares[pid] || 0;
                                  return (
                                    <span
                                      key={pid}
                                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${person.color}`}
                                    >
                                      <span>{getInitials(person.name)}</span>
                                      <span>{person.name.split(' ')[0]}</span>
                                      <span className="opacity-90">
                                        (${exactAmount.toFixed(2)})
                                      </span>
                                    </span>
                                  );
                                })
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => toggleClaimItem(item.id, 'p-host')}
                              className={`text-xs px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                                hostClaimed
                                  ? 'bg-emerald-500 text-slate-950 font-semibold'
                                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                              }`}
                            >
                              {hostClaimed ? t.mineHost : t.iAteThis}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Host Tip Selector & Summary Footer */}
                  <div className="p-5 bg-slate-950 border-t border-slate-800 space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-slate-300 font-semibold">
                          {t.hostTipLabel}
                        </span>
                        <span className="text-emerald-400 font-bold">
                          {participantBreakdowns['p-host']?.tipPercent || 0}% ($
                          {(participantBreakdowns['p-host']?.tipAmount || 0).toFixed(2)})
                        </span>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5">
                        {[10, 15, 18, 20].map((pct) => {
                          const hostP = participants.find((p) => p.id === 'p-host');
                          const isSelected =
                            hostP?.tipMode === 'preset' && hostP?.tipPercent === pct;
                          return (
                            <button
                              key={pct}
                              type="button"
                              onClick={() => updateParticipantTipPreset('p-host', pct)}
                              className={`py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                                isSelected
                                  ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                              }`}
                            >
                              {pct}%
                            </button>
                          );
                        })}
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.5"
                            aria-label="Host custom tip percentage"
                            value={
                              participants.find((p) => p.id === 'p-host')?.customTip || ''
                            }
                            onChange={(e) =>
                              updateParticipantCustomTip('p-host', e.target.value)
                            }
                            placeholder={t.otherTipPlaceholder}
                            className={`w-full py-1.5 px-2 rounded-lg text-xs font-semibold border bg-slate-900 text-center focus:outline-none ${
                              participants.find((p) => p.id === 'p-host')?.tipMode ===
                              'custom'
                                ? 'border-emerald-400 text-emerald-300'
                                : 'border-slate-800 text-slate-300'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Table Summary Per Person */}
                    <div className="pt-3 border-t border-slate-800/80">
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        {t.tableSummaryHeader}
                      </div>
                      <div className="space-y-1.5">
                        {participants.map((p) => {
                          const b = participantBreakdowns[p.id];
                          return (
                            <div
                              key={p.id}
                              className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-slate-900/90 border border-slate-800/70"
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${p.color}`}
                                >
                                  {getInitials(p.name)}
                                </span>
                                <span className="font-medium text-slate-200">
                                  {p.name}
                                </span>
                                <span className="text-[11px] text-slate-400">
                                  ({b.items.length} {t.itemsWord} • {t.tipWord} {b.tipPercent}%)
                                </span>
                              </div>
                              <span className="font-bold text-emerald-300">
                                ${b.total.toFixed(2)}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-sm">
                        <div>
                          <span className="text-slate-400 text-xs block">
                            {t.totalCollectedWithTips}
                          </span>
                          <span className="font-bold text-white text-base">
                            ${totalClaimedWithTips.toFixed(2)}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-400 text-xs block">
                            {t.totalTipsLabel}
                          </span>
                          <span className="font-semibold text-emerald-400">
                            +${totalTipsCollected.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* RIGHT PANEL: WEB GUEST INTERFACE (NO APP INSTALL REQUIRED) */}
            {(viewMode === 'split' || viewMode === 'web') && (
              <section
                className={`${
                  viewMode === 'split' ? 'lg:col-span-6' : 'w-full'
                } flex flex-col`}
              >
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
                    <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                      <Globe className="w-4 h-4" />
                      {t.webSectionTitle}
                    </h2>
                  </div>
                  <span className="text-xs text-slate-400">
                    {t.noInstallNeeded}
                  </span>
                </div>

                {/* Mobile Web Browser Frame */}
                <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
                  {/* Browser URL Bar */}
                  <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                    </div>
                    <div className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1 text-xs font-mono text-slate-300 flex items-center justify-between">
                      <span className="truncate">🔒 {shareUrl}</span>
                      <span className="text-[10px] text-indigo-400 font-sans font-semibold ml-2">
                        {t.instantWebBadge}
                      </span>
                    </div>
                  </div>

                  {/* Guest Identity Selector / Enter as Guest Banner */}
                  <div className="p-5 bg-gradient-to-b from-indigo-950/30 to-slate-900 border-b border-slate-800">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
                          {t.guestAccessBadge} • {t.flag} {t.label}
                        </span>
                        <h3 className="text-base font-bold text-white">
                          {t.whoAreYouTitle}
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsJoiningAsNewGuest(!isJoiningAsNewGuest)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-semibold shadow-sm transition cursor-pointer"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>{t.joinNewGuestBtn}</span>
                      </button>
                    </div>

                    {/* New Guest Name Form */}
                    {isJoiningAsNewGuest && (
                      <form
                        onSubmit={handleJoinAsGuest}
                        className="mb-3 p-3 rounded-xl bg-slate-950 border border-indigo-500/40 flex items-center gap-2"
                      >
                        <input
                          type="text"
                          value={newGuestName}
                          onChange={(e) => setNewGuestName(e.target.value)}
                          placeholder={t.guestNamePlaceholder}
                          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                        />
                        <button
                          type="submit"
                          className="px-3.5 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-xs transition cursor-pointer"
                        >
                          {t.joinBillBtn}
                        </button>
                      </form>
                    )}

                    {/* Switch Active Guest Pill Bar */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {participants.map((p) => {
                        const isCurrent = p.id === activeGuest.id;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setActiveGuestId(p.id)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition cursor-pointer ${
                              isCurrent
                                ? 'bg-indigo-500/20 border-indigo-400 text-white shadow-sm'
                                : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            <span
                              className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${p.color}`}
                            >
                              {getInitials(p.name)}
                            </span>
                            <span>{p.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Guest Item Selection List */}
                  <div className="p-5 space-y-2.5 flex-1">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-300 font-semibold">
                        {t.selectConsumedPrefix}{' '}
                        <strong className="text-indigo-300">
                          {activeGuest.name}
                        </strong>
                        :
                      </span>
                      <span className="text-slate-400">
                        {t.sharedSplitsCentNote}
                      </span>
                    </div>

                    {items.map((item) => {
                      const isSelectedByMe = item.claimedBy.includes(
                        activeGuest.id
                      );
                      const splitCount = item.claimedBy.length;
                      const exactShares = allocateExactCents(item.price, item.claimedBy);
                      const myShare = isSelectedByMe
                        ? exactShares[activeGuest.id] || 0
                        : item.price;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleClaimItem(item.id, activeGuest.id)}
                          className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between gap-3 cursor-pointer ${
                            isSelectedByMe
                              ? 'bg-indigo-500/15 border-indigo-400/70 shadow-sm'
                              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-start gap-3 min-w-0">
                            <div
                              className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center border transition shrink-0 ${
                                isSelectedByMe
                                  ? 'bg-indigo-500 border-indigo-400 text-white'
                                  : 'border-slate-600 bg-slate-900'
                              }`}
                            >
                              {isSelectedByMe && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-white truncate">
                                {item.name}
                              </div>
                              <div className="flex items-center gap-2 mt-1 flex-wrap">
                                <span className="text-[11px] text-slate-400">
                                  {t.ticketPriceLabel} ${item.price.toFixed(2)}
                                </span>
                                {splitCount > 1 && (
                                  <span className="text-[11px] font-semibold text-indigo-300 bg-indigo-500/20 px-1.5 py-0.5 rounded">
                                    {t.sharedBetweenBadge} {splitCount}
                                  </span>
                                )}
                                {splitCount === 0 && (
                                  <span className="text-[10px] font-semibold text-amber-300 bg-amber-500/15 px-1.5 py-0.5 rounded">
                                    {t.nobodyClaimedBadge}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <div
                              className={`text-sm font-bold ${
                                isSelectedByMe ? 'text-indigo-300' : 'text-slate-300'
                              }`}
                            >
                              ${myShare.toFixed(2)}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {isSelectedByMe ? t.yourExactShare : t.itemTotal}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Guest Tip Selector (Presets + Custom Percentage) & Personal Receipt */}
                  <div className="p-5 bg-slate-950 border-t border-slate-800 space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                          <Percent className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{t.chooseTipPercent}</span>
                        </span>
                        <span className="text-indigo-300 font-bold">
                          {activeGuestBreakdown.tipPercent}% ($
                          {activeGuestBreakdown.tipAmount.toFixed(2)})
                        </span>
                      </div>

                      {/* Preset Tip Buttons */}
                      <div className="grid grid-cols-5 gap-2">
                        {[0, 10, 15, 18, 20].map((pct) => {
                          const isSelected =
                            activeGuest.tipMode === 'preset' &&
                            activeGuest.tipPercent === pct;
                          return (
                            <button
                              key={pct}
                              type="button"
                              onClick={() =>
                                updateParticipantTipPreset(activeGuest.id, pct)
                              }
                              className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                                isSelected
                                  ? 'bg-indigo-500 text-white border-indigo-400 shadow-sm'
                                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                              }`}
                            >
                              {pct}%
                            </button>
                          );
                        })}
                      </div>

                      {/* Custom Tip Input Row */}
                      <div className="mt-2.5 flex items-center justify-between gap-3 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-300 font-medium">
                          {t.customTipQuestion}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.5"
                            aria-label="Guest custom tip percentage"
                            value={activeGuest.customTip}
                            onChange={(e) =>
                              updateParticipantCustomTip(
                                activeGuest.id,
                                e.target.value
                              )
                            }
                            className={`w-20 px-2.5 py-1 rounded-lg text-xs font-bold text-right bg-slate-950 border focus:outline-none ${
                              activeGuest.tipMode === 'custom'
                                ? 'border-indigo-400 text-indigo-300'
                                : 'border-slate-700 text-slate-200'
                            }`}
                          />
                          <span className="text-xs font-bold text-slate-400">%</span>
                        </div>
                      </div>
                    </div>

                    {/* Personal Guest Total Card */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/70 to-slate-900 border border-indigo-500/40 space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-300">
                        <span>{t.yourConsumption} ({activeGuestBreakdown.items.length} {t.itemsWord}):</span>
                        <span className="font-semibold">
                          ${activeGuestBreakdown.subtotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-300">
                        <span>
                          {t.yourTip} ({activeGuestBreakdown.tipPercent}%):
                        </span>
                        <span className="font-semibold text-indigo-300">
                          +${activeGuestBreakdown.tipAmount.toFixed(2)}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-indigo-500/30 flex items-center justify-between">
                        <div>
                          <span className="text-xs uppercase tracking-wider font-bold text-indigo-300 block">
                            {t.yourExactTotalToPay}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {t.calculatedFor} {activeGuest.name}
                          </span>
                        </div>
                        <span className="text-2xl font-extrabold text-white">
                          ${activeGuestBreakdown.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      {/* Modal: Add Manual Item to Ticket */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-5 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-1">
              {t.modalAddTitle}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              {t.modalAddDesc}
            </p>
            <form onSubmit={handleAddItem} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {t.dishNameLabel}
                </label>
                <input
                  type="text"
                  required
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder={t.dishNamePlaceholder}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t.priceLabel}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    required
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    placeholder="180.00"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t.categoryLabel}
                  </label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="Alimentos">{t.categories.Alimentos}</option>
                    <option value="Entradas">{t.categories.Entradas}</option>
                    <option value="Bebidas">{t.categories.Bebidas}</option>
                    <option value="Postres">{t.categories.Postres}</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 cursor-pointer"
                >
                  {t.cancelBtn}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 cursor-pointer"
                >
                  {t.confirmAddBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: QR Code & Link Share */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">
              {t.qrModalTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {t.qrModalDesc}
            </p>
            <div className="my-4 p-4 bg-white rounded-2xl inline-block">
              <svg className="w-36 h-36 text-slate-950" viewBox="0 0 100 100">
                <rect x="5" y="5" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="13" y="13" width="12" height="12" fill="currentColor" />
                <rect x="67" y="5" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="75" y="13" width="12" height="12" fill="currentColor" />
                <rect x="5" y="67" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="13" y="75" width="12" height="12" fill="currentColor" />
                <rect x="42" y="12" width="8" height="8" fill="currentColor" />
                <rect x="42" y="28" width="16" height="8" fill="currentColor" />
                <rect x="12" y="44" width="18" height="8" fill="currentColor" />
                <rect x="38" y="44" width="24" height="16" fill="currentColor" />
                <rect x="70" y="44" width="20" height="8" fill="currentColor" />
                <rect x="44" y="68" width="12" height="24" fill="currentColor" />
                <rect x="66" y="66" width="24" height="12" fill="currentColor" />
                <rect x="76" y="84" width="14" height="10" fill="currentColor" />
              </svg>
            </div>
            <div className="text-xs font-mono text-emerald-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800 mb-4 truncate">
              {shareUrl}
            </div>
            <button
              type="button"
              onClick={() => setShowQRModal(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 cursor-pointer"
            >
              {t.closeBtn}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}