

// CONSTANTES CARRUSEL//

//Selecciono el elemento HTML con el id de 'carousel'
const carrusel=document.getElementById('carousel'); 

//Define tiempo de espera en milisegundos para las transiciones automáticas del carrusel.
const tiempoDeEspera= 1000;

//CONSTANTES FICHA PROYECTOS //

//Selecciona todos los contenedores con la clase .option del HTML. Se trata de las opciones de diseño que hay en las fichas de producto.
const opcion = document.querySelectorAll('.option');
//Selecciona todos los contenedores con la clase .text del HTML. Se trata de la informacion de cada proyecto en las fichas de proyecto.
const texto = document.querySelectorAll('.text');

//CONSTANTES IMAGEN GRANDE

//Selecciona todas las imagenes de cada proyecto con esa clase
const imagenGrid=document.querySelectorAll(`.image`)
//Selecciona la imagen grande dentro del contenedor para mostrarla en grande
const grande=document.querySelector(`.big`)
//Selecciona el contenedor con la clase big, que será el que almacenará la imagen en grande cuando le den click.
const imagenGrande=document.querySelector(`.big__image`)
//Selecciona el botón que nos permitirá cerrar el popup de la imagen
const botonCerrar=document.querySelector(`.close__image`)

// CONSTANTES MENÚ DESPLEGABLE //

//Selecciona el menú completo que se desplegará o cerrará
const menu=document.getElementById('burger-nav');
//selecciona el botón que abre el menú desplegable
const abrirMenu=document.getElementById('open');
//selecciona el botón que cierra el menú desplegable
const cerrarMenu=document.getElementById('close');

//-----------------------------------------------------------------//
// VARIABLES Y CONSTANTES CARRUSEL//

//Variable Array que almacena todas las imagenes que pasaran en el carrusel
let imagenes = [
    'media/foto1carrusel.webp',
    'media/foto2carrusel.webp',
    'media/foto3carrusel.webp',
    'media/foto4carrusel.webp'
];

// Esta variable indica que el carrusel inicia en 0, es decir en la primera imagen de la array
let indiceActual= 0;
//Variable intervalo vacia porque lo definire más adelante con setInterval
let intervalo;

//_------------------------------------------------------------------------//

//FUNCIONES MENÚ//

//Le doy un addEventlistener al botón de abrir menú para que aparezca el nav con la clase visible definida en css
abrirMenu.addEventListener('click', () => {
    menu.classList.add('visible');

})

//Le doy un addEventlistener de cerrar al botón de abrir menú para que aparezca el nav con la clase definida en css
cerrarMenu.addEventListener('click', e => {
    e.preventDefault();
    menu.classList.remove('visible')
})
//FUNCIONES MENÚ//



//OPCIONES DE DISEÑO 

// Seleccionamos cada opción de proyecto
opcion.forEach((cadaOpcion, i)=>{
    //Indico que cada vez que el usuario haga click en una de las opciones debe pasar algo
    opcion[i].addEventListener('click', () => {
        //Vulevo a declarar todas las opciones para quitarles la clase activo, para que no se muestre.
        opcion.forEach((cadaOpcion, j) =>{
            opcion[j].classList.remove('activo')
            texto[j].classList.remove('activo')
        })

        //Agrego la clase 'activo' a la opción y texto correspondiente al que han hecho click. Esto hará que cuando hagan click se vea toda la información de proyecto.
        opcion[i].classList.add('activo')
        texto[i].classList.add('activo')

        //En esta parte he tenido que recurrir a CHAT GPT porque las imagenes no se mostraban en su opción correspondiente, sino que solo se abrían en la primera. 

        //Obtiene todas las imágenes dentro del texto activo
        const imagenGrid=texto[i].querySelectorAll('.image');
        //Referencia a la imagen grande que se mostrará en el popup
        const grande = texto [i].querySelector('.big');
        //contenedor del popup de la imagen
        const imagenGrande = texto [i].querySelector('.big__image')
        //boton de cerrar el popup 
        const botonCerrar = texto[i].querySelector('.close__image')

        //(Esta parte ya la he podido completar sola) Seleccionamos cada imagen del grid para abrir la imagen en grande cuando se haga click.
        imagenGrid.forEach(img => {
            img.addEventListener('click', () =>{
                //Activo la clase isActive definida en css para que se muestre la imagen en grande
                grande.classList.add('isActive')
                //Cambiamos la fuente de la imagen grande por la imagen en la que hacemos click
                imagenGrande.src = img.src
            })
        })
        if(botonCerrar){
            //Hago que al hacer click en el boton de cerrar se desactive la clase de isActive que se habia activado anteriormente.
            botonCerrar.addEventListener('click',e => {
                e.preventDefault(); //necesario porque al cerrar se me iba para arriba.
                grande.classList.remove('isActive');
            
            })
        }
        
    })
})

//FUNCIONES CARRUSEL//

//Declaro función para cambiar la imagen del carrusel
function cambiarImagen(){
    //setTimeout para definir el tiempo que espera antes de cambiar la imagen, en este caso 1000ms, es decir, 1 segundo.
    setTimeout(() => {
        //Indica que pasado ese tiempo puede pasar a la siguiente imagen
        indiceActual++

        //función que indica que si llegamos al final de la array de imágenes volvemos a empezar desde el principio.
        if (indiceActual >= imagenes.length){
            //Define donde debe volver una vez acabada la array
            indiceActual=0
        }

        //Indica que cambiamos la fuente de la imagen del carrusel a la nueva imagen.
        carrusel.src=imagenes[indiceActual]
        //tiempo definido de espera
    },1000)
}

//funcion para inicar el intervalo automático del carrusel
function inicioIntervalo(){
    //SetInterval ejecuta la funcion intervalo cada cierto tiempo (el definido en tiempo de esper), esto permite que el carrusel cambie de imagen automáticamante
    intervalo=setInterval(() => {
        cambiarImagen()
    }, tiempoDeEspera)
}

//Función para detener el intervalo del carrusel
function finIntervalo(){
    //detiene el intervalo que he creado
    clearInterval(intervalo)
}

//Declaro el incio del carrusel que iniciará autonáticamanete al cargar la página
inicioIntervalo()





