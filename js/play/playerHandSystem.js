function createCards(playerHand, enemyHand) {

            // create the cards elements inside the player hand div
  const playerHandDiv = document.getElementById("playerHand");

  const enemyHandDiv = document.getElementById("enemyHand");

  console.log(enemyHand)
  console.log(playerHand)

  for(var i = 0; i < playerHand.length; i++) {

      console.log(playerHand);
  
      const cardElement = document.createElement("div");
      cardElement.setAttribute("class", "cardInHand");
      cardElement.setAttribute("id", playerHand[i]);

      const cardNameElement = document.createElement("p");
      cardNameElement.textContent = playerHand[i];

      playerHandDiv.style.display = "block";

      cardElement.style.left = `${70 * i}%`
    
      playerHandDiv.appendChild(cardElement);
      cardElement.appendChild(cardNameElement);

  }

  for(var i = 0; i < enemyHand; i++) {

      console.log(enemyHand);
  
      const cardElement = document.createElement("div");
      cardElement.setAttribute("class", "cardInHand");

      enemyHandDiv.style.display = "block";

      cardElement.style.left = `${70 * i}%`
      cardElement.style.backgroundColor = "rgba(250, 2, 2, 1)"
    
      enemyHandDiv.appendChild(cardElement);

  }
          
        }

