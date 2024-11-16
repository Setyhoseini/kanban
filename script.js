var todo_cards = 0;
var doing_cards = 0;
var done_cards = 0;
var idSolution = 0;

if (localStorage.getItem('idSolution') != null) {
    idSolution = Number(localStorage.getItem('idSolution'));
}
else {
    localStorage.setItem('idSolution', 0);
}

function reloadAll() {
    const keys = Object.keys(localStorage);
    let todo = 0;
    let doing = 0;
    let done = 0;
    keys.forEach(element => {
        if (element[0] == 't') { todo += 1; }
        if (element.substring(0, 3) == 'doi') { doing += 1; }
        if (element.substring(0, 3) == 'don') { done += 1; }
    });

    todo /= 6;
    doing /= 6;
    done /= 6;

    todo_cards = todo;
    doing_cards = doing;
    done_cards = done;

    if (todo!=0) {
        for (let i=0; i < todo; i++) {
        const title = localStorage.getItem('todo-' + String(i+1) + '-title');
        const description = localStorage.getItem('todo-' + String(i+1) + '-description');
        const date = localStorage.getItem('todo-' + String(i+1) + '-date');
        const assignee = localStorage.getItem('todo-' + String(i+1) + '-assignee');
        const labels = localStorage.getItem('todo-' + String(i+1) + '-labels');
        const subtasks = localStorage.getItem('todo-' + String(i+1) + '-subtasks');

        loadCard('todo', String(i+1), title, description, date, assignee, subtasks, labels);
        }
    }
    
    if (doing!=0) {
        for (let j=0; j < doing; j++) {
        const title = localStorage.getItem('doing-' + String(j+1) + '-title');
        const description = localStorage.getItem('doing-' + String(j+1) + '-description');
        const date = localStorage.getItem('doing-' + String(j+1) + '-date');
        const assignee = localStorage.getItem('doing-' + String(j+1) + '-assignee');
        const labels = localStorage.getItem('doing-' + String(j+1) + '-labels');
        const subtasks = localStorage.getItem('doing-' + String(j+1) + '-subtasks');

        loadCard('doing', String(j+1), title, description, date, assignee, subtasks, labels);
        }
    }
    
    if (done!=0) {
        for (let k=0; k < done; k++) {
        const title = localStorage.getItem('done-' + String(k+1) + '-title');
        const description = localStorage.getItem('done-' + String(k+1) + '-description');
        const date = localStorage.getItem('done-' + String(k+1) + '-date');
        const assignee = localStorage.getItem('done-' + String(k+1) + '-assignee');
        const labels = localStorage.getItem('done-' + String(k+1) + '-labels');
        const subtasks = localStorage.getItem('done-' + String(k+1) + '-subtasks');

        loadCard('done', String(k+1), title, description, date, assignee, subtasks, labels);
        }
    } 
}

function addSubtask() {
    const newDiv = document.createElement('div');
    newDiv.classList.add('flex', 'flex-wrap', 'gap-[8px]', 'p-[8px]', 'items-center');

    const checkBoxContainer = document.createElement('div');
    checkBoxContainer.classList.add('relative', 'w-[18px]', 'h-[18px]', 'rounded-[4.5px]', 'border-[1.4px]', 'border-checkbox-border');

    const checkBox = document.createElement('input');
    checkBox.setAttribute("type", "checkbox");
    checkBox.classList.add('hidden-checkbox', 'block', 'opacity-0', 'cursor-pointer', 'absolute', 'w-[18px]', 'h-[18px]', 'z-20');

    const customCheckBox = document.createElement('span');
    customCheckBox.classList.add('custom-checkbox', 'bg-[url("../images/checkbox.svg")]', 'bg-no-repeat', 'hidden', 'absolute', 'top-[-1.4px]', 'left-[-1.4px]', 'h-[24px]', 'w-[24px]');
    
    const title = document.createElement('input');
    title.setAttribute("type", "text");
    title.setAttribute("placeholder", "Placeholder");
    title.classList.add('placeholder:text-gray-placeholder', 'font-[500]', 'text-[15px]', 'outline-none', 'text-subtask-text', 'bg-transparent', 'break-words', 'inline-block', 'max-w-[259px]');

    checkBoxContainer.appendChild(checkBox);
    checkBoxContainer.appendChild(customCheckBox);

    newDiv.appendChild(checkBoxContainer);
    newDiv.appendChild(title);

    document.getElementById('subtasks-list').appendChild(newDiv);
}

