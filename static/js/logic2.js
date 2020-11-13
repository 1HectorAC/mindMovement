// Manage state of game.
const GAMESTATE = {
    DIRECTIONS: 0,
    START: 1
};
var currentState = GAMESTATE.DIRECTIONS;

// Variable to keep track of current round.
var round = 1;
// Variable used to keep track or random number generated to remember and compare to inputed answer.
var randomString = "";

$("form").submit(function (event) {
    // When going from directions to game, will set up a lot of the display items.
    if (currentState == GAMESTATE.DIRECTIONS) {
        $(".IntroContent").empty();
        $(".MainContent").append('<h5>Level:</h5>');
        $(".MainContent").append('<p id="round">'+round+'</p>')
        $(".MainContent").append('<hr>');
        $(".MainContent").append('<h1 id="displayString"></h1>');
        currentState = GAMESTATE.START;

    }
    // When not in DIRECTION state then will just play game again forever.
    else{
        //
        if(randomString == $('#EnterChar').val()){
            round++;
        }
        else if(round > 1){
            round--;
        }
        $('#round').text(round);
        $('#EnterChar').remove();
        $('#submit').remove();
    }

    // Setup random generated stirng part.
    SetupRandomNumber();

    // Set Timeout to erase displayed string and setup input.
    setTimeout(function () { SetupInputSection(); }, 3000);

    event.preventDefault();

});

// Setup "randomString" variable with a random generated string and add to display.
function SetupRandomNumber() {
    // Setup random generaged string with length depending on round.
    //Note: restrict lowest length of string to 3.
    if (round <= 1)
        randomString = generate_random_string(3);
    else {
        randomString = generate_random_string(round + 2);
    }

    // Setup display of randomString.
    $('#displayString').text(randomString);
}

// Setup parts to accepts inputs in a textbox and a submit button.
function SetupInputSection() {
    $('#displayString').text('');
    $('.MainContent').append('<input name="stuff" class="stuff" id="EnterChar">');
    $('.MainContent').append('<input type="submit" value="Submit" id="submit">');
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

