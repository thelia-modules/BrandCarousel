/*********************************************************/
/*                                                       */
/*          Javascript for Brand carousel module         */
/*          Developed by Devoption                       */
/*                                                       */
/*********************************************************/

const className = "brand_carousel_element";
let brandElements = document.querySelectorAll("." + className);
let nbBrand = brandElements.length;
let currentIndex = 0;
let interval;
const animationSpeed = 600;
let isAnimating = false;

// Récupérer le nombre de marques visibles depuis l'attribut data ou utiliser 5 par défaut
const carousel = document.querySelector(".brand_carousel");
const visibleBrandsCount = carousel && carousel.dataset.visibleCount
    ? parseInt(carousel.dataset.visibleCount)
    : 5;


window.addEventListener('DOMContentLoaded', function () {
    if (nbBrand > visibleBrandsCount) {
        initCarousel();
        startAutoRotation();
    } else {
        initStaticDisplay();
    }
});


const arrowRight = document.getElementById("arrowRight");
if (arrowRight) {
    arrowRight.addEventListener('click', function () {
        if (!isAnimating) {
            clearInterval(interval);
            slideRight();
            startAutoRotation();
        }
    });
}

const arrowLeft = document.getElementById("arrowLeft");
if (arrowLeft) {
    arrowLeft.addEventListener('click', function () {
        if (!isAnimating) {
            clearInterval(interval);
            slideLeft();
            startAutoRotation();
        }
    });
}

function initCarousel() {
    // Utiliser display: flex pour une meilleure répartition
    if (carousel) {
        carousel.style.display = "flex";
        carousel.style.width = "100%";
    }

    brandElements.forEach((element, index) => {
        element.style.transition = `opacity ${animationSpeed}ms ease-in-out`;
        element.style.flex = "1 1 0";
        element.style.minWidth = "0";
        element.style.boxSizing = "border-box";
        element.style.textAlign = "center";

        if (index < visibleBrandsCount) {
            element.style.display = "block";
            element.style.opacity = "1";
        } else {
            element.style.display = "none";
            element.style.opacity = "0";
        }

        // Rendre les images responsive
        const img = element.querySelector('.brand');
        if (img) {
            img.style.width = "100%";
            img.style.maxWidth = "100%";
            img.style.height = "auto";
        }
    });
}

function initStaticDisplay() {
    // Utiliser display: flex pour une meilleure répartition
    if (carousel) {
        carousel.style.display = "flex";
        carousel.style.width = "100%";
    }

    brandElements.forEach((element) => {
        element.style.display = "block";
        element.style.flex = "1 1 0";
        element.style.minWidth = "0";
        element.style.boxSizing = "border-box";
        element.style.textAlign = "center";
        element.style.opacity = "1";

        // Rendre les images responsive
        const img = element.querySelector('.brand');
        if (img) {
            img.style.width = "100%";
            img.style.maxWidth = "100%";
            img.style.height = "auto";
        }
    });

    // Cacher les flèches si elles existent
    const arrowLeft = document.getElementById("arrowLeft");
    const arrowRight = document.getElementById("arrowRight");
    if (arrowLeft) arrowLeft.style.display = "none";
    if (arrowRight) arrowRight.style.display = "none";
}

function startAutoRotation() {
    interval = setInterval(function () {
        slideRight();
    }, 3000);
}

function updateDisplay() {
    brandElements.forEach((element, index) => {
        let shouldBeVisible = false;
        for (let i = 0; i < visibleBrandsCount; i++) {
            const visibleIndex = (currentIndex + i) % nbBrand;
            if (index === visibleIndex) {
                shouldBeVisible = true;
                break;
            }
        }

        if (!shouldBeVisible && element.style.opacity !== "0") {
            element.style.opacity = "0";
        }
    });

    setTimeout(() => {
        brandElements.forEach((element, index) => {
            let shouldBeVisible = false;
            for (let i = 0; i < visibleBrandsCount; i++) {
                const visibleIndex = (currentIndex + i) % nbBrand;
                if (index === visibleIndex) {
                    shouldBeVisible = true;
                    break;
                }
            }

            if (shouldBeVisible) {
                if (element.style.display === "none") {
                    element.style.display = "table-cell";
                    element.style.opacity = "0";
                    element.offsetHeight;
                    setTimeout(() => {
                        element.style.opacity = "1";
                    }, 10);
                }
            } else if (element.style.opacity === "0") {
                element.style.display = "none";
            }
        });
    }, animationSpeed);
}

function slideRight() {
    if (isAnimating) return;
    isAnimating = true;

    currentIndex = (currentIndex + 1) % nbBrand;
    updateDisplay();

    setTimeout(() => {
        isAnimating = false;
    }, animationSpeed * 2 + 50);
}

function slideLeft() {
    if (isAnimating) return;
    isAnimating = true;

    currentIndex = (currentIndex - 1 + nbBrand) % nbBrand;
    updateDisplay();

    setTimeout(() => {
        isAnimating = false;
    }, animationSpeed * 2 + 50);
}
