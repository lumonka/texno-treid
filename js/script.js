const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('open');
});

menuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
});

document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        mobileMenu.classList.remove('open');
    }
});


const TELEGRAM_BOT_TOKEN = '6356872004:AAHbUKMhJLhbkPrltCq7kPFD_xIKvnrspcY';
const TELEGRAM_CHAT_ID = '-1002028761122';

const productData = {
    'Ноутбуки': {
        images: [
            'images/products/laptop.png',
            'images/products/laptop.png',
            'images/products/laptop.png'
        ],
        icon: 'fas fa-laptop',
        iconColor: 'bg-blue-500',
        price: 'от 15 000₽',
        description: 'Большой выбор б/у и новых ноутбуков с гарантией до 2 лет. Диагностика и настройка включены в стоимость.',
        features: [
            '💻 Гарантия до 2 лет',
            '⚡ Бесплатная диагностика',
            '🛠️ Профессиональная настройка',
            '📦 Доставка по городу'
        ]
    },
    'Системные блоки': {
        images: [
            'images/products/pc.png',
            'images/products/pc.png',
            'images/products/pc.png'
        ],
        icon: 'fas fa-desktop',
        iconColor: 'bg-purple-500',
        price: 'от 25 000₽',
        description: 'Бесплатно соберем мощную сборку по вашим требованиям. Индивидуальный подбор комплектующих.',
        features: [
            '🖥️ Индивидуальная сборка',
            '🎮 Оптимизация для игр',
            '💾 Бесплатная установка ОС',
            '🔧 Тестирование под нагрузкой'
        ]
    },
    'Комплектующие': {
        images: [
            'images/products/parts.png',
            'images/products/parts.png',
            'images/products/parts.png'
        ],
        icon: 'fas fa-microchip',
        iconColor: 'bg-green-500',
        price: 'от 2 000₽',
        description: 'В наличии и под заказ от 2 до 5 дней с установкой. Оригинальные комплектующие с гарантией.',
        features: [
            '🔌 Оригинальные запчасти',
            '⚡ Быстрая установка',
            '🛡️ Гарантия качества',
            '📞 Консультация специалиста'
        ]
    },
    'Смартфоны': {
        images: [
            'images/products/smartphone.png',
            'images/products/smartphone.png',
            'images/products/smartphone.png'
        ],
        icon: 'fas fa-mobile-alt',
        iconColor: 'bg-red-500',
        price: 'от 8 000₽',
        description: 'Android или iOS — решать тебе. Настройка и перенос данных включены в стоимость.',
        features: [
            '📱 Настройка под ключ',
            '🔄 Перенос данных',
            '🛡️ Гарантия 1 год',
            '🎁 Чехол и защитное стекло в подарок'
        ]
    },
    'Телевизоры SMART TV & мониторы': {
        images: [
            'images/products/tv.png',
            'images/products/tv.png',
            'images/products/tv.png'
        ],
        icon: 'fas fa-tv',
        iconColor: 'bg-indigo-500',
        price: 'от 12 000₽',
        description: 'Установка ТВ на стену от 1999 руб. с подключением и настройкой Smart TV.',
        features: [
            '📺 Установка на стену',
            '🔌 Подключение всех устройств',
            '📡 Настройка Smart TV',
            '🎯 Калибровка изображения'
        ]
    },
    'Игровые приставки': {
        images: [
            'images/products/ps5.png',
            'images/products/ps5.png',
            'images/products/ps5.png'
        ],
        icon: 'fas fa-gamepad',
        iconColor: 'bg-yellow-500',
        price: 'от 20 000₽',
        description: 'Проведи время за игрой! Настройка и установка игр. Подключение к онлайн-сервисам.',
        features: [
            '🎮 Настройка консоли',
            '🕹️ Установка игр',
            '🌐 Подключение к PSN/Xbox Live',
            '📦 Доставка и установка'
        ]
    }
};

let currentProduct = '';
let currentSlide = 0;

const modal = document.getElementById('orderModal');
const closeModalBtn = document.getElementById('closeModal');
const orderForm = document.getElementById('orderForm');

