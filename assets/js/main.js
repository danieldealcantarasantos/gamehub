/*=============== SHOW SIDEBAR ===============*/
const showSidebar = (toggleId, sidebarId, headerId, mainId) =>{
   const toggle = document.getElementById(toggleId),
         sidebar = document.getElementById(sidebarId),
         header = document.getElementById(headerId),
         main = document.getElementById(mainId)

   if(toggle && sidebar && header && main){
       toggle.addEventListener('click', ()=>{
           /* Show sidebar */
           sidebar.classList.toggle('show-sidebar')
           /* Add padding header */
           header.classList.toggle('left-pd')
           /* Add padding main */
           main.classList.toggle('left-pd')
       })
   }
}
showSidebar('header-toggle','sidebar', 'header', 'main')

/*=============== LINK ACTIVE ===============*/
const sidebarLink = document.querySelectorAll('.sidebar__list a')

function linkColor(){
    sidebarLink.forEach(l => l.classList.remove('active-link'))
    this.classList.add('active-link')
}

sidebarLink.forEach(l => l.addEventListener('click', linkColor))

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-fill'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-clear-fill' : 'ri-sun-fill'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-clear-fill' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})


//Barra de Progresso
window.onscroll = function() {
  updateProgressBar();
};

function updateProgressBar() {
  var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
  var totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrollPercentage = (scrollPosition / totalHeight) * 100;

  document.getElementById('progress-bar').style.width = scrollPercentage + '%';
}

// SLIDE SHOW

const imgs = document.querySelectorAll(".slider img");
const dots = document.querySelectorAll(".botao i");
const leftArrow = document.querySelector(".arrow-left");
const rightArrow = document.querySelector(".arrow-right");

let currentIndex = 0;
let time = 5000; // Tempo padrão para apresentação de slides automática
let slideInterval; // Variável para armazenar o intervalo de slideshow

// Função para definir a classe nos slides e nos ícones de paginação
const defClass = (startPos, index) => {
  for (let i = startPos; i < imgs.length; i++) {
    imgs[i].style.display = "none"; // Oculta a imagem
    dots[i].classList.remove("fa-dot-circle"); // Remove a classe do ícone ativo
    dots[i].classList.add("fa-circle"); // Define a classe do ícone inativo
  }
  imgs[index].style.display = "block"; // Exibe a imagem correspondente
  dots[index].classList.add("fa-dot-circle"); // Marca o ícone como ativo
};

// Exibe o primeiro slide ao carregar a página
defClass(1, 0); // Exibe o primeiro slide e o ícone ativo

// Função para iniciar o slideshow automático
const startAutoSlide = () => {
  slideInterval = setInterval(() => {
    currentIndex >= imgs.length - 1 ? currentIndex = 0 : currentIndex++;
    defClass(0, currentIndex); // Chama a função para atualizar o slide e o ícone
  }, time);
};

startAutoSlide(); // Inicia o slideshow automático

// Lógica para os botões de paginação
const botoesPaginacao = document.querySelectorAll('.paginacao .botao');
const slides = document.querySelectorAll('.slider img');

botoesPaginacao.forEach((botao, index) => {
  botao.addEventListener('click', () => {
    // Remove a classe 'ativo' de todos os botões e ícones
    botoesPaginacao.forEach(b => {
      b.classList.remove('ativo');
      const icon = b.querySelector('i');
      icon.classList.remove('fa-dot-circle'); // Remove o ícone de ativo
      icon.classList.add('fa-circle'); // Restaura o ícone inativo
    });

    // Adiciona a classe 'ativo' ao botão clicado e muda o ícone para preenchido
    botao.classList.add('ativo');
    const icon = botao.querySelector('i');
    icon.classList.remove('fa-circle'); // Remove o ícone inativo
    icon.classList.add('fa-dot-circle'); // Define o ícone como ativo

    // Muda a imagem do slider para a correspondente ao botão clicado
    slides.forEach((slide, slideIndex) => {
      if (slideIndex === index) {
        slide.style.display = 'block';
      } else {
        slide.style.display = 'none';
      }
    });

    // Ajusta o índice do slide para o botão clicado
    currentIndex = index;

    // Reinicia o intervalo do slideshow para o próximo slide
    clearInterval(slideInterval);
    startAutoSlide(); // Inicia novamente o slideshow automático
  });
});

// Set up para as setas de navegação
leftArrow.addEventListener("click", function() {
  currentIndex <= 0 ? currentIndex = imgs.length - 1 : currentIndex--;
  defClass(0, currentIndex); // Chama a função para atualizar o slide e o ícone

  // Reinicia o intervalo de slideshow
  clearInterval(slideInterval);
  startAutoSlide();
});

rightArrow.addEventListener("click", function() {
  currentIndex >= imgs.length - 1 ? currentIndex = 0 : currentIndex++;
  defClass(0, currentIndex); // Chama a função para atualizar o slide e o ícone

  // Reinicia o intervalo de slideshow
  clearInterval(slideInterval);
  startAutoSlide();
});


// Seleciona todos os itens da grade
const gridItems = document.querySelectorAll('.grid-item');

// Adiciona o evento de clique a cada item
gridItems.forEach(item => {
  item.addEventListener('click', () => {
    // Remove a classe "active" de outros itens
    gridItems.forEach(i => i.classList.remove('active'));

    // Adiciona a classe "active" ao item clicado
    item.classList.add('active');
  });
});