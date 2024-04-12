const reset = document.getElementById("reset");
const input = document.querySelector("#userTxt");
const transparentBox = document.querySelector("#transparentBox");
const sourceText = document.querySelector("#sourceTxt");
let correctChars = 0;
let incorrectChars = 0;
let totalWords = 0;
let correctWords = 0;
let incorrectWords = 0;
let time = 30;
let timeTaken = 0;
let started = false;
const notAllowed = "[]{};:'\\|,<.>/?`~1!2@3#4$5%6^7&8*9(0)-_=+\" ";
const Allowed =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZBackspace' ";
// words = "about the quick brown fox jumps over the lazy dog".split(" ");
words =
  "about above add after again air all almost along also always an and animal another answer any are around as ask at away back be because been before began begin being below between big book both boy but by call came can car carry change children city close come could country cut day did different do does don't down each earth eat end enough even every example eye face family far father feet few find first follow food for form found four from get girl give go good got great group grow had hand hard has have he head hear help her here high him his home house how idea if important in Indian into is it its it's just keep kind know land large last later learn leave left let letter life light like line list little live long look made make man many may me mean men might mile miss more most mother mountain move much must my name near need never new next night no not now number of off often oil old on once one only open or other our out over own page paper part people picture place plant play point put question quick quickly quite read really right river run said same saw say school sea second see seem sentence set she should show side small so some something sometimes song soon sound spell start state still stop story study such take talk tell than that the their them then there these they thing think this those thought three through time to together too took tree try turn two under until up us use very walk want was watch water way we well went were what when where which while white who why will with without word work world would write year you young your".split(
    " "
  );
let userWords = [];

// Theme colours list
const themes = [
  [
    "rgb(6, 22, 32)",
    "rgb(44, 129, 179)",
    "rgb(31, 86, 225)",
    "rgb(221, 221, 221)",
  ],
  [
    "rgb(10, 10, 10)",
    "rgb(39, 194, 31)",
    "rgb(10, 194, 0)",
    "rgb(255, 255, 255)",
  ],
  ["rgb(0, 23, 1)", "rgb(39,194,31)", "rgb(131, 72, 0)", "rgb(84, 212, 92)"],
  [
    "rgb(62, 9, 9)",
    "rgb(255, 78, 78)",
    "rgb(245, 191, 191)",
    "rgb(255, 78, 78)",
  ],
  ["rgb(164, 164, 164)", "rgb(0, 0, 0)", "rgb(255, 255, 255)", "rgb(0, 0, 0)"],
];

//function to change theme

function changeTheme() {
  const themeBtns = document.getElementsByClassName("changeThemeBtn");
  const root = document.documentElement;
  for (let i = 0; i < themeBtns.length; i++) {
    themeBtns[i].onclick = function () {
      root.style.setProperty("--mainBackground", themes[i][0]);
      root.style.setProperty("--textColor", themes[i][1]);
      root.style.setProperty("--themeColor", themes[i][2]);
      root.style.setProperty("--contentColor", themes[i][3]);
      return;
    };
  }
}

//function to shuffle given words
function shuffle(wordss) {
  //online algorithm to shuffle
  wordss.sort(() => Math.random() - 0.5);
  return wordss;
}

//when user clicks on custom words button
const customWordsBtn = document.querySelector("#customWordsBtn");
customWordsBtn.addEventListener("click", () => {
  const customWordsBox = document.querySelector("#customWordsBox");
  const wordsOkBtn = document.querySelector("#TextBtn");
  const customTextBox = document.querySelector("#customWords");
  const customX_Btn = document.querySelector("#customX_Btn");
  if (!started) {
    customX_Btn.addEventListener("click", () => {
      customWordsBox.classList.add("animation2");
      setTimeout(() => {
        transparentBox.style.display = "none";
      }, 300);
      // input.focus();
    });
    customWordsBox.classList.add("animation1");
    customWordsBox.classList.remove("animation2");
    transparentBox.style.display = "initial";
    customWordsBox.style.display = "flex";
    customTextBox.focus();
    wordsOkBtn.addEventListener("click", () => {
      customTextBox.value = customTextBox.value.trim();
      customTextBox.value = customTextBox.value.replace(/\s+/g, " ");
      const validInput = /^[a-zA-Z\s]+$/;
      if (!validInput.test(customTextBox.value)) {
        alert("Please enter only alphabets separated by a single space");
        customTextBox.focus();
        // return;
      } else {
        customWordsBox.classList.add("animation2");
        setTimeout(() => {
          transparentBox.style.display = "none";
        }, 300);

        userWords = customTextBox.value.split(" ");
        // input.focus();
        keyboardstart(userWords);
      }
    });
  }
});

//function to select times with custom time
const times = document.querySelectorAll(".uncheck");
const customTime = document.getElementById("chooseTime");
const timeTxt = document.getElementById("timerTxt");
const timeOkBtn = document.getElementById("timeOkBtn");
function selectTime() {
  if (!started) {
    for (let i = 0; i < times.length; i++) {
      times[i].onclick = function () {
        for (let j = 0; j < times.length; j++) {
          times[j].classList.remove("check");
        }
        times[i].classList.toggle("check");
        timeTxt.innerHTML = times[i].value + "s";
        // input.focus();
        time = times[i].value;
      };
    }
    timeTxt.innerHTML = time + "s";
    timeOkBtn.addEventListener("click", () => {
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
        // input.focus();
      }
    });
  }
}
reset.addEventListener("click", () => {
  location.reload();
});

