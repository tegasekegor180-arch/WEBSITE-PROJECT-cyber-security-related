// ===== PASSWORD TOOL =====
function checkPassword(){
    let pwd = document.getElementById('password').value;
    let score = 0;
    if(pwd.length >= 8) score++;
    if(/[A-Z]/.test(pwd)) score++;
    if(/[0-9]/.test(pwd)) score++;
    if(/[^A-Za-z0-9]/.test(pwd)) score++;
    
    let bar = document.getElementById('bar');
    let result = document.getElementById('result');
    let crack = document.getElementById('crackTime');
    
    bar.style.width = (score*25)+'%';
    bar.style.background = score<2?'red':score<3?'orange':'green';
    
    let strength = ['Very Weak','Weak','Fair','Strong','Very Strong'][score];
    result.innerText = "Strength: " + strength;
    
    let time = ['Instant','Minutes','Hours','Years','Decades'][score];
    crack.innerText = "Estimated crack time: " + time;
}

function generatePassword(){
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
    let pwd = '';
    for(let i=0;i<12;i++){ pwd += chars[Math.floor(Math.random()*chars.length)]; }
    document.getElementById('password').value = pwd;
    checkPassword();
}

// ===== PHISHING TEST =====
let phishingSamples = [
    { text:"Your bank account is locked. Click here to verify.", answer:true },
    { text:"Your package has been shipped. Track it here.", answer:false },
    { text:"Reset your password immediately or lose access.", answer:true },
    { text:"Exclusive offer: Win a free iPhone today!", answer:true },
    { text:"Meeting scheduled tomorrow at 10am.", answer:false }
];

let currentPhish = 0;
let phishScore = 0;
phishingSamples = phishingSamples.sort(()=>Math.random()-0.5);

function loadPhish(){
    document.getElementById('emailText').innerText = phishingSamples[currentPhish].text;
    document.getElementById('phishResult').innerText = '';
}

function answerPhish(ans){
    let correct = phishingSamples[currentPhish].answer;
    if(ans === correct) phishScore++;
    document.getElementById('phishResult').innerText = ans === correct ? 'Correct!' : 'Wrong!';
    currentPhish++;
    
    if(currentPhish < phishingSamples.length){
        setTimeout(loadPhish, 1000);
    } else {
        document.getElementById('phishScore').innerText = `Phishing Score: ${phishScore}/${phishingSamples.length}`;
        currentPhish = 0; phishScore = 0; 
        setTimeout(loadPhish, 3000);
    }
}

loadPhish();

// ===== QUIZ =====
let quizData = [
    { q:"Strong password?", a:["123456","password","A!9x$2Lp"], correct:2 },
    { q:"What is phishing?", a:["Fishing","Scam email","Antivirus"], correct:1 },
    { q:"Best security practice?", a:["Reuse passwords","2FA","Ignore updates"], correct:1 },
    { q:"What is 2FA?", a:["Second Factor Authentication","Two-Factor Authentication","Two Forms Auth"], correct:1 },
    { q:"Public Wi-Fi safety?", a:["Safe for banking","Use VPN","No need for precautions"], correct:1 }
];

let qIndex = 0, quizScore = 0;
quizData = quizData.sort(()=>Math.random()-0.5);

function loadQuiz(){
    let q = quizData[qIndex];
    document.getElementById('question').innerText = q.q;
    
    let ansHTML = '';
    let correctAnswer = q.a[q.correct];
    q.a = q.a.sort(()=>Math.random()-0.5); // shuffle answers
    q.a.forEach((opt,i)=>{
        ansHTML += `<button onclick="selectAnswer('${opt}','${correctAnswer}')">${opt}</button>`;
    });
    document.getElementById('answers').innerHTML = ansHTML;
    document.getElementById('quizResult').innerText = '';
}

function selectAnswer(selected, correct){
    if(selected === correct) quizScore++;
    qIndex++;
    if(qIndex < quizData.length) loadQuiz();
    else {
        document.getElementById('quizResult').innerText = `Quiz Score: ${quizScore}/${quizData.length}`;
        qIndex = 0; quizScore = 0; 
        setTimeout(loadQuiz, 3000);
    }
}

loadQuiz();