// Changing the background color when we scrolling
window.onscroll = function (e) {  
    var menu = document.querySelector(".barra-nav");
    menu.classList.toggle("change-background", window.scrollY>0);
} 


// CHANGING THE BACKGROUND COLOR AND THE BUTTON ADDING EVENTS LIKE MOUSEOVER AND MOUSEOUT
const changeColorButton = document.getElementById('changeColorButton');
const bodyMain = document.getElementById('body-main');

const colors = ['rgb(255, 242, 215)', 'rgb(255, 224, 181)', 'rgb(248, 199, 148)', 'rgb(216, 174, 126)', 'pink'];

changeColorButton.addEventListener('click', () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    bodyMain.style.backgroundColor = randomColor;
});

changeColorButton.addEventListener('mouseover', () => {
    changeColorButton.style.backgroundColor = '#252323';
    changeColorButton.style.color = '#ffbd59';
});

changeColorButton.addEventListener('mouseout', () => {
    changeColorButton.style.backgroundColor = 'white';
    changeColorButton.style.color = 'black';
});
const randomPhotoButton = document.getElementById('randomPhotoButton')


// SECTION RANDOM PHOTO USING PICSUM
    
const buttonPhoto= document.getElementById("button-random-photo")
buttonPhoto.style.textAlign= "center"
const containerPhoto= document.getElementById("container-photo")

buttonPhoto.addEventListener('click', () => {
    // Message when we waiting load the image 
    containerPhoto.textContent = 'Loading random image..';

    //USING ASYNC AWAIT (PROMISE)
    async function getPhoto() {
        try {
            const answer = await fetch("https://picsum.photos/300");
            if (answer.status === 200) {
                const img = document.createElement("img");
                img.src = answer.url;
                // img.style.boxShadow = '2px 4px 12px black';
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
    buttonPhoto.style.backgroundColor = '#252323';
    buttonPhoto.style.color = '#ffbd59';
});

buttonPhoto.addEventListener('mouseout', () => {
    buttonPhoto.style.backgroundColor = 'white';
    buttonPhoto.style.color = 'black';
});















// CLICK THE BUTTON AND WE SHOW THE ID
const inputId= document.getElementById("input")
const buttonSubmit= document.getElementById("mySubmitButton")
const container= document.getElementById("container")

function resetForm() {
    inputId.value = '';
    
}

buttonSubmit.addEventListener('click',async (e) => {
    e.preventDefault()
    // Obtener el valor del input y eliminar espacios en blanco
    const postId = inputId.value.trim(); 

    if (postId === '') {
        alert('Por favor, ingrese un ID de post válido.');
        return;
    }else{

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            if (!response.ok) {
                throw new Error('No se pudo encontrar el post.');
            }
            const postData = await response.json();
            showDetailsPost(postData)
        } catch (error) {
            console.error('Error al buscar el post:', error);
            alert('Hubo un error al buscar el post. Por favor, inténtelo de nuevo.');
        }
    }
    resetForm()
})

function showDetailsPost(postData) {
    const { id, title, body } = postData;
    const detallesHTML = `
        <h2>ID del Post: ${id}</h2>
        <h3>Título del Post: ${title}</h3>
        <p>Cuerpo del Post: ${body}</p>
    `;


    container.innerHTML = detallesHTML;

}
    // fetch('https://jsonplaceholder.typicode.com/posts')
    //   .then(response => response.json())
    //   .then(data => {
        // console.log(data); // Verificar que los datos se obtienen correctamente
    //     const catalogo = document.getElementById('container');
    //     data.forEach(producto => {
    //       const productoElemento = document.createElement('div');
    //       productoElemento.style.height= "100px"
    //       productoElemento.style.width= "100px"
    //       productoElemento.style.display="flex"
    //       productoElemento.style.flexDirection= "column"
    //       productoElemento.innerHTML = `
    //         <h2>${producto.id}</h2>`;
    //       catalogo.appendChild(productoElemento);
    //     });
    //   })
    //   .catch(error => {
    //     console.error('Error al obtener los datos:', error);
    //   });
//   });
