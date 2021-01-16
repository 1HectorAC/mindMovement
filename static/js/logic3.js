// Variable for knowing the colors to use.
var selectedColors = ["red", "blue", "green", "yellow"];

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
        if ($(this).attr("value") == "Directions") {
            $('.MainContent').empty();
            SetupStartMenu($(".MainContent"));
        }
        if ($(this).attr("value") == "ColorDisplay") {
            // Setup color with direction association depending on difficulty options.
            var difficultyValue = $('#difficulty').val();

            $('.MainContent').empty();


            if(difficultyValue == "2")
                selectedColors = ["red", "blue", "green", "yellow","HotPink","SlateBlue"];
            else
                selectedColors = ["red", "blue", "green", "yellow"];
                
            
            ShuffleArray(selectedColors);


            SetupDirDisplay($(".MainContent"), selectedColors);
            $(".MainContent").append('<button type="submit" class="btn btn-primary customButton" value="Play">Next</button>');

        }
        if ($(this).attr("value") == "Play") {
            $('.MainContent').empty();
            PlayGame();
        }
        if ($(this).attr("value") == "PlayAgain") {
            $('.MainContent').empty();

            ShuffleArray(selectedColors);

            SetupDirDisplay($(".MainContent"), selectedColors);
            $(".MainContent").append('<button type="submit" class="btn btn-primary customButton" value="Play">Play</button>');
        }

        //GameButtons
        if ($(this).attr("value") == "Button1") {
            CheckColor(0);
        }
        if ($(this).attr("value") == "Button2") {
            CheckColor(1);
        }
        if ($(this).attr("value") == "Button3") {
            CheckColor(2);
        }
        if ($(this).attr("value") == "Button4") {
            CheckColor(3);
        }
        if ($(this).attr("value") == "Button5") {
            CheckColor(4);
        }
        if ($(this).attr("value") == "Button6") {
            CheckColor(5);
        }

    });
}

//Setup the display for the start menu.
function SetupStartMenu(element){
    var leftSide = $('<div class="jumbotron" style="background-color:#1b4ffa;color:white"></div>');
    var rightSide = $('<div class="jumbotron" style="background-color:white;color:#1b4ffa"></div>');

    leftSide.append("<h4>-Description-</h4>");
    leftSide.append("<hr class='whiteLine'>");
    leftSide.append('<p>Memorize the color-button association and then hit the button associated with the color that appears!</p>');
 
   // Collapsable accoridon for direction sections.
    var accordion = $('<div id="accordion"></div>');
    var playString = "A bunch of buttons will appear on screen with different colors. Your first task is to remember which color goes with what button.</br></br>On the next screen there will be a colored box and a bunch of colorless buttons. It is you job to hit the right button associated with the color of the box.</br></br>If you get it right then your score will go up. If you get it wrong then you will lose a live.";
    CollapsableSinglePanel(accordion, "How to Play", playString, "collapse1");

    var endString = "After all lives are gone or time runs out, you will be shown the results. The results will display your score.";
    CollapsableSinglePanel(accordion, "End of Game", endString, "collapse2");

    var settingsString = "<u>Difficulty:</u> This will affect how many buttons you can press."
    CollapsableSinglePanel(accordion, "Settings", settingsString, "collapse3");

    leftSide.append(accordion);

    // Setup dropdown for difficulty settings.
    rightSide.append('<h4>-Settings-</h4>');
    rightSide.append("<hr class='blueLine'>");
    rightSide.append('<h5>-Difficulty-</h5>');
    var selectSection = $('<select id="difficulty" class="btn btn-secondary"></select>');
    selectSection.append('<option value="1"> Easy (4 Colors)</option>');
    selectSection.append('<option value="2"> Hard (6 Colors)</option>');
    rightSide.append(selectSection);

    rightSide.append("<hr>");
    rightSide.append('<button type="submit" class="btn btn-primary customButton" value="ColorDisplay">Play</button>');

    // Add both left and right side items to screen.
    var row = $('<div class="row"></div');
    row.append($('<div class="col-md-6"></div>').append('<div class="container"></div>').append(leftSide));
    row.append($('<div class="col-md-6"></div>').append('<div class="container"></div>').append(rightSide));
    element.append(row);
}

