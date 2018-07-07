var triviaQuestions = [{
	
	question: "What is thought to be the very fist video game?",
	answerList: ["Tetris", "Bertie the Brain", "Pong", "Galaxy Game"],
	answer: 2
},{
	question: "Which video game is the best-selling platform game of all time?",
	answerList: ["Call of Duty", "Tetris", "Super Mario Bros.", "Minecraft"],
	answer: 1
},{
	question: "What inspired the creation of Pac-Man",
	answerList: ["Pie", "Cake", "Turkey Stuffing", "Pizza"],
	answer: 3
},{
	question: "How did the concept of the Pokemon universe come in to fruition?",
	answerList: ["Card Collecting", "Dog Breeding", "Insect Collecting", "Petting Zoo"],
	answer: 2
},{
	question: "Which one listed below is Sony's unofficial tech mascot for PlayStation?",
	answerList: ["Rubber Duckie", "Bunny Rabbit", "Spyro", "Red Ball"],
	answer: 0
},{
	question: "Which field of study is the basis of the Tomb Raider",
	answerList: ["Sociology", "Anthropology", "Archaeology", "History"],
	answer: 2
},{
	question: "Who is Princess Zelda named after",
	answerList: ["Zelda Williams", "Zelda Fitzgerald", "Zelda Spellman", "Zelda Wynn Valdes"],
	answer: 1
},{
	question: "Which celebrity named their child after a character in The Legend of Zelda?",
	answerList: ["Dwayne 'The Rock' Johnson", "Eminem", "Robin Williams", "Jack Black"],
	answer: 2
},{
	question: "Which pro baseball team did Nintendo become majority owner of in 1992?",
	answerList: ["Oakland Athletics", "Seattle Mariners", "Kansas City Royals", "Tampa Bay Rays"],
	answer: 1
},{
	question: "What was Nintendo's original line of business when the company was founded in 1889?",
	answerList: ["Toy Figures", "Marbles", "Paper", "Playing Cards"],
	answer: 3
},{
	question: "Which video game saved the company, Square Enix, from bankruptcy?",
	answerList: ["Dragon Quest", "Kingdom Hearts", "Final Fantasy", "Tomb Raider"],
	answer: 2
},{
	question: "Which one was the first video game based movie?",
	answerList: ["Tomb Raider", "Super Mario Bros", "Resident Evil", "Street Fighter"],
	answer: 1
},{
	question: "Which video game company did Disney team up with to create Kingdom Hearts?",
	answerList: ["Nintendo", "Ubisoft", "Sega", "Square Enix"],
	answer: 3
},{
	question: "Which PC game was delayed in the release because of a hidden picture of the developer's buttocks?",
	answerList: ["Halo 2", "Fortnite", "Minecraft", "Overwatch"],
	answer: 0
},{
	question: "Which planet size is approximately the same as Minecraft?",
	answerList: ["Jupiter", "Earth", "Neptune", "Uranus"],
	answer: 2
}];

var gifArray = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13','q14','q15'];
var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;
var messages = {
	
	correct: "Yay! That's correct!",
	incorrect: "Sorry, that's not it.",
	endTime: "Uh-oh! Times Up",
	finished: "Alright, here's your best score! Want to beat it?"

}

$('#startBtn').on('click', function(){

	$(this).hide();
	newGame();

});

$('#startOverBtn').on('click', function(){

	$(this).hide();
	newGame();

});

function newGame(){

	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();

}

function newQuestion(){

	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();

	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});

}

function countdown(){

	seconds = 25;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	
	time = setInterval(showCountdown, 1000);

}

function showCountdown(){

	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}

}

function answerPage(){

	$('#currentQuestion').empty();
	$('.thisChoice').empty();
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');

	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	

}

function scoreboard(){

	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');

}