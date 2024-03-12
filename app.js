const time15 = document.getElementById("time15");
const time30 = document.getElementById("time30");
const time60 = document.getElementById("time60");
const time120 = document.getElementById("time120");
const customTime = document.getElementById("chooseTime");
const timeTxt = document.getElementById("timerTxt");
const go = document.getElementById("go");
const reset = document.getElementById("reset");
const sourceText = document.querySelector("#sourceTxt");
const continueBtn = document.getElementById("continueBtn");
const input = document.querySelector("#userTxt");
const customWordsBtn = document.querySelector("#customWordsBtn");
const customTextBox = document.querySelector("#customWords");
const calculations = document.querySelectorAll(".calculations");
const transparentBox = document.querySelector("#transparentBox");
const times = document.querySelectorAll(".uncheck");
const resultDiv = document.querySelector("#resultDiv");
const wordsOkBtn = document.querySelector("#TextBtn");
const customWordsBox = document.querySelector("#customWordsBox");
const root = document.documentElement;
const themes = [
  [
    "rgb(6, 22, 32)",
    "rgb(44, 129, 179)",
    "rgb(31, 86, 225)",
    "rgb(221, 221, 221)",
  ],
  [
    "rgb(0, 0,  0)",
    "rgb(39, 194, 31)",
    "rgb(10, 194, 0)",
    "rgb(255, 255, 255)",
  ],
  [
    "rgb(8, 48, 22)",
    "rgb(95, 217, 144)",
    "rgb(0, 255, 64)",
    "rgb(55, 186, 107)",
  ],
  [
    "rgb(62, 9, 9)",
    "rgb(255, 78, 78)",
    "rgb(245, 191, 191)",
    "rgb(255, 78, 78)",
  ],
  [
    "rgb(47, 44, 45)",
    "rgb(255, 134, 59)",
    "rgb(124, 86, 21)",
    "rgb(212, 135, 84)",
  ],
];
function changeTheme() {
  let randomm = Math.floor(Math.random() * themes.length);
  root.style.setProperty("--mainBackground", themes[randomm][0]);
  root.style.setProperty("--textColor", themes[randomm][1]);
  root.style.setProperty("--themeColor", themes[randomm][2]);
  root.style.setProperty("--contentColor", themes[randomm][3]);
}
changeTheme();
const notAllowed = "!@#$%^&*()_ +-=<>?1234567890`~{}[]\\|,.;/:'\"";
const Allowed =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZBackspace' ";
let grossWords = 0;
let totalchars = 0;
let correctchars = 0;
let wrongchars = 0;
let netWords = 0;
function shuffle(wordss) {
  //online algorithm to shuffle
  wordss.sort(() => Math.random() - 0.5);
  return wordss;
}
let timeTaken = 0;
words =
  "about above add after again air all almost along also always America an and animal another answer any are around as ask at away back be because been before began begin being below between big book both boy but by call came can car carry change children city close come could country cut day did different do does don't down each earth eat end enough even every example eye face family far father feet few find first follow food for form found four from get girl give go good got great group grow had hand hard has have he head hear help her here high him his home house how idea if important in Indian into is it its it's just keep kind know land large last later learn leave left let letter life light like line list little live long look made make man many may me mean men might mile miss more most mother mountain move much must my name near need never new next night no not now number of off often oil old on once one only open or other our out over own page paper part people picture place plant play point put question quick quickly quite read really right river run said same saw say school sea second see seem sentence set she should show side small so some something sometimes song soon sound spell start state still stop story study such take talk tell than that the their them then there these they thing think this those thought three through time to together too took tree try turn two under until up us use very walk want was watch water way we well went were what when where which while white who why will with without word work world would write year you young your";
words = words.split(" ");
var started = false;
let refWords;
hasEnteredCustom = false;
let userWords = [];
customWordsBtn.addEventListener("click", () => {
  if (!started) {
    transparentBox.style.display = "initial";
    customWordsBox.style.display = "flex";
    wordsOkBtn.addEventListener("click", () => {
      customTextBox.value = customTextBox.value.trim();
      if (customTextBox.value == "") return;
      userWords = customTextBox.value.split(" ");
      transparentBox.style.display = "none";
      while (userWords.length != 1000) {
        let randomIndex = Math.floor(Math.random() * userWords.length);
        userWords.push(userWords[randomIndex]);
      }
      sourceText.textContent = "";
      for (let i = 0; i < userWords.length; i++) {
        var currentWord = document.createElement("span");
        currentWord.innerHTML = userWords[i];
        currentWord.classList.add("word");
        sourceText.appendChild(currentWord);
      }
      refWords = document.getElementsByClassName("word");
      input.focus();
      keyboardstart();
    });
  }
});

