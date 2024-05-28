window.onload = function() {
    //Hide both images initially
    let elementsArr = Array.from(document.getElementsByClassName("token-image"));
    
    elementsArr.map(element => {
        element.style.display = 'none';
    });

    //Display corresponding crypto token when dropdown item selected
    var dropdownToken1 = document.getElementById("dropdownToken1");
    dropdownToken1.onchange = function() {
        let tokenImage1 = document.getElementById("imageToken1");
        tokenImage1.style.display = 'block';
        tokenImage1.src = 'images/' + dropdownToken1.options[dropdownToken1.selectedIndex].text + '.svg';
    };

    var dropdownToken2 = document.getElementById("dropdownToken2");
    dropdownToken2.onchange = function() {
        let tokenImage2 = document.getElementById("imageToken2");
        tokenImage2.style.display = 'block';
        tokenImage2.src = 'images/' + dropdownToken2.options[dropdownToken2.selectedIndex].text + '.svg';
    };

    // Adding event listener to the button
    var buttonConvert = document.getElementById('buttonConvert');
    buttonConvert.addEventListener('click', function() {
        var tokenId = dropdownToken1.options[dropdownToken1.selectedIndex].value;
        var numOfTokens = document.getElementById("inputToken1").value;
        console.log(tokenId + ",   " + numOfTokens);
        // Add your button click logic here
    });
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

async function getUSDValueOfCoin(numOfTokens, sellCoinID) {
    try {
        const usdValue = await fetchUSDValueOfCoin(sellCoinID);
        console.log(usdValue * numOfTokens);
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