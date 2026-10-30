let form = document.querySelector("#todo-form")
let taskInp = document.querySelector("#task-input")
let errMsg = document.querySelector("#error-message")
let taskCnt = document.querySelector("#task-count")
let taskList = document.querySelector("#task-list")

let cnt = 0

// counting tasks
    function updateTaskCount(){
        cnt = document.querySelectorAll("li:not(.empty-state)").length;
        if (cnt == 1){
            taskCnt.textContent = (`${cnt} task`)
        }
        else {
        taskCnt.textContent = (`${cnt} tasks`)
        }
    }

form.addEventListener("submit", function(e){
    e.preventDefault();

    errMsg.textContent = "";
    
    if(taskInp.value.trim() == "") {
        errMsg.textContent = "Please write a valid task."
        return ;
    }
    

    let li = document.createElement("li")
    // li.textContent = taskInp.value
    let span = document.createElement("span")
    span.textContent = taskInp.value.trim()
    li.appendChild(span)
    
    // checking duplicate list
    let repList = taskList.querySelectorAll("li:not(.empty-state)")
    for(let e of repList){
        if(e.querySelector("span").textContent.toLowerCase().trim() === span.textContent.toLowerCase().trim()){
            errMsg.textContent = "Task already exists!!"
            return;
        }
    }

    const emptyState = document.querySelector(".empty-state")

    if(emptyState){
        emptyState.remove();
    }

    
    li.addEventListener("click", function(){
        li.classList.toggle("completed")
    })

    
    let delBtn = document.createElement("button")
    delBtn.innerText = "🗑️"
    delBtn.type = "button"
    delBtn.classList.add("delete-btn")
    
    delBtn.addEventListener("click", function(e){
        e.stopPropagation()
        li.remove()
        
        if (taskList.children.length === 0) {
            let emptyLi = document.createElement("li");
            emptyLi.classList.add("empty-state");
            emptyLi.textContent = "Your tasks will appear here.";
            taskList.appendChild(emptyLi);
        }
        
        updateTaskCount();
    })
    
    
    let editBtn = document.createElement("button")
    editBtn.innerText = "✏️"
    editBtn.type = "button"
    editBtn.classList.add("edit-btn")
    
    editBtn.addEventListener("click", function(e){
        errMsg.textContent = "";
        e.stopPropagation();
        let editedTask = prompt(span.textContent)
        if(editedTask === null || editedTask.trim() === ""){
            return;
        }
        // checking duplicate list
        let repList = taskList.querySelectorAll("li:not(.empty-state)")

        for(let e of repList){
            if(e === li){
                continue;
            }
            else {
                if(e.querySelector("span").textContent.toLowerCase().trim() === editedTask.toLowerCase().trim()){
                    errMsg.textContent = "Duplicate task not allowed!!"
                        return;
                }
            }
        }
        span.textContent = editedTask.trim()
    })
    
    li.appendChild(editBtn)
    li.appendChild(delBtn)
    taskList.append(li)

    updateTaskCount()

    taskInp.value = "";

})