/*Авторизация*/

function showAuthBtns(){
    contentContainer.innerHTML = `
      <div class="auth-div">
        <button id="signUpBtn" class="auth-button">Зарегистрироваться</button> 
        <button id="signInBtn" class="auth-button">Войти</button>
      </div>
      `;

      document.getElementById("signUpBtn").addEventListener("click", showSignUp);
      document.getElementById("signInBtn").addEventListener("click", showSignIn);
}

  function showSignUp(){
    contentContainer.innerHTML = `
    <div class="auth-div">
      <input id="fieldEmail" class="add-staff input-staff" type="email" placeholder="Email">
      <input id="fieldPassword" class="add-staff input-staff" type="password" placeholder="Password">
      <button id="signUpBtn" class="auth-button">Зарегистрироваться</button>
    </div>
      `;
    
    let email;
    let password;

    document.getElementById("signUpBtn").addEventListener("click", () => {
              email = document.getElementById("fieldEmail").value;
              password = document.getElementById("fieldPassword").value;
      if (email && password){
        signUp(email, password);
      } else {console.log("error")}
            });
  }

  function signUp (email, password) {
      localStorage.setItem("signIn", true);
      localStorage.setItem("mail", email);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          showLogin();
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
      dbContext.ref("users/" + "userId_" + email.split(".")[0]).set({
        username: email,
        chapter: 1,
        life: 5,
        gold: 10,
         staff:{
          keyNumber:"пусто",
          bottle:"пусто",
          ringLetter:"пусто",
          garlic:"пусто",
          elixir:"пусто",
        }
      });
    };

    function showSignIn(){
    contentContainer.innerHTML = `
    <div class="auth-div">
      <input id="fieldEmail" class="add-staff input-staff" type="email" placeholder="Email">
      <input id="fieldPassword" class="add-staff input-staff" type="password" placeholder="Password">
      <button id="signInBtn" class="auth-button"> Войти </button>
    </div>
      `;
    
    document.getElementById("signInBtn").addEventListener("click", () => {
              email = document.getElementById("fieldEmail").value;
              password = document.getElementById("fieldPassword").value;
      if (email && password){
        signIn(email, password);
      } else {contentContainer.innerHTML += `
              <div class="auth-div"> Введите данные.</div>
              `
            };
            });
  }

  function signIn (email, password) {
      if (email && password) {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            if (user) {
              localStorage.setItem("signIn", true);
              localStorage.setItem("mail", user.email);
              dbContext
                .ref("users/userId_" + email.split(".")[0])
                .once("value")
                .then(function (snapshot) {
                  localStorage.setItem("mail", snapshot.val()["username"]);
                });
              showLogin();
            } else {
            }
          })
          .catch(function (error) {
            contentContainer.innerHTML += `
            <div class="auth-div">Неверный email или пароль. Введите корректные данные.</div>
              `
            ;
          });
      } else {
        contentContainer.innerHTML += `
        <div class="auth-div">Пустое поле Email или Password. Введите данные в указанные поля.</div>
        `;
      }
    };
    
  function showLogin () {
      contentContainer.innerHTML = `
      <div class="auth-div">
        <h1>Приветствую тебя ${localStorage.getItem("mail")}<h1>
        <button id='logout' class="auth-button">Выйти</button>
      </div>
      `;
      document.getElementById("logout").addEventListener("click", signOut);
    };

