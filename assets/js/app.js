const btnReaccion = document.getElementById('reaccion');
const contenedorListaMusic = document.getElementById('lista-music');
const controles = document.getElementById('controles');

const menuMusic = document.getElementById('menuMusic');
const titlePlaylist = document.getElementById('titlePlaylist');
const playDescription = document.getElementById('playDescription');
const imgAlbum = document.getElementById('imgAlbum');
const album = document.getElementById('album');

//Eventos
btnReaccion.addEventListener('click', likear);
menuMusic.addEventListener('click', cargarInfo);
contenedorListaMusic.addEventListener('click', reproducirMusica);
controles.addEventListener('click', controlar)
    //Funciones
let estado = 0;

function likear() {
    if (estado === 0) {
        btnReaccion.classList.add('reaccion-activa');
        estado = 1;
    } else if (estado === 1) {
        btnReaccion.classList.remove('reaccion-activa');
        estado = 0;
    }
}


function cargarInfo(e) {
    let jsonurl = '';
    let titlePlay = '';
    let descripcionPlay = '';
    let srcImg = '';

    if (e.target.classList.contains('playSalsa')) {
        jsonurl = 'assets/musicJSON/salsa.json';
        titlePlay = 'Maelo Ruiz';
        descripcionPlay = 'Ismael Ruiz Hernandez nacio en la ciudad de Nueva York el 22 <br>de Octubre de 1966 en la ciudad de Nueva York(EEUU),pero a la <br>edad de 4 se mudo con su familia a Puerto Rico, de donde eran <br>originarios sus padres. Comenzo en la musica a la temprana edad <br>de 16 cuando comenzo a cantar en la "Escuela Libre de Musica de Caguas"';
        srcImg = 'assets/img/MaeloRuiz.jpg';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(assets/img/MaeloRuiz.jpg)";

    } else if (e.target.classList.contains('playReggaeton')) {
        jsonurl = 'assets/musicJSON/reggaeton.json';
        titlePlay = 'Maluma';
        descripcionPlay = 'Juan Luis Arias nacio el 28 de enero de 1994 en la ciudad colombiana de Medellin. <br>Conocido por su nombre artistico Maluma, es un cantante y compositor colombiano. <br>Salto a la fama en su pais natal en 2011, gracias a los sencillos «Farandulera», <br>«Obsesion», y «La temperatura»; y con «Carnaval» (2014),';
        srcImg = 'assets/img/maluma.jpg';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(assets/img/maluma.jpg)";
        
    } else if (e.target.classList.contains('playBachata')) {
        jsonurl = 'assets/musicJSON/bachata.json';
        titlePlay = 'Romeo Santos';
        descripcionPlay = 'Anthony Santos nacio el 21 de julio de 1981 en Nueva York(El Bronx).<br> Su nombre artistico se debe a una mencion que hizo de Romeo en un <br>extracto de la cancion «Todavia me amas» del album We Broke the <br>Rules, lo que genero que muchas mujeres lo llamaran "Romeo".';
        srcImg = 'assets/img/RomeoSantos.jpg';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(assets/img/RomeoSantos.jpg)";

    }  else if (e.target.classList.contains('playPop')) {
        jsonurl = 'assets/musicJSON/pop.json';
        titlePlay = 'Louis Tomlinson';
        descripcionPlay = 'Louis William Tomlinson, conocido en el mundo de la <br>musica como Louis Tomlinson, es un cantante,<br> compositor y jugador de futbol britanico, reconocido <br>como uno de los integrantes de la banda One Direction. <br>Nacio en Doncaster, Reino Unido el 24 de diciembre de 1991 y <br>es hijo de Johannah Poulston. Actualmente esta debutando como <br>solista en su world tour  con el nombre de LTWT, ademas de eso lanzo <br>su ultimo album FITF con el que comezara sus tour.';
        srcImg = 'assets/img/LouisTomlinson.jpg';
        album.style.background = "linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(assets/img/LouisTomlinson.jpg)";
    }

    titlePlaylist.innerHTML = titlePlay;
    playDescription.innerHTML = descripcionPlay;
    imgAlbum.src = srcImg;
    cargarMusica(jsonurl);
}

function cargarMusica(url) {
    fetch(url)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            let html = '';
            data.forEach(music => {
                html += `
                <li class="music">
                    <input type="text" value="${music.url}" style="display: none;">
                    <a href="#" id="${music.id}" class="btn play-music"><i class="far fa-play-circle"></i></a>
                    <h3>${music.artista}</h3> 
                    <h3 class="name" id="name">${music.nombre}</h3> 
                    <h3 class="time">${music.duracion}</h3>
                </li>
                `
                contenedorListaMusic.innerHTML = html;
            });
        });
}

function reproducirMusica(e) {
    if (e.target.parentElement.classList.contains('play-music')) {
        let urlM = e.target.parentElement.previousElementSibling.value;
        controles.innerHTML = `<a href="#" class="btn control atras"><i class="fas fa-backward"></i></a>
        <audio src="${urlM}" style="width: 50vw;" controls autoplay><input type="text" value="${urlM}" style="display: none;"></audio>
        <a href="#" class="btn control siguiente"><i class="fas fa-forward"></i></a>`;

        e.target.parentElement.classList.add('reaccion-activa-reproducida');
        siguienteAutomatico();
    }
}

function controlar(e) {
    let audio = e.target.parentElement.parentElement.children[1].children[0];
    let audioUrl = audio.value;

    let musicArray = Array.from(contenedorListaMusic.children);

    if (e.target.parentElement.classList.contains('siguiente')) {
        musicArray.forEach(limusic => {
            if (limusic.children[0].value === audioUrl) {
                let siguienteMusica = limusic.nextElementSibling.children[0].value;

                let elementoParaReproducido = limusic.nextElementSibling.children[1];
                siguienteAtras(siguienteMusica, elementoParaReproducido)
            }
        });
    }
    if (e.target.parentElement.classList.contains('atras')) {
        musicArray.forEach(limusic => {
            if (limusic.children[0].value === audioUrl) {
                let musicaAtras = limusic.previousElementSibling.children[0].value;

                let elementoParaReproducido = limusic.previousElementSibling.children[1];
                siguienteAtras(musicaAtras, elementoParaReproducido)
            }
        });
    }
}

function siguienteAtras(musica, reproducida) {
    controles.innerHTML = `<a href="#" class="btn control atras"><i class="fas fa-backward"></i></a>
    <audio src="${musica}" style="width: 50vw;" controls autoplay><input type="text" value="${musica}" style="display: none;"></audio>
    <a href="#" class="btn control siguiente"><i class="fas fa-forward"></i></a>`;
    reproducida.classList.add('reaccion-activa-reproducida');

    siguienteAutomatico();
}

function siguienteAutomatico() {
    let audioEtiqueta = controles.children[1];
    audioEtiqueta.addEventListener('ended', () => {
        let audioUrl = audioEtiqueta.children[0].value;
        let musicArray = Array.from(contenedorListaMusic.children);
        musicArray.forEach(limusic => {
            if (limusic.children[0].value === audioUrl) {
                let siguienteMusica = limusic.nextElementSibling.children[0].value;

                let elementoParaReproducido = limusic.nextElementSibling.children[1];
                siguienteAtras(siguienteMusica, elementoParaReproducido)
            }
        });
    })
}