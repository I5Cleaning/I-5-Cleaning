// Sticky header shadow
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Contact form submit
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');
form.addEventListener('submit', e => {
  e.preventDefault();
  successMsg.classList.add('visible');
  form.reset();
  setTimeout(() => successMsg.classList.remove('visible'), 5000);
});

// Price calculator
const calcForm = document.getElementById('calc-form');
const calcResult = document.getElementById('calc-result');
const calcPrice = document.getElementById('calc-price');

const BASE_PRICES = {
  residential: 120,
  commercial: 180,
  deep: 220,
  windows: 80,
  carpet: 150,
  move: 250,
};

const SIZE_MULTIPLIERS = {
  small: 1,
  medium: 1.5,
  large: 2.2,
};

const FREQUENCY_DISCOUNTS = {
  once: 0,
  weekly: 0.15,
  biweekly: 0.10,
  monthly: 0.05,
};

calcForm.addEventListener('change', updateCalc);

function updateCalc() {
  const service = document.getElementById('calc-service').value;
  const size = document.getElementById('calc-size').value;
  const frequency = document.getElementById('calc-frequency').value;
  const extras = [...document.querySelectorAll('.calc-extra:checked')]
    .reduce((sum, el) => sum + Number(el.dataset.price), 0);

  if (!service || !size || !frequency) {
    calcResult.classList.remove('visible');
    return;
  }

  const base = BASE_PRICES[service] * SIZE_MULTIPLIERS[size];
  const discount = FREQUENCY_DISCOUNTS[frequency];
  const total = Math.round((base + extras) * (1 - discount));

  calcPrice.textContent = `$${total}`;
  calcResult.classList.add('visible');
}
