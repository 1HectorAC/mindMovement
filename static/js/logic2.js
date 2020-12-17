// Manage state of game.
const GAMESTATE = {
    DIRECTIONS: 0,
    START: 1,
    LOAD: 2
};
var currentState = GAMESTATE.DIRECTIONS;

// Variable to keep track of current round.
var round = 1;
var hightestRound = 1;

// Variable used to keep track or random number generated to remember and compare to inputed answer.
var randomString = "";

// Variable used to setup interval timer.
var timer;

// Variables used to set time.
var maxCountDownTime = 3;
var countDownTime = 3;

var maxLives = 3;
var lives = 3;

DirectionsScreen();

$("form").submit(function (event) {
    // When going from directions to game, will set up a lot of the display items.
    if (currentState == GAMESTATE.DIRECTIONS) {
        $(".MainContent").empty();

        var gameVars = $("<div id='gameVars' class='row'>");
        gameVars.append("<div class='col-md-2'>Lives:<br><p id='lives'>"+ lives + "</p></div>");
        gameVars.append("<div class='offset-md-8 col-md-2'>Level:<br><p id='round'>" + round + "</p></div>");
        $(".MainContent").append(gameVars);

        $(".MainContent").append('<hr>');
        $(".MainContent").append('<p id="hitMessage" style="font-size:20px; margin-bottom: 2px"></p>');
        $(".MainContent").append('<p id="reminder" style="margin-bottom: 2px"></p>');
        $(".MainContent").append('<h1 id="displayString"></h1>');
        
        TempStringDisplaySetup();

        currentState = GAMESTATE.START;
    }
    // When not in DIRECTION state then will just play game again forever.
    else if (currentState  == GAMESTATE.START) {
        if(randomString == $('#EnterChar').val()){
            $("#round").css("color", "green");
            $("#hitMessage").text("Correct!");
            $("#hitMessage").css("color", "green");
            $("#reminder").css("color", "green");
            round++;
            $('#round').text(round);
            if(round > hightestRound)
                hightestRound = round;
        }
        else{
            lives--;
            $("#lives").text(lives);

            $("#hitMessage").text("Miss");
            $("#round").css("color", "red");
            $("#hitMessage").css("color", "red");
            $("#reminder").css("color", "red");
            if(round > 1){
                round--;
                $('#round').text(round);
            }
            
        }

        // Game over check.
        if(lives > 0){
            currentState = GAMESTATE.LOAD;
            var inputedChar = $('#EnterChar').val();
            $('.inputSection').remove();

            // Add results screen to compare answer with actual answer.
            ResultsScreen(inputedChar);
        }
        else{
            currentState = GAMESTATE.DIRECTIONS;
            $(".MainContent").empty();
            $(".MainContent").append(EndGameScreen());

            // Reset a few variables for if playing again.
            lives = maxLives;
            hightestRound = 1;
            round = 1;

            
        }
    }
    else if(currentState == GAMESTATE.LOAD){
        $('#resultItems').remove();
        $('#hitMessage').text('');

        TempStringDisplaySetup();
        currentState = GAMESTATE.START;


    }
    else{
        $(".MainContent").empty();
    }



    event.preventDefault();

});

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

// Setup parts to accepts inputs in a textbox and a submit button.
function SetupInputSection() {
    //Setup items to add to display.
    var inputSection = $('<div class="inputSection"/>');
    inputSection.append('<input name="stuff" class="form-control" id="EnterChar" style="width:50%;display: inline-block; font-size: 30px; text-align:center" placeholder="Enter string here!">');
    inputSection.append('</br>');
    inputSection.append('<input type="submit" value="Submit" id="submit" class="btn btn-primary customButton" style="Margin-top:10px">');
    return inputSection;    
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
        $('#timer').remove();
        clearInterval(timer);
        countDownTime = maxCountDownTime;

        // Clear a few items beforehand.
        $('#reminder').text('');
        $('#displayString').text('');

        $('.MainContent').append(SetupInputSection());
        
    }
}

// Setup screen for temporary string display. This includes timer to start next part.
function TempStringDisplaySetup(){
    $(".MainContent").append('<p id="timer" class="roundButton"></p>');
    $("#reminder").text("Remember string below!");

    // Setup random generated string part.
    randomString = SetupRandomString(round+ 2);
    $('#displayString').text(randomString);

    // Setup interval timer to display how long displayed string will stray on screen.
    $('#timer').text(countDownTime);
    timer = setInterval(CountDownAction,1000);
}

// Setup items for end game screen.
function EndGameScreen(){
    var endGameItems = $('<div></div>');
    endGameItems.append('<h1 style="color:red">Game Over</h1>');
    endGameItems.append('<h5>Highest Round Reached: '+hightestRound+'</h5>');
    endGameItems.append('<input type="submit" value="Retry" class="btn btn-primary customButton" style="Margin-top:10px">');

    return endGameItems;
}

// Setup items for directions screen.
function DirectionsScreen(){
    var screenItems = $("<div></div>");
    screenItems.append("<h5>-Instructions-</h5>");
    screenItems.append("<p>A Character string will appear and disapear in a few seconds. Rememeber the string and type it in the box that appears afterwards. Larger strings will be displayed after every correct answer. Wrong answers will make the strings shorter (if the the string is larger than three characters.)</p>");
    screenItems.append('<input type="submit" class="btn btn-primary customButton" value="Play">');
    $(".MainContent").append(screenItems);
}

// Setup items for results screen.
function ResultsScreen(inputedChar){
    var resultItems = $('<div id="resultItems"></div>');
    resultItems.append('<h5>Answer: '+randomString+'</h5>');
    resultItems.append('<h5>Your Answer: '+inputedChar+'</h5>');
    resultItems.append('<input type="submit" value="Next" id="submit" class="btn btn-primary customButton" style="Margin-top:10px">');
    $(".MainContent").append(resultItems);
}