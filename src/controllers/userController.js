import userService from '../services/userService'

const handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs'
        })
    }
    console.log('...');
    let data = await userService.handleLogin(email, password);
    return res.status(200).json({ data })
}

module.exports = {
    handleLogin: handleLogin
}