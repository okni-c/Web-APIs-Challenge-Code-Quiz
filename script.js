const startButton = document.getElementById('start-btn')

const nextButton = document.getElementById('next-btn')

const questionContainerElement = document.getElementById('question-card')

const questionElement = document.getElementById('question')

const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)

nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    clearQuestionContainer()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text

        button.classList.add('btn', 'btn-outline-primary', 'btn-lg', 'btn-block')
        if (answer.corrent) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function clearQuestionContainer() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    debugger
    const correct = selectedButton.dataset.correct
    console.log()
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(selectedButton, selectedButton.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide')
    } else {
    // SHOW SCORE HERE
      startButton.innerText = 'Restart'
      startButton.classList.remove('hide')
    }
  }

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        //correct color
        element.classList.add('btn', 'btn-success', 'btn-lg', 'btn-block')
        //add to score
        setScore()
    } else {
        //wrong color
        element.classList.add('btn', 'btn-danger', 'btn-lg', 'btn-block')
        console.log('Adding wrong class')
        console.log(correct)
        //subtract from score and 10 sec on timer
    }
}

function clearStatusClass(element) {
    //correct color
    element.classList.remove('btn', 'btn-success', 'btn-lg', 'btn-block')
    //wrong color
    element.classList.remove('btn', 'btn-danger', 'btn-lg', 'btn-block')
}

function setScore() {

}

//List of questions

const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    },
    {
        question: 'Who is the best YouTuber?',
        answers: [
            { text: 'Web Dev Simplified', correct: true },
            { text: 'Traversy Media', correct: true },
            { text: 'Dev Ed', correct: true },
            { text: 'Fun Fun Function', correct: true }
        ]
    },
    {
        question: 'Is web development fun?',
        answers: [
            { text: 'Kinda', correct: false },
            { text: 'YES!!!', correct: true },
            { text: 'Um no', correct: false },
            { text: 'IDK', correct: false }
        ]
    },
    {
        question: 'What is 4 * 2?',
        answers: [
            { text: '6', correct: false },
            { text: '8', correct: true }
        ]
    }
]