// Variable to keep track of current round.
var round = 1;
var hightestRound = round;

// Variable used to keep track or random number generated to remember and compare to inputed answer.
var randomString = "";

// Variable used to setup interval timer.
var timer;

// Variables used to set time.
var maxCountDownTime = 2;
var countDownTime = maxCountDownTime;
// Affects rate at which time will change. Value depends on difficulty set.
var timeChangeRate = 1;

var maxLives = 1;
var lives = maxLives;

var skips = 2;

DirectionsScreen($(".MainContent"));

$("body").on('click', 'button', function(ev) {
    ev.preventDefault()
    if ($(this).attr("value") == "Play") {
        var difficulty = $('#difficulty').val();

        $(".MainContent").empty();

        if(difficulty == "Easy"){
            maxLives = 3;
            lives = maxLives;
            timeChangeRate = .5;

        }
        else if(difficulty == "Hard"){
            maxLives = 2;
            lives = maxLives;
            timeChangeRate = 2;
            
        }

        // Set Round. Important for restarting game.
        round = 1;
        hightestRound = round;

        var gameVars = $("<div id='gameVars'>");
        gameVars.append("<div style='width:50%; display: inline-block;'>Lives:<br><p id='lives'>"+ lives + "</p></div>");
        gameVars.append("<div style='width:49%; display: inline-block;'>Round:<br><p id='round'>" + round + "</p></div>");
        $(".MainContent").append(gameVars);
        $(".MainContent").append('<hr>');        

        TempStringDisplaySetup($(".MainContent"));
    }
    if ($(this).attr("value") == "SubmitAnswer") {
        var enteredString = $('#EnterChar').val();

        // Add check for empty string and prevent moving forward until something is entered.
        if(enteredString == ""){
            $("#stringWarning").text("Please enter something.");
        }
        else{
            $(".inputSection").remove();

            // Hit or miss check.
            if(randomString == enteredString){
                // Update display of variables.
                $('#round').text(++round);
                if(round > hightestRound)
                    hightestRound = round;
                
                // Setup for another round.
                TempStringDisplaySetup($(".MainContent"));
            }
            else{
                // Update display of variables.
                $("#lives").text(--lives);
                if(round > 1){
                    $('#round').text(--round);
                }
    
                // GameOver Check.
                if(lives <= 0){
                    ResultsScreen($(".MainContent"),enteredString,"GameOver");
                }
                else{
                    // Add results screen to compare answer with actual answer.
                    ResultsScreen($(".MainContent"),enteredString,"AfterLoss");
    
                }
            }
        }
    }
    if ($(this).attr("value") == "AfterLoss") {
        $('#resultItems').remove();
        TempStringDisplaySetup($(".MainContent"));
    }
    
    if ($(this).attr("value") == "Instructions") {
        $(".MainContent").empty();
        DirectionsScreen($(".MainContent"));
    }
    if ($(this).attr("value") == "PlayAgain") {
        // Remove game over screen items.
        $("#gameOverItems").remove();

        // Reset settings.
        lives = maxLives;
        round = 1;
        hightestRound = round;

        // Reset display variables.
        var gameVars = $("<div id='gameVars' class='row'>");
        gameVars.append("<div class='col-md-2'>Lives:<br><p id='lives'>"+ lives + "</p></div>");
        gameVars.append("<div class='offset-md-8 col-md-2'>Round:<br><p id='round'>" + round + "</p></div>");
        $(".MainContent").append(gameVars);
        $(".MainContent").append('<hr>');

        TempStringDisplaySetup($(".MainContent"));
    }

    if ($(this).attr("value") == "GameOver") {
        $(".MainContent").empty();
        
        EndGameScreen($(".MainContent"));
    }

    if ($(this).attr("value") == "Skip") {
        skips--;
        $(".inputSection").remove();
        TempStringDisplaySetup($(".MainContent"));
    }
});

