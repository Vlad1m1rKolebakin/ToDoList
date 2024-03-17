const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');
let tasks = []
if(localStorage.getItem('tasks')){
	tasks = JSON.parse(localStorage.getItem('tasks'))
	tasks.forEach(task => renderTasks(task));
}
checkEmptylist();
form.addEventListener('submit', addTask)
taskList.addEventListener('click', deleteTask)
taskList.addEventListener('click', doneTask)


function addTask(event){
	event.preventDefault();
	const taskText = taskInput.value;
	const newTask = {
		id: Date.now(),
		text: taskText,
		done: false
	};

	tasks.push(newTask)
	saveToLocalstorage();
	renderTasks(newTask)
	taskInput.value = '';

	checkEmptylist();


}

function deleteTask(event){
	if(event.target.dataset.action !== 'delete')return;
	const parenNode = event.target.closest('.list-group-item');
	parenNode.remove();



	const id = Number(parenNode.id);

	 tasks = tasks.filter((task)=> task.id !== id);

	 saveToLocalstorage();
	 checkEmptylist();

}

function doneTask(event){

	if(event.target.dataset.action !== 'done') return;

		const parentNode = event.target.closest('.list-group-item');
		const id = Number(parentNode.id);
		const task = tasks.find((task)=> task.id === id);
		task.done = !task.done;
		saveToLocalstorage();
		const taskTitle = parentNode.querySelector('.task-title');
		taskTitle.classList.toggle('task-title--done')

	
}

function checkEmptylist(){
	if(tasks.length === 0){
		const emptyListHtml = `<li id="emptyList" class="list-group-item empty-list">
		<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
		<div class="empty-list__title">Список дел пуст</div>
	</li> `
	taskList.insertAdjacentHTML('afterbegin',emptyListHtml )
	}
	if(tasks.length>1){
		const emptyListEl = document.querySelector('#emptyList');
		emptyListEl ? emptyListEl.remove(): null
	}
}


function saveToLocalstorage(){
	localStorage.setItem('tasks', JSON.stringify(tasks))
}


function renderTasks(task){
	const cssClass = task.done ? "task-title task-title--done": "task-title";
	const taskHtml =`
	<li id='${task.id}' class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${task.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>
	`;

	taskList.insertAdjacentHTML('beforeend', taskHtml);
}


