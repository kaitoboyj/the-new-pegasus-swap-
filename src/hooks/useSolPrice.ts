import { useState, useEffect } from 'react';

const SOL_MINT = 'So11111111111111111111111111111111111111112';

export function useSolPrice() {
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(`https://lite-api.jup.ag/price/v3?ids=${SOL_MINT}`);
        const data = await response.json();
        if (data[SOL_MINT] && data[SOL_MINT].usdPrice) {
          setPrice(data[SOL_MINT].usdPrice);
        }
      } catch (error) {
        console.error('Error fetching SOL price:', error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return price;
}
