let images = [{
    url: 'img/american.jpg',
    title: 'Американская классика'
}, {
    url: 'img/artnouveau.jpg',
    title: 'Ар-нуво'
}, {
    url: 'img/provence.jpg',
    title: 'Прованс'
}, {
    url: 'img/boho.jpg',
    title: 'Бохо'
}, {
    url: 'img/english.jpg',
    title: 'Английский стиль'
}];

function initSlider(options) {
    if (!images || !images.length) return;

    options = options || {
        titles: false,
        indicators: true,
        autoplay: false
    };

    let sliderImage = document.querySelector('.slider__images');
    let sliderArrows = document.querySelectorAll('.slider-control__arrow');
    let sliderIndicators = document.querySelector('.slider-control__indicators');

    initImage();
    initArrows();

    if (options.indicators) {
        initIndicators();
    }

    if (options.titles) {
        initTitles();
    }

    if (options.autoplay) {
        initAutoplay(options.autoplayInt);
    }

    function initImage() {
        images.forEach(function(item, i){
            let image = `<div class="slider__image n${i} ${i === 0 ? "active" : ""}" style="background-image: url(${images[i].url})" data-index="${i}"></div>`;
            sliderImage.innerHTML += image;
        });
    }

    function initArrows() {
        sliderArrows.forEach(function(arrow){
            arrow.addEventListener('click', function() {
                let currentNum = +sliderImage.querySelector('.active').dataset.index;
                let nextNum;
                if (arrow.classList.contains('next')) {
                    nextNum = currentNum === images.length - 1 ? 0 : currentNum + 1;
                } else {
                    nextNum = currentNum === 0 ? images.length -1 : currentNum - 1;
                }
                moveSlider(nextNum);
            });
        });
    }

    function initIndicators() {
        images.forEach(function(image, index) {
            let indicator = `<button class="slider-control__indicator n${index} ${index === 0 ? "active" : ""}" data-index = "${index}"></button>`;
            sliderIndicators.innerHTML += indicator;
        });
        sliderIndicators.querySelectorAll('.slider-control__indicator').forEach(function (indicator) {
            indicator.addEventListener('click', function() {
               moveSlider(this.dataset.index);
            });
        })
    }

    function moveSlider(num) {
        sliderImage.querySelectorAll('.slider__image').forEach(function(image, i){
            image.style.transform = `translate(${-600*num}px)`;
        });
        sliderImage.querySelector('.active').classList.remove('active');
        sliderImage.querySelector('.n' + num).classList.add('active');
        sliderIndicators.querySelector('.active').classList.remove('active');
        sliderIndicators.querySelector('.n' + num).classList.add('active');
        if (options.titles) {
            document.querySelector('.slider__title').innerText = images[num].title;
        }
    }

    function initTitles() {
        document.querySelector('.slider__body').insertAdjacentHTML('beforeend', '<div class="slider__title"></div>');
        document.querySelector('.slider__title').innerText = images[0].title;
    }

    function initAutoplay(interval) {
        setInterval(function(){
            let currentNum = +sliderImage.querySelector('.active').dataset.index;
            let nextNum = currentNum === images.length - 1 ? 0 : currentNum + 1;
            moveSlider(nextNum);
        }, interval);
    }
}

let sliderOptions = {
    indicators: true,
    titles: true,
    autoplay: true,
    autoplayInt: 4000
};

document.addEventListener('DOMContentLoaded', () => {
    initSlider(sliderOptions);
});