document.querySelectorAll('#products button').forEach((button) => {
    button.addEventListener('click', function() {
        const productTitle = this.getAttribute('data-product');
        currentProduct = productTitle;
        currentSlide = 0;
        openModal(productTitle);
    });
});

function openModal(product) {
    const productInfo = productData[product];
    
    if (!productInfo) return;
    
    document.getElementById('productCategory').value = product;
    document.getElementById('productTitle').textContent = product;
    document.getElementById('productPrice').textContent = productInfo.price;
    document.getElementById('productDescription').textContent = productInfo.description;
    
    const productIcon = document.getElementById('productIcon');
    productIcon.className = `w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl ${productInfo.iconColor}`;
    productIcon.innerHTML = `<i class="${productInfo.icon}"></i>`;
    
    const featuresContainer = document.getElementById('productFeatures');
    featuresContainer.innerHTML = productInfo.features.map(feature => 
        `<div class="flex items-center gap-2 text-sm">
            <span class="text-green-500">✓</span>
            <span>${feature}</span>
        </div>`
    ).join('');
    
    initSlider(productInfo.images);
    
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('bg-opacity-0');
        modal.classList.add('bg-opacity-50');
        const modalContent = modal.querySelector('div');
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
    
    document.body.style.overflow = 'hidden';
}

function initSlider(images) {
    const thumbnailsContainer = document.getElementById('thumbnails');
    thumbnailsContainer.innerHTML = '';
    
    document.getElementById('mainImage').src = images[0];
    document.getElementById('currentSlide').textContent = '1';
    document.getElementById('totalSlides').textContent = images.length;
    
    images.forEach((image, index) => {
        const thumb = document.createElement('div');
        thumb.className = `flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-300 ${index === 0 ? 'border-blue-500' : 'border-transparent'}`;
        thumb.innerHTML = `<img src="${image}" alt="" class="w-full h-full object-cover">`;
        thumb.addEventListener('click', () => changeSlide(index));
        thumbnailsContainer.appendChild(thumb);
    });
    
    document.getElementById('prevBtn').onclick = () => changeSlide(currentSlide - 1);
    document.getElementById('nextBtn').onclick = () => changeSlide(currentSlide + 1);
}

function changeSlide(index) {
    const productInfo = productData[currentProduct];
    if (!productInfo) return;
    
    const totalSlides = productInfo.images.length;
    currentSlide = (index + totalSlides) % totalSlides;
    
    document.getElementById('mainImage').src = productInfo.images[currentSlide];
    document.getElementById('currentSlide').textContent = currentSlide + 1;
    
    const thumbs = document.querySelectorAll('#thumbnails > div');
    thumbs.forEach((thumb, i) => {
        thumb.classList.toggle('border-blue-500', i === currentSlide);
        thumb.classList.toggle('border-transparent', i !== currentSlide);
    });
}

function closeModal() {
    modal.classList.remove('bg-opacity-50');
    modal.classList.add('bg-opacity-0');
    const modalContent = modal.querySelector('div');
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 500);
}

closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

orderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const category = formData.get('category');
    const comment = formData.get('comment');
    
    sendToTelegram(name, phone, category, comment);
});

function sendToTelegram(name, phone, category, comment = '') {
    const message = `📦 Новая заявка с сайта:\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n🛒 Товар: ${category}\n💬 Комментарий: ${comment || 'не указан'}\n⏰ Время: ${new Date().toLocaleString()}`;
    
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            showNotification('✅ Заявка отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
            closeModal();
            orderForm.reset();
        } else {
            throw new Error('Ошибка отправки');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('❌ Ошибка отправки. Пожалуйста, попробуйте еще раз.', 'error');
    });
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

document.getElementById('userPhone').addEventListener('input', function(e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    e.target.value = '+7' + (x[2] ? ' (' + x[2] : '') + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
});

    window.addEventListener('load', function () {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('opacity-0');
            // Через 700 мс (как duration в transition) полностью убираем из DOM
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 700);
        }
    });