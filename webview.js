'use strict';

const path = require('path');

module.exports = Franz => {
  const getMessages = function getMessages() {
    let elements = document.querySelectorAll('.kiwi-statebrowser-channel-label')
    let directMessages = 0;
    let allMessages = 0;

    for (let i = 0; i < elements.length; i += 1) {
      if (elements[i].classList.contains('kiwi-statebrowser-channel-label--highlight')) {
        directMessages += parseInt(elements[i].innerHTML);
      }
      else {
        allMessages += parseInt(elements[i].innerHTML);
      }
    }

    // set Franz badges
    Franz.setBadge(directMessages, allMessages);
  };

  // inject franz.css stylesheet
  Franz.injectCSS(path.join(__dirname, 'service.css'));

  // check for new messages every second and update Franz badge
  Franz.loop(getMessages);
};
