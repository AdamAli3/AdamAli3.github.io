$(document).ready(function() {
    var turnNum=1; // index for turn number starts at 1

    var storageArray = new Array();
    for (i = 0; i < 3; i++) 
    { 
        storageArray[i] = new Array();

        for (j = 0; j < 3; j++) 
        {
            storageArray[i][j] = -1;
        }
    }

    var gameWon = false;
    
    $("#playerTurn").html("Player 1's Turn: Place an X in one of the empty boxes.");
    $("#turnCount").html("Turn Count: " + (turnNum-1));
    $("#newGameBtn").html("New Game");

    $("#newGameBtn").click(
        function()
        {
            gameWon = false;

            $("#playerTurn").html("Player 1's Turn: Place an X in one of the empty boxes.");
            
            turnNum = 1;
            $("#turnCount").html("Turn Count: " + (turnNum-1));

            $("#winner").html("");

            for(i = 0; i < 3; i++)
            {
                for(j = 0; j < 3; j++)
                {
                    storageArray[i][j] = -1;
                    $("td").html("").removeClass("invalid").addClass("valid");
                }
            }
        }
    )

    //what happens when you click a specific data cell in the table
    $("td").click(
        function() 
        {
            if(gameWon != true)
            {
                var id = $(this).attr("id");
                var rowVal = parseInt(id.charAt(1)); // the row value is assigned the value of the number after "r" in the id of the data cell
                var colVal = parseInt(id.charAt(3)); // the column value is assigned the value of the number after "c" in the id of the data cell

                if(storageArray[rowVal-1][colVal-1] == -1) // if the array cell clicked isn't already something other than -1
                {
                    if(turnNum%2!=0) // if turnNum is odd (starting with first turn)...
                    {
                        $(this).html("X"); // data cell is filled with an "X"
                        storageArray[rowVal-1][colVal-1] = 0; // array cell is filled with a 0 to differentiate from unchosen (-1), and O's (1)
                    } 
                    else // if turnNum is even
                    {
                        $(this).html("O"); // data cell is filled with an "O"
                        storageArray[rowVal-1][colVal-1] = 1; // array cell is filled with a 1 to differentiate from unchose (-1), and X's (0)
                    }
                    turnNum++;

                    //winning conditions
                    if(storageArray[0][0] != -1) // winning conditions that include top left cell
                    {
                        // across row 1
                        if(storageArray[0][0] == storageArray[0][1] && storageArray[0][0] == storageArray[0][2])
                        {
                            gameWon = true;
                            if(storageArray[0][0] == 0) // X win
                                $("#winner").html("Player 1 Wins!");
                            else if(storageArray[0][0] == 1) // O win
                                $("#winner").html("Player 2 Wins!");
                        }

                        // down column 1
                        else if(storageArray[0][0] == storageArray[1][0] && storageArray[0][0] == storageArray[2][0])
                        {
                            gameWon = true;
                            if(storageArray[0][0] == 0) // X win
                                $("#winner").html("Player 1 Wins!");
                            else if(storageArray[0][0] == 1) // O win
                                $("#winner").html("Player 2 Wins!");
                        }
                        // top left, middle, bottom right
                        else if(storageArray[0][0] == storageArray[1][1] && storageArray[0][0] == storageArray[2][2])
                        {
                            gameWon = true;
                            if(storageArray[0][0] == 0) // X win
                                $("#winner").html("Player 1 Wins!");
                            else if(storageArray[0][0] == 1) // O win
                                $("#winner").html("Player 2 Wins!");
                        }
                    }

                    if(storageArray[2][2] != -1) // winning conditions that include bottom right cell
                    {
                        // across row 3
                        if(storageArray[2][0] == storageArray[2][1] && storageArray[2][0] == storageArray[2][2])
                        {
                            gameWon = true;
                            if(storageArray[2][0] == 0) // X win
                                $("#winner").html("Player 1 Wins!");
                            else if(storageArray[2][0] == 1) // O win
                                $("#winner").html("Player 2 Wins!");
                        }
                        
                        // down column 3 
                        else if(storageArray[0][2] == storageArray[1][2] && storageArray[0][2] == storageArray[2][2])
                        {
                            gameWon = true;
                            if(storageArray[0][2] == 0) // X win
                                $("#winner").html("Player 1 Wins!");
                            else if(storageArray[0][2] == 1) // O win
                                $("#winner").html("Player 2 Wins!");
                        }
                    }

                    if(storageArray[1][1] != -1) // winning conditions that include middle cell
                    {
                        // across row 2
                        if(storageArray[1][0] == storageArray[1][1] && storageArray[1][0] == storageArray[1][2])
                        {
                            gameWon = true;
                            if(storageArray[1][1] == 0) // X win
                                $("#winner").html("Player 1 Wins!");
                            else if(storageArray[1][1] == 1) // O win
                                $("#winner").html("Player 2 Wins!");
                        }

                        // down column 2
                        else if(storageArray[0][1] == storageArray[1][1] && storageArray[0][1] == storageArray[2][1])
                        {
                            gameWon = true;
                            if(storageArray[0][1] == 0) // X win
                                $("#winner").html("Player 1 Wins!");
                            else if(storageArray[2][1] == 1) // O win
                                $("#winner").html("Player 2 Wins!");
                        }

                        // top right, middle, bottom left
                        else if(storageArray[0][2] == storageArray[1][1] && storageArray[0][2] == storageArray[2][0])
                        {
                            gameWon = true;
                            if(storageArray[1][1] == 0) // X win
                                $("#winner").html("Player 1 Wins!");
                            else if(storageArray[1][1] == 1) // O win
                                $("#winner").html("Player 2 Wins!");
                        }
                    }                        

                    //TIE
                    var isFilled = true;
                    for(i = 0; i < 3; i++)
                    {
                        for(j = 0; j < 3; j++)
                        {
                            if(storageArray[i][j] == -1)
                            {
                                isFilled = false;
                            }
                        }
                    }
                    if(isFilled == true && gameWon == false) // if every data cell is filled with either X or O
                    {
                        $("#winner").html("Stalemate! No winner this round, better luck next time!");
                        gameWon = true;
                    }
                    $("#" + id).removeClass("valid").addClass("invalid");
                }
            }

            if(gameWon == true)
            {
                $("td").removeClass("valid").addClass("invalid");
            }

            // statements for which player's turn it is
            if(turnNum%2 == 0)
            {
                $("#playerTurn").html("Player 2's Turn: Place an O in one of the empty boxes.")
            }
            else if(turnNum%2 != 0)
            {
                $("#playerTurn").html("Player 1's Turn: Place an X in one of the empty boxes.")
            }

            // turn count underneath table
            $("#turnCount").html("Turn Count: " + (turnNum-1));

        }
    );
})



