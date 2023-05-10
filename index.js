document.querySelector('.up img').addEventListener("click",()=>{
      document.body.classList.toggle('dark');
});
const addItems=document.querySelector('.add-items');
const itemsList=document.querySelector('.items');
addItems.addEventListener("submit",addItem);
const items=JSON.parse(localStorage.getItem('items')) || [];
populateList(itemsList,items);
function addItem(e){
    e.preventDefault();
    const text=(this.querySelector('[name=item]')).value;
    const item={
        text,
        done:false
    };
    items.push(item);
    document.querySelector('.number').innerHTML=items.length;
    populateList(itemsList,items);
    localStorage.setItem('items',JSON.stringify(items));
    this.reset();
}
function populateList(itemsList,items){
    itemsList.innerHTML=items.map((item, i) =>{
        return `
          <li >
           <input type='checkbox' data-index=${i} id="item${i}" ${item.done ? 'checked':''}>
           <label for="item${i}">${item.text}</label>    
           <img src="Images/icon-cross.svg" data-index=${i} class="cross">  
          </li>  
         `
    }).join("");
}
itemsList.addEventListener("click",toggle);
function toggle(e){
     if(!e.target.matches('input')) return;
     const el=e.target;
     const index=el.dataset.index;
     items[index].done=!items[index].done;
     localStorage.setItem('items',JSON.stringify(items));
     populateList(itemsList,items);
}
document.querySelector('.number').innerHTML=items.length;
//Functionality for cross i.e. removing an element from the list 
const crosses=document.querySelectorAll('.cross');
crosses.forEach(cross=> cross.addEventListener("click",funcCross));
function funcCross(e){
    // alert("Nitin");
    const ele=e.target;
    const index=ele.dataset.index;
    items.splice(index,1);
    document.querySelector('.number').innerHTML=items.length;
    localStorage.setItem('items',JSON.stringify(items));
    populateList(itemsList,items);
    const crosses=document.querySelectorAll('.cross');
    crosses.forEach(cross=> cross.addEventListener("click",funcCross));
}
//Functionality for Active button
const active=document.querySelector('.active');
active.addEventListener('click', activeFunction);
function activeFunction(){
    const checkBoxes=document.querySelectorAll('.items li input');
    checkBoxes.forEach(checkBox =>{
        checkBox.checked?checkBox.parentElement.style.display='none':checkBox.parentElement.style.display='flex';
    });
}
//Functionality for Completed Button
const completed=document.querySelector('.completedL');
completed.addEventListener('click', completedFunction);
function completedFunction(){
    const checkBoxes=document.querySelectorAll('.items li input');
    checkBoxes.forEach(checkBox =>{
        checkBox.checked?checkBox.parentElement.style.display='flex':checkBox.parentElement.style.display='none';
    });
}
//Functionality for All
const all=document.querySelector('.all');
all.addEventListener('click',allFunction);
function allFunction(){
    const checkBoxes=document.querySelectorAll('.items li input');
    checkBoxes.forEach(checkBox =>{
            checkBox.parentElement.style.display='flex';
    });
}
//Functionality for ClearCompleted
const completedAll=document.querySelector('.clear');
completedAll.addEventListener('click',completedAllFunction);
function completedAllFunction(){

    //This I accidently wrote for clearAll
    // itemsList.innerHTML=``;
    // items.splice(0,items.length);
    // document.querySelector('.number').innerHTML=items.length;
    // localStorage.clear();
}