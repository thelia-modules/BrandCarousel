/*********************************************************/
/*                                                       */
/*          Javascript for Brand carousel module         */
/*          Developed by Devoption                       */
/*                                                       */
/*********************************************************/

let brands = [];
const className = "brand_carousel_element";
let brandElements = document.querySelectorAll("." + className);
let nbBrand = brandElements.length;
let lastBrandIndex = nbBrand - 1;
let firstBrandIndex = 0;
let firstVisibleBrandIndex;
let lastVisibleBrandIndex;
let interval;
const animationSpeed = 1;
let animationFinished = true;


window.addEventListener('DOMContentLoaded', function () {
    if (nbBrand > 4) {
        setBrands();
        animateBrandsByInterval("Right");
    }
});


const arrowRight = document.getElementById("arrowRight");
if (arrowRight) {
    arrowRight.addEventListener('click', function () {
        if (animationFinished) {
            clearInterval(interval);
            animateBrands("Right");
            animateBrandsByInterval("Right");
        }
    });
}

const arrowLeft = document.getElementById("arrowLeft");
if (arrowLeft) {
    arrowLeft.addEventListener('click', function () {
        if (animationFinished) {
            clearInterval(interval);
            animateBrands("Left");
            animateBrandsByInterval("Right");
        }
    });
}


function animateBrandsByInterval(direction) {
    interval = setInterval(function () {
        animateBrands(direction);
    }, 3000);
}


function setBrands() {
    for (let i = 0; i < nbBrand; i++) {
        const brandElement = brandSelector(i);
        brandElement.style.visibility = "visible";
        brands.push({
            index: i,
            sliding: 0
        });
    }
}

function animateBrands(direction) {
    animationFinished = false;
    if (direction === "Right") {
        moveLastOrFirstBrand(direction);
        for (let i = 0; i < brands.length; i++) {
            moveBrand(i, direction);
        }
        if (lastBrandIndex === nbBrand - 1) {
            initleftBrands();
        }
    } else if (direction === "Left"){
        for (let i = 0; i < brands.length; i++) {
            moveBrand(i, direction);
        }
        setTimeout(function () {
            moveLastOrFirstBrand(direction);
            if (firstBrandIndex === 0) {
                initleftBrands();
            }
        }, 1000 * animationSpeed);
    }
}

function initleftBrands() {
    for (let i = 0; i < brands.length; i++) {
        brands[i].sliding = 0;
        brandSelector(brands[i].index).style.left = '0px';
    }
}

function getOuterWidth(element) {
    const styles = window.getComputedStyle(element);
    const margin = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
    return element.offsetWidth + margin;
}

function getInnerWidth(element) {
    const styles = window.getComputedStyle(element);
    return element.offsetWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
}

function moveBrand(index, direction) {
    const brand_model = brands[index];
    const brand_view = brandSelector(brand_model.index);
    if (direction === "Right") {
        brand_model.sliding = brand_model.sliding + getOuterWidth(brand_view);
    } else if (direction === "Left"){
        brand_model.sliding = brand_model.sliding - getOuterWidth(brand_view);
    }
    brand_view.style.visibility = "visible";
    brand_view.style.transitionDuration = animationSpeed + 's';
    brand_view.style.left = brand_model.sliding + 'px';
    brands[index] = brand_model;
}

function moveLastOrFirstBrand(direction) {
    if (direction === "Right") {
        moveLastToFirst(lastBrandIndex);
        firstBrandIndex = lastBrandIndex;
        lastBrandIndex = lastBrandIndex - 1;
        if (lastBrandIndex < 0) {
            lastBrandIndex = nbBrand - 1;
        }
        //console.log(' Right lastBrandIndex :' + lastBrandIndex);
        //console.log(' Right firstBrandIndex :' + firstBrandIndex);
    } else if (direction === "Left"){
        moveFirstToLast(firstBrandIndex);
        lastBrandIndex = firstBrandIndex;
        firstBrandIndex = firstBrandIndex + 1;
        if (firstBrandIndex > nbBrand - 1) {
            firstBrandIndex = 0;
        }
        //console.log(' left firstBrandIndex :' + firstBrandIndex);
        //console.log(' left lastBrandIndex :' + lastBrandIndex);
    }
}

function moveLastToFirst(index) {
    const brandModel = brands[index];
    const brandElements = document.querySelectorAll("." + className);
    const brandView = brandElements[brandModel.index];
    let left = brandView.getBoundingClientRect().left;
    const brandCarousel = document.querySelector(".brand_carousel");
    const leftBrandBanner = brandCarousel ? brandCarousel.getBoundingClientRect().left : 0;
    const widthBrand = getInnerWidth(brandView);
    const nb = (nbBrand - 1) - index;
    left = left - widthBrand * nb;
    //console.log('left :' + left);
    brandModel.sliding = -(left - leftBrandBanner + widthBrand);
    brandView.style.transitionDuration = '0s';
    brandView.style.left = brandModel.sliding + 'px';
    brandView.style.visibility = "hidden";
    //console.log('brandModel.sliding :' + brandModel.sliding);
    brands[index] = brandModel;
}

function moveFirstToLast(index) {
    const brandModel = brands[index];
    const brandElements = document.querySelectorAll("." + className);
    const brandView = brandElements[brandModel.index];
    let left = brandView.getBoundingClientRect().left;
    const leftLastBrand = brandSelector(lastBrandIndex).getBoundingClientRect().left;
    const widthBrand = getInnerWidth(brandView);
    left = left + widthBrand * index;
    //console.log('left :' + left);
    brandModel.sliding = (leftLastBrand - left);
    brandView.style.transitionDuration = '0s';
    brandView.style.left = brandModel.sliding + 'px';
    brandView.style.visibility = "hidden";
    //console.log('brandModel.sliding :' + brandModel.sliding);
    brands[index] = brandModel;
}

function brandSelector(index) {
    const brandElements = document.querySelectorAll("." + className);
    return brandElements[index];
}

brandElements.forEach(function(element) {
    element.addEventListener('transitionend', function () {
        animationFinished = true;
    });
});





