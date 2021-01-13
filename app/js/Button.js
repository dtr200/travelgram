class Button{
    constructor(){
        this.button = null;
    }

    addClickListener(){
        const goUp = this.goUp.bind(this);
        this.button.addEventListener('click', goUp);
    }

    // перебрасываю вверх страницы с мягкой прокруткой вверх

    goUp(e){
        window.scroll({
            left: 0, 
            top: 0,
            behavior: 'smooth'
        });
    }

    render(data){
        this.button = document.querySelector(data.button);
        this.addClickListener();
    }
}