//Create a single panel collapsable panel and add it to element.
function CollapsableSinglePanel(element, title, content, idName){
    var titlePart = $('<div class="card-header">').append($('<a class="card-link" data-toggle="collapse" href="#'+idName+'">'+title+'</a>'));
    var contentPart = $('<div id="'+idName+'" class="collapse" data-parent="#accordion">').append($('<div class="card-body" style="color:black">'+content+'</div>'));

    var togetherPanel = $('<div class="card">');
    togetherPanel.append(titlePart);
    togetherPanel.append(contentPart);

    element.append(togetherPanel);
}

// Setup the display for directional color association.
function SetupDirDisplay(element, displayColors){
    var arrayLength = displayColors.length;
    // Setup color for text.
    var textColor;
    if(arrayLength == 4){
        textColor = ["white","white","white","white"];
    }
    else{
        textColor = ["white","white","white","white","white","white"];
    }
    for(i = 0; i < displayColors.length; i++){
        if(displayColors[i] == "yellow"){
            textColor[i] = "black";
            break;
        }
    }

    // Setup rows for each direction to display.
    var row1 = $('<div class="row"></div>');
    var row2 = $('<div class="row"></div>');
    var row3 = $('<div class="row"></div>');

    if(arrayLength == 4){
        // The first row. (top)
        var c1 = $('<div class="col-md-2 offset-md-5 colorButtonBox", style= "background-color: '+displayColors[0]+'; color:'+textColor[0]+';"><p>Up</p></div>');
        row1.append(c1);

        // The second row. (center)
        var c2 = $('<div class="col-md-2 offset-md-3 colorButtonBox", style= "background-color: '+displayColors[1]+'; color: '+textColor[1]+';"><p>Left</p></div>');
        var c2_2 = $('<div class="col-md-2 offset-md-2 colorButtonBox", style= "background-color: '+displayColors[2]+'; color: '+textColor[2]+'"><p>Right</p></div>');
        row2.append(c2);
        row2.append(c2_2);

        // The bottom row. (bottom)
        var c3 = $('<div class="col-md-2 offset-md-5 colorButtonBox", style= "background-color: '+displayColors[3]+'; color:'+textColor[3]+'"><p>Down</p></div>');
        row3.append(c3);
    }
    else{
        // The first row. (top)
        var c1 = $('<div class="col-md-2 offset-md-4 colorButtonBox", style= "background-color: '+displayColors[0]+'; color:'+textColor[0]+';"><p>Upper Left</p></div>');
        var c1_2 = $('<div class="col-md-2 colorButtonBox", style= "background-color: '+displayColors[1]+'; color: '+textColor[1]+';"><p>Upper Right</p></div>');
        row1.append(c1);
        row1.append(c1_2);

        // The second row. (center)
        var c2 = $('<div class="col-md-2 offset-md-2 colorButtonBox", style= "background-color: '+displayColors[2]+'; color: '+textColor[2]+';"><p>Left</p></div>');
        var c2_2 = $('<div class="col-md-2 offset-md-4 colorButtonBox", style= "background-color: '+displayColors[3]+'; color: '+textColor[3]+';"><p>Right</p></div>');

        row2.append(c2);
        row2.append(c2_2);

        // The bottom row. (bottom)
        var c3 = $('<div class="col-md-2 offset-md-4 colorButtonBox", style= "background-color: '+displayColors[4]+'; color:'+textColor[4]+';"><p>Lower left</p></div>');
        var c3_2 = $('<div class="col-md-2 colorButtonBox", style= "background-color: '+displayColors[5]+'; color: '+textColor[5]+';"><p>Lower Right</p></div>');

        row3.append(c3);
        row3.append(c3_2);

    }


    // Add content to main class.
    $(element).append('<p>Remeber what color goes with what button before starting!</p>');
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

    // Add buttons to hit.
    SetupDirectionButtons($(".MainContent"), selectedColors.length);

    // Create new color to display.
    NewColor(selectedColors.length);

    // Setup update for game timer.
    timer = setInterval(EndCountDown,1000);

}

