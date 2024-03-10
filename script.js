document.addEventListener('DOMContentLoaded', () => {
    refreshTodos()
})

document.getElementById('btn-add-todo').addEventListener('click', () => {
    let input = document.querySelector('input')
    const key = `todo-${localStorage.length + 1}`

    const todo = JSON.stringify({ text: input.value, done: false })
    localStorage.setItem(key, todo)

    addTodo(key, input.value)

    input.value = ''
})

const getAllTodos = () => {
    let todos = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        const value = JSON.parse(localStorage.getItem(key))

        todos.push({ key: key, text: value.text, done: value.done })
    }

    return todos
}

const addTodo = (key, text, done) => {
    let li = document.createElement('li')

    li.classList.add('todo')

    if (done) {
        li.classList.add('done')
    }

    li.innerHTML = `
        <i class="fa-solid fa-circle-check" style="color: green;"></i>
        <p>${text}</p>
        <i class="fa-solid fa-trash-can" style="color: red;"></i>
    `

    li.setAttribute('id', key)

    const todos = document.getElementById('todos')
    todos.appendChild(li)

    const doneElement = document.querySelector(`#${key} .fa-circle-check`)
    doneElement.addEventListener('click', () => { DoneTodo(key) })

    const deleteElement = document.querySelector(`#${key} .fa-trash-can`)
    deleteElement.addEventListener('click', () => { DeleteTodo(key) })
}

const refreshTodos = () => {
    const todoList = document.getElementById('todos')
    todoList.innerHTML = ''

    const todos = getAllTodos()

    for (const todo of todos) {
        addTodo(todo.key, todo.text, todo.done)
    }
}

const DoneTodo = (key) => {
    let todo = JSON.parse(localStorage.getItem(key))
    todo.done = !todo.done
    localStorage.setItem(key, JSON.stringify(todo))

    refreshTodos()
}

const DeleteTodo = (key) => {
    document.getElementById(key).remove()
    localStorage.removeItem(key)
}