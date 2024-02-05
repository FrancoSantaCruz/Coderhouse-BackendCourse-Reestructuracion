import passport from "passport";

export const userOn = async (req, res) => {
    const user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        cart: req.user.cart,
        role: req.user.role,
    }
    return res.json(user)
}

export const signup = passport.authenticate('signup',
    {
        successRedirect: '/',
        failureRedirect: '/error'
    }
)

export const login = passport.authenticate('login',
    {
        successRedirect: '/',
        failureRedirect: '/error'
    }
)

export const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}

export const googleAuth = passport.authenticate('google', { scope: ["profile", "email"] })

export const googleAuthCb = passport.authenticate('google', { failureRedirect: '/login' } )
