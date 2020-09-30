addListeners();

function addListeners() {
    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animaster().fadeIn(block, 5000);
        });

    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animaster().fadeOut(block, 5000);
        });

    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animaster().move(block, 1000, {x: 100, y: 10});
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            animaster().scale(block, 1000, 1.25);
        });

    document.getElementById('moveAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            animaster().moveAndHide(block, 1000);
        });

    document.getElementById('showAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('showAndHideBlock');
            animaster().showAndHide(block, 1000);
        });

    document.getElementById('heartBeatingPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            animaster().heartBeating(block);
        });

    document.getElementById('heartBeatingStop')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            animaster().heartBeating(block).stop();
        });
}

function getTransform(translation, ratio) {
    const result = [];
    if (translation) {
        result.push(`translate(${translation.x}px,${translation.y}px)`);
    }
    if (ratio) {
        result.push(`scale(${ratio})`);
    }
    return result.join(' ');
}

function animaster() {
    let animation = {

        move: function(element, duration, translation) {
            element.style.transitionDuration = `${duration}ms`;
            element.style.transform = getTransform(translation, null);
        },

        fadeIn: function(element, duration) {
            element.style.transitionDuration =  `${duration}ms`;
            element.classList.remove('hide');
            element.classList.add('show');
        },

        fadeOut: function(element, duration) {
            element.style.transitionDuration =  `${duration}ms`;
            element.classList.remove('show');
            element.classList.add('hide');
        },

        scale: function(element, duration, ratio) {
            element.style.transitionDuration =  `${duration}ms`;
            element.style.transform = getTransform(null, ratio);
        },

        moveAndHide: function(element, duration) {
            element.style.transitionDuration = `${duration*0.4}ms`
            element.style.transform = 'translate(100px, 20px)';
            setTimeout(() => {
                element.classList.add('hide');
                element.style.transitionDuration = `${duration*0.6}ms`;
            },
                duration*0.4);
        },

        showAndHide: function(element, duration) {
            element.style.transitionDuration = `${duration*0.33}ms`;
            element.classList.remove('hide');
            element.classList.add('show');
            setTimeout(() => {
                element.style.transitionDuration = `${duration*0.33}ms`;
                element.classList.remove('show');
                element.classList.add('hide');
            }, duration*0.66);
        },

        heartBeating: function(element) {

            let timer = setTimeout(function step() {
                element.style.transitionDuration = '500ms';
                element.style.transform = 'scale(1.4, 1.4)';
                setTimeout(() => {
                    element.style.transitionDuration = '500ms';
                    element.style.transform = 'scale(1, 1)';
                }, 500);
                setTimeout(step, 1000);
                });

            let obj = {
                stop: function() {
                    clearTimeout(timer);
                }
            }
            return obj;
        }
    }
    return animation;
}

            // let timerId = setTimeout(function step() {
            //     element.style.transitionDuration = '500ms';
            //     element.style.transform = 'scale(1.4, 1.4)';
            //     setTimeout(() => {
            //         element.style.transitionDuration = '500ms';
            //         element.style.transform = 'scale(1, 1)';
            //     }, 500);
            //     setTimeout(step, 1000);
            // });


                // heartBeating: function(element) {
        //     setInterval(() => {
        //         element.style.transitionDuration = '500ms';
        //         element.style.transform = 'scale(1.4, 1.4)';
        //         setTimeout(() => {
        //             element.style.transitionDuration = '500ms';
        //             element.style.transform = 'scale(1, 1)';
        //         }, 500);
        //     }, 1000);
        // }
