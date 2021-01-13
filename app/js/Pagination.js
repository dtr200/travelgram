class Pagination{
    constructor(){
        this.articles = null;
        this.buttonList = null;
        this.selected = null;
        this.hide = null;
    }

    addClickListener(){
        this.buttonList.forEach(el => el.addEventListener('click', {handleEvent: this.hideArticle, self: this} ));
    }

    /*  иммитация подгрузки страницы: добавляю opacity + ожидание 1сек,
     затем удаляю opacity и переставляю желтый кружок */

    hideArticle(e){
        e.preventDefault();
        const self = this.self;
        new Promise((resolve, reject) => {
            self.articles.forEach(el => el.classList.add(self.hide));
            setTimeout(() => resolve(), 1000);
        })
            .then(() => {
                self.articles.forEach(el => el.classList.remove(self.hide));
                self.changeCircle(e, self);
            });
        
    }
    // Меняю желтый круг. Удаляю у всех кнопок модификатор круга и добавляю его для e.taget 
    changeCircle(e, self){
        self.buttonList.forEach(el => el.childNodes[0].classList.contains(self.selected) ? 
            el.childNodes[0].classList.remove(self.selected) : false);
        e.target.classList.add(self.selected);
    }

    render(data){
        this.articles = document.querySelectorAll(data.articles);
        this.buttonList = document.querySelectorAll(data.buttonList);
        this.selected = data.selected;
        this.hide = data.hide;
        this.addClickListener();
    }
}