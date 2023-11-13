import Accordion from './accordion';

export default class Touch {
  static touchSwipe() {
    const articles = document.querySelectorAll('.accordion-article');

    let initialX, initialY, animationFrame;
    articles.forEach((article) => {
      article.addEventListener('touchstart', (e) => {
        initialX = e.touches[0].clientX;
        initialY = e.touches[0].clientY;
      });

      article.addEventListener('touchmove', (e) => {
        const deltaX = e.touches[0].clientX - initialX;
        const maxSlideLeft = -120;
        const translatedX = Math.max(deltaX, maxSlideLeft);

        if (translatedX < 0) {
          // Only allow translation to the left
          article.style.transform = `translateX(${translatedX}px)`;
          article.nextElementSibling.style.transform = `translateX(${translatedX}px)`;
        }
      });

      article.addEventListener('touchend', (e) => {
        var deltaX = e.changedTouches[0].clientX - initialX;
        var deltaY = Math.abs(e.changedTouches[0].clientY - initialY);

        if (deltaX <= -100 && deltaY <= 100) {
          this.swipeLeft(article);
        } else {
          this.resetTransform(article);
        }

        animationFrame = requestAnimationFrame(() => {
          article.style.transition = '';
          article.nextElementSibling.style.transition = '';
        });
      });

      article.addEventListener('touchcancel', () => {
        cancelAnimationFrame(animationFrame);
      });
    });
  }

  static swipeLeft(article) {
    article.style.transition = 'transform 0.3s ease-in-out';
    article.style.transform = 'translateX(-35%)';
    article.nextElementSibling.style.transition = 'transform 0.3s ease-in-out';
    article.nextElementSibling.style.transform = 'translateX(-100%)';
    Accordion.accordionArticleRemover(article);
  }

  static resetTransform(article) {
    article.style.transition = 'transform 0.3s ease-in-out';
    article.style.transform = 'translateX(0)';
    article.nextElementSibling.style.transition = 'transform 0.3s ease-in-out';
    article.nextElementSibling.style.transform = 'translateX(0)';
  }

  static run() {
    this.touchSwipe();
  }
}