function signOut () {
      localStorage.setItem("signIn", false);
      localStorage.setItem("mail", "");
      firebase
        .auth()
        .signOut()
        .then(() => {
          showAuthBtns();
        });
    };

    /* Анимация изменения фона */
    const colors = new Array(
    [103, 109, 108],
    [217, 137, 93],
    [150, 48, 48],
    [169, 117, 117],
    [227, 217, 217],
    [174, 186, 74]);

    let step = 0;

    const colorIndices = [0,1,2,3];
    let gradientSpeed = 0.002;

    function updateGradient()
    {
    
    if ( $===undefined ) return;
    
    let c0_0 = colors[colorIndices[0]];
    let c0_1 = colors[colorIndices[1]];
    let c1_0 = colors[colorIndices[2]];
    let c1_1 = colors[colorIndices[3]];

    let istep = 1 - step;
    let r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    let g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    let b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    let color1 = "rgb("+r1+","+g1+","+b1+")";

    let r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    let g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    let b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    let color2 = "rgb("+r2+","+g2+","+b2+")";

    $('body').css({
    background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
        background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
    
    step += gradientSpeed;
    if ( step >= 1 )
    {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];
        
        colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    }
    }
    setInterval(updateGradient,10);
    
    //находим все элементы на странице
    const contentContainer = document.getElementById("content");
    const mainMenu = document.getElementById("mainmenu");
    const mainLink = document.getElementById("mainLink");
    const aboutLink = document.getElementById("aboutLink");
    const prologLink = document.getElementById("prologLink");
    const authorisation = document.getElementById("authorisation");

    //об игре
    aboutLink.addEventListener("click", showAboutGame);
    aboutLink.addEventListener("click", () => {mainMenu.classList.remove("mainmenu")});
    aboutLink.addEventListener("click", () => {
        document.querySelector(".mainmenu__list").classList.add("mainmenu__list-horisontal")
    });
    
    //пролог
    prologLink.addEventListener("click", showProlog);
    prologLink.addEventListener("click", () => {mainMenu.classList.remove("mainmenu")});
    prologLink.addEventListener("click", () => {
        document.querySelector(".mainmenu__list").classList.add("mainmenu__list-horisontal")
    });

    //авторизация
    authorisation.addEventListener("click", showAuthBtns);
    authorisation.addEventListener("click", () => {mainMenu.classList.remove("mainmenu")});
    authorisation.addEventListener("click", () => {
        document.querySelector(".mainmenu__list").classList.add("mainmenu__list-horisontal")
    });

     //начало игры, переход к главе 1
    function startGame() {
    mainLink.addEventListener("click", () => {mainMenu.remove()});
    mainLink.addEventListener("click", showChapter1);
    }
    startGame();
    
    // фоновая музыка
    function playMusic(){
      const music = new Audio();
      music.src = "Music/Xtown.mp3";

      const playMusicBtns = document.createElement("div");
      playMusicBtns.classList.add("btns-div");
      playMusicBtns.innerHTML = `
                                <div id="musicPlay"></div>
                                <div id="musicStop" class="music-hide"></div>
                                <div id="closeGame"></div>
                                `;

      document.querySelector("body").prepend(playMusicBtns);
      const musicPlay = document.querySelector('#musicPlay');
      const musicStop = document.querySelector('#musicStop');
      const closeGame = document.querySelector('#closeGame');

      musicPlay.addEventListener("click", () => music.play());
      musicPlay.addEventListener("click", () => {musicStop.classList.toggle("music-hide")});
      musicPlay.addEventListener("click", () => {musicPlay.classList.toggle("music-hide")});

      musicStop.addEventListener("click", () => music.pause());
      musicStop.addEventListener("click", () => {musicPlay.classList.toggle("music-hide")});
      musicStop.addEventListener("click", () => {musicStop.classList.toggle("music-hide")});

      closeGame.addEventListener("click", () => location.reload());
    }
    playMusic();

    const character = { //параметры героя
        name: localStorage.getItem("mail"),
        life: 5,
        heart: '\u{1F497}',
        showLife: () => {return (character[`heart`].repeat(character[`life`]))},
        gold: 10,
        coin: `\u{1F4B0}`,
        showGold: () => {return (character[`coin`].repeat(character[`gold`]))},
        staff:{
          keyNumber:"пусто",
          bottle:"пусто",
          ringLetter:"пусто",
          garlic:"пусто",
          elixir:"пусто",
        }
    }

    function showCharacter(){ //показать параметры героя
      const staffDiv = document.createElement("div");
      staffDiv.innerHTML = `
                            <p>Логин: ${localStorage.getItem("mail")} <a id="logout" class="link-chapter" title="Выйти">&#10162;</a> </p> 
                            <p>Монеты ${character.gold} ${character.showGold()}</p>
                            <p>Здоровье ${character.life} ${character.showLife()}</p>
                            <p>Инвентарь: <a id="show-staff" href="#">&#11206;</a><br></p>
                            <div id="hide-staff" class="staff">
                                Номер ключа: &#128273; ${character.staff.keyNumber}.<br>
                                Цвет глиняной бутылки: &#9905; ${character.staff.bottle}.<br>
                                Буква на кольце: &#128141; ${character.staff.ringLetter}.<br>
                                Чеснок: &#129476; ${character.staff.garlic}.<br>
                                Эликсир Удачи: &#127808; ${character.staff.elixir}.
                            </div>
                          `
      
      staffDiv.classList.add("character");
      contentContainer.prepend(staffDiv);

      document.getElementById("show-staff").addEventListener("click", () =>{ 
      document.getElementById("hide-staff").classList.toggle("staff");//спрятать/показать инвентарь
      });
      document.getElementById("logout").addEventListener("click", () =>{
          localStorage.setItem("signIn", false);
          localStorage.setItem("mail", "");
          firebase
            .auth()
            .signOut()
            .then(() => {
              showChapter1();
            });
      });
    }

    function createDices(){ //создать игральные кубики
        const dices = document.createElement("div");
        dices.innerHTML = `
        <div class="wrapper-dices">
        <div class="row-2">
        <div class="row-2-col player-1">
        <p class="wrapper-dices-p">Принц Казарана</p>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Terning6.svg/180px-Terning6.svg.png" alt="dice image">
        </div>
        <div class="row-2-col player-2">
        <p class="wrapper-dices-p">Твой Противник</p>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Terning6.svg/180px-Terning6.svg.png" alt="dice image">
        </div>
        </div>
        <div class="row-3">
        <div class="btn-roll-dices">Бросить кубики</div>
        </div>
        <div class="result"><br></div>
        </div>
        `;
        contentContainer.append(dices);
        const btnRollDice = document.querySelector(".btn-roll-dices");
        btnRollDice.addEventListener("click", rollDice);
        
    }

    let value1; //результаты выпавших чисел на кубиках
    let value2;

    function rollDice() { //кинуть игральные кубики
    
    value1 =  (Math.floor(Math.random() * 6) + 1);
    value2 =  (Math.floor(Math.random() * 6) + 1);
    switch(value1) {
    case 1: { document.querySelector(".player-1 img").src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Terning1.svg/180px-Terning1.svg.png"; break;}
    case 2: { document.querySelector(".player-1 img").src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Terning2.svg/180px-Terning2.svg.png"; break;}
    case 3: { document.querySelector(".player-1 img").src = "https://upload.wikimedia.org/wikipedia/commons/9/9f/Terning3.svg"; break;}
    case 4: { document.querySelector(".player-1 img").src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Terning4.svg/180px-Terning4.svg.png"; break;}
    case 5: { document.querySelector(".player-1 img").src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Terning5.svg/180px-Terning5.svg.png"; break;}
    case 6: { document.querySelector(".player-1 img").src = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Terning6.svg/180px-Terning6.svg.png"; break;}
    }
    switch(value2) {
    case 1: { document.querySelector(".player-2 img").src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Terning1.svg/180px-Terning1.svg.png"; break;}
    case 2: { document.querySelector(".player-2 img").src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Terning2.svg/180px-Terning2.svg.png"; break;}
    case 3: { document.querySelector(".player-2 img").src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Terning3.svg/180px-Terning3.svg.png"; break;}
    case 4: { document.querySelector(".player-2 img").src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Terning4.svg/180px-Terning4.svg.png"; break;}
    case 5: { document.querySelector(".player-2 img").src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Terning5.svg/180px-Terning5.svg.png"; break;}
    case 6: { document.querySelector(".player-2 img").src = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Terning6.svg/180px-Terning6.svg.png"; break;}
    }
  }

  function fightBlackKnight(){ //бой с Черным Рыцарем
  if(value1 > value2) {
    document.querySelector(".result").innerHTML = "Ты победил. Двигайся на 1С";
    const goToChapter1CLink = document.getElementById("LinkChapter1C");
    goToChapter1CLink.classList.remove("link-chapter-disabled");//делаем активной ссылку перехода + анимация
    goToChapter1CLink.classList.add("link-chapter-animation");

    const btnRollDice = document.querySelector(".btn-roll-dices");
    btnRollDice.classList.add("btn-roll-dice-disabled");//блочим кнопку, чтобы не кидать кубики еще
    setTimeout(fightAnimation, 1000);
  } else if(value2 > value1) {
        document.querySelector(".result").innerHTML = "Победил Черный Рыцарь. Двигайся на 1D";
        const goToChapter1DLink = document.getElementById("LinkChapter1D");
        goToChapter1DLink.classList.remove("link-chapter-disabled");
        goToChapter1DLink.classList.add("link-chapter-animation");

        const btnRollDice = document.querySelector(".btn-roll-dices");
        btnRollDice.classList.add("btn-roll-dice-disabled");
        setTimeout(fightAnimation, 1000);
    } else if(value2 === value1){
        document.querySelector(".result").innerHTML = "Ничья. Бросай кубики еще раз";
        const btnRollDice = document.querySelector(".btn-roll-dices");
        btnRollDice.addEventListener("click", rollDice); // после ничьи заново кидаем кубики и проверяем результат
        btnRollDice.addEventListener("click", fightBlackKnight);
  }
  }

  function fightMenWithAxe(){ //бой с Человеком с топором
  if(value1 > value2) {
    document.querySelector(".result").innerHTML = "Ты победил. Двигайся на 2С";
    const goToChapter2CLink = document.getElementById("LinkChapter2C");
    goToChapter2CLink.classList.remove("link-chapter-disabled");
    goToChapter2CLink.classList.add("link-chapter-animation");

    const btnRollDice = document.querySelector(".btn-roll-dices");
    btnRollDice.classList.add("btn-roll-dice-disabled");
    setTimeout(fightAnimation, 1000);
  } else if(value2 > value1) {
        document.querySelector(".result").innerHTML = "Победил Человек с Топором. Двигайся на 2D";
        const goToChapter2DLink = document.getElementById("LinkChapter2D");
        goToChapter2DLink.classList.remove("link-chapter-disabled");
        goToChapter2DLink.classList.add("link-chapter-animation");

        const btnRollDice = document.querySelector(".btn-roll-dices");
        btnRollDice.classList.add("btn-roll-dice-disabled");
        setTimeout(fightAnimation, 1000);
  } else if(value2 === value1){
        document.querySelector(".result").innerHTML = "Ничья. Бросай кубики еще раз";
        const btnRollDice = document.querySelector(".btn-roll-dices");
        btnRollDice.addEventListener("click", rollDice);
        btnRollDice.addEventListener("click", fightMenWithAxe);
  }
  }

  function fightOrk(){ //бой с Людоедом
  if(value1 > value2) {
    document.querySelector(".result").innerHTML = "Ты победил. Двигайся на 10A";
    const goToChapter10ALink = document.getElementById("LinkChapter10A");
    goToChapter10ALink.classList.remove("link-chapter-disabled");
    goToChapter10ALink.classList.add("link-chapter-animation");

    const btnRollDice = document.querySelector(".btn-roll-dices");
    btnRollDice.classList.add("btn-roll-dice-disabled");
    setTimeout(fightAnimation, 1000);
  } else if(value2 > value1) {
        document.querySelector(".result").innerHTML = "Победил Людоед. Двигайся на 10B";
        const goToChapter10BLink = document.getElementById("LinkChapter10B");
        goToChapter10BLink.classList.remove("link-chapter-disabled");
        goToChapter10BLink.classList.add("link-chapter-animation");

        const btnRollDice = document.querySelector(".btn-roll-dices");
        btnRollDice.classList.add("btn-roll-dice-disabled");
        setTimeout(fightAnimation, 1000);
  } else if(value2 === value1){
        document.querySelector(".result").innerHTML = "Ничья. Бросай кубики еще раз";
        const btnRollDice = document.querySelector(".btn-roll-dices");
        btnRollDice.addEventListener("click", rollDice);
        btnRollDice.addEventListener("click", fightOrk);
  }
  }

      /*Анимация боя*/
  let timerMoveSword = null;
  let timerMoveAxe = null;

  function fightAnimation(){
    function createSword(){
        const sword = document.createElement("div");
        sword.innerHTML=`<img src="Images/Sword-PNG-File.png" id="sword">`
        document.querySelector(".wrapper-dices").before(sword);
    }
    createSword();

    const sword = {
      posX : 0,
      speedX : 1,
      update: function() {
              const swordElem = document.getElementById("sword");
              swordElem.style.right = this.posX + "%";
              }
    }

    function moveSword() {
      sword.posX += sword.speedX;
      if (sword.posX === 40){
          sword.speedX = 0;
      }
      sword.update();
    }

    timerMoveSword = setInterval(moveSword,40);

    function createAxe(){
      const axe = document.createElement("div");
      axe.innerHTML=`<img src="Images/Axe.png" id="axe">`
      document.querySelector(".wrapper-dices").before(axe);
    }
    createAxe();

    const axe = {
      posX : 0,
      speedX : 1,
      update: function() {
              const axeElem = document.getElementById("axe");
              axeElem.style.left = this.posX + "%";
              }
    }

    function moveAxe() {
      axe.posX += axe.speedX;
      if (axe.posX === 40){
          axe.speedX = 0;
      }
      axe.update();
    }
    timerMoveAxe = setInterval(moveAxe,40);
  }

  function showAboutGame (){ //об игре
          fetch('JSON/gameText.json')
            .then(response => response.json())
            .then(text => render(text));
          function render(text){
            contentContainer.innerHTML = text.aboutGame;
          }
  }

  function showProlog () { //пролог
          fetch('JSON/gameText.json')
            .then(response => response.json())
            .then(text => render(text));
          function render(text){
            contentContainer.innerHTML = text.prolog;
          }
  }

  function showChapter1 () { //глава 1
          fetch('JSON/gameText.json')
            .then(response => response.json())
            .then(text => render(text));
          function render(text){
            contentContainer.innerHTML = text.chapter1;
            showCharacter();

            const goToChapter1ALink = document.getElementById("LinkChapter1A");
            goToChapter1ALink.addEventListener("click", showChapter1A);
            goToChapter1ALink.addEventListener("click", () => {character.gold = character.gold - 5});

            const goToChapter1BLink = document.getElementById("LinkChapter1B");
            goToChapter1BLink.addEventListener("click", showChapter1B);
            }
  }

  function showChapter1A () { //глава 1А
    fetch('JSON/gameText.json')
            .then(response => response.json())
            .then(text => render(text));
          function render(text){
            contentContainer.innerHTML = text.chapter1A;
            showCharacter();

            const goToChapter1ELink = document.getElementById("LinkChapter1E");
            goToChapter1ELink.addEventListener("click", showChapter1E);
          }
  }

  function showChapter1B () { //глава 1В
    fetch('JSON/gameText.json')
            .then(response => response.json())
            .then(text => render(text));
          function render(text){
            contentContainer.innerHTML = text.chapter1B;
            showCharacter();

            const goToChapter1CLink = document.getElementById("LinkChapter1C");
            goToChapter1CLink.classList.add("link-chapter-disabled");
            goToChapter1CLink.addEventListener("click", showChapter1C);
            goToChapter1CLink.addEventListener("click", () => {clearInterval(timerMoveSword)});
            goToChapter1CLink.addEventListener("click", () => {clearInterval(timerMoveAxe)});
            createDices();
            const btnRollDice = document.querySelector(".btn-roll-dices");
            btnRollDice.addEventListener("click", fightBlackKnight);

            const goToChapter1DLink = document.getElementById("LinkChapter1D");
            goToChapter1DLink.classList.add("link-chapter-disabled");
            goToChapter1DLink.addEventListener("click", showChapter1D);
            goToChapter1DLink.addEventListener("click", () => {clearInterval(timerMoveSword)});
            goToChapter1DLink.addEventListener("click", () => {clearInterval(timerMoveAxe)});
            
          }
  }

  function showChapter1C(){ //глава 1C
    fetch('JSON/gameText.json')
            .then(response => response.json())
            .then(text => render(text));
          function render(text){
            contentContainer.innerHTML = text.chapter1C;
            showCharacter();

            const goToChapter1ELink = document.getElementById("LinkChapter1E");
            goToChapter1ELink.addEventListener("click", showChapter1E);
        }
  }

  function showChapter1D(){ //глава 1D
    fetch('JSON/gameText.json')
            .then(response => response.json())
            .then(text => render(text));
          function render(text){
            character.life = character.life - 1;
            contentContainer.innerHTML = text.chapter1D;
            showCharacter();

            const goToChapter1ELink = document.getElementById("LinkChapter1E");
            goToChapter1ELink.addEventListener("click", showChapter1E);
          }
  }

  function showChapter1E(){ //глава 1E
        fetch('JSON/gameText.json')
            .then(response => response.json())
            .then(text => render(text));
          function render(text){
            contentContainer.innerHTML = text.chapter1E;
            showCharacter();

            const goToChapter5Link = document.getElementById("LinkChapter5");
            goToChapter5Link.addEventListener("click", showChapter5);

            const goToChapter15Link = document.getElementById("LinkChapter15");
            goToChapter15Link.addEventListener("click", showChapter15);
          }
  }

  function showChapter2() { //глава 2
    fetch('JSON/gameText.json')
            .then(response => response.json())
            .then(text => render(text));
          function render(text){
            contentContainer.innerHTML = text.chapter2;
            showCharacter();

            const goToChapter2ALink = document.getElementById("LinkChapter2A");
            goToChapter2ALink.addEventListener("click", showChapter2A);

            const goToChapter2BLink = document.getElementById("LinkChapter2B");
            goToChapter2BLink.addEventListener("click", showChapter2B);
          }
  }

  function showChapter2A () { //глава 2A
    fetch('JSON/gameText.json')
            .then(response => response.json())
            .then(text => render(text));
          function render(text){
            contentContainer.innerHTML = text.chapter2A;
            showCharacter();

            const goToChapter2CLink = document.getElementById("LinkChapter2C");
            goToChapter2CLink.classList.add("link-chapter-disabled");
            goToChapter2CLink.addEventListener("click", showChapter2C);
            goToChapter2CLink.addEventListener("click", () => {clearInterval(timerMoveSword)});
            goToChapter2CLink.addEventListener("click", () => {clearInterval(timerMoveAxe)});
            createDices();
            const btnRollDice = document.querySelector(".btn-roll-dices");
            btnRollDice.addEventListener("click", fightMenWithAxe);
            
            const goToChapter2DLink = document.getElementById("LinkChapter2D");
            goToChapter2DLink.classList.add("link-chapter-disabled");
            goToChapter2DLink.addEventListener("click", showChapter2D);
            goToChapter2DLink.addEventListener("click", () => {clearInterval(timerMoveSword)});
            goToChapter2DLink.addEventListener("click", () => {clearInterval(timerMoveAxe)});
          }
  }

  function showChapter2B() { //глава 2B
    fetch('JSON/gameText.json')
            .then(response => response.json())
            .then(text => render(text));
          function render(text){
            contentContainer.innerHTML = text.chapter2B;
            showCharacter();

            const goToChapter2CLink = document.getElementById("LinkChapter2C");
            goToChapter2CLink.addEventListener("click", showChapter2C);

          }
  }

  function showChapter2C() { //глава 2C
    fetch('JSON/gameText.json')
            .then(response => response.json())
            .then(text => render(text));
          function render(text){
            character.life = character.life + 1;
            contentContainer.innerHTML = text.chapter2C;
            showCharacter();

            const goToChapter13Link = document.getElementById("LinkChapter13");
            goToChapter13Link.addEventListener("click", showChapter13);

            const goToChapter19Link = document.getElementById("LinkChapter19");
            //goToChapter19Link.addEventListener("click", showChapter19);
          }
  }

  function showChapter2D() { //глава 2D
    fetch('JSON/gameText.json')
            .then(response => response.json())
            .then(text => render(text));
          function render(text){
            character.life = character.life - 1;
            contentContainer.innerHTML = text.chapter2D;
            showCharacter();

            const goToChapter2BLink = document.getElementById("LinkChapter2B");
            goToChapter2BLink.addEventListener("click", showChapter2B);

          }
  }

  function showChapter5() { //глава 5
      fetch('JSON/gameText.json')
            .then(response => response.json())
            .then(text => render(text));
          function render(text){
            contentContainer.innerHTML = text.chapter5;
            showCharacter();

            const goToChapter5ALink = document.getElementById("LinkChapter5A");
            goToChapter5ALink.addEventListener("click", showChapter5A);

            const goToChapter5BLink = document.getElementById("LinkChapter5B");
            goToChapter5BLink.addEventListener("click", showChapter5B);
          }
  }

  function showChapter5A() { //глава 5A
      fetch('JSON/gameText.json')
            .then(response => response.json())
            .then(text => render(text));
          function render(text){
            contentContainer.innerHTML = text.chapter5A;
            showCharacter();

            const goToChapter10Link = document.getElementById("LinkChapter10");
            goToChapter10Link.addEventListener("click", showChapter10);

            const goToChapter2Link = document.getElementById("LinkChapter2");
            goToChapter2Link.addEventListener("click", showChapter2);
        }
    }

  function showChapter5B() { //глава 5B
      fetch('JSON/gameText.json')
            .then(response => response.json())
            .then(text => render(text));
          function render(text){
            contentContainer.innerHTML = text.chapter5B;
            showCharacter();
 
            const goToChapter5ALink = document.getElementById("LinkChapter5A");
            goToChapter5ALink.addEventListener("click", showChapter5A);

            const goToChapter5CLink = document.getElementById("LinkChapter5C");
            goToChapter5CLink.addEventListener("click", showChapter5C);
        }
    }

  function showChapter10() { //глава 10
      fetch('JSON/gameText.json')
            .then(response => response.json())
            .then(text => render(text));
          function render(text){
            contentContainer.innerHTML = text.chapter10;
            showCharacter();
 
            const goToChapter10ALink = document.getElementById("LinkChapter10A");
            goToChapter10ALink.classList.add("link-chapter-disabled");
            //goToChapter10ALink.addEventListener("click", showChapter10A);
            goToChapter10ALink.addEventListener("click", () => {clearInterval(timerMoveSword)});
            goToChapter10ALink.addEventListener("click", () => {clearInterval(timerMoveAxe)});
            createDices();
            const btnRollDice = document.querySelector(".btn-roll-dices");
            btnRollDice.addEventListener("click", fightOrk);
            
            const goToChapter10BLink = document.getElementById("LinkChapter10B");
            goToChapter10BLink.classList.add("link-chapter-disabled");
            //goToChapter10BLink.addEventListener("click", showChapter10B);
            goToChapter10BLink.addEventListener("click", () => {clearInterval(timerMoveSword)});
            goToChapter10BLink.addEventListener("click", () => {clearInterval(timerMoveAxe)});
        }
  }

  function showChapter5C() { //глава 5C
      fetch('JSON/gameText.json')
            .then(response => response.json())
            .then(text => render(text));
          function render(text){
            contentContainer.innerHTML = text.chapter5C;
            showCharacter();
            //game over
          }
  }

  function showChapter13() { //глава 13
      fetch('JSON/gameText.json')
            .then(response => response.json())
            .then(text => render(text));
          function render(text){
            character.staff.garlic = "1 луковица";
            character.staff.elixir = "1 флакон";
            contentContainer.innerHTML = text.chapter13;
            showCharacter();

            document.getElementById("LinkChapter1").addEventListener("click", showChapter1);
            document.getElementById("LinkChapter2").addEventListener("click", showChapter2);
            //document.getElementById("LinkChapter3").addEventListener("click",  showChapter3);
            //document.getElementById("LinkChapter4").addEventListener("click",  showChapter4);
            document.getElementById("LinkChapter5").addEventListener("click", showChapter5);
            //document.getElementById("LinkChapter6").addEventListener("click", showChapter6);
            //document.getElementById("LinkChapter7").addEventListener("click", showChapter7);
            //document.getElementById("LinkChapter8").addEventListener("click", showChapter8);
            //document.getElementById("LinkChapter9").addEventListener("click", showChapter9);
            document.getElementById("LinkChapter10").addEventListener("click", showChapter10);
            //document.getElementById("LinkChapter11").addEventListener("click", showChapter11);
            //document.getElementById("LinkChapter12").addEventListener("click", showChapter12);
            document.getElementById("LinkChapter13").addEventListener("click", showChapter13);
            //document.getElementById("LinkChapter14").addEventListener("click", showChapter14);
            document.getElementById("LinkChapter15").addEventListener("click", showChapter15);
            //document.getElementById("LinkChapter16").addEventListener("click", showChapter16);
            //document.getElementById("LinkChapter17").addEventListener("click", showChapter17);
            //document.getElementById("LinkChapter18").addEventListener("click", showChapter18);
            //document.getElementById("LinkChapter19").addEventListener("click", showChapter19);
            //document.getElementById("LinkChapter20").addEventListener("click", showChapter20);
          }
  }

  function showChapter15() { //глава 15
      fetch('JSON/gameText.json')
            .then(response => response.json())
            .then(text => render(text));
          function render(text){
            contentContainer.innerHTML = text.chapter15;
            showCharacter();
 
            const goToChapter15ALink = document.getElementById("LinkChapter15A");
            goToChapter15ALink.addEventListener("click", () => showChapter15A());
            goToChapter15ALink.addEventListener("click", () => {character.gold = character.gold - 4});

            const goToChapter5Link = document.getElementById("LinkChapter5");
            goToChapter5Link.addEventListener("click", () => showChapter5());
        }
    }

  function showChapter15A() { //глава 15A
      fetch('JSON/gameText.json')
            .then(response => response.json())
            .then(text => render(text));
          function render(text){
            contentContainer.innerHTML = text.chapter15A;
            showCharacter();

            const keyNumberValue = document.getElementById("keyNumber"); //запись номера ключа в инвертарь
            keyNumberValue.addEventListener("blur", () => {
              character.staff.keyNumber = keyNumberValue.value;
            });
            
            const bottleValue = document.getElementById("bottle"); //запись цвета бутылки в инвертарь
            bottleValue.addEventListener("blur", () => {
              character.staff.bottle = bottleValue.value;
            });

            const ringLetterValue = document.getElementById("ringLetter"); //запись буквы на кольце в инвертарь
            ringLetterValue.addEventListener("blur", () => {
              character.staff.ringLetter = ringLetterValue.value;
            });
            
            const goToChapter5Link = document.getElementById("LinkChapter5");
            goToChapter5Link.addEventListener("click", () => showChapter5());
        }
  }