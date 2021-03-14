const startButton = document.getElementById('start-btn')

const nextButton = document.getElementById('next-btn')

const questionContainerElement = document.getElementById('question-card')

const questionElement = document.getElementById('question')

const answerButtonsElement = document.getElementById('answer-buttons')

const timerElement = document.getElementById('timer')

const nameEntryElement = document.getElementById('entry-card')

const scoreCardElement = document.getElementById('score')

const startCardElement = document.getElementById('start-card')



startButton.addEventListener('click', timedLogic)

function timedLogic() {

    let globalScore = 75

    let shuffledQuestions, currentQuestionIndex

    startGame()

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

    var globalTimer = setInterval(function () {
        if (globalScore > 0) {
            globalScore--
            timerElement.innerText = globalScore
        } else {
            clearInterval(globalTimer)
            // show score card and hide all other containers if time runs out
            showScoreCard()
        }
    }, 100)

    function setNextQuestion() {
        clearQuestionContainer()
        showQuestion(shuffledQuestions[currentQuestionIndex])
    }

    function showQuestion(question) {
        questionElement.innerText = question.question
        question.answers.forEach(answer => {
            const button = document.createElement('button')
            button.setAttribute('id', 'btn')
            button.innerText = answer.text

            button.classList.add('btn', 'btn-primary', 'btn-lg', 'btn-block')
            if (answer.correct) {
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
        const correct = selectedButton.dataset.correct
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(selectedButton, selectedButton.dataset.correct)
        })
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide')
        } else {
            // SHOW SCORE CARD HERE
            clearInterval(globalTimer)
            showScoreCard()
        }
    }

    function setStatusClass(element, correct) {
        clearStatusClass(element)
        if (correct) {
            //correct color
            element.classList.add('btn', 'btn-success', 'btn-lg', 'btn-block')
        } else {
            //wrong color
            element.classList.add('btn', 'btn-danger', 'btn-lg', 'btn-block')
        }
        document.querySelectorAll('#btn').forEach(button => {
            button.disabled = true
        })
    }

    function clearStatusClass(element) {
        //correct color
        element.classList.remove('btn', 'btn-success', 'btn-lg', 'btn-block')
        //wrong color
        element.classList.remove('btn', 'btn-danger', 'btn-lg', 'btn-block')
    }

    function showScoreCard() {
        // timerElement.classList.add('hide')
        startCardElement.classList.add('hide')
        questionContainerElement.classList.add('hide')
        nameEntryElement.classList.remove('hide')

        document.getElementById('finalscore').innerText = globalScore

        document.getElementById('name-submit').addEventListener('click', localStorageCard)

    }

    function localStorageCard() {
        nameEntryElement.classList.add('hide')
        scoreCardElement.classList.remove('hide')

    }

    //List of questions
}
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
