exports.createPostValidator = (req, res, next) => {
    req.check('title', 'write a title').notEmpty();
    req.check(
        'title',
        'title must be between 4 to 150 characters'
    ).isLength({ min: 4, max: 150 });
    req.check('body', 'write a body').notEmpty();
    req.check(
        'body',
        'body must be between 4 to 2000 characters'
    ).isLength({ min: 4, max: 2000 });

    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};

exports.userSignupValidator = (req, res, next) => {
    req.check('name', 'enter a name').notEmpty();
    req.check(
        'name',
        'name must be between 4 to 10 characters'
    ).isLength({ min: 4, max: 150 });
    req.check('email', 'enter an email')
        .matches(/.+\@.+\..+/)
        .withMessage('email must contain an @')
        .isLength({ min: 4, max: 200 });
    req.check('password', 'enter a password').notEmpty();
    req.check('password')
        .isLength({ min: 6 })
        .withMessage('password must contain at least 6 letters')
        .matches(/\d/)
        .withMessage('must contain a number');

    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};
