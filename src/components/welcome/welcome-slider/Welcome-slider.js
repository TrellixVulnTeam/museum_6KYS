/* eslint-disable no-unused-expressions */
export class WelcomeSlider {
  _count = 1;

  constructor(imagesNumber) {
    this.imagesNumber = imagesNumber;
    this.nextBtn = document.querySelector('.controls__right');
    this.prevBtn = document.querySelector('.controls__left');
    this.slide = document.querySelector('.welcome__content');
    this.dots = document.querySelectorAll('.dots__dot');
  }

  init() {
    this._switchSlider();
    this.switchOnDots();
    this._swipedetect();
    this._thumbingSlidesOnTouch();
  }

  _nextSlide() {
    this._count === this.imagesNumber ? this._count = 1 : this._count += 1;
  }

  _prevSlide() {
    this._count === 1 ? this._count = this.imagesNumber : this._count -= 1;
  }

  _changeSlide(direction) {
    if (direction === 'next') {
      this._showSlide('animation-next__to-left', this._showNextSlide);
    } else if (direction === 'prev') {
      this._showSlide('animation-prev__from-right', this._showPrevSlide);
    }
  }

  _removeAnimationEvent = () =>{
    this.slide.removeEventListener('animationend', this._showPrevSlide);
  };

  _showSlide = (direction, showFn) =>{
    this._removeAnimationEvent();
    this._resetStyleClasess();

    this.slide.classList.add(direction);
    this.slide.addEventListener('animationend', showFn);
    this._initActiveDot();
    this._countSlides();
  };

  _showNextSlide = () => {
    this.slide.classList.add('animation-next__from-right');
    this.slide.style.backgroundImage = `url(../src/assets/img/welcome-slider/${this._count}.jpg)`;
    this.slide.classList.remove('animation-next__to-left');
  };

  _showPrevSlide = () =>{
    this.slide.classList.add('animation-prev__from-left');
    this.slide.style.backgroundImage = `url(../src/assets/img/welcome-slider/${this._count}.jpg)`;
    this.slide.classList.remove('animation-prev__from-right');
  };

  _switchSlider() {
    this.nextBtn.addEventListener('click', ()=>{
      this._switchNext();
    });

    this.prevBtn.addEventListener('click', () =>{
      this._switchPrev();
    });
  }

  _switchNext() {
    this._resetStyleClasess();
    this._nextSlide();
    this._changeSlide('next');
  }

  _switchPrev() {
    this._resetStyleClasess();
    this._prevSlide();
    this._changeSlide('prev');
  }

  _resetStyleClasess() {
    this.slide.classList.remove('animation-next__to-left');
    this.slide.classList.remove('animation-next__from-right');
    this.slide.classList.remove('animation-prev__from-left');
    this.slide.classList.remove('animation-prev__from-right');
  }

  switchOnDots = () =>{
    this.dots.forEach((dot, index) =>{
      dot.addEventListener('click', () =>{
        if ((index + 1) > this._count) {
          this._count = index + 1;
          this._showSlide('animation-next__to-left', this._showNextSlide);
          this._initActiveDot();
        } else {
          this._count = index + 1;
          this._showSlide('animation-prev__from-right', this._showPrevSlide);
          this._initActiveDot();
        }
      });

      dot.addEventListener('touchstart', (e)=>{
        e.preventDefault();
        if (e.target.classList.contains('dots__dot')) {
          if ((index + 1) > this._count) {
            this._count = index + 1;
            this._showSlide('animation-next__to-left', this._showNextSlide);
            this._initActiveDot();
          } else {
            this._count = index + 1;
            this._showSlide('animation-prev__from-right', this._showPrevSlide);
            this._initActiveDot();
          }
        }
      });
    });
  };

  _initActiveDot() {
    this.dots.forEach((dot, index) =>{
      if ((index + 1) === this._count) {
        dot.classList.add('dots__dot-active');
      } else {
        dot.classList.remove('dots__dot-active');
      }
    });
  }

  _countSlides() {
    const currentSlide = document.querySelector('.current');
    const total = document.querySelector('.total');
    if (this._count < 10) {
      currentSlide.innerHTML = `0${this._count}`;
    } else {
      currentSlide.innerHTML = this._count;
    }

    if (this.imagesNumber < 10) {
      total.innerHTML = `0${this.imagesNumber}`;
    } else {
      total.innerHTML = this.imagesNumber;
    }
  }

  _thumbingSlidesOnTouch() {
    this.slide.addEventListener('touchstart', (e)=>{
      if (e.target.classList.contains('controls__right')) {
        this._switchNext();
        this._initActiveDot();
      } else if (e.target.classList.contains('controls__left')) {
        this._switchPrev();
        this._initActiveDot();
      }
    });
  }

  _swipedetect = () =>{
    let surface = this.slide;
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;

    let startTime = 0;
    let elapsedTime = 0;

    let threshold = 150;
    let restraint = 100;
    let allowedTime = 300;

    surface.addEventListener('mousedown', (e) =>{
      startX = e.pageX;
      startY = e.pageY;
      startTime = new Date().getTime();
      e.preventDefault();
    });

    surface.addEventListener('mouseup', (e) =>{
      distX = e.pageX - startX;
      distY = e.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;

      if (elapsedTime <= allowedTime) {
        if (Math.abs(distX) > threshold && Math.abs(distY) < restraint) {
          if (distX > 0) {
            this._switchPrev();
          } else {
            this._switchNext();
          }
        }
      }

      startX = e.pageX;
      startY = e.pageY;
      startTime = new Date().getTime();
      e.preventDefault();
    });

    surface.addEventListener('touchstart', (e) =>{
      let touchObj = e.changedTouches[0];
      startX = touchObj.pageX;
      startY = touchObj.pageY;
      startTime = new Date().getTime();
      e.preventDefault();
    });
    surface.addEventListener('touchmove', (e) =>{
      e.preventDefault();
    });
    surface.addEventListener('touchend', (e) =>{
      let touchObj = e.changedTouches[0];
      distX = touchObj.pageX - startX;
      distY = touchObj.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;

      if (elapsedTime <= allowedTime) {
        if (Math.abs(distX) > threshold && Math.abs(distY) < restraint) {
          if (distX > 0) {
            this._switchPrev();
          } else {
            this._switchNext();
          }
        }
      }

      startX = e.pageX;
      startY = e.pageY;
      startTime = new Date().getTime();
      e.preventDefault();
    });
  };
}