sourceText.addEventListener("click", () => {
  // input.focus();
});

//function to start and end timer
function timercnt() {
  input.addEventListener("keydown", (Event) => {
    if (Allowed.includes(Event.key)) {
      let audio = new Audio("Assets/keyHit.mp3");
      audio.play();
      if (!started && Event.key != " ") {
        started = true;
        for (let k = 0; k < times.length; k++) {
          times[k].disabled = true;
        }
        customTime.disabled = true;
        timeOkBtn.disabled = true;
        let timer = setInterval(() => {
          // input.focus();
          time--;
          timeTaken++;
          timeTxt.innerHTML = time + "s";
          if (time == 0) {
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
sourceText.addEventListener("click", () => {
  input.focus();
});
let wordInd = 0;
//function to update the words and check correct, incorrect words and manage UI
function keyboardstart(displayedWords) {
  sourceText.textContent = "";
  while (displayedWords.length < 300) {
    let randomIndex = Math.floor(Math.random() * displayedWords.length);
    displayedWords.push(displayedWords[randomIndex]);
  }
  words = shuffle(displayedWords);
  for (let i = 0; i < displayedWords.length; i++) {
    let currentWord = document.createElement("span");
    for (let j = 0; j < displayedWords[i].length; j++) {
      let currentLetter = document.createElement("span");
      currentLetter.innerHTML = displayedWords[i][j];
      currentLetter.classList.add("letter");
      currentWord.appendChild(currentLetter);
    }
    let space = document.createElement("span");
    space.innerHTML = " ";
    space.classList.add("letter");
    currentWord.appendChild(space);
    currentWord.classList.add("word");
    sourceText.appendChild(currentWord);
  }
  let refLetters = document.getElementsByClassName("letter");
  let refWords = document.getElementsByClassName("word");
  refLetters[0].classList.add("cursor");
  ind = 0;

  input.addEventListener("keydown", (event) => {
    const scrollPosition = refLetters[ind].offsetTop - sourceText.offsetTop;
    sourceText.scrollTop = scrollPosition;
    if (
      (event.key === " " &&
        (ind == 0 || refLetters[ind - 1].innerHTML === " ")) ||
      !Allowed.includes(event.key)
    ) {
      event.preventDefault();
      return;
    }
    let typed = event.key;
    if (typed === " " && refLetters[ind].innerHTML != " ") {
      refLetters[ind].classList.remove("cursor");
      while (refLetters[ind].innerHTML != " ") {
        ind++;
      }
    }
    if (
      refLetters[ind].innerHTML === " " &&
      typed != " " &&
      typed != "Backspace"
    ) {
      let currentWord = refLetters[ind].parentNode;
      currentWord.removeChild(refLetters[ind]);
      let currentLetter = document.createElement("span");
      currentLetter.innerHTML = typed;
      currentLetter.classList.add("letter");
      currentLetter.classList.add("wrongLetter");
      currentLetter.style.color = "red";
      currentWord.appendChild(currentLetter);
      currentLetter = document.createElement("span");
      currentLetter.innerHTML = " ";
      currentLetter.classList.add("letter");
      currentWord.appendChild(currentLetter);
    }

    if (typed === "Backspace") {
      if (ind != 0) {
        if (refLetters[ind - 1].classList.contains("wrongLetter")) {
          currentWord = refLetters[ind].parentNode;
          currentWord.removeChild(refLetters[ind - 1]);
        }
        refLetters[ind].classList.remove("cursor");
        ind--;
        refLetters[ind].style.color = "var(--themeColor)";
      }
    } else {
      if (
        typed === refLetters[ind].innerHTML &&
        !refLetters[ind].classList.contains("wrongLetter")
      ) {
        refLetters[ind].style.color = "white";
      } else {
        refLetters[ind].style.color = "red";
      }
      ind++;
    }
    if (ind != 0) refLetters[ind - 1].classList.remove("cursor");
    refLetters[ind].classList.add("cursor");
  });
}
//function to calculate and display result
function getResult() {
  const resultDiv = document.querySelector("#resultPage");
  const calculations = document.querySelectorAll(".calculations");
  const resultOkBtn = document.getElementById("resultOkBtn");
  transparentBox.style.display = "initial";
  resultDiv.style.display = "flex";
  resultDiv.classList.add("animation1");
  let avgCorrectWords = correctChars / 4;
  const WPM = Math.round(avgCorrectWords / (timeTaken / 60));
  const accuracy = (correctWords / totalWords) * 100;
  calculations[0].innerHTML += WPM;
  calculations[1].innerHTML += accuracy.toFixed(2) + "%";
  calculations[2].innerHTML += totalWords;
  calculations[3].innerHTML += correctWords;
  calculations[4].innerHTML += incorrectWords;
  calculations[5].innerHTML += timeTaken + "s";

  addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      location.reload();
    }
  });
  resultOkBtn.addEventListener("click", () => {
    resultDiv.classList.add("animation2");

    location.reload();
  });
}
//calling functions
input.focus();
selectTime();
keyboardstart(words);
timercnt();
changeTheme();
