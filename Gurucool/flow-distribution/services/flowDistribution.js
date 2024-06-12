const Astrologer = require('../models/astrologer');

let astrologers = [];  // This will be populated with Astrologer instances

function distributeUsers(users) {
    const topAstrologers = astrologers.filter(a => a.isTopAstrologer);
    const regularAstrologers = astrologers.filter(a => !a.isTopAstrologer);

    users.forEach((user, index) => {
        if (topAstrologers.length > 0 && index % 2 === 0) {
            const astrologer = topAstrologers[index % topAstrologers.length];
            astrologer.currentFlow += 1;
        } else {
            const astrologer = regularAstrologers[index % regularAstrologers.length];
            astrologer.currentFlow += 1;
        }
    });

    return astrologers;
}

function toggleTopAstrologer(astrologerId, isTopAstrologer) {
    const astrologer = astrologers.find(a => a.id === astrologerId);
    if (astrologer) {
        astrologer.isTopAstrologer = isTopAstrologer;
    }
}

module.exports = { distributeUsers, toggleTopAstrologer, astrologers };
