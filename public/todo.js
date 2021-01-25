const tasksList = document.getElementById('tasks-list');

function addTask(resObj){

    const taskTemp = `
    <span id="${resObj._id}"><i class="fas fa-trash"></i></span>
    <p>${resObj.task}</p>
    `;

    const liTemp = document.createElement('li');
    liTemp.innerHTML = taskTemp;
    liTemp.id = `add-line-${resObj._id}`;
    
    if(resObj.isDone){
        liTemp.childNodes[3].style.textDecoration = 'line-through';
    }

    tasksList.appendChild(liTemp);
    const taskItem = document.getElementById(`add-line-${resObj._id}`);
    const deleteTask = document.getElementById(`${resObj._id}`);
    
    
    taskItem.addEventListener('click', e =>{
        // console.log(taskItem);
        let isDone;
        if(taskItem.childNodes[3].style.textDecoration === ''){
            taskItem.childNodes[3].style.textDecoration = 'line-through';
            isDone = true;
        }else{
            taskItem.childNodes[3].style.textDecoration = '';
            isDone = false;
        }
        fetch(`http://localhost:3000/toggle/${deleteTask.id}`,{
                method:'PUT',
                headers:{'Content-type':'application/json'},
                body:JSON.stringify({isDone})
        })
    })
    deleteTask.addEventListener('click',() => {
        const url = `http://localhost:3000/task/${deleteTask.id}` ;
        fetch(url, {method:'DELETE'})
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.success === 'true'){
                taskItem.remove();
            }else{
                alert('try again..');
            }
        })
    })
}

document.addEventListener('DOMContentLoaded', () =>{
    const todosForm = document.getElementById('todos-form');
    const formInput = document.getElementById('form-input');
    const anchor = document.getElementsByClassName('fa-plus');

    fetch('http://localhost:3000/',{method:'GET'})
        .then(blob => blob.json())
        .then(data => {
            data.forEach(task => {
                addTask(task);
            });
        })

    todosForm.addEventListener('submit', e => {
        e.preventDefault();
        const formData = {task:formInput.value};
        // console.log(formData);
        // return;
        fetch('http://localhost:3000/save',{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            addTask(data);
            formInput.value = '';
        })
    })

    anchor[0].addEventListener('click', () => {
        if(formInput.style.opacity == 0){
            formInput.style.opacity = 1;
            formInput.style.display = 'inline';        
        }else{
            formInput.style.opacity = 0;
            formInput.style.display = 'none';        
        }
    })

})