function updateCardData(card, newPos, subtasks) {
    if (newPos != 'none') {

        const title = localStorage.getItem(card+'-title');
        const description = localStorage.getItem(card+'-description');
        const date = localStorage.getItem(card+'-date');
        const assignee = localStorage.getItem(card+'-assignee');
        const labels = localStorage.getItem(card+'-labels');
        const sub_tasks = localStorage.getItem(card+'-subtasks');

        localStorage.setItem(newPos+'-title', title);
        localStorage.setItem(newPos+'-description', description);
        localStorage.setItem(newPos+'-date', date);
        localStorage.setItem(newPos+'-assignee', assignee);
        localStorage.setItem(newPos+'-labels', labels);
        localStorage.setItem(newPos+'-subtasks', sub_tasks);

        if (newPos != card) {
            localStorage.removeItem(card+'-title');
            localStorage.removeItem(card+'-description');
            localStorage.removeItem(card+'-date');
            localStorage.removeItem(card+'-assignee');
            localStorage.removeItem(card+'-labels');
            localStorage.removeItem(card+'-subtasks');
        }

        let n1 = Number(card.split('-')[1]);
        let n2 = Number(newPos.split('-')[1]);
        let section1 = card.split('-')[0];
        let section2 = newPos.split('-')[0];

        let section1_num = 0;
        let section2_num = 0;

        if (section1=='todo') {section1_num = todo_cards}
        if (section1=='doing') {section1_num = doing_cards}
        if (section1=='done') {section1_num = done_cards}

        if (section2=='todo') {section2_num = todo_cards}
        if (section2=='doing') {section2_num = doing_cards}
        if (section2=='done') {section2_num = done_cards}
    }

    if (subtasks != 'none') {
        localStorage.setItem(card+'-subtasks', subtasks);
    }
}

