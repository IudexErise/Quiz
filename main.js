const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option');

const question = document.querySelector('#question');

const numberOfQuestion = document.querySelector('#number-of-question');
const numberOfAllQuestions = document.querySelector('#number-of-all-questions');

let indexOfQuestion;
let indexOfPage = 0;

const answersTracker = document.querySelector('#answers-tracker');
const btnNext = document.querySelector('#btn-next');

let score = 0;

const correctAnswer = document.querySelector('#correct-answer');
const numberOfAllQuestions2 = document.querySelector('#number-of-all-questions-2');
const btnTryAgain = document.querySelector('#btn-try-again');

const questions = [
    {
        question: '2+2=?',
        options: [
            '22',
            '2',
            '4',
            'кот',
        ],
        rightAnswer: 2,
    },
    {
        question: '2+2*2=?',
        options: [
            '8',
            '222',
            '24',
            '6',
        ],
        rightAnswer: 3,
    },
    {
        question: '2*2/2=?',
        options: [
            '1',
            '4',
            '2',
            '0',
        ],
        rightAnswer: 2,
    },
    {
        question: '2+2+2+2+2*2=?',
        options: [
            '22224',
            '12',
            '20',
            '14',
        ],
        rightAnswer: 1,
    }      
];

numberOfAllQuestions.innerHTML = questions.length;

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1;
    indexOfPage++;
};

let completedAnwers = [];

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false;

    if(indexOfPage == questions.length) {
        quizOver()
    } else {
        if(completedAnwers.length > 0) {
            completedAnwers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnwers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnwers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
};

for (option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
};

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
}

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
}

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`)
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) {
        alert('Пожалуйста, дайте ответ на вопрос.');
    } else {
        randomQuestion();
        enableOptions();
    }
}

const quizOver = () => {
   document.querySelector('.quiz-over-modal').classList.add('active');
   correctAnswer.innerHTML = score;
   numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
})