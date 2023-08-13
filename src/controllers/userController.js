import userService from '../services/userService'

const handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            data: {
                message: 'Missing inputs'
            }
        })
    }
    console.log('...');
    let data = await userService.handleLogin(email, password);
    return res.status(data.status).json({ data: data.data })
}

const getUsers = async (req, res) => {
    let id = req.body.id;
    if (!id) {
        return res.status(500).json({
            errCode: 1,
            data: {
                message: 'Missing parameter',
                users: []
            }
        });
    }
    let users = await userService.getUsers(id);
    return res.status(200).json({
        errCode: 0,
        data: {
            users: users
        }
    });
}

module.exports = {
    handleLogin: handleLogin,
    getUsers: getUsers
}