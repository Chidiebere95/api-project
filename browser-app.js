const imgDOM = document.querySelector('.images-container')
const alert = document.querySelector('.alert')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM =  document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')
const clearbtn = document.querySelector('.clear-btn')



window.addEventListener("DOMContentLoaded", setupItems)
formDOM.addEventListener('submit',async(e)=>{
  e.preventDefault()
  try {
    const array=[]
    const {data:{hits}} = await axios.get('https://pixabay.com/api/?key=23121200-7e3d6197889f56725f2ce651a&q=yellow+flowers&image_type=photo&pretty=true')
    // console.log(hits); 
  
    let value=taskInputDOM.value
  const id = new Date().getTime().toString();

  if (value ) {
    const item=hits.find((item)=>{ 
      return item.user===value
    })
    const imgFile=item.largeImageURL
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
      //the id at that point it was clicked
    element.setAttributeNode(attr);
    element.classList.add("article");
    element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <img src='${imgFile}'
            </div>
          `;
    imgDOM.appendChild(element);
    // display alert
    displayAlert("image search successful", "success");
    // show container
    // container.classList.add("show-container");
    // set local storage
    addToLocalStorage(id, value);
    
  } else {
    displayAlert("please enter users eg pixel2013 blende12, mploscar, JillWellington, anncapictures,bichnguyenvo", "danger");
  }
} catch (error) {
  console.log(error);  
}
})
 clearbtn.addEventListener('click',clearItems)
// display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  // remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 3000);
}



// add to local storage
function addToLocalStorage(id, value) {
  const singleImage = { id, value };
  let items = getLocalStorage();
  items.push(singleImage);
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
function setupItems() {
  let items = getLocalStorage();

  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value);
    });
    imgDOM.classList.add("show-container");
  }
}

async function createListItem (id, value) {

  const {data:{hits}} = await axios.get('https://pixabay.com/api/?key=23121200-7e3d6197889f56725f2ce651a&q=yellow+flowers&image_type=photo&pretty=true')

          const item=hits.find((item)=>{
            return item.user===value
          })
          // console.log(hits);
          const imgFile=item.largeImageURL
          const element = document.createElement("article");
          let attr = document.createAttribute("data-id");
          attr.value = id;
            //the id at that point it was clicked
          element.setAttributeNode(attr);
          element.classList.add("article");
          element.innerHTML = `<p class="title">${value}</p>
                  <div class="btn-container">
                    <img src='${imgFile}'
                  </div>
                `;
  imgDOM.appendChild(element);
}

function clearItems() {
  localStorage.removeItem("list");
  location.reload()
}