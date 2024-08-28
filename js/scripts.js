// Declaração de variáveis
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ['a', 'b', 'c', 'd'];
let points = 0;
let actualQuestion = 0;

// Perguntas
const questions = [
  {
    "question": "PHP foi desenvolvido para qual fim?",
    "answers": [
      {
        "answer": "back-end",
        "correct": true
      },
      {
        "answer": "front-end",
        "correct": false
      },
      {
        "answer": "Sistema operacional",
        "correct": false
      },
      {
        "answer": "Banco de dados",
        "correct": false
      },
    ]
  },
  {
    "question": "Uma forma de declarar variável em JavaScript:",
    "answers": [
      {
        "answer": "$var",
        "correct": false
      },
      {
        "answer": "var",
        "correct": true
      },
      {
        "answer": "@var",
        "correct": false
      },
      {
        "answer": "#let",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual o seletor de id no CSS?",
    "answers": [
      {
        "answer": "#",
        "correct": true
      },
      {
        "answer": ".",
        "correct": false
      },
      {
        "answer": "@",
        "correct": false
      },
      {
        "answer": "/",
        "correct": false
      },
    ]
  },
]

// substituição do quizz para a primeira pergunta

function init(){
  createQuestion(0);
}

//cria uma pergunta

function createQuestion(i){

  //limpar a questao anterior
  const oldButtons = answersBox.querySelectorAll("button");
  
  oldButtons.forEach(function(btn){
    btn.remove();
  });

  //alterar texto da pergunta
  const questionText = question.querySelector("#question-text");
  const questionNumber = question.querySelector("#question-number");

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  //insere as alternativas
  questions[i].answers.forEach(function(answer, i){
   // cria o template da pergunta
   const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

   const letterBtn = answerTemplate.querySelector(".btn-letter");
   const answerText = answerTemplate.querySelector(".question-answer");
   
   letterBtn.textContent = letters[i];
   answerText.textContent = answer['answer'];

   answerTemplate.setAttribute("correct-answer", answer['correct']);

   //remover hide e template class
   answerTemplate.classList.remove("hide");
   answerTemplate.classList.remove("answer-template");

   //inserir alternativa na tela
   answersBox.appendChild(answerTemplate);
  
   //inserir evento de click
   answerTemplate.addEventListener('click', function(){
    checkAnswer(this);
   });
  });

  //incrementar o numero da questao
  actualQuestion++;
}

//verificando resposta do usuario
function checkAnswer(btn){
  //seleciona todos os botoes
  const buttons = answersBox.querySelectorAll("button");

  //verifica se a resposta está correta e adiciona classes aos botões
  buttons.forEach(function(button){
    if(button.getAttribute("correct-answer") === "true"){
      button.classList.add("correct-answer");

      //checa se o usuário acertou
      if(btn === button){
        points++;
      }
    } else {
      button.classList.add("wrong-answer");
    }
  });

  // chama a função para exibir a próxima pergunta
  nextQuestion();
}

// exibir próxima pergunta
function nextQuestion(){
  //timer para o usuário ver as respostas
  setTimeout(function(){
    //verifica se ainda há perguntas
    if(actualQuestion >= questions.length){
      //apresenta msg sucesso
      showSucccessmessage()
      return
    }
    createQuestion(actualQuestion);
  }, 1500);
}

//exibe a tela final
function showSucccessmessage(){
  quizzContainer.classList.toggle("hide")
  scoreContainer.classList.toggle("hide")

  //trocar dados da tela de sucesso

  //calcular score
  const score = ((points/questions.length)*100).toFixed(2)

  const displayScore = document.querySelector("#display-score span")

  displayScore.textContent = score.toString()

  //alterar o numero de perguntas corretas

  const correctAnswers = document.querySelector("#correct-answers")
  correctAnswers.textContent = points

  //alterar total de perguntas

  const totalQuestions = document.querySelector("#questions-qty")
  totalQuestions.textContent = questions.length

}
//mostra ou esconde o socre
function hideOrShowQuizz(){
  quizzContainer.classList.toggle("hide")
  scoreContainer.classList.toggle("hide")
}



//reiniciar quizz

const restartBtn = document.querySelector("#restart")

restartBtn.addEventListener("click", function(){
  //zerar jogo
  actualQuestion= 0
  points= 0
  hideOrShowQuizz()
  init()
})

console.log(points);
// iniciando o quizz
init();
