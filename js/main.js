const backToTop = document.getElementById('backtotop');

const checkScroll = () => {
    let pageYOffset = window.pageYOffset;

    if (pageYOffset !== 0) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
}

const moveBackToTop = () => {
    if (window.pageYOffset > 0) {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
}

window.addEventListener('scroll', checkScroll);
backToTop.addEventListener('click', moveBackToTop);

const slidePrevList = document.getElementsByClassName('slide-prev');

function transformPrev(event) {
    const slidePrev = event.target;
    const slideNext = slidePrev.nextElementSibling;
    const classList = slidePrev.parentElement.parentElement.nextElementSibling;
    const liList = classList.getElementsByTagName('li');
    let dataPosition = classList.getAttribute('data-position');

    if (classList.clientWidth < (liList.length * 260 + Number(dataPosition))) {
        dataPosition = Number(dataPosition) - 260;

        if (classList.clientWidth > (liList.length * 260 + Number(dataPosition))) {
            slidePrev.style.color = '#cfd8dc';
            slidePrev.classList.remove('slide-prev-hover');
            slidePrev.removeEventListener('click', transformPrev);
        }

        slideNext.style.color = '#2f3059';
        slideNext.classList.add('slide-prev-hover');
        slideNext.addEventListener('click', transformNext);
    }

    classList.style.transition = 'transform 1s';
    classList.style.transform = 'translateX(' + String(dataPosition) + 'px)';
    classList.setAttribute('data-position', dataPosition);
}

function transformNext(event) {
    const slideNext = event.target;
    const slidePrev = slideNext.previousElementSibling;
    const classList = slideNext.parentElement.parentElement.nextElementSibling;
    const liList = classList.getElementsByTagName('li');
    let dataPosition = classList.getAttribute('data-position');

    if (Number(dataPosition) < 0) {
        dataPosition = Number(dataPosition) + 260;

        slidePrev.style.color = '#2f3059';
        slidePrev.classList.add('slide-prev-hover');
        slidePrev.addEventListener('click', transformPrev);

        if (Number(dataPosition) === 0) {
            slideNext.style.color = '#cfd8dc';
            slideNext.classList.remove('slide-prev-hover');
            slideNext.removeEventListener('click', transformNext);
        }
    }

    classList.style.transition = 'transform 1s';
    classList.style.transform = 'translateX(' + String(dataPosition) + 'px)';
    classList.setAttribute('data-position', dataPosition);
}

for (let i = 0; i < slidePrevList.length; i++) {
    let classList = slidePrevList[i].parentElement.parentElement.nextElementSibling;
    let liList = classList.getElementsByTagName('li');

    if (classList.clientWidth < liList.length * 260) {
        slidePrevList[i].classList.add('slide-prev-hover');
        slidePrevList[i].addEventListener('click', transformPrev);
    } else {
        const arrowContainer = slidePrevList[i].parentElement;

        arrowContainer.removeChild(slidePrevList[i].nextElementSibling);
        arrowContainer.removeChild(slidePrevList[i]);
    }
}