function loadCard(section, num, title, description, date, assignee, subtasks, labels) {
    subtasks = (subtasks!="" && subtasks!=null) ? subtasks.split('-') : subtasks;
    labels = (labels!="" && labels!=null) ? labels.split('-') : labels;

    const card = document.createElement('div');
    
        card.classList.add('w-[320px]', 'rounded-lg', 'bg-card', 'shadow-sm', 'p-[20px]', 'card');
        card.setAttribute('draggable', 'true');

        const body = document.createElement('div');
        body.classList.add('flex', 'flex-col', 'gap-[16px]', 'relative', 'w-full');

        const header = document.createElement('div');
        header.classList.add('flex', 'flex-col', 'gap-[6px]', 'w-full');

        const content = document.createElement('div');
        content.classList.add('w-full', 'flex', 'flex-col', 'gap-[12px]');

        const labels_section = document.createElement('div');
        labels_section.classList.add('relative', 'bottom-0', 'flex', 'flex-wrap', 'gap-[8px]', 'w-full', 'labels');

        const card_title = document.createElement('div');
        card_title.classList.add('font-[700]', 'text-[20px]', 'leading-[30px]', 'text-card-title', 'w-full', 'break-words', 'title');

        const card_info = document.createElement('div');
        card_info.classList.add('flex', 'gap-[14px]', 'text-card-description', 'font-[600]', 'text-[14px]', 'leading-[21px]', 'w-full');

        const card_description = document.createElement('p');
        card_description.classList.add('font-[500]', 'text-[13.75px]', 'leading-[21px]', 'text-card-description', 'w-full', 'break-words', 'description');

        const card_tasks = document.createElement('div');
        card_tasks.classList.add('subtasks');

        const card_date = document.createElement('span');
        card_date.classList.add('date');
        const info_circle_icon = document.createElement('img');
        info_circle_icon.setAttribute('src', "./assets/images/circle.svg");
        info_circle_icon.setAttribute('draggable', "false");

        const card_assignee_container = document.createElement('span');
        const assignee_name = document.createElement('span');
        assignee_name.classList.add('text-gray-placeholder', 'break-words', 'max-w-[230px]', 'inline-block', 'assignee');

        card_info.appendChild(card_date);
        card_info.appendChild(info_circle_icon);
        card_info.appendChild(card_assignee_container);

        header.appendChild(card_title);
        header.appendChild(card_info);

        content.appendChild(card_description);
        content.appendChild(card_tasks);
        
        body.appendChild(header);
        body.appendChild(content);
        body.appendChild(labels_section);

        card.appendChild(body);

        card_title.innerHTML = title;

        card_date.innerHTML = date;
        card_assignee_container.innerHTML = "Assigned to ";
        card_assignee_container.appendChild(assignee_name);
        card_description.innerHTML = description;
        assignee_name.innerHTML = assignee;

        /* DO THE SUBTASKS SECTION */
        if (subtasks!='' && subtasks!=null) {
            subtasks.forEach(element => {
                const checked = element[0]=="0" ? false : true;
                const text = element.substring(1);
    
                const container = document.createElement('div');
                container.classList.add('flex', 'flex-wrap', 'gap-[8px]', 'p-[8px]', 'items-start');
    
                const checkBoxContainer = document.createElement('div');
                checkBoxContainer.classList.add('relative', 'w-[18px]', 'h-[18px]', 'rounded-[4.5px]', 'border-[1.4px]', 'border-checkbox-border', 'mt-[4px]');
    
                const checkBox = document.createElement('input');
                checkBox.setAttribute("type", "checkbox");
                checkBox.classList.add('hidden-checkbox', 'block', 'opacity-0', 'cursor-pointer', 'absolute', 'w-[18px]', 'h-[18px]', 'z-20', 'cb');

        /* EVENT LISTENER */
        checkBox.addEventListener('change', function(event) {
            let newSubtasks = "";
            [...card.getElementsByClassName('cb')].forEach(element => {
                const checked = element.checked==true ? "1" : "0";
                const text = element.parentElement.parentElement.querySelector('p').innerHTML;
                newSubtasks += checked + text + '-';
            });
            newSubtasks = newSubtasks.substring(0, newSubtasks.length-1);
            updateCardData(checkBox.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('pos'), 'none', newSubtasks);
        });

        const customCheckBox = document.createElement('span');
        customCheckBox.classList.add('custom-checkbox', 'bg-[url("../images/checkbox.svg")]', 'bg-no-repeat', 'hidden', 'absolute', 'top-[-1.4px]', 'left-[-1.4px]', 'h-[24px]', 'w-[24px]');
    
        const title = document.createElement('p');
        title.classList.add('font-[600]', 'text-[16px]', 'leading-[24px]', 'break-words', 'inline-block', 'max-w-[150px]', 'p-0', 'm-0');
    
        checkBoxContainer.appendChild(checkBox);
        checkBoxContainer.appendChild(customCheckBox);
    
        container.appendChild(checkBoxContainer);
        container.appendChild(title);
    
    
                checkBox.checked = checked;
                
                title.innerHTML = text;
    
                card_tasks.appendChild(container);
                
            });
        }
        
        /* DO THE LABELS SECTION */

        if (labels!='' && labels!=null) {
            labels.forEach(element => {
                const properties = element.split('.');
                const label = document.createElement('span');
                const bgcolor = properties[1];
                const color = properties[2];
                label.innerHTML = properties[0];
                label.style.setProperty("background-color", bgcolor);
                label.style.setProperty("color", color);
                label.classList.add('py-[6px]', 'px-[12px]', 'rounded-[6px]', 'font-[700]', 'text-[14px]', 'leading-[21px]', 'max-h-[33px]');
                labels_section.appendChild(label);
            });
        }
        
        card.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', event.target.id);
        event.target.classList.add('dragging');
    });

    card.addEventListener('dragend', (event) => {
        event.target.classList.remove('dragging');
      });

    card.id = 'card-' + Date.now() + idSolution;
    idSolution += 1;
    localStorage.setItem('idSolution', idSolution);

      document.getElementById(section).appendChild(card);
      card.setAttribute('pos', (section + '-' + num));

      card.classList.add('relative');

        const x_icon = document.createElement('img');
        x_icon.setAttribute('src', "assets/images/x-icon.webp");
        x_icon.classList.add('w-[12px]', 'absolute', 'top-[20px]', 'right-[20px]', 'h-[12px]', 'x', 'hidden');

        card.appendChild(x_icon);

        x_icon.setAttribute('draggable', "false");
        x_icon.addEventListener('click', function() {
            const card = x_icon.parentElement;
            const section = card.parentElement.id;
            card.parentElement.removeChild(card);
            if (section == 'todo') {todo_cards -= 1;};
            if (section == 'doing') {doing_cards -= 1;};
            if (section == 'done') {done_cards -= 1;};
            updateList(section);
        });
}

