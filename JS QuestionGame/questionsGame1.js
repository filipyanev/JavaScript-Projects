
var mainArray = [{question:"What is 2x2?", 	ans1:"4", 	ans2:"3", 	ans3:"13", 	ans4:"42", 	rightAns:"4"},
		{question:"What about 7 ✕ 8?", 	ans1:"58", 	ans2:"3", 	ans3:"13", 	ans4:"56", 	rightAns:"56"},
		{question:"What's 3 ✕ 81?", 	ans1:"216", 	ans2:"243", 	ans3:"213", 	ans4:"421", 	rightAns:"243"},
		{question:"What's 12 ✕ 13?", 	ans1:"154", 	ans2:"156", 	ans3:"213", 	ans4:"144", 	rightAns:"156"},
		{question:"What's 17 ✕ 5?", 	ans1:"78", 	ans2:"83", 	ans3:"103", 	ans4:"85", 	rightAns:"85"},
		{question:"What is 1500 / 4?", 	ans1:"316", 	ans2:"360", 	ans3:"375", 	ans4:"402", 	rightAns:"375"},
		{question:"What about 7 ✕ 8?", 	ans1:"58", 	ans2:"3", 	ans3:"13", 	ans4:"56", 	rightAns:"56"},
		{question:"What's 81 - 7?", 	ans1:"75", 	ans2:"73", 	ans3:"74", 	ans4:"76", 	rightAns:"74"},
		{question:"What's 12 ✕ 13?", 	ans1:"154", 	ans2:"156", 	ans3:"213", 	ans4:"144", 	rightAns:"156"},
		{question:"What's 17 ✕ 5?", 	ans1:"78", 	ans2:"83", 	ans3:"103", 	ans4:"85", 	rightAns:"85"},
		{question:"What about 7 ✕ 8?", 	ans1:"58", 	ans2:"3", 	ans3:"13", 	ans4:"56", 	rightAns:"56"},
		{question:"What's 3 ✕ 81?", 	ans1:"216", 	ans2:"243", 	ans3:"213", 	ans4:"421", 	rightAns:"243"},
		{question:"What's 12 ✕ 13?", 	ans1:"154", 	ans2:"156", 	ans3:"213", 	ans4:"144", 	rightAns:"156"},
		{question:"What's 17 ✕ 5?", 	ans1:"78", 	ans2:"83", 	ans3:"103", 	ans4:"85", 	rightAns:"85"},
		{question:"What about 7 ✕ 8?", 	ans1:"58", 	ans2:"3", 	ans3:"13", 	ans4:"56", 	rightAns:"56"},
		{question:"What's 3 ✕ 81?", 	ans1:"216", 	ans2:"243", 	ans3:"213", 	ans4:"421", 	rightAns:"243"},
		{question:"What's 12 ✕ 13?", 	ans1:"154", 	ans2:"156", 	ans3:"213", 	ans4:"144", 	rightAns:"156"},
		{question:"What's 17 ✕ 5?", 	ans1:"78", 	ans2:"83", 	ans3:"103", 	ans4:"85", 	rightAns:"85"},
		{question:"What about 7 ✕ 8?", 	ans1:"58", 	ans2:"3", 	ans3:"13", 	ans4:"56", 	rightAns:"56"},
		{question:"What's 3 ✕ 81?", 	ans1:"216", 	ans2:"243", 	ans3:"213", 	ans4:"421", 	rightAns:"243"},
		{question:"What's 12 ✕ 13?", 	ans1:"154", 	ans2:"156", 	ans3:"213", 	ans4:"144", 	rightAns:"156"},
		{question:"What's 17 ✕ 5?", 	ans1:"78", 	ans2:"83", 	ans3:"103", 	ans4:"85", 	rightAns:"85"},
		{question:"What about 7 ✕ 8?", 	ans1:"58", 	ans2:"3", 	ans3:"13", 	ans4:"56", 	rightAns:"56"},
		{question:"What's 3 ✕ 81?", 	ans1:"216", 	ans2:"243", 	ans3:"213", 	ans4:"421", 	rightAns:"243"},
		{question:"What's 12 ✕ 13?", 	ans1:"154", 	ans2:"156", 	ans3:"213", 	ans4:"144", 	rightAns:"156"},
		{question:"What's 17 ✕ 5?", 	ans1:"78", 	ans2:"83", 	ans3:"103", 	ans4:"85", 	rightAns:"85"}];

