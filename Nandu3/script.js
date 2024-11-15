// Image Carousel Script
let currentSlide = 0;
const carouselItems = document.querySelectorAll('.carousel-item');
const totalSlides = carouselItems.length;

function moveSlide(direction) {
  currentSlide += direction;

  if (currentSlide < 0) {
    currentSlide = totalSlides - 1;
  } else if (currentSlide >= totalSlides) {
    currentSlide = 0;
  }

  updateCarousel();
}

function updateCarousel() {
  carouselItems.forEach((item, index) => {
    if (index === currentSlide) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Initialize the carousel by displaying the first item
updateCarousel();

// Fetch Joke from API
document.getElementById('fetch-joke').addEventListener('click', fetchJoke);

async function fetchJoke() {
  const jokeTextElement = document.getElementById('joke-text');

  try {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const joke = await response.json();
    jokeTextElement.innerHTML = `${joke.setup} - ${joke.punchline}`

  } catch (error) {
    jokeTextElement.innerHTML = 'Sorry, we couldn\'t fetch a joke at the moment.';
  }
}

// Quiz Functionality
const quizForm = document.getElementById('quiz-form');
const quizResult = document.getElementById('quiz-result');
const recommendedGift = document.getElementById('recommended-gift');

quizForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const recipient = document.querySelector('input[name="recipient"]:checked').value;
  const budget = document.querySelector('input[name="budget"]:checked').value;
  const giftType = document.querySelector('input[name="gift_type"]:checked').value;

  let recommendation = '';

  if (recipient === 'Birthday') {
    recommendation += 'For Birthday: ';
  } else if (recipient === 'Housewarming') {
    recommendation += 'For Housewarming: ';
  }else if (recipient === 'Anniversaries') {
    recommendation += 'For Anniversaries: ';
  } else {
    recommendation += 'For Promotions or Career Milestones: ';
  }

  if (budget === 'Less than 1000') {
    recommendation += 'Budget-friendly options like gadgets or accessories.';
  } else if (budget === '1000 -2000') {
    recommendation += 'Consider practical or fun gifts in the mid-range price.';
  } else {
    recommendation += 'Luxury items like high-end tech or designer gifts.';
  }

  if (giftType === 'Gift Baskets') {
    recommendation += ' Practical gifts like  Gift Baskets or home items.';
  } else if (giftType === 'Creative Gifts') {
    recommendation += ' Creative or Handmade Gifts.';
  } 
    else if (giftType === 'Luxury Gifts') {
    recommendation += ' Luxury Gifts Like watches,Wallets,jwellary etc.';
  } else {
    recommendation += ' Tech Gifts.';
  }

  recommendedGift.textContent = recommendation;
  quizResult.style.display = 'block';
});