function createCard() {
    const date = new Date().toString().split(" ");
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const subtasks_list = document.getElementById("subtasks-list");
    
    const labels_list = document.getElementById("labels");
    let labels = [];
    [...labels_list.children].forEach(element => {
        if (element.getAttribute('counter') == "1") {
            const clone = element.cloneNode(true);
            clone.classList.remove('hover:bg-[rgba(230,230,230,0.7)]', 'active:bg-[rgba(230,230,230,1)]');
            labels.push(clone);
        }
    });

    const radios = document.querySelectorAll('input[name="assignee"]');
    const selectedRadio = Array.from(radios).find(radio => radio.checked);

    const label = selectedRadio ? document.querySelector(`label[for="${selectedRadio.id}"]`) : "";
    const assignee = label ? label.innerHTML.split(" ")[0] : "";
    
    if ((title != "") && selectedRadio) {
        todo_cards += 1;
        const card = document.createElement('div');
        card.classList.add('w-[320px]', 'rounded-lg', 'bg-card', 'shadow-sm', 'p-[20px]', 'card');
        card.setAttribute('draggable', 'true');

        /* EVENT LISTEER */
        let subtasks = [];
    [...subtasks_list.children].forEach(element => {
        if (element.lastChild.value != "") {
            const clonedCheckBox = element.children[0].cloneNode(true);
            clonedCheckBox.classList.add('mt-[4px]');
            clonedCheckBox.querySelector('input').classList.add('cb');
            clonedCheckBox.querySelector('input').addEventListener('change', function(event) {
                let newSubtasks = "";
                [...card.getElementsByClassName('cb')].forEach(element => {
                    const checked = element.checked==true ? "1" : "0";
                    const text = element.parentElement.parentElement.querySelector('p').innerHTML;
                    newSubtasks += checked + text + '-';
                });
                newSubtasks = newSubtasks.substring(0, newSubtasks.length-1);
                updateCardData(card.getAttribute('pos'), 'none', newSubtasks);
            });

            const container = document.createElement('div');
            container.classList.add('flex', 'flex-wrap', 'gap-[8px]', 'p-[8px]', 'items-start');


            const task_title = document.createElement('p');
            task_title.innerHTML = element.children[1].value;
            task_title.classList.add('font-[600]', 'text-[16px]', 'leading-[24px]', 'break-words', 'inline-block', 'max-w-[150px]', 'p-0', 'm-0');
            
            container.appendChild(clonedCheckBox);
            container.appendChild(task_title);
            subtasks.push(container);
        }
    });

        const body = document.createElement('div');
        body.classList.add('flex', 'flex-col', 'gap-[16px]', 'relative', 'w-full');

        const header = document.createElement('div');
        header.classList.add('flex', 'flex-col', 'gap-[6px]', 'w-full');

        const content = document.createElement('div');
        content.classList.add('w-full', 'flex', 'flex-col', 'gap-[12px]');

        const labels_section = document.createElement('div');
        labels_section.classList.add('relative', 'bottom-0', 'flex', 'flex-wrap', 'gap-[8px]', 'w-full', 'labels');

        const card_title = document.createElement('div');
        card_title.classList.add('font-[700]', 'text-[20px]', 'leading-[30px]', 'text-card-title', 'w-full', 'break-words', 'title');

        const card_info = document.createElement('div');
        card_info.classList.add('flex', 'gap-[14px]', 'text-card-description', 'font-[600]', 'text-[14px]', 'leading-[21px]', 'w-full');

        const card_description = document.createElement('p');
        card_description.classList.add('font-[500]', 'text-[13.75px]', 'leading-[21px]', 'text-card-description', 'w-full', 'break-words', 'description');

        const card_tasks = document.createElement('div');
        card_tasks.classList.add('subtasks');

        const card_date = document.createElement('span');
        card_date.classList.add('date');
        const info_circle_icon = document.createElement('img');
        info_circle_icon.setAttribute('src', "./assets/images/circle.svg");
        info_circle_icon.setAttribute('draggable', "false");

        const card_assignee_container = document.createElement('span');
        const assignee_name = document.createElement('span');
        assignee_name.classList.add('text-gray-placeholder', 'break-words', 'max-w-[230px]', 'inline-block', 'assignee');

        card_info.appendChild(card_date);
        card_info.appendChild(info_circle_icon);
        card_info.appendChild(card_assignee_container);

        header.appendChild(card_title);
        header.appendChild(card_info);

        content.appendChild(card_description);
        content.appendChild(card_tasks);
        
        body.appendChild(header);
        body.appendChild(content);
        body.appendChild(labels_section);

        card.appendChild(body);

        card_title.innerHTML = title;

        let ordinal = "th";
        if ((date[2]%10 == 1) && (date[2] != 11)) {ordinal = "st"};
        if ((date[2]%10 == 2) && (date[2] != 12)) {ordinal = "nd"};
        if ((date[2]%10 == 3) && (date[2] != 13)) {ordinal = "rd"};

        card_date.innerHTML = date[2] + ordinal + " " + date[1];
        card_assignee_container.innerHTML = "Assigned to ";
        card_assignee_container.appendChild(assignee_name);
        card_description.innerHTML = description;
        assignee_name.innerHTML = assignee;

        subtasks.forEach(element => {
            card_tasks.appendChild(element);
        });
        labels.forEach(element => {
            element.setAttribute('disabled', 'true');
            element.classList.remove('border-[1.4px]');
            labels_section.appendChild(element);
        });

        card.setAttribute('draggable', 'true');

    card.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', event.target.id);
      event.target.classList.add('dragging');
    });

    card.addEventListener('dragend', (event) => {
        event.target.classList.remove('dragging');
      });

    card.id = 'card-' + Date.now();

        document.getElementById("todo").appendChild(card);
        card.setAttribute('pos', 'todo-' + todo_cards);

        const title_key = 'todo-' + todo_cards + '-title';
        localStorage.setItem(title_key, title);

        const description_key = 'todo-' + todo_cards + '-description';
        localStorage.setItem(description_key, description);
        
        const date_key = 'todo-' + todo_cards + '-date';
        localStorage.setItem(date_key, card_date.innerHTML);

        const assignee_key = 'todo-' + todo_cards + '-assignee';
        localStorage.setItem(assignee_key, assignee);

        let subtasks_key = 'todo-' + todo_cards + '-subtasks';
        let subtasks_value = '';
        subtasks.forEach(element => {
            subtasks_value += element.querySelector('input[type="checkbox"]').checked ? "1" : "0";

            subtasks_value += element.querySelector('p').innerHTML + "-";
        });
        localStorage.setItem(subtasks_key, subtasks_value.substring(0, subtasks_value.length-1));

        let labels_key = 'todo-' + todo_cards + '-labels';
        let labels_value = '';
        labels.forEach(element => {
            labels_value += element.innerHTML + '.' + getComputedStyle(element).getPropertyValue('background-color') + '.' + getComputedStyle(element).getPropertyValue('color') + '-';
        });
        localStorage.setItem(labels_key, labels_value.substring(0, labels_value.length-1));

        card.classList.add('relative');

        const x_icon = document.createElement('img');
        x_icon.setAttribute('src', "assets/images/x-icon.webp");
        x_icon.classList.add('w-[12px]', 'absolute', 'top-[20px]', 'right-[20px]', 'h-[12px]', 'x', 'hidden');

        card.appendChild(x_icon);

        x_icon.setAttribute('draggable', "false");
        x_icon.addEventListener('click', function() {
            const card = x_icon.parentElement;
            const section = card.parentElement.id;
            card.parentElement.removeChild(card);
            if (section == 'todo') {todo_cards -= 1;};
            if (section == 'doing') {doing_cards -= 1;};
            if (section == 'done') {done_cards -= 1;};
            updateList(section);
        });

         clearAll();
    }
}