var currQuestion;

var currAnswer;


var arrSize=mainArray.length;
var userAnswer;
var rightAnswerCounter = 0;
var wrongAnswerCounter = 0;
var maxMoves= mainArray.length;
var movesCounter= 0;
var currText;
var currAnswerStatus;
var currLeftWidth = 49;
var currRightWidth = 49;

	document.getElementById("ans1").disabled = true;	
	document.getElementById("ans2").disabled = true;
	document.getElementById("ans3").disabled = true;	
	document.getElementById("ans4").disabled = true;
	document.getElementById("raCounter").style.display = 'none';  
	document.getElementById("waCounter").style.display = 'none'; 
	document.getElementById("leftSide").style.visibility = "hidden";
	document.getElementById("rightSide").style.visibility = "hidden";
	document.getElementById("exit").style.visibility = "hidden";



function checkMovesCounter(){
	if(movesCounter == maxMoves){
		document.getElementById("ans1").disabled = true;	
		document.getElementById("ans2").disabled = true;
		document.getElementById("ans3").disabled = true;	
		document.getElementById("ans4").disabled = true;
		document.getElementById("exit").style.visibility = "hidden";
		document.getElementById("raCounter").style.display = "none";  
		document.getElementById("waCounter").style.display = "none"; 
		document.getElementById("headerTitle").style.display = "block"; 
		if (rightAnswerCounter >=wrongAnswerCounter){
			document.getElementById("questionParagraph").innerHTML='no more questions...sorry';
			document.getElementById("headerTitle").innerHTML = "not so bad!" + "<br />" + "your score: " + (rightAnswerCounter/wrongAnswerCounter).toFixed(2);
			document.getElementById("header").style.backgroundImage = "url('nice.gif')";
			document.getElementById("header").style.height = "70%";
			document.getElementById("header").style.backgroundRepeat = "no-repeat";
			document.getElementById("header").style.backgroundSize = "cover";
			document.getElementById("qAndAZone").style.display = "none"; 
			document.getElementById("header").style.marginTop = "5%";
		} else {
			document.getElementById("questionParagraph").innerHTML='no more questions...sorry';
			document.getElementById("headerTitle").innerHTML = "Loser"+ "<br />" + "your score: " + (rightAnswerCounter/wrongAnswerCounter).toFixed(2);
			document.getElementById("header").style.backgroundImage = "url('bad2.gif')";
			document.getElementById("header").style.height = "70%";
			document.getElementById("header").style.backgroundRepeat = "no-repeat";
			document.getElementById("header").style.backgroundSize = "cover";
			document.getElementById("qAndAZone").style.display = "none"; 
			document.getElementById("header").style.marginTop = "5%";
		}
	}
}

function getIndex(){
	var freeIndex = Math.floor(Math.random()*arrSize);
   
	
	if (mainArray[freeIndex] === 0){
      
  		while (mainArray[freeIndex] === 0) {
          
  		freeIndex = Math.floor(Math.random()*arrSize);
  
      		} 
	} else {	
		return freeIndex;
	}
	return freeIndex;
}
function exitGame(){
		document.getElementById("ans1").disabled = true;	
		document.getElementById("ans2").disabled = true;
		document.getElementById("ans3").disabled = true;	
		document.getElementById("ans4").disabled = true;
		document.getElementById("raCounter").style.display = 'none';  
		document.getElementById("waCounter").style.display = 'none'; 
		document.getElementById("headerTitle").style.display = 'block'; 
		if (rightAnswerCounter >=wrongAnswerCounter){
			document.getElementById("questionParagraph").innerHTML='';
			document.getElementById("headerTitle").innerHTML = "not so bad!" + "<br />" + "your score: " + (rightAnswerCounter/wrongAnswerCounter).toFixed(2);
		} else {
			document.getElementById("headerTitle").innerHTML = "Loser"+ "<br />" + "your score: " + (rightAnswerCounter/wrongAnswerCounter).toFixed(2);
			document.getElementById("questionParagraph").innerHTML='';
		}
}
	
