// Manage the state of the game.
const GAMESTATE = {
    DIRECTIONS: 0,
    PLAY: 1,
    GAMEOVER: 2
};
var currentState = GAMESTATE.DIRECTIONS;

// Color Options that can be set for the game.
const COLOR_OPTIONS = ["red", "blue", "green", "yellow"];


$("form").submit(function (event) {
    // Check if game is in state of displaying directions.
    if(currentState == GAMESTATE.DIRECTIONS){
        // Displaying direction here.
        $(".MainContent").empty();
        $(".MainContent").append("<p>Add color display here.</p>");
        $(".MainContent").append("<p>Up: red<br>left: blue<br>down:green<br>right: yellow</p>");

        SetupDirDisplay();
        $(".MainContent").append("<input type='submit' value='Next'>");
        currentState = GAMESTATE.PLAY;
    }
    // Check if game is in state of playing.
    else if(currentState = GAMESTATE.PLAY){
        $(".MainContent").empty();
        //Start game.
        PlayGame();
    }
    else{
        // Maybe add end of game option here later.
        //$(".MainContent").empty();
    }

    event.preventDefault();
});

// This function will be called to start the game.
function PlayGame(){
    // Variable that will be set as a random color option to check.
    let colorVar = {color: 0}

    document.addEventListener("keydown", event => {
        switch(event.keyCode){
            // Up key.
            case 38:
                CheckColor(0, colorVar);
                break;
            // Left key.
            case 37:
                CheckColor(1, colorVar);
                break;
            // Down key.
            case 40:
                CheckColor(2, colorVar);
                break;
            // Right key.
            case 39:
                CheckColor(3, colorVar);
                break;
        }
    })
    NewColor(colorVar);
    
    
}

// This function will set the colorVar to a new value and display to page.
function NewColor(cVar){
    // Set color to random number between 0 and 3.
    cVar.color = Math.floor(Math.random() * 4);

    // Add color to screen.
    $(".MainContent").append("<p>" + COLOR_OPTIONS[cVar.color] + "</p>");
    $(".MainContent").append('<div class="col-md-3", style= "background-color: '+COLOR_OPTIONS[cVar.color]+'; width:100px; height:100px;"></div>');
}

// This function will check if the the first number matches the color value of the second variables and display results onto page.
function CheckColor(num, cVar){
    // Clear screen.
    $(".MainContent").empty();

    // Check if values match.
    if(num == cVar.color){
        $(".MainContent").append("<p>Correct</p>");
    }
    else{
        $(".MainContent").append("<p>Incorrect</p>");

    }

    // Set new value for the color variable.
    NewColor(cVar);
}

// Setup the display for directional color association.
function SetupDirDisplay(){
    // Setup rows for each direction to display.
    var row1 = $('<div class="row"></div>');
    var row2 = $('<div class="row"></div>');
    var row3 = $('<div class="row"></div>');

    // The first row. (top)
    var c1 = $('<div class="col-md-3 offset-md-3", style= "background-color: red; "><p>Top</p></div>');
    row1.append(c1);

    // The second row. (left, right)
    var c2 = $('<div class="col-md-3", style= "background-color: blue;"><p>Left</p></div>');
    var c2_2 = $('<div class="col-md-3 offset-md-3", style= "background-color: yellow;"><p>Right</p></div>');
    row2.append(c2);
    row2.append(c2_2);

    // The bottom row. (bottom)
    var c3 = $('<div class="col-md-3 offset-md-3", style= "background-color: green; "><p>Down</p></div>');
    row3.append(c3);

    // Add rows to page.
    $(".MainContent").append(row1);
    $(".MainContent").append(row2);
    $(".MainContent").append(row3);

}