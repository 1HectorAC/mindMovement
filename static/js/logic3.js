// Manage the state of the game.
const GAMESTATE = {
    START: 0,
    DIRECTIONS: 1,
    PLAY: 2,
    GAMEOVER: 3
};
var currentState = GAMESTATE.DIRECTIONS;

// Color Options that can be set for the game.
const COLOR_OPTIONS = ["red", "blue", "green", "yellow"];

// Variable needed for what color will appear on screen as a target.
var colorVar = 0;

// Variable needed for keeping track of score.
var score = 0;
var lives = 3;

// Variables to keep track of time.
var playTime = 30;
var countDownTimer = 30;
var timer;

// Initialize the game.
Initial();

// Initialize the game and setup all key parts to start.
function Initial(){
    // Call function to initially setup start menu.
    SetupStartMenu();

    // Setup up input key part.
    InputPart();

    //Setup button control to affect state of game.
    $("form").submit(function (event) {
        if(currentState == GAMESTATE.START){
            $('.MainContent').empty();
            SetupStartMenu();

            currentState = GAMESTATE.DIRECTIONS;
        }
        // Check if game is in state of displaying directions.
        else if(currentState == GAMESTATE.DIRECTIONS){
            // Displaying direction here.
            $(".MainContent").empty();
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
}

//Setup up keydown control.
function InputPart(){
    document.addEventListener("keydown", event => {
        if(currentState == GAMESTATE.PLAY){
            switch(event.keyCode){
                // Up key.
                case 38:
                    CheckColor(0);
                    break;
                // Left key.
                case 37:
                    CheckColor(1);
                    break;
                // Down key.
                case 40:
                    CheckColor(2);
                    break;
                // Right key.
                case 39:
                    CheckColor(3);
                    break;
            }
        }
    });
}

//Setup the display for the start menu.
function SetupStartMenu(){
    $(".MainContent").append('<h5>-Instructions-</h5>');
    $(".MainContent").append('<p>A random color will be shown in a square block. Your job is the hit the right direction key(Up, Down, Left, Right) associated with the color. Color Key association will be shown beforehand. The game ends if you miss 3 or after 30 seconds.</p>');
    $(".MainContent").append('<input type="submit" class="btn btn-primary customButton" value="Play">');
}

// Setup the display for directional color association.
function SetupDirDisplay(){
    // Setup rows for each direction to display.
    var row1 = $('<div class="row"></div>');
    var row2 = $('<div class="row"></div>');
    var row3 = $('<div class="row"></div>');

    // The first row. (top)
    var c1 = $('<div class="col-md-3 offset-md-3", style= "background-color: red; color:white; text-align:center "><p>Top</p></div>');
    row1.append(c1);

    // The second row. (left, right)
    var c2 = $('<div class="col-md-3", style= "background-color: blue; color: white; text-align:center "><p>Left</p></div>');
    var c2_2 = $('<div class="col-md-3 offset-md-3", style= "background-color: yellow; text-align:center "><p>Right</p></div>');
    row2.append(c2);
    row2.append(c2_2);

    // The bottom row. (bottom)
    var c3 = $('<div class="col-md-3 offset-md-3", style= "background-color: green; color:white; text-align:center  "><p>Down</p></div>');
    row3.append(c3);

    // Add rows to page.
    $(".MainContent").append(row1);
    $(".MainContent").append(row2);
    $(".MainContent").append(row3);

}

// This function will be called to start the game.
function PlayGame(){
    // Variable that will be set as a random color option to check.
    colorVar = 0

    // Set score to 0 at start of each game. This is needed for replaying.
    score = 0;

    // Set life to 0.
    lives = 3;

    $(".MainContent").append("<p>Score: " + score + "</p>");
    $(".MainContent").append("<p>Lives: " + lives + "</p>");

    // Create new color to display.
    NewColor();

    // Call end of game in 'playTime' amount of seconds.
    setTimeout(EndGame, playTime * 1000);
    
    // Setup display for game timer.
    $(".Timer").text("Time: "+countDownTimer);
    timer = setInterval(UpdateTimer,1000);
}

// This function will set the colorVar to a new value and display to page.
function NewColor(){
    // Set color to random number between 0 and 3.
    colorVar = Math.floor(Math.random() * 4);

    // Add color to screen.
    var textColor = "white";
    if(colorVar == 3)
        textColor = "black";
    var cText = "<p style='text-align:center; font-size: 25px; color:"+textColor+"'>" + COLOR_OPTIONS[colorVar] + "</p>";
    $(".MainContent").append('<div class="col-md-3", style= "background-color: '+COLOR_OPTIONS[colorVar]+'; width:100px; height:100px; line-height:100px">'+cText+'</div>');
}

// This function will check if the the first number matches the color value of the second variables and display results onto page.
function CheckColor(num){
    // Clear screen.
    $(".MainContent").empty();

    // Check if values matches the colorVar.
    if(num == colorVar){
        score++;
        $(".MainContent").append("<p style='color:green'>Score: " + score + "</p>");
        $(".MainContent").append("<p>Lives: " + lives + "</p>");
        $(".MainContent").append("<p style='color:green'>Hit!</p>");
    }
    else{
        // Added check to prevent score from going to lower than 0.
        if(score > 0)
            score--;
        
        // Subtract from lives and end game if out of lives.
        // Lives needs to be greater than 1 given that it will subtract from it and the result needs to be greater than 0.
        if(lives > 1)
            lives--;
        else{
            EndGame();
            return;
        }
        $(".MainContent").append("<p style='color:red'>Score: " + score + "</p>");
        $(".MainContent").append("<p>Lives: " + lives + "</p>");
        $(".MainContent").append("<p style='color:red'>Miss.</p>");

    }

    // Set new value for the color variable.
    NewColor();
}

// Clear screen and add game over content to page.
function EndGame(){
    //Make sure you can only end game when playing.
    if(currentState == GAMESTATE.PLAY){
        // Change state. Note: will stop actions from keydown event listener.
        currentState = GAMESTATE.START;

        // Reset/stop time related variables.
        $(".Timer").empty();
        countDownTimer = playTime;
        clearInterval(timer);

        // Clear screen.
        $(".MainContent").empty();

        $(".MainContent").append("<h1>Game Over</h1>");
        $(".MainContent").append("<p>Final Score: "+ score +"</p>");

        $(".MainContent").append("<input type='submit' value='Play Again'>");
    }


}

// Move timer down by 1 and update display. Also clear time if reach 0.
function UpdateTimer(){
    
    countDownTimer-=1;
    // Only update time if their is still time in timer, otherwise clear.
    if(countDownTimer > 0){
        $(".Timer").text("Time: "+countDownTimer);
    }
    
}