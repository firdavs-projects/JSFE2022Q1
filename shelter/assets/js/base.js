// Navbar
const navbarLinks = document.querySelectorAll('.navbar__link');

// Modal
const modal = document.querySelector('#modal');
const isPetsPage = modal?.dataset?.page === 'pets';
const closeBtn = document.querySelector('.modal__close');
const modalImg = modal.querySelector('#modal__img');
const modalTitle = modal.querySelector('#modal__title');
const modalType = modal.querySelector('#modal__type');
const modalInfo = modal.querySelector('#modal__info');
const modalAttributes = modal.querySelector('#modal__attributes');

// slider
const sliderItems = document.querySelector('.slider__items');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentPage = document.querySelector('.current-page');
const firstPageBtn = document.getElementById('first-page');
const lastPageBtn = document.getElementById('last-page');
const navbarToggle = document.querySelector('.burger-menu');
const navbarBackground = document.querySelector('.navbar-background');
const navbarMenu = document.querySelector('.navbar__menu')

const toggleNavbar = () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
    navbarBackground.classList.toggle('active');
    document.body.classList.toggle('overflow-hidden');
};

navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbarLinks.forEach(link => link.classList.remove('active'));
        link.classList.add('active');
        window.innerWidth < 768 && toggleNavbar();
    });
});
navbarToggle.addEventListener('click', toggleNavbar);
navbarBackground.addEventListener('click', toggleNavbar);

//Modal

const closeModal = () => {
    modal.classList.remove('active');
    modalImg.src = '';
    modalImg.alt = '';
    modalTitle.innerHTML = '';
    modalType.innerHTML = '';
    modalInfo.innerHTML = '';
    modalAttributes.innerHTML = '';
    document.body.classList.remove('overflow-hidden');
}

const createAttribute = (key, value) => {
    const dlEl = document.createElement('dl');
    const dtEl = document.createElement('dt');
    const ddEl = document.createElement('dd');
    dlEl.classList.add('modal__attribute');
    dtEl.classList.add('modal__attribute-title');
    ddEl.classList.add('modal__attribute-value');
    dtEl.innerHTML = key;
    ddEl.innerHTML = value;
    dlEl.appendChild(dtEl);
    dlEl.appendChild(ddEl);
    return dlEl;
}

const openModal = (slide) => {
    const current = slides.find(pet => pet.name === slide.dataset.name) || slides[0];
    modalAttributes.appendChild(createAttribute('Age', current.age));
    modalAttributes.appendChild(createAttribute('Inoculations', current.inoculations.join(', ')));
    modalAttributes.appendChild(createAttribute('Diseases', current.diseases.join(', ')));
    modalAttributes.appendChild(createAttribute('Parasites', current.parasites.join(', ')));
    modal.classList.add('active');
    modalImg.src = isPetsPage ? '../' + current.img : current.img;
    modalImg.alt = current.name
    modalTitle.innerHTML = current.name;
    modalType.innerHTML = current.type + ' - ' + current.breed;
    modalInfo.innerHTML = current.description;
    document.body.classList.add('overflow-hidden');
}

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});
modal.addEventListener('mouseover', (e) => {
    if (e.target === modal) {
        closeBtn.classList.add('hover');
    } else {
        closeBtn.classList.remove('hover');
    }
});

// Slider

let slides = [];
let currentSlide = 0;
let step = window.innerWidth < 1280 ? 3 : 2;
let count = window.innerWidth < 768 ? 1 : window.innerWidth < 1280 && window.innerWidth > 767 ? 2 : isPetsPage ? 4 : 3;

const getSlides = () => {
    fetch(isPetsPage ? '../assets/pets.json' : 'assets/pets.json')
        .then(response => response.json())
        .then(pets => {
            slides = pets;
        });
}

const createSlideItem = (pet) => {
    const friend = document.createElement('div');
    friend.classList.add('our-friends__item');
    friend.dataset.name = pet.name;
    friend.addEventListener('click', () => openModal(friend));
    const img = document.createElement('img');
    img.src = isPetsPage ? '../' + pet.img : pet.img;
    img.alt = pet.name;
    const title = document.createElement('div');
    title.classList.add('our-friends__item-title');
    title.innerHTML = pet.name;
    const button = document.createElement('button');
    button.classList.add('button', 'outlined', 'slide-btn');
    button.innerHTML = 'Learn more';
    friend.appendChild(img);
    friend.appendChild(title);
    friend.appendChild(button);
    return friend;
}

