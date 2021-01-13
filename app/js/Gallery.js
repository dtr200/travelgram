class Gallery{
    constructor(){
        this.upButton = null;
        this.downButton = null;
        this.images = null;
        this.dots = null;
        this.mainElement = null;
        this.activeDot = null;
    }

    addClickListener(){
        const changeImageUp = this.changeImageUp.bind(this),
              changeImageDown = this.changeImageDown.bind(this);
        this.upButton.addEventListener('click', changeImageUp);
        this.downButton.addEventListener('click', changeImageDown);
    }

    // смена картинки вверх
    changeImageUp(){
        this.changeImage('up');     
    }
    // смена картинки вниз
    changeImageDown(){
        this.changeImage('down');
    }

    changeImage(direct){
        // беру текущую картинку, ее индекс, и удаляю модификатор класса текущего изображения 
        const currentImage = this.mainElement.classList[1];
        let currentIndex = this.images.indexOf(currentImage);
        this.mainElement.classList.remove(currentImage);
        if(direct == 'up'){
            /* проверяю не последняя ли картинка (иначе ставлю модификатор первой картинки), 
            ставлю модификатор следующей картинки, запускаю смену точки */
            currentIndex == this.images.length - 1 ? currentIndex = -1 : false;
            this.mainElement.classList.add(this.images[currentIndex + 1]);
            this.changeDotUp();
        }
        else{
            /* смотрю не дошел ли до первой картинки (дальше переставлю в конец), 
            ставлю модифкатор пред картинки и меняю точку */
            currentIndex == 0 ? currentIndex = this.images.length : false;
            this.mainElement.classList.add(this.images[currentIndex - 1]);
            this.changeDotDown();
        }
    }
    // смена точки вверх
    changeDotUp(){
        this.changeDot('up');
    }
    // смена точки вниз
    changeDotDown(){
        this.changeDot('down');
    }

    changeDot(direct){
        const dotList = this.dots;
        let index = null,
            tempIndex = -1;
        dotList.forEach(el => {
            // считаю индекс текущей точки
            tempIndex++;
            if(el.classList.contains(this.activeDot))
                index = tempIndex;
        })
        // удалил модификатор активной точки
        dotList[index].classList.remove(this.activeDot);
        if(direct == 'up'){
            // ищу след соседа, если есть переставляю, если нет, начинаю сначала
            const next = dotList[index].nextElementSibling;        
            next ? next.classList.add(this.activeDot) : 
                   dotList[0].classList.add(this.activeDot);
        }
        else{
            // ищу пред соседа иначе ставлю в конец коллекции
            const prev = dotList[index].previousElementSibling;
            prev ? prev.classList.add(this.activeDot) : 
                   dotList[dotList.length - 1].classList.add(this.activeDot);
        }            
    }

    render(data){
        this.upButton = document.querySelector(data.upButton);
        this.downButton = document.querySelector(data.downButton);        
        this.mainElement = document.querySelector(data.mainElement);
        this.images = data.images;
        this.dots = document.querySelectorAll(data.dots);
        this.activeDot = data.activeDot;   
        this.addClickListener();
    }
}