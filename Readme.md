# Brand Carousel

This module displays a carousel of brand's logos on the home page.
The carousel is animated with a fade effect and a slide effect.
The number of items per page can be modified from the back office's module-configuration page. 

## Installation

### Composer

Add it in your main thelia composer.json file

```
composer require thelia/brand-carousel-module ~1.2.0
```

## Usage

Activate the module in the back office.
If the hook home-body is active, your carousel will be displayed.
You can modify the number of items per page in the module configuration page by adding the variable `brand_carousel_count` ( default value: 5)


