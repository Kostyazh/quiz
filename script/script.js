document.addEventListener('DOMContentLoaded', function () {
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const prevButton = document.querySelector('#prev');
    const burgerBtn = document.querySelector('#burger');
    const sendButton = document.querySelector('#send');
    const modalTitle = document.querySelector('.modal-title');
    const nextButton = document.querySelector('#next');

    // const getData = () => {
    //   fetch('http://127.0.0.1:3293/questions.json')
    //   .then(res => res.json())
    //   .then(obj => playTest(obj.questions))
    // }

    let clientWidth = document.documentElement.clientWidth;

    window.addEventListener("resize", function () {
        clientWidth = document.documentElement.clientWidth;
        if (clientWidth < 768) {
            burgerBtn.style.display = "flex";
        }
        else {
            burgerBtn.style.display = "none";
        }
    });

    burgerBtn.addEventListener("click", function () {
        burgerBtn.classList.add("active");
        modalBlock.classList.add("d-block");
        playTest();
    });



    const questions = [
        {
            question: "Какого цвета бургер?",
            answers: [
                {
                    title: 'Стандарт',
                    url: './image/burger.png'
                },
                {
                    title: 'Черный',
                    url: './image/burgerBlack.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Из какого мяса котлета?",
            answers: [
                {
                    title: 'Курица',
                    url: './image/chickenMeat.png'
                },
                {
                    title: 'Говядина',
                    url: './image/beefMeat.png'
                },
                {
                    title: 'Свинина',
                    url: './image/porkMeat.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Дополнительные ингредиенты?",
            answers: [
                {
                    title: 'Помидор',
                    url: './image/tomato.png'
                },
                {
                    title: 'Огурец',
                    url: './image/cucumber.png'
                },
                {
                    title: 'Салат',
                    url: './image/salad.png'
                },
                {
                    title: 'Лук',
                    url: './image/onion.png'
                }
            ],
            type: 'checkbox'
        },
        {
            question: "Добавить соус?",
            answers: [
                {
                    title: 'Чесночный',
                    url: './image/sauce1.png'
                },
                {
                    title: 'Томатный',
                    url: './image/sauce2.png'
                },
                {
                    title: 'Горчичный',
                    url: './image/sauce3.png'
                }
            ],
            type: 'radio'
        }
    ];


    btnOpenModal.addEventListener('click', () => {
        modalBlock.classList.add('d-block');
        playTest();
    })

    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block');
        burgerBtn.classList.remove('active');
    })

    const playTest = (/*questions*/) => {
        const finalAnswers = [];
        const obj = {};

        let numberQuestion = 0;

        const renderAnswers = (index) => {
            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement('div');
                answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');

                answerItem.innerHTML = `
          <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
          <label for="${answer.title}" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src='${answer.url}' alt="burger">
            <span>${answer.title}</span>
          </label>
        `;
                formAnswers.appendChild(answerItem);
            });
        };

        const renderQuestion = (indexQuestion) => {
            formAnswers.innerHTML = "";

            if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                questionTitle.textContent = `${questions[indexQuestion].question}`;

                renderAnswers(indexQuestion);

                nextButton.classList.remove('d-none');
                prevButton.classList.remove('d-none');
                sendButton.classList.add('d-none');
            }

            if (numberQuestion === 0) {
                prevButton.classList.add('d-none');
            }

            if (numberQuestion === questions.length) {
                questionTitle.textContent = "";
                modalTitle.textContent = "";
                nextButton.classList.add('d-none');
                prevButton.classList.add('d-none');
                sendButton.classList.remove('d-none');
                formAnswers.innerHTML = `
<div class="form-group">
  <label for="numberPhone">Input your number phone</label>
  <input type="phone" class="form-control" id="numberPhone">
  </div>
  `;

const numberPhone = document.getElementById("numberPhone");
numberPhone.addEventListener('input', (event) =>{
  event.target.value = event.target.value.replace(/[^0-9+-]/,"");
});
}
            if (numberQuestion === questions.length + 1) {
              sendButton.classList.add("d-none");
                formAnswers.textContent = `Спасибо за пройденный тест`;

                for (let key in obj) {
                    let newObj = {};
                    newObj[key] = obj[key];
                    finalAnswers.push(newObj);
                }

                setTimeout(() => {
                    modalBlock.classList.remove("d-block");
                }, 2000);
            }
        };

        renderQuestion(numberQuestion);

        const checkAnswer = () => {
            const inputs = [...formAnswers.elements].filter(
                (input) => input.checked || input.id === "numberPhone");

            inputs.forEach((input, index) => {
                if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                    obj[`${index}_${questions[numberQuestion].question}`] = input.value;
                }

                if (numberQuestion === questions.length) {
                    obj[`number phone`] = input.value;
                }
            });
            //finalAnswers.push(obj);
        };

        nextButton.onclick = () => {
            checkAnswer();
            numberQuestion++;
            renderQuestion(numberQuestion);
        }

        prevButton.onclick = () => {
            numberQuestion--;
            renderQuestion(numberQuestion);
        }

        sendButton.onclick = () => {
            checkAnswer();
            numberQuestion++;
            renderQuestion(numberQuestion);
        }
    }
})
