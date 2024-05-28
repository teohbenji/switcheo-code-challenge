function fetchUSDValueOfCoin(coinID) {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/' + coinID;

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Success fetching data');
            return data.market_data.current_price.usd;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error; 
        });
}

async function getUSDValueOfCoin(numOfToken, sellCoinID) {
    try {
        const usdValue = await fetchUSDValueOfCoin(sellCoinID);
        console.log(usdValue * numOfToken);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function getNumOfBuyCoinTokens(usdValueOfSellCoin, buyCoinID) {
    try {
        const usdValue = await fetchUSDValueOfCoin(buyCoinID);
        const numOfTokens = usdValueOfSellCoin / usdValue;
        console.log(numOfTokens);
        // return numOfTokens;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

//Test cases
// getUSDValueOfCoin(1, "bitcoin");
// getNumOfBuyCoinTokens(68501, "ethereum");