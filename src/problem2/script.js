window.onload = function() {
    //Hide both images initially
    let elementsArr = Array.from(document.getElementsByClassName("token-image"));
    
    elementsArr.map(element => {
        element.style.display = 'none';
    });

    //Display crypto token when dropdown item selected
    var e = document.getElementById("dropdownToken1");
    e.onchange = function() {
        console.log('images/' + e.options[e.selectedIndex].text + '.svg');
        let tokenImage1 = document.getElementById("imageToken1");
        tokenImage1.style.display = 'block';
        tokenImage1.src = 'images/' + e.options[e.selectedIndex].text + '.svg';
    };

    var f = document.getElementById("dropdownToken2");
    f.onchange = function() {
        console.log('images/' + e.options[e.selectedIndex].text + '.svg');
        let tokenImage2 = document.getElementById("imageToken2");
        tokenImage2.style.display = 'block';
        tokenImage2.src = 'images/' + e.options[e.selectedIndex].text + '.svg';
    };
};

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