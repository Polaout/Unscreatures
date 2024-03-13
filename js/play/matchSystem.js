const socket = io();
const clientID = Math.floor(Math.random() * (3000 + 1 - 1000) + 1000);

document
  .getElementById("buttonNameInput")
  .addEventListener("click", (event) => {
    var username = document.getElementById("nameInput").value;

    var initUI = document.getElementById("initUI");
    var waitingUI = document.getElementById("waitingUI");
    var waitingText = document.getElementById("waitingText");

    if (username) {
      socket.emit("playerSearchMatch", ({ clientID: clientID, username: username }));

      initUI.style.display = "none";
      waitingUI.style.display = "block";
      waitingText.style.display = "block";
    }
  });


socket.on("playerMatchFound", (value) => {
  
  var waitingUI = document.getElementById("waitingUI");
  var waitingText = document.getElementById("waitingText");

  if (value.clientID != clientID) return;

  waitingText.innerHTML = "Game Found! starting in 2 Seconds";

  setTimeout(() => {
      
    waitingUI.style.display = "none";
    waitingText.style.display = "none";

    createGrid(value.grid);
    startingRound(value);
      
  }, 2000);
});