var time = 60;
function selectTime() {
  if (!started) {
    for (let i = 0; i < times.length; i++) {
      times[i].onclick = function () {
        for (let j = 0; j < times.length; j++) {
          times[j].classList.remove("check");
        }
        times[i].classList.toggle("check");
        timeTxt.innerHTML = times[i].value + "s";
        input.focus();
        time = times[i].value;
      };
    }
    timeTxt.innerHTML = time + "s";
    go.addEventListener("click", () => {
      if (customTime.value != "") {
        for (let j = 0; j < times.length; j++) {
          times[j].classList.remove("check");
        }
        if (Number(customTime.value) < 15) {
          time = 15;
          customTime.value = 15;
        } else if (Number(customTime.value) > 300) {
          time = 300;
          customTime.value = 300;
        } else {
          time = customTime.value;
        }
        timeTxt.innerHTML = time + "s";
      }
    });
  }
}
selectTime();
reset.addEventListener("click", () => {
  location.reload();
});
while (words.length < 1000) {
  let randomIndex = Math.floor(Math.random() * words.length);
  words.push(words[randomIndex]);
}
words = shuffle(words);
for (let i = 0; i < words.length; i++) {
  var currentWord = document.createElement("span");
  currentWord.innerHTML = words[i];
  currentWord.classList.add("word");
  sourceText.appendChild(currentWord);
}
refWords = document.getElementsByClassName("word");

function timercnt() {
  input.addEventListener("keydown", (Event) => {
    if (Allowed.includes(Event.key)) {
      var audio = new Audio("Assets/keyHit.mp3");
      audio.play();
      if (!started && Event.key != " ") {
        // time = 3;
        started = true;
        for (let k = 0; k < times.length; k++) {
          times[k].disabled = true;
        }
        customTime.disabled = true;
        go.disabled = true;
        var timer = setInterval(() => {
          input.focus();
          time--;
          timeTaken++;
          timeTxt.innerHTML = time + "s";
          if (time == -1) {
            timeTxt.innerHTML = "Time's Up!";
            input.disabled = true;
            setTimeout(() => {
              getResult();
            }, 500);
            clearInterval(timer);
            input.value = "";
          }
        }, 1000);
      }
    } else {
      Event.preventDefault();
    }
  });
}

function keyboardstart() {
  console.log(refWords[0].innerHTML);
  ind = 0;
  refWords[ind].style.scale = "110%";
  refWords[ind].style.borderBottom = ".15rem solid white";
  refWords[ind].style.color = "white";
  input.addEventListener("keydown", (event) => {
    const scrollPosition = refWords[ind].offsetTop - sourceText.offsetTop;
    sourceText.scrollTop = scrollPosition;
    if (event.key === " " && input.value.trim() === "") {
      event.preventDefault();
    }
    if (event.key === " " && input.value.trim() !== "") {
      event.preventDefault();
      const typed = input.value;
      input.value = "";
      refWords[ind].style.borderBottom = "transparent";
      refWords[ind + 1].style.borderBottom = ".15rem solid white";
      refWords[ind + 1].style.scale = "110%";
      refWords[ind + 1].style.color = "white";
      refWords[ind].style.scale = "100%";
      if (refWords[ind].innerHTML === typed) {
        // refWords[ind].style.color = "rgb(31, 86, 225)";
        correctchars += typed.length;
      } else {
        refWords[ind].style.color = "red";
        wrongchars = typed.length;
      }
      ind += 1;
    }
  });
}

function getResult() {
  let totalchars = wrongchars + correctchars;
  let totalWords = Math.round(totalchars / 4);
  let correctWords = Math.round(correctchars / 4);
  let wrongWords = Math.round(wrongchars / 4);

  const grossWordsPerMinute = Math.round(correctWords / (timeTaken / 60));
  const accuracy = (correctWords / totalWords) * 100;
  transparentBox.style.display = "initial";
  resultDiv.style.display = "flex";
  customWordsBox.style.display = "none";
  calculations[0].innerHTML += grossWordsPerMinute;
  calculations[1].innerHTML += accuracy.toFixed(2) + "%";
  calculations[2].innerHTML += totalWords;
  calculations[3].innerHTML += correctWords;
  calculations[4].innerHTML += wrongWords;
  calculations[5].innerHTML += timeTaken - 1;
}
// getResult()
input.focus();
keyboardstart();

timercnt();
continueBtn.addEventListener("click", () => {
  transparentBox.style.display = "none";
  location.reload();
});
