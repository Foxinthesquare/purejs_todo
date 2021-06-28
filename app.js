const todoInput = document.querySelector('#inputText');
const todoBtn = document.querySelector('#buttonSubmit');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('#filter-todo');

document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', listFilter);

function addTodo(e) {
  e.preventDefault();

  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  saveLocal(todoInput.value);

  //CHECK BTN
  const complBtn = document.createElement('button');
  complBtn.innerHTML = '<i class="fas fa-check"></i>';
  complBtn.classList.add('complete-btn');
  todoDiv.appendChild(complBtn);

  //DEL BTN
  const delBtn = document.createElement('button');
  delBtn.innerHTML = '<i class="fas fa-trash"></i>';
  delBtn.classList.add('trash-btn');
  todoDiv.appendChild(delBtn);

  //ADD TO LIST
  todoList.appendChild(todoDiv);

  //CLEAR
  todoInput.value = '';
}

function deleteCheck(e) {
  const item = e.target;

  //DELETE
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    todo.classList.add('fall');
    removeLocalStorage(todo);
    todo.addEventListener('transitionend', function () {
      todo.remove();
    });
  }

  //CHECK
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function listFilter(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

function saveLocal(todo) {
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function (todo) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //CHECK BTN
    const complBtn = document.createElement('button');
    complBtn.innerHTML = '<i class="fas fa-check"></i>';
    complBtn.classList.add('complete-btn');
    todoDiv.appendChild(complBtn);

    //DEL BTN
    const delBtn = document.createElement('button');
    delBtn.innerHTML = '<i class="fas fa-trash"></i>';
    delBtn.classList.add('trash-btn');
    todoDiv.appendChild(delBtn);

    //ADD TO LIST
    todoList.appendChild(todoDiv);
  });
}

function removeLocalStorage(todo) {
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
