const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 3003

const fs = require('fs');
const path = require('path')

const requestMatch = [];
const rooms = [];

app.use('/html', express.static(__dirname + '/html'));

app.use('/css', express.static(__dirname + '/css'));

app.use('/js', express.static(__dirname + '/js'));

app.use('/images', express.static(__dirname + '/images'));

app.use('/socket.io', express.static(__dirname + '/socket.io'));

http.listen(port, () => {
  console.log(`Socket.IO server running at Card Game:${port}`);
});

app.get('/', (req, res) => {
    res.redirect('/play');
});

app.get('/play', (req, res) => {
    res.sendFile(__dirname + '/html/play.html');
});

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createaRoom(roomName, roomID, players) {

    const room = {
        roomName: roomName,
        rommID: roomID,
        status: "Waiting",
        players: players,
        board: {
            grid: []
        }     
    }

    for(var rows = 0; rows <= 4; rows++) {

        room.board.grid.push([]);

        for (var cols = 0; cols <= 5; cols++) {

            if (rows <= 1) {

                room.board.grid[rows].push({ gridRow: rows, gridColumns: cols, owner: "enemy",  card: null })
            
            }else if (rows == 2) {
 
                room.board.grid[rows].push({ gridRow: rows, gridColumns: cols, owner: "mid",  card: null })

         } else if (rows > 2) {
 
                room.board.grid[rows].push({ gridRow: rows, gridColumns: cols, owner: "player",  card: null }) 
            }
        }
    }

    for(var playersIndex = 0; playersIndex < room.players.length; playersIndex++) {

        var cardsList = [];
        var playerHand = [];
                   
        const jsonsDir = fs.readdirSync('./cards/').filter(file => path.extname(file) === '.json');

        jsonsDir.forEach(file => {
            
          const fileData = fs.readFileSync(path.join('./cards/', file));
            
          const json = JSON.parse(fileData);

            cardsList.push(json);
            
        });

          for(var cardNumber = 0; cardNumber < 5; cardNumber++) {
    const randomCardIndex = Math.floor(Math.random() * Object.keys(cardsList).length);
    const randomCardKey   = Object.keys(cardsList)[randomCardIndex];
    const randomCard      = cardsList[randomCardKey]["name"];

    
    if (!playerHand.includes(randomCard)) {
        
        playerHand.push(randomCard);
    } else {
        
        cardNumber--;
    }
}

                   room.players[playersIndex].cards = playerHand;
        
        
    }

    let playerChoice = getRandomNumber(1, 10);
    
    if (playerChoice > 5) {

        room.players[0].type = "enemy";
        room.players[1].type = "player";
        
    } else {
        
      room.players[0].type = "player";
      room.players[1].type = "enemy";
        
    }
    
    rooms.push(room);
    return room;

}

