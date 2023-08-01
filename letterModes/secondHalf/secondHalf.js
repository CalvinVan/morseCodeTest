const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText= document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');






let availableLettersList = ['A','B','C','D','E','F','G','H','I','J','K','L','M']
let matchMorseList = ['o -','- o o o','- o - o','- o o','o','o o - o','- - o','o o o o','o o','o - - -','- o -','o - o o','- -']
let poolMorseList = ['o -','- o o o','- o - o','- o o','o','o o - o','- - o','o o o o','o o','o - - -','- o -','o - o o','- -']




const SCORE_POINTS = 100
const MAX_QUESTIONS = 13

startGame = () => {
 
  questions = []
  questionCounter = 0;
  score = 0;
  getNewQuestion();
}


generateQuestions = () => {
  generateChoices()
  shuffleArray(choiceList)
  setChoices()
  pushQuestion()
  availableLettersList.splice(questionIndex, 1)
  matchMorseList.splice(questionIndex, 1)
    
    
  
}

generateChoices = () => {
  choiceList = []
    choiceListFilled = false;
    questionIndex = Math.floor(Math.random() * availableLettersList.length)
    askQuestion = `What is the Morse Code for ${availableLettersList[questionIndex]} ?`
    askAnswer = matchMorseList[questionIndex]
    choiceList.push(askAnswer)

    while(!choiceListFilled) {
      if(choiceList.length == 4){
        choiceListFilled = true
      }

      else {
        letterIndex = Math.floor(Math.random() * poolMorseList.length)
        choiceAdded = poolMorseList[letterIndex]
        if(!(choiceList.includes(choiceAdded))) {
          choiceList.push(choiceAdded)
        }
      }  
    }
}

setChoices = () => {
  answerIndex = choiceList.indexOf(askAnswer)
  askchoice1 = choiceList[0]
  askchoice2 = choiceList[1]
  askchoice3 = choiceList[2]
  askchoice4 = choiceList[3]
}

pushQuestion = () => {
  questions.push({question: askQuestion,
    choice1: askchoice1,
    choice2: askchoice2,
    choice3: askchoice3,
    choice4: askchoice4,
    answer: (answerIndex+1),})
}

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}


getNewQuestion = () => {
  if(questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);

    return window.location.assign('../../end/morseEnd/secondEnd.html');
  }
  
  generateQuestions()
  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;


  currentQuestion = questions[0]
  question.innerText = currentQuestion.question;
  questions.pop()
  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })



  acceptingAnswers = true;

  choices.forEach(choice => {
    choice.addEventListener('click', e => {
      if(!acceptingAnswers) return
      acceptingAnswers = false
      const selectedChoice = e.target
      const selectedAnswer = selectedChoice.dataset['number']
  
      let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
  
      if(classToApply === 'correct') {
        incrementScore(SCORE_POINTS);
      }
  
      selectedChoice.parentElement.classList.add(classToApply);
  
      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 1000)
    })
  })


}



incrementScore = num => {
  score += num;
  scoreText.innerText = score;
}

startGame();