function checkAnswer(userAns) {
	if (userAns == currAnswer.toLowerCase()) {	
		console.log("right");
		rightAnswerCounter++;	
		currAnswerStatus = "true";		
		currLeftWidth = currLeftWidth + 2;
		currRightWidth = currRightWidth - 2;
		let leftWidthStr = currLeftWidth + "%";
		let rightWidthStr = currRightWidth + "%"; 
		document.getElementById("leftSide").style.width =leftWidthStr;
		document.getElementById("rightSide").style.width =rightWidthStr;
	} else {		
		wrongAnswerCounter++;
		console.log("wrong");
		currAnswerStatus = "false";	
		currLeftWidth = currLeftWidth - 2;
		currRightWidth = currRightWidth + 2;
		let leftWidthStr = currLeftWidth + "%";
		let rightWidthStr = currRightWidth + "%"; 
		document.getElementById("leftSide").style.width =leftWidthStr;
		document.getElementById("rightSide").style.width =rightWidthStr;	
	}
}

function setQuestion(number) {

	currQuestion = mainArray[number].question; 
	currAnswer = mainArray[number].rightAns;	
	document.getElementById("questionParagraph").innerHTML=currQuestion;
	
	document.getElementById("ans1").innerHTML=mainArray[number].ans1;	
	document.getElementById("ans2").innerHTML=mainArray[number].ans2;
	document.getElementById("ans3").innerHTML=mainArray[number].ans3;	
	document.getElementById("ans4").innerHTML=mainArray[number].ans4;			  
 	 

	mainArray[number] = 0;
    
	document.getElementById("startButton").style.display="none";
	
	document.getElementById("ans1").disabled = false;	
	document.getElementById("ans2").disabled = false;
	document.getElementById("ans3").disabled = false;	
	document.getElementById("ans4").disabled = false;

	document.getElementById("raCounter").style.display = 'block';  
	document.getElementById("waCounter").style.display = 'block'; 
	document.getElementById("leftSide").style.visibility = "visible";
	document.getElementById("rightSide").style.visibility = "visible";
	document.getElementById("headerTitle").style.display = 'none'; 
	document.getElementById("raCounter").innerHTML = "right "+ rightAnswerCounter + " :";
	document.getElementById("waCounter").innerHTML = " " + wrongAnswerCounter + " wrong";

	movesCounter++;

}
function buttonFunc() {
	checkAnswer(userAnswer);
	currText = document.getElementById("chronology").innerHTML;
	document.getElementById("chronology").innerHTML = currText +"<br />"+ "<hr />" + "{ "+ currQuestion +"_ "+ userAnswer +" _" + currAnswerStatus + " }" ;
	setQuestion(getIndex());
	document.getElementById("startButton").style.display="none";
	checkMovesCounter();	
}
function buttonOne() {
	userAnswer = document.getElementById("ans1").innerHTML;
	buttonFunc();
}
function buttonTwo() {
	userAnswer = document.getElementById("ans2").innerHTML;
	buttonFunc();
}
function buttonThree() {
	userAnswer = document.getElementById("ans3").innerHTML;
	buttonFunc();	
}
function buttonFour() {
	userAnswer = document.getElementById("ans4").innerHTML;
	buttonFunc();
}










   




    

