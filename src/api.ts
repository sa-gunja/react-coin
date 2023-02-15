const Base_URL = "https://api.coinpaprika.com/v1";

export function fetchCoin() {
  return fetch(`${Base_URL}/coins`).then((res) => res.json());
}

export function fetchInfo(coinId: string) {
  return fetch(`${Base_URL}/coins/${coinId}`).then((res) => res.json());
}

export function fetchTickers(coinId: string) {
  return fetch(`${Base_URL}/tickers/${coinId}`).then((res) => res.json());
}

export function fetchCoinHistory(coinId: string) {
  // const endDate = Math.floor(Date.now() / 1000);
  // const startDate = endDate - 60*60*24*7;

  return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`).then((res) => res.json());
}