function clearAll() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("subtasks-list").innerHTML = "";

    const labels_list = document.getElementById("labels");
    [...labels_list.children].forEach(element => {
        element.classList.remove('border-[1.4px]');
        element.setAttribute('counter', 0);
    });

    const radios = document.querySelectorAll('input[name="assignee"]');
    const selectedRadio = Array.from(radios).find(radio => radio.checked);
    if (selectedRadio) {
        selectedRadio.checked = false;
    }
}

let labels = document.getElementsByClassName('label');
[...labels].forEach(element => {
    element.addEventListener('click', function () {
        element.setAttribute('counter', (element.getAttribute('counter') == "0") ? "1" : "0");
        if (element.getAttribute('counter') == "1") {
            const style = window.getComputedStyle(element);
            const color = style.color; 
            element.classList.add('border-[1.4px]');
            element.style.borderColor = color;
        }
        else {
            element.classList.remove('border-[1.4px]');
        }
    });
});

function insertAboveCard(list, mouseY) {
    const els = list.querySelectorAll('.card:not(.dragging)');
    let closestCard = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    [...els].forEach(element => {
        const { top } = element.getBoundingClientRect();
        const offset = mouseY - top;

        if (offset<0 && offset>closestOffset) {
            closestOffset = offset;
            closestCard = element;
        }
    });
    return closestCard;
};

