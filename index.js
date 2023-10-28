const LEVE = 'leve';
const GRAVE = 'grave';
const MUY_GRAVE = 'muy_grave';

let faults, fault;
let answersGood = 0;
let answersBad = 0;

const checkAnswer = (answer) => {
    if (answer === fault.level) {
        answersGood++;
        document.getElementById(answer).classList.add('good');
    } else {
        answersBad++;
        document.getElementById(answer).classList.add('bad');
        document.getElementById(fault.level).classList.add('good');
    }
    document.getElementById('counter_good').innerText = `${answersGood} (${Math.round(100 * answersGood / (answersGood + answersBad))}%)`;
    document.getElementById('counter_bad').innerText = `${answersBad} (${Math.round(100 * answersBad / (answersGood + answersBad))}%)`;

    if(faults.length > 0) document.getElementById('next').classList.remove('hidden');
};

const updateFault = () => {
    const index = Math.floor(Math.random() * faults.length);
    fault = faults.splice(index, 1)[0];

    document.getElementById('fault').innerText = fault.text;

    document.getElementById('next').classList.add('hidden');
    Array.from(document.getElementById('choices').children).forEach(node => node.classList.remove('good', 'bad'));
};

function init() {
    document.getElementById('startButton').addEventListener('click', () => {
        document.getElementById('start').classList.add('hidden');
    }, { once: true });

    document.getElementById('leve').addEventListener('click', checkAnswer.bind(null, LEVE));
    document.getElementById('grave').addEventListener('click', checkAnswer.bind(null, GRAVE));
    document.getElementById('muy_grave').addEventListener('click', checkAnswer.bind(null, MUY_GRAVE));

    document.getElementById('next').addEventListener('click', updateFault);

    faults = [];

    faltas.leves.forEach(falta => faults.push({ text: falta, level: LEVE }));
    faltas.graves.forEach(falta => faults.push({ text: falta, level: GRAVE }));
    faltas.muy_graves.forEach(falta => faults.push({ text: falta, level: MUY_GRAVE }));

    updateFault();
}