// Setup items for directions screen.
function DirectionsScreen(element){
    var leftSide = $('<div class="jumbotron" style="background-color:#1b4ffa;color:white"></div>');
    var rightSide = $('<div class="jumbotron" style="background-color:white;color:#1b4ffa"></div>');

    leftSide.append("<h4>-Description-</h4>");
    leftSide.append("<hr class='whiteLine'>");
    leftSide.append("<p>Memorize the string of characters and type it into the text box!</p>");
 
    // Collapsable accoridon for direction sections.
    var accordion = $('<div id="accordion"></div>');
    var playString = "A string of characters and a countdown will appear. When the countdown reaches 0 the string will be gone and a text box will appear.</br></br> It is your job to type the string of characters shown before.</br></br>If you get it right then the round will go up. If you get it wrong then you will lose a live and go down a round (assuming it isn't round 1.)</br></br>Note: Length of the string will depend on the round. You also get 2 skips to generate a different string.";
    CollapsableSinglePanel(accordion, "How to Play", playString, "collapse1");

    var endString = "After all lives are gone you will be shown the results. The results will display the highest round you reached.";
    CollapsableSinglePanel(accordion, "End of Game", endString, "collapse2");

    var settingsString = "<u>Difficulty:</u> This will affect the number of lives and how fast the time you get to memorize the string will increase after each round."
    CollapsableSinglePanel(accordion, "Settings", settingsString, "collapse3");

    leftSide.append(accordion);

    // Setup dropdown for difficulty settings.
    rightSide.append('<h4>-Settings-</h4>');
    rightSide.append("<hr class='blueLine'>");
    rightSide.append('<h5>-Difficulty-</h5>');
    var selectSection = $('<select id="difficulty" class="btn btn-secondary"></select>');
    selectSection.append('<option value="Easy"> Easy (3 Lives, More Time)</option>');
    selectSection.append('<option value="Hard"> Hard (2 Lives, Less Time)</option>');
    rightSide.append(selectSection);
    
    rightSide.append("<hr>");
    rightSide.append('<button type="submit" class="btn btn-primary customButton" value="Play">Play</button>');
    
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

// Setup screen for temporary string display. This includes timer to start next part.
function TempStringDisplaySetup(element){
    // Need to setup randomString for display. Will also be used later to compare with a answer of user.
    randomString = SetupRandomString(round+ 2);
    
    // Reset Timer for removing temp string portion display.
    countDownTime = Math.ceil(round / timeChangeRate) + 2;

    var displayElements = $('<div id="tempDisplay"></div>')
    displayElements.append('<p id="reminder" style="margin-bottom: 2px">Remember string below!</p>');
    displayElements.append('<h1 id="displayString">'+ randomString +'</h1>');
    displayElements.append('<p id="timer" class="roundButton">'+countDownTime+'</p>');
    
    element.append(displayElements);

    // Setup interval timer to display how long displayed string will stray on screen.
    timer = setInterval(CountDownAction,1000);
}

// Function used to lower countDownTime and display it unless time hits 0 in which case it resets it and takes end of time actions.
function CountDownAction(){
    countDownTime--;
    // If countDownTime is more than 0 then display it.
    if(countDownTime > 0){
        $('#timer').text(countDownTime);
    }
    // Clear/Reset items relating to the timer and take end of time action.
    else{
        // Removes items like temp string, reminder, timer.
        $('#tempDisplay').remove();
        
        clearInterval(timer);

        // Added senction for input.
        SetupInputSection($('.MainContent'));
        
    }
}

// Setup parts to accepts inputs in a textbox and a submit button.
function SetupInputSection(element) {
    // Setup items to add to display.
    var inputSection = $('<div class="inputSection"/>');
    inputSection.append('<input  class="form-control" id="EnterChar" style="width:50%;display: inline-block; font-size: 30px; text-align:center" placeholder="Enter string here!" maxlength="50">');
    inputSection.append('</br>');

    // Add submit answer button.
    inputSection.append('<button type="submit" value="SubmitAnswer" id="submit" class="btn btn-primary customButton" style="Margin-top:10px">Enter</button>');
    
    // Add skip button. Need to disable if no more skips left.
    if(skips <= 0)
        inputSection.append('<button type="submit" value="Skip" class="btn btn-primary customButton" style="Margin-top:10px" disabled>Skip ('+skips+')</button>');
    else
        inputSection.append('<button type="submit" value="Skip" class="btn btn-primary customButton" style="Margin-top:10px">Skip ('+skips+')</button>');
    
    // Empty string warning. Just adding placement.
    inputSection.append('<p id="stringWarning" style="color:red"><p>');

    element.append(inputSection);
}

// Setup items for results screen. element in the html element to add items. inputedChar if for display. buttonValue affect where the button will lead to.
function ResultsScreen(element, inputedChar, buttonValue){
    var resultItems = $('<div id="resultItems"></div>');
    resultItems.append('<p id="hitMessage" style="font-size:20px; margin-bottom: 2px; color:red">Miss</p>');

    resultItems.append('<h5>Answer: '+randomString+'</h5>');

    var indexPoint = DifferenceIndex(randomString,inputedChar);

    var correctString;
    var incorrectString;
    // Case where shortest string matches with start of longest string.
    if(indexPoint == -1){
        correctString = inputedChar;
        incorrectString = "";
    }
    // Case where shortest string didn't matches with start of longest string.
    else{
        correctString = inputedChar.substring(0,indexPoint);
        incorrectString = inputedChar.substring(indexPoint, inputedChar.length);
    }
    // Add indication that inputedChar string was too short with "_".
    if(inputedChar.length < randomString.length){
        var lengthDif = randomString.length - inputedChar.length;
        incorrectString+= "_".repeat(lengthDif) ;
    }
    resultItems.append('<h5>Your Answer: '+correctString+'<span style="color:red">'+incorrectString+'</span></h5>');

    resultItems.append('<button type="submit" value="'+buttonValue+'" id="submit" class="btn btn-primary customButton" style="Margin-top:10px">Next</button>');
    element.append(resultItems);
}

// Setup items for end game screen.
function EndGameScreen(element){
    var endGameItems = $('<div id="gameOverItems"></div>');
    endGameItems.append('<h1 style="color:red">Game Over</h1>');
    endGameItems.append('<h5>Highest Round Reached: '+hightestRound+'</h5>');
    endGameItems.append('<button type="submit" value="PlayAgain" class="btn btn-primary customButton" style="Margin-top:10px">Retry</button>');
    endGameItems.append('<button type="submit" value="Instructions" class="btn btn-primary customButton" style="Margin-top:10px">Directions</button>');

    element.append(endGameItems);
}

// Return a randomly generated string of a length based on passed value.
// Note that the shortest string length is 3.
function SetupRandomString(length) {
    // Setup random generaged string with length depending on round.
    //Note: restrict lowest length of string to 3.
    if (length <= 3)
        return generate_random_string(3);
    else {
        return generate_random_string(length);
    }
}

// Generate a string with random characters of string_length.
function generate_random_string(string_length) {
    let random_string = '';
    let random_ascii;
    // cap: 65-90
    // lower:97-122
    let ascii_low = 97;
    let ascii_high = 122;
    for (let i = 0; i < string_length; i++) {
        random_ascii = Math.floor((Math.random() * (ascii_high - ascii_low)) + ascii_low);
        random_string += String.fromCharCode(random_ascii);
    }
    return random_string
}

// Compare two strings and return the index point at which they match up the the length of the shortest lenght.
function DifferenceIndex(s1, s2){
    var index = 0;
    var shortestLength = (s1.length < s2.length) ? s1.length: s2.length;
    for(i = 0; i < shortestLength;i++){
        if(s1[i] == s2[i]){
            index++;
        }
        else{
            return index;
        }
    }
    // Assumes all values match comparing shortest string to all/start of other string.
    return -1;
}