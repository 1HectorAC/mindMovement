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
var maxCountDownTime = 30;
var countDownTime = maxCountDownTime;
var timer;

var hitStreak = 0;

// Initialize the game.
Initial();

// Initialize the game and setup all key parts to start.
function Initial(){
    // Call function to initially setup start menu.
    SetupStartMenu($(".MainContent"));

    $("body").on('click', 'button', function(ev) {
        ev.preventDefault()
        if ($(this).attr("value") == "beginning") {
            $('.MainContent').empty();
            SetupDirDisplay($(".MainContent"));
            $(".MainContent").append('<button type="submit" class="btn btn-primary customButton" value="Play">Play</button>');

        }
        if ($(this).attr("value") == "Play") {
            $('.MainContent').empty();
            PlayGame();
        }

        //GameButtons
        if ($(this).attr("value") == "Up") {
            CheckColor(0);
        }
        if ($(this).attr("value") == "Left") {
            CheckColor(1);
        }
        if ($(this).attr("value") == "Down") {
            CheckColor(2);
        }
        if ($(this).attr("value") == "Right") {
            CheckColor(3);
        }

    });
}


//Setup the display for the start menu.
function SetupStartMenu(element){
    element.append('<h5>-Instructions-</h5>');
    element.append('<p>A random color will be shown in a square block. Your job is the hit the right direction key(Up, Down, Left, Right) associated with the color. Color Key association will be shown beforehand. The game ends if you miss 3 or after 30 seconds.</p>');
    element.append('<button type="submit" class="btn btn-primary customButton" value="beginning">Next</button>');
}

// Setup the display for directional color association.
function SetupDirDisplay(element){
    // Setup rows for each direction to display.
    var row1 = $('<div class="row"></div>');
    var row2 = $('<div class="row"></div>');
    var row3 = $('<div class="row"></div>');

    // The first row. (top)
    var c1 = $('<div class="col-md-2 offset-md-5", style= "background-color: red; color:white; text-align:center;border-radius: 15px; "><p>Up</p></div>');
    row1.append(c1);

    // The second row. (left, right)
    var c2 = $('<div class="col-md-2 offset-md-3", style= "background-color: blue; color: white; text-align:center;border-radius: 15px"><p>Left</p></div>');
    var c2_2 = $('<div class="col-md-2 offset-md-2", style= "background-color: yellow; text-align:center;border-radius: 15px "><p>Right</p></div>');
    row2.append(c2);
    row2.append(c2_2);

    // The bottom row. (bottom)
    var c3 = $('<div class="col-md-2 offset-md-5", style= "background-color: green; color:white; text-align:center;border-radius: 15px "><p>Down</p></div>');
    row3.append(c3);

    // Add content to main class.
    $(element).append('<p>Remeber what color goes with what direction before starting!</p>');
    $(element).append(row1);
    $(element).append(row2);
    $(element).append(row3);
    $(element).append('<hr>');    

}

// This function will be called to start the game.
function PlayGame(){
    // Reset variable that keeps track of hit streak.
    hitStreak = 0;

    // Variable that will be set as a random color option to check.
    colorVar = 0

    // Set score to 0 at start of each game. This is needed for replaying.
    score = 0;

    // Set life to 3.
    lives = 3;

    // Reset countdownTime
    countDownTime = maxCountDownTime;

    // Setup variables to display.
    var gameVars = $("<div id='gameVars' class='row'>");
    gameVars.append("<div class='col-md-2'>Lives:<br><p id='lives'>"+ lives + "</p></div>");
    gameVars.append("<div class='offset-md-3 col-md-2'>Time:<br><p id ='timer'>" + countDownTime + "</p></div>");
    gameVars.append("<div class='offset-md-3 col-md-2'>Score:<br><p id='score'>" + score + "</p></div>");
    $(".MainContent").append(gameVars);
    $(".MainContent").append("<p id='hitIndicator' style='font-size: 20px'></p>");

    // Display Box.
    var cText = "<p id='boxText' style='text-align:center; font-size: 35px;'></p>";
    $(".MainContent").append('<div id="displayBox" style="width:200px; height:100px; line-height:100px; display: inline-block; border-radius: 15px;">'+cText+'</div>');

        // Setup rows for each direction to display.
        var row1 = $('<div class="row"></div>');
        var row2 = $('<div class="row"></div>');
        var row3 = $('<div class="row"></div>');
    
        // The first row. (top)
        var c1 = $('<button type="submit" class="col-md-2 offset-md-5 btn btn-dark" value="Up">Up</button>');
        row1.append(c1);
    
        // The second row. (left, right)
        var c2 = $('<button type="submit"  class="col-md-2 offset-md-3 btn btn-dark" value="Left">Left</button>');
        var c2_2 = $('<button type="submit"  class="col-md-2 offset-md-2 btn btn-dark" value="Right">Right</button>');
        row2.append(c2);
        row2.append(c2_2);
    
        // The bottom row. (bottom)
        var c3 = $('<button type="submit"  class="col-md-2 offset-md-5 btn btn-dark" value="Down">Down</button>');
        row3.append(c3);
    
        // Add content to main class.
        $(".MainContent").append("<br>");
        $(".MainContent").append("<br>");
        $(".MainContent").append(row1);
        $(".MainContent").append(row2);
        $(".MainContent").append(row3);
        $(".MainContent").append("<br>");

    // Create new color to display.
    NewColor();

    // Setup update for game timer.
    timer = setInterval(EndCountDown,1000);

}

// This function will set the colorVar to a new value and display to page.
function NewColor(){
    // Set color to random number between 0 and 3.
    colorVar = Math.floor(Math.random() * 4);

    // Add color to screen.
    var textColor = "white";
    if(colorVar == 3)
        textColor = "black";
    $("#boxText").css('color', textColor);
    $("#boxText").text(COLOR_OPTIONS[colorVar] );
    $("#displayBox").css("background-color", COLOR_OPTIONS[colorVar]);
}

// This function will check if the the first number matches the color value of the second variables and display results onto page.
function CheckColor(num){
    //$("#displayBox").remove();

    // Check if values matches the colorVar.
    if(num == colorVar){
        score++;
        hitStreak++;
        $("#score").text(score);
        $("#hitIndicator").css("color", "green");
        if(hitStreak > 1)
            $("#hitIndicator").text("Hit! x" + hitStreak);
        else
            $("#hitIndicator").text("Hit!");
    }
    else{
        // Reset hitStreak after missing.
        hitStreak = 0;

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
        $("#score").text(score);
        $("#lives").text(lives);
        $("#hitIndicator").css("color", "red");
        $("#hitIndicator").text("Miss.");

    }

    // Set new value for the color variable.
    NewColor();
}

// Clear screen and add game over content to page.
function EndGame(){
        // Reset/stop time related variables.
        clearInterval(timer);

        // Clear screen.
        $(".MainContent").empty();

        $(".MainContent").append("<h1 style='color:red'>Game Over</h1>");
        $(".MainContent").append("<h5>Final Score: "+ score +"</h5>");

        $(".MainContent").append('<button type="submit" class="btn btn-primary customButton" value="beginning">Play Again</button>');

}

// Move timer down by 1 and update display. Also clear time if reach 0.
function EndCountDown(){
    
    countDownTime-=1;
    // Only update time if their is still time in timer, otherwise clear.
    if(countDownTime > 0){
        $("#timer").text(countDownTime);
    }
    else{
        EndGame();
    }
    
}