/**
 * Анимация появления элементов при загрузке страницы
 * Добавляет класс animate-in для плавного появления (opacity + translateY)
 * Блок стихотворений — лёгкая анимация появления при скролле (Intersection Observer)
 */

document.addEventListener("DOMContentLoaded", function () {
    /* ——— Проигрыватель музыки (автозапуск по образцу из Код Автозапуск.txt) ———
       Пробуем play() при загрузке; при блокировке — при первом клике, touchstart или скролле (с задержкой). */
    (function () {
        var audio = document.getElementById("invitation-audio");
        var btn = document.getElementById("music-btn");
        var iconPause = btn && btn.querySelector(".music-btn-icon--pause");
        var iconPlay = btn && btn.querySelector(".music-btn-icon--play");

        if (!audio || !btn || !iconPause || !iconPlay) return;

        function setPlayingState(isPlaying) {
            if (isPlaying) {
                iconPause.removeAttribute("hidden");
                iconPlay.setAttribute("hidden", "");
                btn.setAttribute("aria-label", "Выключить музыку");
            } else {
                iconPause.setAttribute("hidden", "");
                iconPlay.removeAttribute("hidden");
                btn.setAttribute("aria-label", "Включить музыку");
            }
        }

        function startPlay() {
            if (audio.paused) {
                var p = audio.play();
                if (p && p.then) {
                    p.then(function () { setPlayingState(true); }).catch(function () {});
                } else {
                    setPlayingState(true);
                }
            }
        }

        function togglePlay() {
            if (audio.paused) {
                startPlay();
            } else {
                audio.pause();
                setPlayingState(false);
            }
        }

        var didStartOnce = false;
        function onFirstInteraction() {
            if (didStartOnce) return;
            didStartOnce = true;
            startPlay();
            document.removeEventListener("click", onFirstInteraction);
            document.removeEventListener("touchstart", onFirstInteraction);
            document.removeEventListener("touchend", onFirstInteraction);
        }

        function onFirstScroll() {
            if (didStartOnce) return;
            didStartOnce = true;
            setTimeout(function () { startPlay(); }, 500);
            window.removeEventListener("scroll", onFirstScroll);
        }

        // Пробуем автозапуск при загрузке (как в вашем коде)
        audio.play().then(function () {
            setPlayingState(true);
        }).catch(function () {
            setPlayingState(false);
            // При блокировке — включаем при первом клике/касании
            document.addEventListener("click", onFirstInteraction);
            document.addEventListener("touchstart", onFirstInteraction, { passive: true });
            document.addEventListener("touchend", onFirstInteraction, { passive: true });
            // И при первом скролле (с задержкой), как в вашем работающем коде
            window.addEventListener("scroll", onFirstScroll, { once: true });
        });

        // Кнопка: останавливаем всплытие touchstart, чтобы при касании кнопки document не запускал музыку
        btn.addEventListener("touchstart", function (e) { e.stopPropagation(); }, true);
        btn.addEventListener("click", function (e) {
            e.stopPropagation();
            togglePlay();
        }, true);
    })();

    // Элементы, которые нужно анимировать при загрузке
    const image = document.querySelector(".invitation-image");
    const title = document.querySelector(".invitation-title");
    const subtitle = document.querySelector(".invitation-subtitle");
    const text = document.querySelector(".invitation-text");

    // Собираем все в массив для удобства (блок приглашений анимируется при скролле)
    const elements = [image, title, subtitle];

    // Небольшая задержка, чтобы анимация была заметна после загрузки
    setTimeout(function () {
        elements.forEach(function (el) {
            if (el) {
                el.classList.add("animate-in");
            }
        });
    }, 100);

    // Анимация блока стихотворений при скролле (Intersection Observer)
    const poemsBlock = document.querySelector(".poems-block");
    const poemLines = document.querySelectorAll(".poem-line");

    if (poemsBlock && poemLines.length > 0) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        poemLines.forEach(function (line) {
                            line.classList.add("animate-in");
                        });
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: "0px 0px -30px 0px"
            }
        );
        observer.observe(poemsBlock);
    }

    // Анимация блока приглашений при скролле
    const invitationTextBlock = document.querySelector(".invitation-text");
    if (invitationTextBlock) {
        const invitationObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-in");
                    }
                });
            },
            { threshold: 0.2, rootMargin: "0px 0px -30px 0px" }
        );
        invitationObserver.observe(invitationTextBlock);
    }

    // Анимация блока даты и времени при скролле
    const eventBlock = document.querySelector(".event-datetime");
    if (eventBlock) {
        const eventObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-in");
                    }
                });
            },
            { threshold: 0.2, rootMargin: "0px 0px -30px 0px" }
        );
        eventObserver.observe(eventBlock);
    }

    // Анимация блока места проведения при скролле
    const venueBlock = document.querySelector(".event-venue");
    if (venueBlock) {
        const venueObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-in");
                    }
                });
            },
            { threshold: 0.2, rootMargin: "0px 0px -30px 0px" }
        );
        venueObserver.observe(venueBlock);
    }

    // Анимация блока обратной связи при скролле
    const feedbackBlock = document.querySelector(".feedback-block");
    if (feedbackBlock) {
        const feedbackBlockObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-in");
                    }
                });
            },
            { threshold: 0.2, rootMargin: "0px 0px -30px 0px" }
        );
        feedbackBlockObserver.observe(feedbackBlock);
    }

    /* Анимация появления разделителей (орнамент под каждым блоком) */
    const dividers = document.querySelectorAll(".block-divider");
    if (dividers.length > 0) {
        const dividerObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-in");
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -20px 0px" }
        );
        dividers.forEach(function (div) {
            dividerObserver.observe(div);
        });
    }

    /* ——— Блок обратной связи: отправка на Google Apps Script Webhook ——— */
    const FEEDBACK_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzfeVXfFGFpWsboOYP_fuGbPiRTn5dNjM_K024rkLQ23jkWNxQoYDYpXV6-GUdVnwLV/exec";

    const form = document.getElementById("feedback-form");
    const submitBtn = document.getElementById("feedback-submit");
    const messageEl = document.getElementById("feedback-message");

    if (form && submitBtn && messageEl) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            var nameInput = document.getElementById("guest-name");
            var attendanceRadio = form.querySelector('input[name="attendance"]:checked');

            // Проверка: имя и выбор обязательны
            var name = nameInput ? nameInput.value.trim() : "";
            if (!name) {
                messageEl.textContent = "Аты-жөніңізді енгізіңіз.";
                messageEl.className = "feedback-message error";
                return;
            }
            if (!attendanceRadio) {
                messageEl.textContent = "«Тойға келесізбе?» сұрағына жауап таңдаңыз.";
                messageEl.className = "feedback-message error";
                return;
            }

            var answer = attendanceRadio.value;

            // Блокируем кнопку на время отправки
            submitBtn.disabled = true;
            messageEl.textContent = "Жіберілуде...";
            messageEl.className = "feedback-message";

            // Тело запроса в формате, который ожидает Webhook (name, answer)
            var payload = JSON.stringify({ name: name, answer: answer });

            fetch(FEEDBACK_WEBHOOK_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: payload
            })
                .then(function () {
                    // no-cors не даёт прочитать ответ; считаем отправку успешной при отсутствии сетевой ошибки
                    messageEl.textContent = "Рақмет! Жауабыңыз жіберілді.";
                    messageEl.className = "feedback-message success";
                    form.reset();
                })
                .catch(function (err) {
                    messageEl.textContent = "Қате орын алды. Кейінірек қайта көріңіз.";
                    messageEl.className = "feedback-message error";
                })
                .finally(function () {
                    submitBtn.disabled = false;
                });
        });
    }

    /* Обратный отсчёт до 21 июня 2026, 16:00 (время начала той) */
    const countdownTarget = new Date(2026, 5, 21, 16, 0, 0, 0);
    const daysEl = document.getElementById("countdown-days");
    const hoursEl = document.getElementById("countdown-hours");
    const minutesEl = document.getElementById("countdown-minutes");
    const secondsEl = document.getElementById("countdown-seconds");

    function updateCountdown() {
        const now = new Date();
        const diff = countdownTarget.getTime() - now.getTime();

        if (diff <= 0) {
            if (daysEl) daysEl.textContent = "0";
            if (hoursEl) hoursEl.textContent = "0";
            if (minutesEl) minutesEl.textContent = "0";
            if (secondsEl) secondsEl.textContent = "0";
            return;
        }

        const totalSeconds = Math.floor(diff / 1000);
        const seconds = totalSeconds % 60;
        const totalMinutes = Math.floor(totalSeconds / 60);
        const minutes = totalMinutes % 60;
        const totalHours = Math.floor(totalMinutes / 60);
        const hours = totalHours % 24;
        const days = Math.floor(totalHours / 24);

        if (daysEl) daysEl.textContent = String(days);
        if (hoursEl) hoursEl.textContent = String(hours);
        if (minutesEl) minutesEl.textContent = String(minutes);
        if (secondsEl) secondsEl.textContent = String(seconds);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
});