// This function will set the colorVar to a new value and display to page.
function NewColor(optionLength){
    // Set color to random number between 0 and 3.
    colorVar = Math.floor(Math.random() * optionLength);

    // Add color to screen.
    var textColor = "white";
    if(colorVar == selectedColors.indexOf("yellow"))
        textColor = "black";
    $("#boxText").css('color', textColor);
    $("#boxText").text(selectedColors[colorVar] );
    $("#displayBox").css("background-color", selectedColors[colorVar]);
}

// This function will check if the the first number matches the color value of the second variables and display results onto page.
function CheckColor(num){
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
    NewColor(selectedColors.length);
}

// Clear screen and add game over content to page.
function EndGame(){
        // Reset/stop time related variables.
        clearInterval(timer);

        // Clear screen.
        $(".MainContent").empty();

        $(".MainContent").append("<h1 style='color:red'>Game Over</h1>");
        $(".MainContent").append("<h5>Final Score: "+ score +"</h5>");
        $(".MainContent").append("</br>");
        $(".MainContent").append('<button type="submit" class="btn btn-primary customButton" value="PlayAgain">Play Again</button>');
        $(".MainContent").append('<button type="submit" class="btn btn-primary customButton" value="Directions">Directions</button>');

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

// Shuffle values in array.
function ShuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Setup buttons buttons in game. Amount of buttons depends on passed in size variable(only 4 or 6).
function SetupDirectionButtons(element, size){
    // Setup rows for each direction to display.
    var row1 = $('<div class="row"></div>');
    var row2 = $('<div class="row"></div>');
    var row3 = $('<div class="row"></div>');

    if(size == 4){
        // The first row. (top)
        var c1 = $('<button type="submit" class="col-md-2 offset-md-5 btn btn-dark colorButtonBox" value="Button1">Up</button>');
        row1.append(c1);

        // The second row. (center)
        var c2 = $('<button type="submit"  class="col-md-2 offset-md-3 btn btn-dark colorButtonBox" value="Button2">Left</button>');
        var c2_2 = $('<button type="submit"  class="col-md-2 offset-md-2 btn btn-dark colorButtonBox" value="Button3">Right</button>');
        row2.append(c2);
        row2.append(c2_2);

        // The bottom row. (bottom)
        var c3 = $('<button type="submit"  class="col-md-2 offset-md-5 btn btn-dark colorButtonBox" value="Button4">Down</button>');
        row3.append(c3);
    }
    else{
        // The first row. (top)
        var c1 = $('<button type="submit" class="col-md-2 offset-md-4 btn btn-dark colorButtonBox" value="Button1">Upper Left</button>');
        var c1_2 = $('<button type="submit" class="col-md-2 btn btn-dark colorButtonBox" value="Button2">Upper Right</button>');
        row1.append(c1);
        row1.append(c1_2);

        // The second row. (center)
        var c2 = $('<button type="submit" class="col-md-2 offset-md-2 btn btn-dark colorButtonBox" value="Button3">Left</button>');
        var c2_2 = $('<button type="submit" class="col-md-2 offset-md-4 btn btn-dark colorButtonBox" value="Button4">Right</button>');

        row2.append(c2);
        row2.append(c2_2);

        // The bottom row. (bottom)
        var c3 = $('<button type="submit" class="col-md-2 offset-md-4 btn btn-dark colorButtonBox" value="Button5">Lower Left</button>');
        var c3_2 = $('<button type="submit" class="col-md-2 btn btn-dark colorButtonBox" value="Button6">Lower Right</button>');

        row3.append(c3);
        row3.append(c3_2);
    }

    // Add content to main class.
    element.append("<br>");
    element.append("<br>");
    element.append(row1);
    element.append(row2);
    element.append(row3);
    element.append("<br>");

}