document.addEventListener("DOMContentLoaded", () => {
  toDo(".tasks_to-do", ".tasks_done", "input", "button")
})

const toDo = (
  tasksToDoSelector,
  tasksDoneSelector,
  inputSelector,
  buttonSelector
) => {
  const tasksToDo = document.querySelector(tasksToDoSelector)
  const tasksDone = document.querySelector(tasksDoneSelector)
  const input = document.querySelector(inputSelector)
  const button = document.querySelector(buttonSelector)

  const LOCAL_STORAGE_KEY = "saved_todos"

  const setToLS = (key, todos) => {
    localStorage.setItem(key, JSON.stringify(todos))
  }

  const getFromLS = key => {
    return JSON.parse(localStorage.getItem(key))
  }

  button.addEventListener("click", () => {
    clreateElements(input.value)
  })

  document.addEventListener("keydown", e => {
    if (e.key === "Enter") clreateElements(input.value)
  })

  const template = todoObj =>
    ` <li data-id='${todoObj.id}' ${todoObj.done ? 'class="done"' : ""}>
        <span> &#x2609; ${
          todoObj.text[0].toUpperCase() + todoObj.text.substr(1)
        }</span>
        <span>${todoObj.date}</span>
        ${todoObj.done ? '<a href="#" class="delete_btn">delete</a>' : ""}
        <input type="checkbox" class="checkbox" 
        ${todoObj.done ? "checked" : ""}>
    </li> `

  let todos = getFromLS(LOCAL_STORAGE_KEY) || []

  const clreateElements = text => {
    if (!text) return

    const date = new Date()
    const todo = {
      text,
      id: Math.random(),
      date: date.toLocaleDateString(),
      done: false,
    }

    todos.push(todo)
    renderTodos(todos)
    input.value = ""
  }

  const renderTodos = todosArray => {
    tasksToDo.innerHTML = todosArray
      .map(item => {
        if (!item.done) return template(item)
      })
      .join("")

    tasksDone.innerHTML = todosArray
      .map(item => {
        if (item.done) return template(item)
      })
      .join("")

    const checkboxes = document.querySelectorAll(".checkbox")
    checkboxes.forEach(i => {
      i.addEventListener("input", event => {
        doneToDo(event.target, event.target.checked)
      })
    })

    const btnDelete = document.querySelectorAll(".delete_btn")
    btnDelete.forEach(i => {
      i.addEventListener("click", event => {
        console.log(i)
        deleteToDo(event.target)
      })
    })
    setToLS(LOCAL_STORAGE_KEY, todosArray)
  }

  const doneToDo = (target, checked) => {
    const id = +target.parentNode.dataset.id
    todos.map(i => {
      if (i.id === id) i.done = checked
    })
    renderTodos(todos)
  }

  const deleteToDo = target => {
    const id = +target.parentNode.dataset.id
    todos = todos.filter(i => i.id !== id)
    renderTodos(todos)
  }
  renderTodos(todos)
}
