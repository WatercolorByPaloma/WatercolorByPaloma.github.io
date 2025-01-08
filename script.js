const btnPt = document.getElementById('btn-pt');
const btnEn = document.getElementById('btn-en');

let localizationData;
let currentLanguage = 'pt';

function fetchLocalization() {
    fetch('localizations.json')
        .then(response => response.json())
        .then(data => {
            localizationData = data;
            toggleLanguage(currentLanguage);
        })
        .catch(error => {
            // console.error('Erro ao carregar o arquivo JSON:', error);
        });
}


function toggleLanguage(language) {

    let allLanguagesElements = document.querySelectorAll('[data-language]');
     
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
}

function setLocalization(language, allLanguagesElements){
    allLanguagesElements.forEach(function(e, a){
        if (!e || !localizationData[language] || !localizationData[language][e.dataset.language]) {
            return;
        }

        e.innerText = localizationData[language][e.dataset.language];
    });
}

btnPt.addEventListener('click', () => toggleLanguage('pt'));
btnEn.addEventListener('click', () => toggleLanguage('en'));

fetchLocalization();

var carrouselAboutMe = document.querySelector('#carouselExampleDark');

if(carrouselAboutMe){
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



