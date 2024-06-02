// Changing the background color when we scrolling
window.onscroll = function () {  
    var menu = document.querySelector(".barra-nav");
    menu.classList.toggle("change-background", window.scrollY>0);
} 


// CHANGING THE BACKGROUND COLOR AND THE BUTTON ADDING EVENTS LIKE MOUSEOVER AND MOUSEOUT
const changeColorButton = document.getElementById('changeColorButton');
const bodyMain = document.getElementById('body-main');

const colors = ['rgb(231, 70, 70)', 'rgb(250, 152, 132)', 'rgb(255, 229, 202)', 'rgb(255, 243, 226)'];

changeColorButton.addEventListener('click', () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    bodyMain.style.backgroundColor = randomColor;
});

changeColorButton.addEventListener('mouseover', () => {
    changeColorButton.style.backgroundColor = 'rgb(250, 152, 132)';
    changeColorButton.style.color = 'white';
});

changeColorButton.addEventListener('mouseout', () => {
    changeColorButton.style.backgroundColor = 'white';
    changeColorButton.style.color = 'black';

});



// CLICK THE BUTTON AND WE SHOW THE ID
const inputId= document.getElementById("input")
const buttonSubmit= document.getElementById("mySubmitButton")
const container= document.getElementById("container")

//function to reset the form
function resetForm() {
    inputId.value = '';
    
}

// function to show the info (API) in the HTML with two parameters
function showDetailsPost(postData, container) {
    const { id, title, body } = postData;
    const detallesHTML = `
        <h2>ID del Post: ${id}</h2>
        <h3>Título del Post: ${title}</h3>
        <p>Cuerpo del Post: ${body}</p>
    `;
    container.innerHTML = detallesHTML;
    container.style.textAlign= "center"
    container.style.backgroundColor= 'rgb(255, 229, 202)'
    container.style.padding= "3em"
    container.style.borderRadius= "3em"


}

// BUTTON "CLICK" SEARCH
buttonSubmit.addEventListener('click',async (e) => {
    //Prevents the event's default behavior from being executed.
    e.preventDefault()

    // Get the value input and delete spaces in blank
    const postId = inputId.value.trim(); 

    //function using async (promises) to get the info in the API and with the function showDetailsPost(), we show(render) the info in the HTML.
    async function searchingPost(){
        if (postId === '') {
            alert('Please, enter a valid ID.');
            return;
        }else{
    
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
                if (!response.ok) {
                    throw new Error('The post could not be found.');
                }
                const postData = await response.json();
                showDetailsPost(postData, container)
            } catch (error) {
                console.error('Error searching the post', error);
                alert('Error searching the post. Please, try again.');
            }
        }
    }
    searchingPost()
    //we reset the form
    resetForm()
})



// DOING THE LIST OF ID 
let listOfId = [];
const containerList= document.getElementById("containerList")
const buttonList= document.getElementById("buttonAddList")
const listIdElement= document.getElementById("list")

function addId(postData) {

    const newId = {
        id: postData.id,
        title: postData.title,
        body:postData.body
       
    }
    listOfId.push(newId)
    renderList()
}

function removePost(indexOfPostToBeRemoved) {
    listOfId.splice(indexOfPostToBeRemoved, 1);
    renderList();
}
function showDeleteConfirmation(index) {
    const confirmDelete = window.confirm("¿Delete?");
    if (confirmDelete) {
        removePost(index)
    }

}

function renderList() {
    listIdElement.innerHTML = '';
    listOfId.forEach((data, index) => {
        const liElement = document.createElement('li');
        liElement.className = 'item';

        const idElement = document.createElement('p');
        idElement.innerText = `ID: ${data.id}`;

        const titleElement = document.createElement('p');
        titleElement.innerText = `Title: ${data.title}`;

        const bodyElement = document.createElement('p');
        bodyElement.innerText = `Body: ${data.body}`;

        const buttonElement = document.createElement('button');
        buttonElement.innerText = 'DELETE';
        buttonElement.className = 'delete-button';
        buttonElement.onclick = () => {
            showDeleteConfirmation(index);
        };

        liElement.appendChild(idElement);
        liElement.appendChild(titleElement);
        liElement.appendChild(bodyElement);
        liElement.appendChild(buttonElement);

        listIdElement.appendChild(liElement);
    });
}

