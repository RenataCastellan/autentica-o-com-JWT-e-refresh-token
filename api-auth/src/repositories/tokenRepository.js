let tokens = [];

exports.save = (token, userId) => {
    tokens.push({ token, userId });
};

exports.find = (token) => {
    return tokens.find(t => t.token === token);
};

exports.remove = (token) => {
    tokens = tokens.filter(t => t.token !== token);
};