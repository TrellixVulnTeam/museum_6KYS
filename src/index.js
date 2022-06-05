import '../node_modules/normalize.css';
import './utils/style.scss';
import './components/welcome/style/welcome.scss';
import './components/header/style/header.scss';
import './components/modal/styles/modal.scss';

import { createHeaderModal } from './components/modal/js/header-modal';
import { WelcomeSlider } from './components/welcome/welcome-slider/Welcome-slider';

const Slider = new WelcomeSlider(5);
// const welcomeCarousel = document.querySelector('.welcome__content');
Slider.init();
// Slider.switchOnDots();
// Slider.swipedetect(welcomeCarousel);
createHeaderModal();
