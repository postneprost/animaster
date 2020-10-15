let timer;
addListeners();
const customAnimation = animaster()
        .addMove(1000, {x: 1000, y: 0})
        .addScale(800, 2.3)
        .addMove(1000, {x: 500, y: -800})
        .addFadeOut(2000)
        .addScale(800, 1)
        .addMove(1000, {x: 100, y: -400})
        .addFadeIn(2000)
        .addScale(800, 0.3)
        .addMove(1000, {x: 0, y: 0})
        .addScale(800, 1);



function addListeners() {
    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animaster().addFadeIn(2000).play(block);
        });

    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animaster().addFadeOut(1000).play(block);
        });

    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animaster().addMove(2000, {x: 200, y: 50}).play(block);
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            animaster().addScale(2000, 3).play(block);
        });

    document.getElementById('moveAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            animaster().moveAndHide(block, 5000, true);
        });

    document.getElementById('moveAndHideReset')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            animaster().moveAndHide(block, 0, false).reset();
        });

    document.getElementById('showAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('showAndHideBlock');
            animaster().showAndHide(block, 1000);
        });

    document.getElementById('heartBeatingPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            animaster().heartBeating(block, true);
        });

    document.getElementById('heartBeatingStop')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            animaster().heartBeating(block, false).stop();
        });

    document.getElementById('customAnimationPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('customAnimationBlock');
            customAnimation.play(block);
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

    let _resetFadeOut = function(element) {
        element.classList.add('show');
        element.classList.remove('hide');
        element.style.transitionDuration = null;
        element.style.transform = null;
    };

    let _resetFadeIn = function(element) {
        element.classList.add('hide');
        element.classList.remove('show');
        element.style.transitionDuration = null;
        element.style.transform = null;
    };

    let _resetMoveAndScale = function(element) {
        element.style.transitionDuration = null;
        element.style.transform = null;
    };

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

        moveAndHide: function(element, duration, startAnimation) {

            if (startAnimation) {
                element.style.transitionDuration = `${duration*0.4}ms`
                element.style.transform = 'translate(100px, 20px)';
                setTimeout(() => {
                    element.classList.add('hide');
                    element.style.transitionDuration = `${duration*0.6}ms`;
            },
                duration*0.4);
            }

            let obj = {
                reset: function() {
                    clearInterval(timer);
                    _resetFadeOut(element);
                }
            }
            return obj;
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

        heartBeating: function(element, startAnimation) {

            if (startAnimation) {
                setTimeout(function step() {
                    element.style.transitionDuration = '500ms';
                    element.style.transform = 'scale(1.4, 1.4)';
                    setTimeout(() => {
                        element.style.transitionDuration = '500ms';
                        element.style.transform = 'scale(1, 1)';
                    }, 500);
                    timer = setTimeout(step, 1000);
                });
            }

            let obj = {
                stop: function() {
                    clearInterval(timer);
                }
            }
            return obj;
        },

        addMove: function(duration, valueTransform) {
            this._steps.push({
                operation: "translate",
                duration: duration,
                valueTransform: valueTransform
            });
            return this;
        },

        addScale: function(duration, valueTransform) {
            this._steps.push({
                operation: 'scale',
                duration: duration,
                valueTransform: valueTransform
            });
            return this;
        },

        addFadeIn: function(duration) {
            this._steps.push({
                operation: 'fadein',
                duration: duration
            });
            return this;
        },

        addFadeOut: function(duration) {
            this._steps.push({
                operation: 'fadeout',
                duration: duration,
            });
            return this;
        },

        play: function(element) {
            let i = 0;
            let steps = this._steps;
            let translateAnimation = '';
            let scaleAnimation = '';

            function f() {

                if (i < steps.length) {

                    switch (steps[i].operation) {
                        case 'translate':
                            translateAnimation = `${getTransform(steps[i].valueTransform, null)} `;
                            break;
                        case 'scale':
                            scaleAnimation = `${getTransform(null, steps[i].valueTransform)} `;
                            break;
                        case 'fadein':
                            element.classList.remove('hide');
                            element.classList.add('show');
                            break;
                        case 'fadeout':
                            element.classList.remove('show');
                            element.classList.add('hide');
                            break;
                    }
                    element.style.transform = `${translateAnimation} ${scaleAnimation}`;
                    element.style.transitionDuration = `${steps[i].duration}ms `;
                    setTimeout(f, steps[i].duration)
                }
                i++;
            }
            f();
        },

        _steps: [],
    }
    return animation;
}
