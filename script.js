const startButton = document.getElementById('start-btn')

const nextButton = document.getElementById('next-btn')

const questionContainerElement = document.getElementById('question-card')

const questionElement = document.getElementById('question')

const answerButtonsElement = document.getElementById('answer-buttons')

const timerElement = document.getElementById('timer')

const nameEntryElement = document.getElementById('entry-card')

const scoreCardElement = document.getElementById('score')

const startCardElement = document.getElementById('start-card')

const userNameSpan = document.getElementById('username')

const userScoreSpan = document.getElementById('highscore')

var submitButton = document.querySelector('#name-submit');

startButton.addEventListener('click', timedLogic)

function timedLogic() {

    let globalScore = 75

    if (globalScore === 0) {
        clearInterval(globalTimer)
        showScoreCard()
    }

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
    }, 1000)

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
            button.addEventListener('click', answerCheck)
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

    function answerCheck(e) {
        console.log("answer check running")
        const selectedButton = e.target
        const correct = selectedButton.dataset.correct
        // remove points if answer choice is false
        if (correct) {
        } else {
            removePoints()
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target
        const correct = selectedButton.dataset.correct
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(selectedButton, selectedButton.dataset.correct)
        })
        // Shows score card when out of questions
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide')
        } else {
            // show score card when out of questions
            // wait 1 second for timer to catch up with score decriment if the last question is answered wrong
            setTimeout(function () {
                clearInterval(globalTimer)
                showScoreCard()
            }, 1000);
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
        // disable all buttons when one is clicked
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
        startCardElement.classList.add('hide')
        questionContainerElement.classList.add('hide')
        nameEntryElement.classList.remove('hide')
        document.getElementById('finalscore').innerText = globalScore
        document.getElementById('name-submit').addEventListener('click', localStorageCard)
    }

    submitButton.addEventListener('click', function (event) {
        event.preventDefault()
        var name = document.querySelector('#input-name').value
        var score = globalScore
        console.log(document.querySelector('#finalscore').value)
        if (name === '') {
            displayMessage('error', 'Name cannot be blank')
        }
        localStorage.setItem('username', name)
        localStorage.setItem('finalscore', score)
        localStorageCard()
    })

    // document.getElementById('show-board').addEventListener('click', localStorageCard)

    function localStorageCard() {
        timerElement.innerText = globalScore
        nameEntryElement.classList.add('hide')
        scoreCardElement.classList.remove('hide')
        var name = localStorage.getItem('username')
        var score = localStorage.getItem('finalscore')
        if (name === null || score === null) {
            return
        }
        userNameSpan.textContent = name
        userScoreSpan.textContent = score
    }

    function removePoints() {
        globalScore = globalScore - 10
    }

    //List of questions
}


const questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: [
            { text: '<javascript>', correct: false },
            { text: '<js>', correct: false },
            { text: '<script>', correct: true },
            { text: '<scripting>', correct: false }
        ]
    },
    {
        question: 'What is the correct JavaScript syntax to write "Hello World"?',
        answers: [
            { text: 'response.write("Hello World")', correct: false },
            { text: '"Hello World"', correct: false },
            { text: 'document.write("Hello World")', correct: true },
            { text: '("Hello World")', correct: false }
        ]
    },
    {
        question: 'Where is the correct place to insert a JavaScript?',
        answers: [
            { text: 'Both the <head> section and the <body> section are correct', correct: true },
            { text: 'The <body> section', correct: false },
            { text: 'The <head> section', correct: false },
            { text: 'IDK', correct: false }
        ]
    },
    {
        question: 'An external JavaScript must contain the <script> tag',
        answers: [
            { text: 'True', correct: false },
            { text: 'False', correct: true }
        ]
    },
    {
        question: 'How do you create a function?',
        answers: [
            { text: 'function:myFunction()', correct: false },
            { text: 'function=myFunction()', correct: false },
            { text: 'function myFunction()', correct: true },
            { text: 'myFunction():function', correct: false }
        ]
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        answers: [
            { text: 'alert("Hello World")', correct: true },
            { text: 'msgBox("Hello World")', correct: false },
            { text: 'alertBox="Hello World"', correct: false },
            { text: 'alertBox("Hello World")', correct: false }
        ]
    },
    {
        question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
        answers: [
            { text: '<script src="xxx.js">', correct: true },
            { text: '<script name="xxx.js">', correct: false },
            { text: '<script href="xxx.js">', correct: false },
            { text: '<script value="xxx.js">', correct: false }
        ]
    }
]
