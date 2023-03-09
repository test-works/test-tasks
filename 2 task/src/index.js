import './index.scss'
import Logo from './assets/logo_welbex.png'
import Tg from './assets/tg.svg'
import Viber from './assets/viber.svg'
import whatsApp from './assets/whatsApp.svg'
import mobileMain from './assets/mobile-main-bg.png'

const circleClasses = ['circle1', 'circle2', 'circle3', 'circle4', 'circle5']


function observe() {
  let options = { threshold: [0.5] };
  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll('.element-animation');
  for (let elm of elements) {
    observer.observe(elm);
  }
}

function onEntry(entry) {
  entry.forEach(change => {
    if (change.isIntersecting) {
      change.target.classList.add('element-show');
    }
  });
}

function showCircles() {
  const circles = document.querySelectorAll('.circle')
  circles.forEach((item, idx) => {
    item.classList.add(circleClasses[idx])
  })
}

observe()

const timeout = setTimeout(() => {
  showCircles()
  clearTimeout(timeout)
}, 500)
