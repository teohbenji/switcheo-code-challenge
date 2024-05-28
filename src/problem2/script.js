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
    buttonConvert.addEventListener('click', async function() {
        let sellTokenId = dropdownToken1.options[dropdownToken1.selectedIndex].value;
        let buyTokenId = dropdownToken1.options[dropdownToken2.selectedIndex].value;
        let numOfTokens = parseFloat(document.getElementById("inputToken1").value);
        
        try {
            let sellTokenUSD = await fetchUSDValueOfCoin(sellTokenId);

            //Display total USD value
            let totalUSDValue = sellTokenUSD * numOfTokens; 
            document.getElementById('divUSDValue').textContent = 'USD value: $' + totalUSDValue.toFixed(2);

            //Display num of Buy Tokens
            let buyTokenUSD = await fetchUSDValueOfCoin(buyTokenId);
            let numOfBuyTokens = totalUSDValue / buyTokenUSD;
            document.getElementById('inputToken2').value = numOfBuyTokens;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    });
};

function fetchUSDValueOfCoin(coinID) {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/' + coinID;

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Success fetching data' + coinID);
            return data.market_data.current_price.usd;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error; 
        });
}
