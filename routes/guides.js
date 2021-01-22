import express from 'express';

const router = express.Router();

let users = [];
let lastID = 0;

//all routes in here are starting with /users
router.get('/', (req, res) => {
    res.send(users);
});

//add a new user
router.post('/', (req, res) => {
    const user = req.body;

    users.push({ ...user, id: ++lastID });      //add user

    res.send(lastID.toString());
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);                                                         //преобразование в число

    const foundUser = users.find(user => user.id === id);

    if (foundUser) res.send(foundUser);
    else res.sendStatus(404);
})

//удаление пользователя
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const oldLength = users.length;

    users = users.filter(user => user.id !== id);

    if (oldLength > users.length) res.send(id.toString());
    else res.sendStatus(404);
});

//updating the info
router.put('/:id',(req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
        res.sendStatus(404);
    } else {
        users[index] = req.body;
        res.send(id.toString());
    }
});

export default router;

