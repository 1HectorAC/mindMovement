// Manage state of game.
const GAMESTATE = {
    MENU: 0,
    PLAY: 1,
    GAMEOVER: 2
}

// Manage operation parts need for setting up the option. (element id, checkbox value, element label).
const OPERATION_LIST = [
    ["add", "+", "Addition (+)"],
    ["minus","-"," Subtraction (-)"],
    ["times","*","Multiplication (*)"]
];

var currentState = GAMESTATE.MENU;

// Number of Questions in game.
var numberOfQuestions = 5;

// Max number possible for equation question.
var MaxNumberOption = 9;

// List containing answers to all questions in a game.
var answerList = [];

setupOption();

$("form").submit(function (event) {
    var mainContent = $('#mainContent');

    // If in the menu state then move one to starting game.
    if (currentState == GAMESTATE.MENU) {
        //Setup Number of questions variable.
        numberOfQuestions = parseInt($('#num').val());

        // Resut answerList incase playing again.
        answerList = [];

        var ops = document.getElementsByName("operation");
        var operation = GetOperation(ops);

        for (var i = 0; i < numberOfQuestions; i++) {
            AddEquation(operation, mainContent);
        }

        mainContent.append('<input id="submitAnswer" class="btn btn-primary customButton" type="submit" value="Done">');

        //clear the form
        $('#optionPart').empty();

        currentState = GAMESTATE.PLAY;
    }
    // If Moving on after playing then move on the the gameOver screen.
    else if(currentState == GAMESTATE.PLAY){
        // Remove Submit answers button.
        $('#submitAnswer').remove();

        // Make answer spots unchangable.

        // Add correct statements to equations
        AddCorrectStatements($('.entryFieldClass'));

        // Calculate Results and display.
        mainContent.append('<h1>Total Correct: '+GetAnswerTotal($('.entryFieldClass'))+' out of '+ numberOfQuestions +'</h1>');
        
        mainContent.append('<input id="submitRetry" class="btn btn-primary customButton" type="submit" value="Retry">');
        currentState = GAMESTATE.GAMEOVER;
    }
    // If moving on after gameOver then setup replay.
    else if(currentState == GAMEOVER){
        setupOption();
        mainContent.empty();
        currentState = GAMESTATE.MENU;
    }
    event.preventDefault();

});

//Setup up option selection part at start.
function setupOption(){
    var optionPart = $('#optionPart');
    optionPart.append('<h5>~Enter an option~</h5>');
    optionPart.append('<hr>')

    // Setup operation checkbox options.
    for(i = 0; i < OPERATION_LIST.length; i++){
        // Add 'checked' for first checkbox option.
        if(i==0)
            optionPart.append('<input type="radio" id="'+OPERATION_LIST[i][0]+'" name="operation" value="'+OPERATION_LIST[i][1]+'" checked>');
        else
            optionPart.append('<input type="radio" id="'+OPERATION_LIST[i][0]+'" name="operation" value="'+OPERATION_LIST[i][1]+'">');
        optionPart.append('<label for="'+OPERATION_LIST[i][0]+'">'+OPERATION_LIST[i][2]+'</label><br>');
    }

    // Setup dropdown part.
    var selectSection = $('<select id="num" class="btn btn-secondary" style="margin-bottom:10px"></select>');
    selectSection.append('<option value="5">5 Questions</option>');
    selectSection.append('<option value="10">10 Questions</option>');
    selectSection.append('<option value="15">15 Questions</option>');
    optionPart.append(selectSection);
    optionPart.append('<br><hr>');

    optionPart.append('<input type="submit" value="Submit" class="btn btn-primary customButton">');
}

// Return the operation value that is checked in a checkbox that is passed in.
function GetOperation(opsList) {
    // Loop through every value in list to find the one that is checked and return the value.
    for (i = 0; i < opsList.length; i++) {
        if (opsList[i].checked)
            return opsList[i].value;
    }
    // If none is found then return 0.
    return 0;
}

// Return answer of passed in operation applied to two passed in numbers.
function GetOperationAnswer(one, two, operation) {
    switch (operation) {
        case "+":
            return one + two;
            break;
        case "-":
            return one - two;
            break;
        case "*":
            return one * two;
            break;
        default:
            return one + two;
    }
}

// Add equation question to the passed in element "htmlPlacement".
function AddEquation(operation, htmlPlacement) {
    var one = Math.floor(Math.random() * MaxNumberOption);
    var two = Math.floor(Math.random() * MaxNumberOption);
    var answer = GetOperationAnswer(one, two, operation);

    // Add Equation.
    htmlPlacement.append('<h1 class="equationField">' + one + operation + two + '=</h1>');

    // Add field to enter answer.
    htmlPlacement.append('<input class="entryFieldClass" type="number" min="-99" max="99" required="" >');

    //Add answer to answerList.
    answerList.push(answer);

    htmlPlacement.append("<hr>");

}

// Return total number of answers that match input and actual answer. Note that this is depended on answerList being filled before hand.
function GetAnswerTotal(entryClassList){
    var total = 0;
    for(i = 0; i < entryClassList.length; i++){
        if(entryClassList[i].value == answerList[i]){
            total++;
        }
    }
    return total;
}

// Add "correct" text at end of each equation that was answered correctly. Note that this is depended on answerList being filled before hand.
function AddCorrectStatements(entryClassList){
    for(i = 0; i < entryClassList.length; i++){
        if(entryClassList[i].value == answerList[i]){
            $("<p style='color:green; display:inline; text-size:30px'> Correct!</p>").insertAfter(entryClassList[i]);
        }
    }
}