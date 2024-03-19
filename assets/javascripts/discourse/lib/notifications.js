class PushNotifications {
  insertNotificationItem(text, title = null) {
    const notificationsBlock = document.querySelector('#notifications-block')
    const notificationItem = this.getNotificationItemBlock(text, title)

    this.initNotificationItemEvents(notificationItem)
    notificationsBlock.insertAdjacentElement('afterbegin', notificationItem)

    // setTimeout(function() {
    //   if (notificationItem){
    //     notificationItem.style.opacity = 0;
    //     setTimeout(function() {
    //       notificationItem.remove();
    //     }, 300);
    //   }
    // }, 10000);
  }


  getNotificationItemBlock(text, title) {
    const notificationItemHTML = `<div class="notification-item">
      ${title ? `<div class="notification-item__title">${title}</div>` : ''}
      <div class="notification-item__content">${text}</div>
      <button class="notification-item__button-ok" type="button">
        <div class="notification-item__cross"></div>
      </button>
    </div>`

    return document.createRange().createContextualFragment(notificationItemHTML).firstElementChild
  }

  initNotificationItemEvents(notificationItem){
    let okBtn = notificationItem.querySelector('.notification-item__button-ok')
    let link = notificationItem.querySelector('.notification-item__link')
    okBtn?.addEventListener('click', () => {
      notificationItem.remove()
    })
    link?.addEventListener('click', () => {
      setTimeout(() => {
        notificationItem.remove()
      }, 1)
    })
  }

  cutText(text){
    const maxLength = 50
    text = text.replace('\n', ' ').replace('<br>', ' ').replace('  ', ' ')
    if (text.length <= maxLength){
      return text
    }
    let trimmedString = text.substring(0, maxLength);
    return trimmedString.substring(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + '...'
  }

  removeNotificationsByLink(linkPart){
    const links = document.querySelectorAll(`.notifications-block .notification-item__link[href*="${linkPart}"]`)
    links.forEach(link => {
      link.closest('.notification-item')?.remove()
    })
  }

}

export default PushNotifications
