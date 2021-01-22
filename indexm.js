const api = "http://localhost:5001/guide/"

let state;

function add() {                                             //функция добавления пользователя
    const newObj = {
        firstName: $('#newFirstName').val(),                //считываем введенные значения (имя и тд)
        lastName: $('#newLastName').val(),
        age: $('#newAge').val()
    }
    fetch(api, {                                            //метод пост, из json в объект
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newObj)
    }).then(res => res.json())
        .then(id => {                                         //новый айди и добавление инфы пользователя + рендер
            newObj.id = id;
            state.push(newObj);
            render();
        });
}

function edit(obj) {
    const newObj = {
        firstName: prompt("First Name", obj.firstName),         //берет инфу из имеющихся полей и выводит по типу alert
        lastName: prompt("Last Name", obj.lastName),
        age: prompt("Age", obj.age),
        id: obj.id
    }
    fetch(api+obj.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newObj)
    }).then(res => {                                                //если все ок, то данные меняются
            if (res.ok) {
                const index = state.indexOf(obj);
                state[index] = newObj;
                render();
            }
        });
}

function remove(id) {
    fetch(api+id.toString(), { method: 'DELETE' })
        .then(res => {
            if (res.ok) {
                state = state.filter(obj => obj.id !== id);
                render();
            }
        });
}

function render () {
    console.log('Rendering');

    const table = $('#table');

    table.html('');

    for (const obj of state) {
        const tr = $('<tr/>');

        tr.append($('<td/>', {text: obj.id}))
        tr.append($('<td/>', {text: obj.firstName}))
        tr.append($('<td/>', {text: obj.lastName}))
        tr.append($('<td/>', {text: obj.age}))

        const buttons = $('<td/>');
        buttons.append($('<button/>', {
            text: 'Change',
            class: 'btn btn-primary',
            click: () => edit(obj)
        }));
        buttons.append($('<button/>', {
            text: 'Delete',
            class: 'btn btn-danger',
            click: () => remove(obj.id)
        }));
        tr.append(buttons);

        table.append(tr);
    }
}

$(document).ready(() => {
    fetch(api)
        .then(res => res.json())
        .then(data => { state = data })
        .then(render);
})