io.on('connection', async (socket) => {

    socket.on("playerSearchMatch", (value) => {

        requestMatch.push({ clientID: value.clientID, username: value.username, socketID: socket.id })
        
        if (requestMatch.length >= 2) {

            var player = requestMatch.shift();
            var otherPlayer = requestMatch.shift();

            var room = createaRoom(`Room ${rooms.length}`, rooms.length, [player, otherPlayer])

            for(var playersIndex = 0; playersIndex < room.players.length; playersIndex++) {

        console.log(room.players[playersIndex].socketID)
        io.to(room.players[playersIndex].socketID).emit("playerMatchFound", { clientID: room.players[playersIndex].clientID, roomID: room.players[playersIndex].roomID, socketID: room.players[playersIndex].socketID, grid: room.board.grid, cards: room.players[playersIndex].cards, enemyCards: room.players[1 - playersIndex].cards.length })
            
        } 

        }

});

    
    /*socket.on("serverPlayerJoin", (value) => {

        for(var i = 0; i < rooms.length; i++) {

            if (rooms[i]) {

                if ()
                if (rooms[i].status == "Game Started") break;

                if (rooms[i].players.length < rooms[i].roomSize) {

                    console.log("slonrr")
                    
                    socket.join(`${rooms[i].roomName}`)
                    rooms[i].players.push(value);

                    if (rooms[i].players.length == 1) {

                        rooms[i].status = "Waiting Other Player";
                        rooms[i].players[0].type = "player";


io.to(`${rooms[i].roomName}`).emit("clientPlayerJoin", { serverLength: `${rooms[i].players.length}/${rooms[i].roomSize}`});
                        
                    } else if (rooms[i].players.length == rooms[i].roomSize) {

                        rooms[i].status = "Game Started"
                        rooms[i].players[1].type = "enemy";
                        io.to(`${rooms[i].roomName}`).emit("clientPlayerJoin", { serverLength: `${rooms[i].players.length}/${rooms[i].roomSize}` });

                        //starting a loop to count the grid (rows)
                        for(var rows = 0; rows <= 4; rows++) {

   //creating the first dimension of the grid array of cards (rows)
   rooms[i].board.grid.push([])

   //starting a loop to count the grid (columns)
   for(var columns = 0; columns <= 5; columns++) {

       if (rows <= 1) {

           //setting the value in the second dimension of the array (columns - cards)  
           rooms[i].board.grid[rows].push({ gridRow: rows, gridColumns: columns, owner: "enemy",  card: null })
            
         }else if (rows == 2) {

           //setting the value in the second dimension of the array (columns - cards)  
              rooms[i].board.grid[rows].push({ gridRow: rows, gridColumns: columns, owner: "mid",  card: null })

         } else if (rows > 2) {

           //setting the value in the second dimension of the array (columns - cards)  
           rooms[i].board.grid[rows].push({ gridRow: rows, gridColumns: columns, owner: "player",  card: null })           
       }
   }
}
                    }
                }

            }
            
            if (rooms[i].status === "Game Started") {

                console.log(rooms[i].board.grid)
                console.log(rooms[i].players)
                io.to(`${rooms[i].roomName}`).emit("clientGameStart", { grid: rooms[i].board.grid });
            
            }
            i++;
        }
});

    socket.once("serverPlayerCards", (value) => {

        switch(value.type) {

            case "startingCards": {

for(var roomsIndex = 0; roomsIndex < rooms.length; roomsIndex++) {

    for(var playersIndex = 0; playersIndex < rooms[roomsIndex].players.length; playersIndex++) {
    
            if(rooms[roomsIndex]) {

               if (rooms[roomsIndex].players[playersIndex].clientID == value.clientID && !rooms[roomsIndex].players[playersIndex].cards) {

                   var cardsList = [];
                   var playerHand = [];
                   
                   const jsonsDir = fs.readdirSync('./cards/').filter(file => path.extname(file) === '.json');

        jsonsDir.forEach(file => {
            
          const fileData = fs.readFileSync(path.join('./cards/', file));
            
          const json = JSON.parse(fileData);

            cardsList.push(json);
            
        });

          for(var cardNumber = 0; cardNumber < 5; cardNumber++) {
    const randomCardIndex = Math.floor(Math.random() * Object.keys(cardsList).length);
    const randomCardKey   = Object.keys(cardsList)[randomCardIndex];
    const randomCard      = cardsList[randomCardKey]["name"];

    
    if (!playerHand.includes(randomCard)) {
        
        playerHand.push(randomCard);
    } else {
        
        cardNumber--;
    }
}

                   rooms[roomsIndex].players[playersIndex].cards = playerHand;
io.to(`${rooms[roomsIndex].roomName}`).emit("clientPlayerCards", { clientID: value.clientID, cards: rooms[roomsIndex].players[playersIndex].cards, type: "startingCards" });

                
            }
                
        }

    }
            }
            }

            case "startingEnemyCards": {

                console.log(socket.rooms)
socket.rooms.forEach((value, value2) => {

    console.log(value)
    console.log(value2)
    console.log("polaout gay")
    /*console.log("id" + id)
    console.log("nome " + name)
    var res = name.replace(/\D/g, "");

console.log(res)

})
                                
                }
                        
            }
    });*/
    
    socket.on("disconnect", () => {

        

    });

});