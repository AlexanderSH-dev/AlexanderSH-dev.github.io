$(function () {

    $('.header__contacts-order , .section-rent__btn').on('click', function () {
        $('.menu').removeClass('active');   // Скрываем мобильное меню при нажатии на "оставить заявку"
        $('.modal').addClass('active');
        $('body').addClass('overlay');
        $('html, body').css('overflow', 'hidden'); // Запрещаем скроллпри открытом модальном окне
    })

    $('.modal__close').on('click', function () {
        $('.modal').removeClass('active');
        $('body').removeClass('overlay');
        $('html, body').css('overflow', ''); // разрешаем скролл
        formReset(); // Сбрасываем формупри закрытии модального окна
    })

    $('.header__burger').on('click', function () {
        $('.menu').addClass('active');
    })
    $('.menu__close').on('click', function () {
        $('.menu').removeClass('active');
    })

    // Скрываем модальное окно при нажатии на overlay
    $(document).on('click', function (event) {
        if ($("body").hasClass("overlay")) {
            if ($(event.target).closest(".header, .modal , .section-rent__btn").length) return;
            $("body").removeClass("overlay");
            $('.modal').removeClass('active');
            formReset();
            $('html, body').css('overflow', '');
            event.stopPropagation();
        }
    });



    // Валидация формы

    const form = document.getElementById('form');
    const input_req = document.querySelectorAll('#form .modal__input');
    const errorMessage = document.querySelector('#form .modal__form-message');
    const regExpName = /^([а-яёА-яЁ_-]|[a-zA-Z_-]){2,}/;
    const regExpCity = /^([а-яёА-яЁ_-]|[a-zA-Z_-]){2,}/;
    const regExpPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/;
    const regExpEmail = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;

    function formReset() {
        form.reset();
        $('.modal__form-group').removeClass('success');
        $('.modal__form-group').removeClass('error');
        $('html, body').css('overflow', '');
        errorMessage.innerText = '';
    }
    // Появление окна "Спасибо"
    function thanks() {
        $('.modal-thanks').addClass('active');
        setTimeout(() => {
            $('.modal-thanks').removeClass('active');
            $('body').removeClass('overlay');
        }, 1000);
    }
    // Маска для телефона
    var phoneInput = document.querySelector("#phone");
    phoneInput.addEventListener("keydown", function (e) {
        "ArrowLeft" != e.key && "ArrowRight" != e.key && "Backspace" != e.key && "Tab" != e.key && e.preventDefault();
        var t = "+7 (111) 111-11-11";
        if (/[0-9\+\ \-\(\)]/.test(e.key)) {
            var a = this.value,
                n = a.length;
            if (/[0-9]/.test(e.key))
                if ("1" == t[n]) this.value = a + e.key;
                else
                    for (var r = n; r < t.length; r++) {
                        if ("1" == t[r]) {
                            this.value = a + e.key;
                            break
                        }
                        a += t[r]
                    }
        }
    });

    form.onsubmit = function (event) {
        event.preventDefault();
        let index = 0;
        for (let i = 0; i < input_req.length; i++) {
            input_req[i].classList.remove('error');
            if (input_req[i].value === '') {
                errorMessage.innerText = 'Заполнитте, пожалуйста, все поля в форме';
                index++;
                console.log(index)
            }
        }
        if (index === 0) {
            if (form.querySelector('.modal__form-checkhide').checked) {
                errorMessage.innerText = '';
                formReset();
                $('.modal').removeClass('active');
                thanks(), 2000;
            } else {
                errorMessage.innerText = 'Пожалуйста, согласитесь с условиями';
            }
        }
    };


    // Проверка ввода значений в инпуты


    // Получаем элементы формы
    for (let elem of form.elements) {
        if (elem.tagName != "BUTTON") {
            elem.addEventListener('blur', () => {
                validateElem(elem);
            });
        }
    }

    // Проверяем введённое значение в поле на соответствие регулярному выражению
    const validateElem = (elem) => {
        if (elem.name === "name") {
            if (!regExpName.test(elem.value) && elem.value !== "") {
                elem.parentNode.classList.remove('success');
                elem.parentNode.classList.add('error');
            } else {
                elem.parentNode.classList.remove('error');
                elem.parentNode.classList.add('success');
            }
            if (elem.value == "") {
                elem.parentNode.classList.remove('success');
                elem.parentNode.classList.add('error');
            }
        }
        if (elem.name === "phone") {
            if (!regExpPhone.test(elem.value) && elem.value !== "") {
                elem.parentNode.classList.remove('success');
                elem.parentNode.classList.add('error');
            } else {
                elem.parentNode.classList.remove('error');
                elem.parentNode.classList.add('success');
            }
            if (elem.value == "") {
                elem.parentNode.classList.remove('success');
                elem.parentNode.classList.add('error');
            }
        }
        if (elem.name === "email") {
            if (!regExpEmail.test(elem.value) && elem.value !== "") {
                elem.parentNode.classList.remove('success');
                elem.parentNode.classList.add('error');
            } else {
                elem.parentNode.classList.remove('error');
                elem.parentNode.classList.add('success');
            }
            if (elem.value == "") {
                elem.parentNode.classList.remove('success');
                elem.parentNode.classList.add('error');
            }
        }
        if (elem.name === "city") {
            if (!regExpCity.test(elem.value) && elem.value !== "") {
                elem.parentNode.classList.remove('success');
                elem.parentNode.classList.add('error');
            } else {
                elem.parentNode.classList.remove('error');
                elem.parentNode.classList.add('success');
            }
            if (elem.value == "") {
                elem.parentNode.classList.remove('success');
                elem.parentNode.classList.add('error');
            }
        }
    }
})  