function updateList(list) {
    let n = 0;
    const keys = Object.keys(localStorage);
    keys.forEach(element => {
        if (element.substring(0, 3) == list.substring(0, 3)) { localStorage.removeItem(element); }
    });

    [...document.getElementById(list).children].forEach(element => {
        n += 1;
        const title = element.querySelector('.title').innerHTML;
        const date = element.querySelector('.date').innerHTML;
        const assignee = element.querySelector('.assignee').innerHTML;
        const description = element.querySelector('.description').innerHTML;
        const subtasks = element.querySelector('.subtasks');

        const labels = element.querySelector('.labels');

        let subtasks_string = '';
        [...subtasks.querySelectorAll('.cb')].forEach(el => {
            const checked = el.checked==true ? "1" : "0";
            const text = el.parentElement.parentElement.querySelector('p').innerHTML;
            subtasks_string += checked + text + '-';
        });
        subtasks_string = subtasks_string.substring(0, subtasks_string.length-1);

        let labels_string = '';
        [...labels.children].forEach(el => {
            labels_string += el.innerHTML + '.' + getComputedStyle(el).getPropertyValue('background-color') + '.' + getComputedStyle(el).getPropertyValue('color') + '-';
        });
        labels_string = labels_string.substring(0, labels_string.length-1);

        localStorage.setItem(list + '-' + n + '-' + 'title', title);
        localStorage.setItem(list + '-' + n + '-' + 'description', description);
        localStorage.setItem(list + '-' + n + '-' + 'date', date);
        localStorage.setItem(list + '-' + n + '-' + 'assignee', assignee);
        localStorage.setItem(list + '-' + n + '-' + 'subtasks', subtasks_string);
        localStorage.setItem(list + '-' + n + '-' + 'labels', labels_string);

    });
}

