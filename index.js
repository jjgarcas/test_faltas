const LEVE = 'leve';
const GRAVE = 'grave';
const MUY_GRAVE = 'muy_grave';

function init() {
    let faults, fault;
    let answersGood = 0;
    let answersBad = 0;
    let evaluating = false;
    let wrongAnswers = [];

    const answerButtons = {
        [LEVE]: document.getElementById(LEVE),
        [GRAVE]: document.getElementById(GRAVE),
        [MUY_GRAVE]: document.getElementById(MUY_GRAVE)
    };
    const nextButton = document.getElementById('next');
    const revealButton = document.getElementById('reveal');
    const faultContainer = document.getElementById('fault');
    const counterGood = document.getElementById('counter_good');
    const counterBad = document.getElementById('counter_bad');
    const wrongAnswersPage = document.getElementById('wrongAnswersPage');
    const wrongAnswersContainer = document.getElementById('wrongAnswersContainer');
    const restartButton = document.getElementById('restart');

    const checkAnswer = (answer) => {
        if (evaluating) return;
        evaluating = true;
        if (answer === fault.level) {
            answersGood++;
            answerButtons[answer].classList.add('good');
        } else {
            wrongAnswers.push(fault);
            answersBad++;
            answerButtons[answer].classList.add('bad');
            answerButtons[fault.level].classList.add('good');
        }
        counterGood.innerText = `${answersGood} (${Math.round(100 * answersGood / (answersGood + answersBad))}%)`;
        counterBad.innerText = `${answersBad} (${Math.round(100 * answersBad / (answersGood + answersBad))}%)`;

        if(faults.length > 0) nextButton.classList.remove('hidden');
        else revealButton.classList.remove('hidden');
    };

    const updateFault = () => {
        const index = Math.floor(Math.random() * faults.length);
        fault = faults.splice(index, 1)[0];

        faultContainer.innerText = fault.text;

        nextButton.classList.add('hidden');
        for (const level in answerButtons) answerButtons[level].classList.remove('good', 'bad');
        evaluating = false;
    };

    const revealWrongAnswers = () => {
        const html = wrongAnswers.reduce((acc, wrongAnswer) => {
            const container = document.createElement('div');
            container.className = `wrongAnswer ${wrongAnswer.level}`;
            container.innerText = wrongAnswer.text;
            return [...acc, container];
        }, '');
        wrongAnswersContainer.replaceChildren(...html);
        wrongAnswersPage.classList.remove('hidden');
        revealButton.classList.add('hidden');
    };

    const restart = () => {
        faults = [];

        faltas.leves.forEach(falta => faults.push({ text: falta, level: LEVE }));
        faltas.graves.forEach(falta => faults.push({ text: falta, level: GRAVE }));
        faltas.muy_graves.forEach(falta => faults.push({ text: falta, level: MUY_GRAVE }));

        answersGood = 0;
        answersBad = 0;
        evaluating = false;
        wrongAnswers = [];

        counterGood.innerText = '0 (0%)';
        counterBad.innerText = '0 (0%)';

        updateFault();

        wrongAnswersPage.classList.add('hidden');
    };

    document.getElementById('startButton').addEventListener('click', () => {
        document.getElementById('start').classList.add('hidden');
    }, { once: true });

    for (const level in answerButtons) answerButtons[level].addEventListener('click', checkAnswer.bind(null, level));

    nextButton.addEventListener('click', updateFault);
    revealButton.addEventListener('click', revealWrongAnswers);
    restartButton.addEventListener('click', restart);

    restart();
}