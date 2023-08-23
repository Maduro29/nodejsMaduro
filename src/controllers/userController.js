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
    let id = req.query.id;
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

const createUser = async (req, res) => {
    let result = await userService.createUser(req.body);
    return res.status(200).json({
        errCode: result.errCode,
        message: result.message
    })
}

const editUser = async (req, res) => {
    let result = await userService.editUser(req.body);
    return res.status(200).json(result)
}

const deleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing parameters!"
        })
    }
    let result = await userService.deleteUser(req.body.id);
    return res.status(200).json(result);
}

module.exports = {
    handleLogin: handleLogin,
    getUsers: getUsers,
    createUser: createUser,
    editUser: editUser,
    deleteUser: deleteUser
}