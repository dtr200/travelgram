const galleryData = {
    'images': ['main-gallery--img', 'main-gallery--img2', 'main-gallery--img3', 'main-gallery--img4', 'main-gallery--img5'],
    'upButton': '.main-gallery__nav-button--up',
    'downButton': '.main-gallery__nav-button--down',
    'dots': '.main-gallery__dot',
    'activeDot': 'main-gallery__dot--active',
    'mainElement': '.main-gallery'
}

const buttonData = {
    'button': '.up-button'
}

const paginationData = {
    'articles': '.article',
    'hide': 'pagination__hide',
    'selected': 'pagination__page--selected',
    'buttonList': '.pagination__item'
}

const gallery = new Gallery();
gallery.render(galleryData);

const button = new Button();
button.render(buttonData);

const pagination = new Pagination();
pagination.render(paginationData);