const createSlide = (pet, index, pet2, pet3) => {
    const slide = document.createElement('div');
    slide.classList.add('slider__item');
    slide.dataset.slide = index;
    const friend = createSlideItem(pet);
    slide.appendChild(friend);
    if (isPetsPage && pet2) {
        const friend2 = createSlideItem(pet2);
        slide.appendChild(friend2);
        if (window.innerWidth < 1280 && pet3) {
            const friend3 = createSlideItem(pet3);
            slide.appendChild(friend3);
        }
    }
    return slide;
}

const addSlides = () => {
    const count = window.innerWidth < 768 ? 3 : window.innerWidth < 1280 && window.innerWidth > 767 ? 6 : 8;
    const pages = window.innerWidth < 768 ? 16 : window.innerWidth < 1280 && window.innerWidth > 767 ? 8 : 6;
    const pets = [];
    for (let i = 0; i < pages; i++) {
        const limit = shuffle(slides).slice(0, count);
        pets.push(...limit);
    }
    return pets;
}

const renderSlides = () => {
    currentSlide = 0;
    sliderItems.style.transform = 'translateX(0)';
    step = window.innerWidth < 1280 ? 3 : 2;
    count = window.innerWidth < 768 ? 1 : window.innerWidth < 1280 && window.innerWidth > 767 ? 2 : isPetsPage ? 4 : 3;
    const pets = isPetsPage
        ? addSlides()
        : slides.length % count !== 0
            ? slides.concat(slides.slice(count, (count - (slides.length % count)) + count))
            : slides;

    sliderItems.innerHTML = '';

    if (isPetsPage) {
        currentPage.innerHTML = (1).toString();
        nextBtn.classList.remove('disabled');
        prevBtn.classList.add('disabled');
        firstPageBtn.classList.add('disabled');
        lastPageBtn.classList.remove('disabled');
        for (let i = 0; i < pets.length; i = i + step) {
            const slide = createSlide(pets[i], i, pets[i + 1], pets[i + 2]);
            sliderItems.appendChild(slide);
        }
    } else {
        pets.forEach((pet, index) => {
            sliderItems.appendChild(createSlide(pet, index));
        });
    }
}

function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

const nextSlide = (event) => {
    currentSlide += count;
    if (isPetsPage) {
        const {target} = event;
        const toLastPage = target.id === 'last-page';
        if ((currentSlide + count) >= Math.ceil(addSlides().length / step) || toLastPage) {
            nextBtn.classList.add('disabled');
            prevBtn.classList.remove('disabled');
            lastPageBtn.classList.add('disabled');
            firstPageBtn.classList.remove('disabled');
            currentSlide = Math.ceil((addSlides().length / step)) - count;
        } else {
            nextBtn.classList.remove('disabled');
            prevBtn.classList.remove('disabled');
            lastPageBtn.classList.remove('disabled');
            firstPageBtn.classList.remove('disabled');
        }
        currentPage.innerHTML = `${Math.ceil((currentSlide / count) + 1)}`
    } else if (!isPetsPage) {
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
    }
    sliderItems.style.transform = 'translateX(-' + 100 * Math.ceil(currentSlide / count) + '%)';
}

const prevSlide = (event) => {
    currentSlide -= count;
    if (isPetsPage) {
        const {target} = event;
        const toFirstPage = target.id === 'first-page';
        if ((currentSlide * step) - count <= 0 || toFirstPage) {
            prevBtn.classList.add('disabled');
            nextBtn.classList.remove('disabled');
            firstPageBtn.classList.add('disabled');
            lastPageBtn.classList.remove('disabled');
            currentSlide = 0;
        } else {
            prevBtn.classList.remove('disabled');
            nextBtn.classList.remove('disabled');
            lastPageBtn.classList.remove('disabled');
            firstPageBtn.classList.remove('disabled');
        }
        currentPage.innerHTML = `${Math.ceil((currentSlide / count) + 1)}`
    } else if (!isPetsPage) {
        if (currentSlide < 0) {
            currentSlide = slides.length - count;
        }
    }
    sliderItems.style.transform = 'translateX(-' + 100 * (currentSlide / count) + '%)';
}

const shuffle = (slides) => {
    for (let i = slides.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [slides[i], slides[j]] = [slides[j], slides[i]];
    }
    return slides;
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);
lastPageBtn?.addEventListener('click', nextSlide);
firstPageBtn?.addEventListener('click', prevSlide);

getSlides();
setTimeout(renderSlides, 200);
window.addEventListener('resize', debounce(() => renderSlides()));
