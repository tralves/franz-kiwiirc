'use strict';

const path = require('path');

module.exports = Franz => {
    const getMessages = function getMessages() {
        const unreadChannelsCount = kiwi.state.networks.reduce((count, network) => {
            return (count += network.buffers.filter(buffer => {
                return !buffer.name.startsWith('*') && buffer.flags.unread !== 0;
            }).length);
        }, 0);

        const mentionedChannelsCount = kiwi.state.networks.reduce((count, network) => {
            return (count += network.buffers.filter(buffer => {
                return (
                    !buffer.name.startsWith('*') &&
                    buffer.flags.unread !== 0 &&
                    buffer.flags.highlight
                );
            }).length);
        }, 0);

        // set Franz badges
        Franz.setBadge(mentionedChannelsCount, unreadChannelsCount);
    };

    // inject franz.css stylesheet
    Franz.injectCSS(path.join(__dirname, 'service.css'));

    // check for new messages every second and update Franz badge
    Franz.loop(getMessages);
};
