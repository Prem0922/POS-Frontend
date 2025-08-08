// Central API utility for POS to interact with CRM backend
// Updated to use CRM backend on Render
const BASE_URL = "https://crm-n577.onrender.com";
const API_KEY = "mysecretkey";

function withApiKeyHeaders(headers = {}) {
  return { ...headers, "x-api-key": API_KEY };
}

export async function issueCard(card) {
  const res = await fetch(`${BASE_URL}/cards/issue`, {
    method: "POST",
    headers: withApiKeyHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(card),
  });
  return res.json();
}

export async function addProduct(cardId, product, value = 0) {
  const res = await fetch(`${BASE_URL}/cards/${cardId}/products`, {
    method: "POST",
    headers: withApiKeyHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ product, value }),
  });
  return res.json();
}

export async function reloadCard(cardId, amount) {
  const res = await fetch(`${BASE_URL}/cards/${cardId}/reload`, {
    method: "POST",
    headers: withApiKeyHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ amount }),
  });
  return res.json();
}

export async function getCardBalance(cardId) {
  const res = await fetch(`${BASE_URL}/cards/${cardId}/balance`, {
    headers: withApiKeyHeaders(),
  });
  return res.json();
}

export async function simulatePayment(cardId, amount, method) {
  const res = await fetch(`${BASE_URL}/payment/simulate`, {
    method: "POST",
    headers: withApiKeyHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ card_id: cardId, amount, method }),
  });
  return res.json();
}

export async function getCustomer(customerId) {
  const res = await fetch(`${BASE_URL}/customers/${customerId}`, {
    headers: withApiKeyHeaders(),
  });
  return res.json();
}

export async function getCardTransactions(cardId) {
  const res = await fetch(`${BASE_URL}/cards/${cardId}/transactions`, {
    headers: withApiKeyHeaders(),
  });
  return res.json();
}

export async function getReportsSummary() {
  const res = await fetch(`${BASE_URL}/reports/summary`, {
    headers: withApiKeyHeaders(),
  });
  return res.json();
}

export async function getAllCards() {
  const res = await fetch(`${BASE_URL}/cards/`, {
    headers: withApiKeyHeaders(),
  });
  return res.json();
}

export async function getAllCustomers() {
  const res = await fetch(`${BASE_URL}/customers/`, {
    headers: withApiKeyHeaders(),
  });
  return res.json();
}

export async function getRandomCard() {
  try {
    // Use the working /cards/ endpoint instead of /cards/random
    const res = await fetch(`${BASE_URL}/cards/`, {
      headers: withApiKeyHeaders(),
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const cards = await res.json();
    
    if (!cards || cards.length === 0) {
      throw new Error('No cards found in database');
    }
    
    // Select a random card from the array
    const randomIndex = Math.floor(Math.random() * cards.length);
    const randomCard = cards[randomIndex];
    
    return {
      id: randomCard.id,
      card_number: randomCard.id,
      balance: randomCard.balance,
      status: randomCard.status,
      type: randomCard.type
    };
  } catch (error) {
    console.error('getRandomCard error:', error);
    throw error;
  }
}

export async function getAllCardTypes() {
  return [
    'Account Based Card',
    'Bank Card',
    'Closed Loop Card',
  ];
}

export async function simulateCardTap(cardId, location, deviceId, transitMode, direction) {
  const res = await fetch(`${BASE_URL}/simulate/cardTap`, {
    method: "POST",
    headers: withApiKeyHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({
      card_id: cardId,
      location: location,
      device_id: deviceId,
      transit_mode: transitMode,
      direction: direction
    }),
  });
  return res.json();
} 