buttonList.addEventListener('click', async (e) => {
    e.preventDefault();
    const postId = inputId.value.trim();

    if (postId === '') {
        alert('Please, enter a valid ID.');
        return;
    }
    async function searchId(){
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            if (!response.ok) {
                throw new Error('The post could not be found.');
            }
            const postData = await response.json();
            addId(postData);
        } catch (error) {
            console.error('Error searching the post', error);
            alert('Error searching the post. Please, try again.');
        }
    }
    searchId()
    resetForm();
});


// SECTION RANDOM PHOTO USING THE API UNSPLASH
const buttonPhoto= document.getElementById("button-random-photo")
buttonPhoto.style.textAlign= "center"
const containerPhoto= document.getElementById("container-photo")

buttonPhoto.addEventListener('click', () => {
    // Message when we waiting load the image 
    containerPhoto.textContent = 'Loading random image..';

    //USING ASYNC AWAIT (PROMISE)
    async function getPhoto() {
        try {
            const answer = await fetch("https://source.unsplash.com/collection/190727/500x500");
            if (answer.status === 200) {
                const img = document.createElement("img");
                img.src = answer.url;
                img.style.boxShadow = '2px 2px 3px 3px black';
                img.style.borderRadius = '0.5em';
                containerPhoto.innerHTML = "";
                containerPhoto.style.display = "flex";
                containerPhoto.style.justifyContent = "center";
                containerPhoto.appendChild(img);
            } else {
                console.error("Error loading photo");
                containerPhoto.textContent = "Error loading photo";
            }
        } catch (error) {
            console.error("Request error", error);
            containerPhoto.textContent = "Request error";
        }
    }
    
    getPhoto();    
    
});

buttonPhoto.addEventListener('mouseover', () => {
    buttonPhoto.style.backgroundColor = 'rgb(250, 152, 132)';
    buttonPhoto.style.color = "white";
});

buttonPhoto.addEventListener('mouseout', () => {
    buttonPhoto.style.backgroundColor = 'white';
    buttonPhoto.style.color = 'black';
});


// TERCERA SECCION
const buttonRandomInfo= document.getElementById("button-random-info")
const buttonShowInfo= document.getElementById("button-all-info")
const divRandomInfo= document.getElementById("show-random-info")
const divShowInfo= document.getElementById("show-all-info")
const hideOrShowButton= document.getElementById("button-show-hide")

hideOrShowButton.style.display= "none"
hideOrShowButton.style.textAlign= "center"
divShowInfo.style.display="none"

function renderPost(postData,container) {
    const { id, title, body } = postData;
    const detallesHTML = `
        <h2>ID del Post: ${id}</h2>
        <h3>Título del Post: ${title}</h3>
        <p>Cuerpo del Post: ${body}</p>
    `;
    container.innerHTML = detallesHTML;
}

function objectRender(post, container){
    post.forEach(producto => {
        const productoElemento = document.createElement('div');
        productoElemento.innerHTML = `
          <h2>ID: ${producto.id}</h2>
          <h2>Title: ${producto.title}</h2>
          <p>Body: ${producto.body}</p>
        `;
        container.appendChild(productoElemento);
      });
}

//click in button random info
buttonRandomInfo.addEventListener('click', () => {
    // Message when we waiting load the image 
    divRandomInfo.textContent = 'Loading random post...';
    //USING ASYNC AWAIT (PROMISE)
    async function getRandomPost() {
        try {
            const randomId = Math.floor(Math.random() * 100) + 1;
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${randomId}`);
            if (response.status === 200) {                
                const postData = await response.json();
                renderPost(postData, divRandomInfo)
            } else {
                console.error("Error loading ");
            }
        } catch (error) {
            console.error("Request error", error);
            divRandomInfo.textContent = "Request error";
        }
    }
    
    getRandomPost();    
    
});

//click in button show all the products
buttonShowInfo.addEventListener('click', async () => {

    async function getInfo () {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/`);
            if (!response.ok) {
                throw new Error('The post could not be found.');
            }
            const postData = await response.json();
            hideOrShowButton.style.display="block"
            objectRender(postData, divShowInfo)
        
        } catch (error) {
            console.error('Error searching the post', error);
            alert('Error searching the post. Please, try again.');
        }
    }
    getInfo()
    hideOrShowButton.addEventListener('click', () => {
        if (divShowInfo.style.display === "none") {
            divShowInfo.style.display = "block";
            hideOrShowButton.textContent = "Hide Post Info";
        } else {
            divShowInfo.style.display = "none";
            hideOrShowButton.textContent = "Show Post Info";
        }
    });

});
