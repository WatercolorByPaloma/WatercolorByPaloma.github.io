const btnPt = document.getElementById('btn-pt');
const btnEn = document.getElementById('btn-en');

let localizationData;
let currentLanguage = 'pt';

async function fetchLocalization() {
    if (localizationData && Object.keys(localizationData).length > 0) {
        return;
    }

    try {
        const response = await fetch('localizations.json');
        localizationData = await response.json();
    } catch (error) {
        console.error("Erro ao carregar localizações:", error);
    }
}

function toggleLanguage(language) {

    let allLanguagesElements = document.querySelectorAll('[data-language]');
    let links = document.querySelectorAll('a[href$=".html"], a[href*=".html?"]');

    if (language === 'pt') {
        btnPt.classList.remove('btn-secondary');
        btnPt.classList.add('btn-primary');

        btnEn.classList.remove('btn-primary');
        btnEn.classList.add('btn-secondary');

        setLocalization(language, allLanguagesElements);

    } else if (language === 'en') {

        btnEn.classList.remove('btn-secondary');
        btnEn.classList.add('btn-primary');

        btnPt.classList.remove('btn-primary');
        btnPt.classList.add('btn-secondary');

        setLocalization(language, allLanguagesElements);
    }

    links.forEach(link => {
        let url = new URL(link.href, window.location.origin);
        url.searchParams.set('lang', language);
        link.href = url.toString();
    });
}


function applyLanguageFromQueryParams() {
    let params = new URLSearchParams(window.location.search);
    let lang = params.get('lang');
    const select = document.querySelector(".form-select");

    if (lang === 'en') {
        toggleLanguage('en');
        select.value = "en";
    } else {
        toggleLanguage('pt');
        select.value = "pt";
    }

    updateFlag(select); 
}

async function setLocalization(language, allLanguagesElements) {

    if (!localizationData || Object.keys(localizationData).length === 0) {
        await fetchLocalization();
    }

    allLanguagesElements.forEach(function (e, a) {

        if (!e || !localizationData[language] || !localizationData[language][e.dataset.language]) {
            return;
        }

        var text = localizationData[language][e.dataset.language];
        e.title = text;
        if (e.classList.contains("no-text")) {
            return;
        }

        e.innerText = text;
    });

}

var carrouselAboutMe = document.querySelector('#carouselExampleDark');

if (carrouselAboutMe) {
    document.querySelector('#carouselExampleDark').addEventListener('slide.bs.carousel', function (event) {

        const allImages = document.querySelectorAll('.img-paloma, .img-douglas, .img-franklyn, .img-gaia');
        allImages.forEach(image => image.style.opacity = 0.3);


        const activeSlide = event.relatedTarget;
        const activeSlideIndex = Array.from(activeSlide.parentNode.children).indexOf(activeSlide);
        const images = document.querySelectorAll('.img-paloma, .img-douglas, .img-franklyn, .img-gaia');

        images[activeSlideIndex].style.opacity = 1;
    });
}


document.querySelectorAll('.img-paloma, .img-douglas, .img-franklyn, .img-gaia').forEach((image, index) => {
    image.addEventListener('click', () => {

        const carousel = document.querySelector('#carouselExampleDark');
        const bootstrapCarousel = bootstrap.Carousel.getInstance(carousel) || new bootstrap.Carousel(carousel);
        bootstrapCarousel.to(index);
    });
});


function copyEmail() {
    const email = "watercoloranimal.bypl@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        const alertBox = document.createElement('div');
        alertBox.className = 'alert alert-success';
        alertBox.textContent = "Email copiado/copied!";
        alertBox.style.position = 'fixed';
        alertBox.style.top = '20px';
        alertBox.style.right = '20px';
        alertBox.style.zIndex = '1050';
        document.body.appendChild(alertBox);

        setTimeout(() => {
            alertBox.remove();
        }, 2000);
    }, (err) => {
        //  alert("Failed to copy email: " + err);
    });
}

function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

(function () {
    if (isMobile()) {
        var elHide = document.getElementsByClassName("copy-email")[0];
        if (elHide) {
            elHide.style.display = "none";
        }
    } else {
        var openInsta = document.getElementsByClassName("open-instagram")[0];
        if (openInsta) {
            openInsta.style.display = "none";
        }
    }
})();


document.querySelector('.form-select').addEventListener('change', function () {
    
    updateFlag(this); 
    toggleLanguage(this.value);
});

function updateFlag(selectElement) {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const selectedFlag = selectedOption.dataset.flag;
    selectElement.style.backgroundImage = `url('${selectedFlag}')`;
}

document.addEventListener('DOMContentLoaded', applyLanguageFromQueryParams);
