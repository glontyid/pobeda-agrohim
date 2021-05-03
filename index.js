var swiper = new Swiper('.swiper-container', {
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
  smoothLink.addEventListener('click', function (e) {
    e.preventDefault();
    const id = smoothLink.getAttribute('href');

    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
};

const popup = document.querySelector('.popup');

function popupShow(el) {
  popup.classList.add('active');
  popup.querySelector('.popup__window').classList.add('active');
}

function popupClose() {
  popup.querySelector('.popup__window').classList.remove('active');
  popup.classList.remove('active');
}

const burgerPopup = document.querySelector('.mobile__header');

function burgerShow(el) {
  burgerPopup.classList.add('active');
}

function burgerClose() {
  burgerPopup.classList.remove('active');
}

const inputName = popup.querySelector('.popup__form-input--text');
const inputPhone = popup.querySelector('.popup__form-input--phone');
const inputMessage = popup.querySelector('.popup__form-input--message');
let inputNameFlag = false;
let inputPhoneFlag = false;

inputName.addEventListener('input', function () {
  if (this.value.length > 1) {
    inputNameFlag = true;
    this.classList.add('not-empty');
  } else {
    inputNameFlag = false;
    popup.querySelector('.popup__form-submit--btn').classList.add('disabled');
    popup.querySelector('.popup__form-submit--btn').setAttribute('disabled', 'disabled');
    this.classList.remove('not-empty');
  }

  if (inputNameFlag && inputPhoneFlag) {
    popup.querySelector('.popup__form-submit--btn').classList.remove('disabled');
    popup.querySelector('.popup__form-submit--btn').removeAttribute('disabled');
  }
});

function validatePhone(el) {
  const input = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
  const error = document.querySelector('.popup__form-valid');
  let isValid = input.test(el.value);

  if (isValid) {
    el.classList.remove('invalid');
    el.classList.add('valid');
    error.classList.remove('active');
  } else {
    el.classList.remove('valid');
    el.classList.add('invalid');
    error.classList.add('active');
  }
}

function validateName(el) {
  const error = document.querySelector('.popup__form-valid');

  if (el.value.length > 1) {
    el.classList.remove('invalid');
    el.classList.add('valid');
    error.classList.remove('active');
  } else {
    el.classList.remove('valid');
    el.classList.add('invalid');
    error.classList.add('active');
  }
}

inputPhone.addEventListener('input', function () {
  if (this.value.length == 10) {
    inputPhoneFlag = true;
    this.classList.add('not-empty');
  } else {
    inputPhoneFlag = false;
    popup.querySelector('.popup__form-submit--btn').classList.add('disabled');
    popup.querySelector('.popup__form-submit--btn').setAttribute('disabled');
    this.classList.remove('not-empty');
  }

  if (inputNameFlag && inputPhoneFlag) {
    popup.querySelector('.popup__form-submit--btn').classList.remove('disabled');
    popup.querySelector('.popup__form-submit--btn').removeAttribute('disabled');
  }
});

inputMessage.addEventListener('input', function () {
  if (this.value.length > 0) {
    this.classList.add('not-empty');
  } else {
    this.classList.remove('not-empty');
  }
});

$(function () {
  $("#form").submit(function (e) {
    e.preventDefault();
    var form_data = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "./mail.php",
      dataType: "json",
      data: form_data
    }).done(function (data) {
      console.log(data);
      $('#form').hide();
      $('.popup__window-title').hide();
      $('.popup__after-submit').css('display', 'flex');
    }).fail(function (data) {
      console.log(data);
      $('#form').hide();
      $('.popup__window-title').hide();
      $('.popup__after-submit').css('display', 'flex');
    });
  });
});