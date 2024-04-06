document.addEventListener("DOMContentLoaded", function () {
  // swiper инициализируем
  
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

  // гармошка с отзывами
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

  // плавность перемещения по якорям
  const u = document.querySelectorAll('a[href*="#"]');
  for (let n of u)
      n.addEventListener("click", function (t) {
          t.preventDefault();
          const i = n.getAttribute("href").substr(1);
          document
              .getElementById(i)
              .scrollIntoView({behavior: "smooth", block: "start"});
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

  closePopupButton.addEventListener('click', () => { // Вешаем обработчик на крестик
      popupBg.classList.remove('active'); // Убираем активный класс с фона
      popup.classList.remove('active'); // И с окна
      document.querySelector('body').classList.remove('no-scroll')
  });

  document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
      if (e.target === popupBg) { // Если цель клика - фот, то:
          popupBg.classList.remove('active'); // Убираем активный класс с фона
          popup.classList.remove('active'); // И с окна
          document.querySelector('body').classList.remove('no-scroll')
      }
  });

// связано с попапом
  let promocode = document.querySelector('.promocode__input');
  let submit = document.querySelector('.promocode__btn');

  submit.addEventListener('click', function (e) {
        let currentDate = new Date();
        let dates = currentDate.toISOString();
      e.preventDefault();
      const body = {
          ids: {
              value: promocode.value,
          },
          usedDateTimeUtc: dates,
          executionDateTimeUtc: dates,
      }

      let requestURL = 'https://api.mindbox.ru/v3/operations/sync?endpointId=Respect-shoes.RespectPromo&operation=website.CheckUpActivationCode'; // ссылка на url отправки запроса

      sendRequest('POST', requestURL, body).then();
      console.log(sendRequest('POST', requestURL, body).then())
  });

// связано с запросом

  async function sendRequest(method, url, body) {
      const formData = new FormData();
      formData.append("promoCode", JSON.stringify(body));

      fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json; charset=utf-8',
              'Accept': 'application/json',
              'Authorization': 'SecretKey pCZDnBn5WkSVz7eM54eoggyAUjMQJjvs'
          },
          body: formData,
      }).then((response) => {
          if (response.ok) {
              console.log(response);
              console.log('Тут обрабатывать результат', response);
          } else {
              console.log('Ошибка c сервера', response);
          }
      }).catch(error => {
          console.log('Ошибка запроса', error);
      });
  }
});
