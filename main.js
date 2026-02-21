document.addEventListener('DOMContentLoaded', () => {
    // Plan Selection Logic for Quote Page
    const urlParams = new URLSearchParams(window.location.search);
    const selectedPlan = urlParams.get('plan');
    const planSelect = document.getElementById('plan-selection');

    if (planSelect && selectedPlan) {
        planSelect.value = selectedPlan;
    }

    const header = document.querySelector('header');
    const fadeElements = document.querySelectorAll('.fade-up');

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideInterval = 5000;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    setInterval(nextSlide, slideInterval);

    // Form Submission Handling (Seamless Experience with Hidden Iframe)
    const quoteForm = document.getElementById('quote-form');
    const hiddenIframe = document.getElementById('hidden_iframe');
    let isSubmitting = false;

    if (quoteForm && hiddenIframe) {
        quoteForm.addEventListener('submit', () => {
            isSubmitting = true;
            const submitBtn = quoteForm.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.textContent = '전송 중...';
                submitBtn.disabled = true;
            }
        });

        hiddenIframe.addEventListener('load', () => {
            if (isSubmitting) {
                alert('상담 신청이 정상적으로 완료되었습니다. \n\nehwkrl76@naver.com 으로 메일이 발송됩니다. \n(최초 전송 시 이메일에서 승인 버튼을 꼭 눌러주세요!)');
                isSubmitting = false;
                window.location.href = 'index.html';
            }
        });
    }

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
