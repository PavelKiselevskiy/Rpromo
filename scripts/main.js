document.addEventListener("DOMContentLoaded", function () {
  const f = new Swiper(".swiper", {
    loop: !0,
    pagination: {
      el: ".swiper-pagination",
      clickable: !0,
      renderBullet: function (n, t) {
        return '<span class="' + t + '">' + (n + 1) + "</span>";
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
      clickable: !0,
    },
  });
  let n = document.querySelectorAll(".custom-box"),
    t = document.querySelectorAll(".custom-btn");
  for (let t = 0; t < n.length; t++) {
    let u = n[t].querySelector(".custom-p");
    var i = u.scrollHeight,
      r = n[t].querySelector(".custom-btn");
    i < 70 && r.classList.add("custom-btn-hidden");
  }
  t.forEach((n) =>
    n.addEventListener("click", () => {
      const t = n.parentNode;
      t.classList.toggle("custom-box-open");
    })
  );

  const u = document.querySelectorAll('a[href*="#"]');
  for (let n of u)
    n.addEventListener("click", function (t) {
      t.preventDefault();
      const i = n.getAttribute("href").substr(1);
      document
        .getElementById(i)
        .scrollIntoView({ behavior: "smooth", block: "start" });
    });

    // создание попапа

    let popupBg = document.querySelector('.popup__bg'); // Фон попап окна
    let popup = document.querySelector('.popup'); // Само окно
    let openPopupButtons = document.querySelectorAll('.registr-btn'); // Кнопки для показа окна
    let closePopupButton = document.querySelector('.close-popup'); // Кнопка для скрытия окна

    openPopupButtons.forEach((button) => { // Перебираем все кнопки
      button.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
          e.preventDefault(); // Предотвращаем дефолтное поведение браузера
          popupBg.classList.add('active'); // Добавляем класс 'active' для фона
          popup.classList.add('active'); // И для самого окна;
          document.querySelector('body').classList.add('no-scroll')
      })
  });

  closePopupButton.addEventListener('click',() => { // Вешаем обработчик на крестик
    popupBg.classList.remove('active'); // Убираем активный класс с фона
    popup.classList.remove('active'); // И с окна
    document.querySelector('body').classList.remove('no-scroll')
});

  document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
    if(e.target === popupBg) { // Если цель клика - фот, то:
        popupBg.classList.remove('active'); // Убираем активный класс с фона
        popup.classList.remove('active'); // И с окна
        document.querySelector('body').classList.remove('no-scroll')
    }
});

// связано с попапом

 let promocode = document.querySelector('.promocode__input');
 let submit = document.querySelector('.promocode__btn');
 let valuePromo = promocode.value;

submit.addEventListener('click', function() {
  let valuePromo = promocode.value;
  sendRequest('POST', requestURL, body).then();
});

// связано с запросом

let requestURL = ''; // ссылка на url отправки запроса
function sendRequest(method, url, body) {
    return new Promise((resolve, reject) => {
    
    let xhr = new XMLHttpRequest(); // вызов
    xhr.open(method, url); // говорим каким методом и куда будет отправляться запрос
    
    xhr.onload = () => {
    
      if (xhr.status >= 400) {
        console.error(xhr.response) // нетворк ошибки
      }
      console.log(JSON.parse(xhr.response))
    } // загружаем ответ от сервера, строка JSON.parse позволяет работать с полученными данными в изаначальном формате, а не в строке)
    
    xhr.send(JSON.stringify(body));
    
    xhr.onerror = () => {
      console.log(xhr.response)
    } // обработка ошибки 
  })
};

let body = {
  "promoCode": {
    ids: {
    value: valuePromo,
    },
    usedDateTimeUtc: "<Дата и время гашения промокода в формате YYYY-MM-DD hh:mm:ss.fff>"
  }
 
} // то что будет отправляться



});