const lists = document.querySelectorAll('.lane');
lists.forEach((list) => {
    list.addEventListener('dragover', (event) => {
      event.preventDefault();

        const bottom = insertAboveCard(list, event.clientY);
        const curCard = document.querySelector('.dragging');

        let currentParent = curCard.parentElement.id;
        let futureParent = list.id;
        if (!bottom) {
            if ((currentParent == 'todo') && (futureParent == 'doing')) {
                todo_cards -= 1;
                doing_cards += 1;
                updateList('todo');
                updateList('doing');
            }
            if ((currentParent == 'todo') && (futureParent == 'done')) {
                todo_cards -= 1;
                done_cards += 1;
                updateList('todo');
                updateList('done');
            }
            if ((currentParent == 'doing') && (futureParent == 'todo')) {
                doing_cards -= 1;
                todo_cards += 1;   
                updateList('doing'); 
                updateList('todo');              
            }
            if ((currentParent == 'doing') && (futureParent == 'done')) {
                doing_cards -= 1;
                done_cards += 1;
                updateList('doing');
                updateList('done');
            }
            if ((currentParent == 'done') && (futureParent == 'todo')) {
                done_cards -= 1;
                todo_cards += 1;
                updateList('done');
                updateList('todo');
            }
            if ((currentParent == 'done') && (futureParent == 'doing')) {
                done_cards -= 1;
                doing_cards += 1;
                updateList('done');
                updateList('doing');
            }
            if ((currentParent == 'done') && (futureParent == 'done')) {
                updateList('done');
            }
            if ((currentParent == 'doing') && (futureParent == 'doing')) {
                updateList('doing');
            }
            if ((currentParent == 'todo') && (futureParent == 'todo')) {
                updateList('todo');
            }

            list.appendChild(curCard);
        } else {
  
            list.insertBefore(curCard, bottom);

            if ((currentParent == 'todo') && (futureParent == 'doing')) {
                todo_cards -= 1;
                doing_cards += 1;
                updateList('todo');
                updateList('doing');
            }
            if ((currentParent == 'todo') && (futureParent == 'done')) {
                todo_cards -= 1;
                done_cards += 1;
                updateList('todo');
                updateList('done');
            }
            if ((currentParent == 'doing') && (futureParent == 'todo')) {
                doing_cards -= 1;
                todo_cards += 1;   
                updateList('doing'); 
                updateList('todo');              
            }
            if ((currentParent == 'doing') && (futureParent == 'done')) {
                doing_cards -= 1;
                done_cards += 1;
                updateList('doing');
                updateList('done');
            }
            if ((currentParent == 'done') && (futureParent == 'todo')) {
                done_cards -= 1;
                todo_cards += 1;
                updateList('done');
                updateList('todo');
            }
            if ((currentParent == 'done') && (futureParent == 'doing')) {
                done_cards -= 1;
                doing_cards += 1;
                updateList('done');
                updateList('doing');
            }
            if ((currentParent == 'done') && (futureParent == 'done')) {
                updateList('done');
            }
            if ((currentParent == 'doing') && (futureParent == 'doing')) {
                updateList('doing');
            }
            if ((currentParent == 'todo') && (futureParent == 'todo')) {
                updateList('todo');
            }
        }
    });

    list.addEventListener('drop', (event) => {
      event.preventDefault();
      updateList('todo');
      updateList('doing');
      updateList('done');
    }); 
});


reloadAll();