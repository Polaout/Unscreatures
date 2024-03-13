function createGrid(gridArray) {
   
//starting a loop to count the grid (rows)
for(var rows = 0; rows <= gridArray.length - 1; rows++) {

   for(var columns = 0; columns <= gridArray[rows].length - 1; columns++) {

      /*switch(gridArray[rows].owner) {

         case "enemy": {

            f
            
         }

      }*/
      
      if (rows <= 1) {

         var enemyGrid = document.getElementById("enemyGrid");

         var gridTileDiv = document.createElement("div");

         gridTileDiv.style.top = `${((15 + 2) * rows) + 8}%`;
         gridTileDiv.style.left = `${((12 + 2) * columns) + 2}%`;
         gridTileDiv.style.borderStyle = "solid";
         gridTileDiv.style.borderColor = "rgba(250, 2, 2, 1)";
         gridTileDiv.style.boxShadow = "0 0px 5px rgba(250, 2, 2, 0.25), 0 5px 10px rgba(250, 2, 2, 0.25)";
         gridTileDiv.style.backgroundColor = "rgba(250, 2, 2, 0.5)"
         
         gridTileDiv.setAttribute("class", "gridTile")
         gridTileDiv.setAttribute("gridRow", gridArray[rows][columns].gridRow)
         gridTileDiv.setAttribute("gridColumns", gridArray[rows][columns].gridColumns)
         enemyGrid.appendChild(gridTileDiv)
   
            
         }else if (rows == 2) {


         var midGrid = document.getElementById("midGrid");

         var gridTileDiv = document.createElement("div");

         gridTileDiv.style.top = `${((15 + 2) * rows) + 8}%`;
         gridTileDiv.style.left = `${((12 + 2) * columns) + 2}%`;
         gridTileDiv.style.borderStyle = "solid";
         gridTileDiv.style.borderColor = "rgba(140, 140, 140, 1)";
         gridTileDiv.style.boxShadow = "0 0px 5px rgba(140, 140, 140, 0.25), 0 5px 10px rgba(140, 140, 140, 0.25)";
         gridTileDiv.style.backgroundColor = "rgba(140, 140, 140, 0.5)"

         
         gridTileDiv.setAttribute("class", "gridTile")
         midGrid.appendChild(gridTileDiv)
                

         } else if (rows > 2) {

         var playerGrid = document.getElementById("playerGrid");

         var gridTileDiv = document.createElement("div");

         gridTileDiv.style.top = `${((15 + 2) * rows) + 8}%`;
         gridTileDiv.style.left = `${((12 + 2) * columns) + 2}%`;
         gridTileDiv.style.borderStyle = "solid";
         gridTileDiv.style.borderColor = "rgba(5, 17, 247, 1)";
         gridTileDiv.style.boxShadow = "0 0px 5px rgba(5, 17, 247, 0.5), 0 5px 10px rgba(5, 17, 247, 0.5)";
         gridTileDiv.style.backgroundColor = "rgba(5, 17, 247, 0.5)"

         
         gridTileDiv.setAttribute("class", "gridTile")
         playerGrid.appendChild(gridTileDiv)
         
         }
            
         }
      
}

   var board = document.getElementById("board");

   board.style.display = "block";

}
                  