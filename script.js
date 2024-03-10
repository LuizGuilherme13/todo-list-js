document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todos')
    todoList.innerHTML = ''

    const todos = getAllTodos()

    for (const todo of todos) {
        addTodo(todo.todo, todo.key)
    }
})

document.getElementById('btn-add-todo').addEventListener('click', () => {
    let input = document.querySelector('input')

    let key = localStorage.length + 1
    localStorage.setItem(key, input.value)

    addTodo(input.value, key)

    input.value = ''
})

const getAllTodos = () => {
    let todos = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        const todo = localStorage.getItem(key)

        todos.push({ todo: todo, key: key })
    }

    return todos
}

const addTodo = (text, key) => {
    let li = document.createElement('li')

    li.classList.add('todo')

    li.innerHTML = `
        <i class="fa-solid fa-circle-check" style="color: green;"></i>
        <p>${text}</p>
        <i class="fa-solid fa-trash-can" style="color: red;"></i>
    `

    const todoId = `todo-${key}`
    li.setAttribute('id', todoId)

    const todos = document.getElementById('todos')
    todos.appendChild(li)

    const doneElement = document.querySelector(`#${todoId} .fa-circle-check`)
    doneElement.addEventListener('click', () => { alert('opa') })

    const deleteElement = document.querySelector(`#${todoId} .fa-trash-can`)
    deleteElement.addEventListener('click', (e) => { DeleteTodo(e) })
}

const DoneTodo = () => { }

const DeleteTodo = (event) => {
}