import Accordion from './accordion'
import Storage from './storage'
import Hash from './hash'
import autoAnimate from '@formkit/auto-animate'
import Touch from './touch'
import trashIcon from '../assets/icons/MaterialSymbolsDeleteForeverOutline.svg'

export default class Archive {
  // Saves a object with an article to localstorage
  static articleArchive(article) {
    let archiveArray = Storage.loadFromStorage('archive') || []
    const articleQuery =
      article?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.dataset
        .query
    const cleanedArticle = this.articleCleaner(article.outerHTML)
    const modiefiedArticle = this.articleModifier(cleanedArticle)
    const articleObject = {
      id: Hash.saveArticleHash(cleanedArticle),
      subject: articleQuery,
      html: modiefiedArticle.innerHTML,
    }
    archiveArray.push(articleObject)
    Storage.saveToStorage('archive', archiveArray)
    article.parentElement.remove()
    this.loadArchive()
  }

  // Loads article in localstorage to archive offcanvas
  static loadArchive() {
    if (!Storage.loadFromStorage('archive')) return

    const archiveArray = Storage.loadFromStorage('archive')
    Accordion.emptyArchiveAccordions()

    archiveArray.forEach((obj) => {
      const accordion = document.querySelector(`.offcanvas .accordion[data-query="${obj.subject}"]`)

      if (accordion) {
        const accordionBody = accordion.querySelector('.accordion-body')
        autoAnimate(accordionBody)
        const newArticle = document.createElement('article')
        newArticle.classList.add('border-bottom')
        newArticle.innerHTML = obj.html
        accordionBody.appendChild(newArticle)
      } else {
        // For search archive elements
        const accordionBody = document.querySelector('#flush-collapseSeven .accordion-body')
        autoAnimate(accordionBody)
        const newArticle = document.createElement('article')
        newArticle.classList.add('border-bottom')
        newArticle.innerHTML = obj.html
        accordionBody.appendChild(newArticle)
      }
    })
    Touch.run('.offcanvas')
  }

  // Modifies an article
  static articleModifier(article) {
    const newArticle = document.createElement('article')
    const newDiv = document.createElement('div')

    newDiv.classList.add('accordion-article-swipeleft--delete')
    newDiv.innerHTML = `<img src=${trashIcon} alt="Delete icon">`

    newArticle.classList.add('border-bottom')
    newArticle.innerHTML = article

    newArticle.appendChild(newDiv)
    return newArticle
  }

  static articleCleaner(article) {
    function removeTags(str) {
      if (str === null || str === '') return false
      else str = str.toString()

      return str.replace(/(<\/?head>|<\/?body>)/gi, '')
    }

    const parser = new DOMParser()
    const parsedHTML = parser.parseFromString(article, 'text/html')

    const elementsWithStyles = parsedHTML.querySelectorAll('[style]')
    elementsWithStyles.forEach((element) => {
      element.removeAttribute('style')
    })

    return removeTags(parsedHTML.documentElement.innerHTML)
  }

  static archiveDeleter(article) {
    let archiveArray = Storage.loadFromStorage('archive')
    const cleanedArticle = this.articleCleaner(article.outerHTML)
    const hashOfArticle = Hash.makeHash(cleanedArticle)
    archiveArray = archiveArray.filter((obj) => obj.id !== hashOfArticle)
    Storage.saveToStorage('archive', archiveArray)
    Hash.deleteHash(hashOfArticle)
  }

  static hashArticle(article) {
    Hash.saveArticleHash(article)
  }

  static run() {
    this.loadArchive()
  }
}
