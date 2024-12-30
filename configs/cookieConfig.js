exports.cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV == 'production',
    maxAge: 3600000,
    sameSite: 'Strict',
}
