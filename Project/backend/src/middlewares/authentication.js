const { query } = require("../api/db");

const login = async (req, res, next) => {
    try {
        res.locals.user.sessionId = await query(
            `SELECT new_session('${res.locals.user.id}')`
        );
        res.locals.user = {
            ...res.locals.user,
            sessionId: res.locals.user.sessionId.rows[0].new_session,
        };
        return next();
    } catch (error) {
        res.sendStatus(500);
    }
};

const logout = async (req, res) => {
    try {
        const pgResponse = await query(
            `SELECT delete_session('${res.locals.user.id}'::UUID)`
        );
        if (!pgResponse.rows[0].delete_session) return res.sendStatus(404);
        return res.sendStatus(302);
    } catch (error) {
        res.sendStatus(500);
    }
};

const validateCredentials = (req, res, next) => {
    const emailValid = res.locals.user.email === req.body.email;
    const passwordValid = res.locals.user.password === req.body.password;
    if (emailValid && passwordValid) return next();
    else res.sendStatus(401);
};

const getSession = async (req, res, next) => {
    try {
        const pgResponse = await query(
            `SELECT session_id FROM sessions WHERE '${res.locals.user.id}'=user_id`
        );
        if (res.locals?.user && pgResponse?.rows[0]?.session_id) {
            res.locals.user.sessionId = pgResponse.rows[0].session_id
            return res.status(200).send(res.locals.user);
        } else {
            return res.status(401).send("No session found for user");
        }
    } catch (error) {
        res.sendStatus(500);
    }
};

module.exports = {
    login,
    logout,
    validateCredentials,
    getSession,
};