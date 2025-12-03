import { useEffect, useRef, useState } from 'react'
import Projects from './projects'
import './App.css'
import Card from 'reactic-cards'
const esp = {
  "name": "Pablo Martín",
  "job": "Desarrollador web",
  "showProjects": "Mostrar proyectos",

  "info": "Información",
  "birthdateLabel": "🎂 Fecha de nacimiento:",
  "birthdate": "04/03/2003",
  "fromLabel": "📍 De:",
  "from": "Málaga (Marbella y alrededores)",
  "languagesLabel": "🌐 Idiomas:",
  "languages": "Español e Inglés (nivel intermedio)",
  "hobbiesLabel": "🗿 Hobbies:",

  "technologies": "Tecnologías",
  "frontend": "Frontend:",
  "backend": "Backend:",
  "database": "Base de datos:",
  "cms": "CMS:",

  "aboutMe": "Sobre mí",
  "aboutParagraph1": "¡Hola a todos!. Mi nombre es Pablo, y soy desarrollador web. Desde pequeño siempre he tenido un teclado y un ratón en mis manos, por lo que nunca tuve dudas de que quería dedicarme al mundo de la informática que, como ya sabemos, es un mundo muy amplio y complejo.",
  "aboutParagraph2": "Siempre tuve curiosidad por la programación, así que por eso decidí estudiar el Ciclo Formativo de Grado Superior de Desarrollo Web, en el I.E.S. Trassierra (Córdoba). Aquí fue donde di mis primeros pasos como desarrollador, trabajando con lenguajes como PHP y Javascript. El ciclo me permitió tener mi primera toma de contacto con el mundo profesional del desarrollo web a través de la formación en centros de trabajo, en la empresa FourMarketing360.",
  "aboutParagraph3": "No solo desempeñé funciones de mantenimiento de código PHP y páginas web, sino que también aprendí a crear un e-commerce con Wordpress. Para ello utilicé plugins como Woocommerce y Elementor, entre otros. Aunque a día de hoy estoy aprendiendo otras tecnologías como React y Expressjs, no he perdido el contacto con Wordpress, ya que me gustó mucho la experiencia trabajando con esta plataforma.",
  "aboutParagraph4": "Estoy siempre abierto a nuevas oportunidades y desafíos. Si tienes un proyecto en mente o simplemente quieres conectar, no dudes en contactarme.",

  "swipe": "Click y desliza para girar la tarjeta",
  "back": "Volver",
  "projectsTitle": "Proyectos",

  "tizonaTitle": "TizonaHub",
  "tizonaDescription1": "TizonaHub es una plataforma de almacenamiento y transferencia de archivos autoalojada, similar a un “Google Drive privado”, desarrollada con React (frontend), Node.js (backend) y MySQL (base de datos). Incluye un sistema de plugins, gestión de usuarios, subida y descarga de archivos, vista previa, directorios públicos y clientes adicionales para escritorio y móvil. Diseñado para funcionar en redes locales o servidores privados, con enfoque en rendimiento, seguridad y extensibilidad.",
  "tizonaDescription2": "El stack utilizado es variado:",
  "tizonaInstallTutorial": "Tutorial de instalación",
  "tizonaOfficialPage": "Página oficial",

  "finalProjectTitle": "Proyecto de fin de grado",
  "finalProjectDescription1": "La aplicación web está hecha con HTML, CSS, JavaScript, MySQL y PHP, utilizando Laravel. La aplicación consiste en una página donde los desarrolladores independientes de videojuegos pueden subir sus creaciones, permitiendo a otros usuarios de la plataforma descargarlas, escribir comentarios y agregarlas a favoritos. Además, cuenta con un sistema de roles de usuario, por lo que hay usuarios sin privilegios y usuarios con privilegios. Estos últimos pueden realizar algunas acciones como eliminar, crear o cambiar roles de usuarios.",
  "finalProjectGithub": "Repositorio de Github"
}
const eng = {
  "name": "Pablo Martín",
  "job": "Web developer",
  "showProjects": "Show projects",

  "info": "Information",
  "birthdateLabel": "🎂 Date of birth:",
  "birthdate": "03/04/2003",
  "fromLabel": "📍 From:",
  "from": "Málaga (Marbella and surroundings)",
  "languagesLabel": "🌐 Languages:",
  "languages": "Spanish and English (intermediate level)",
  "hobbiesLabel": "🗿 Hobbies:",

  "technologies": "Technologies",
  "frontend": "Frontend:",
  "backend": "Backend:",
  "database": "Database:",
  "cms": "CMS:",

  "aboutMe": "About me",
  "aboutParagraph1": "Hello everyone! My name is Pablo, and I am a web developer. Since I was little, I've always had a keyboard and mouse in my hands, so I never doubted that I wanted to dedicate myself to the world of computing, which, as we know, is a very broad and complex field.",
  "aboutParagraph2": "I was always curious about programming, which is why I decided to study the Higher Vocational Training Cycle in Web Development at I.E.S. Trassierra (Córdoba). This was where I took my first steps as a developer, working with languages such as PHP and Javascript. The course gave me my first contact with the professional world of web development through workplace training at the company FourMarketing360.",
  "aboutParagraph3": "Not only did I carry out PHP code and website maintenance tasks, but I also learned how to create an e-commerce using Wordpress. For this I used plugins such as Woocommerce and Elementor, among others. Although I am currently learning other technologies such as React and Expressjs, I haven't lost contact with Wordpress, as I really enjoyed working with this platform.",
  "aboutParagraph4": "I am always open to new opportunities and challenges. If you have a project in mind or simply want to connect, feel free to contact me.",

  "swipe": "Click and swipe to flip the card",
  "back": "Back",
  "projectsTitle": "Projects",

  "tizonaTitle": "TizonaHub",
  "tizonaDescription1": "TizonaHub is a self-hosted file storage and transfer platform, similar to a 'private Google Drive', built with React (frontend), Node.js (backend), and MySQL (database). It includes a plugin system, user management, file uploading and downloading, preview, public directories, and additional desktop and mobile clients. Designed to run on local networks or private servers, with a focus on performance, security, and extensibility.",
  "tizonaDescription2": "The stack used is varied:",
  "tizonaInstallTutorial": "Installation tutorial",
  "tizonaOfficialPage": "Official website",

  "finalProjectTitle": "Final degree project",
  "finalProjectDescription1": "The web application is built with HTML, CSS, JavaScript, MySQL, and PHP using Laravel. The application allows independent video game developers to upload their creations, allowing other users to download them, write comments, and add them to favorites. It also includes a user role system, where there are non-privileged users and privileged users. The latter can perform actions such as deleting, creating, or changing user roles.",
  "finalProjectGithub": "GitHub repository"

}
function App() {
  const [texts, setTexts] = useState(eng)
  const [showProjects, setShowProjects] = useState(false)
  const bgVideo = useRef(null)
  useEffect(() => {
    bgVideo.current.play()
    const lang = navigator.language || navigator.userLanguage;
    if (lang.includes('es')) setTexts(esp)
    else setTexts(eng)

  }, [])

  return (<>
    <Card perspectiveLevel={2} flip={true}>
      <div className="front">
        <div className="leftside">
          <div className="profile">
            <img src="/foto_carnet.jpg" alt="" />
          </div>

          <h2>{texts.name}</h2>
          <h3>{texts.job}</h3>

          <div className="icons">
            <img src="/youtube.png" alt="" />
            <img src="/github.png" alt="" />
            <img src="/linkedin.webp" alt="" />
          </div>

          <button className="projects" onClick={() => { setShowProjects(true) }}>
            {texts.showProjects}
          </button>

          <div className="lang">
            <button onClick={() => { setTexts(esp) }}><img src="/spflag.webp" alt="" /></button>
            <button onClick={() => { setTexts(eng) }}><img src="/ukflag.png" alt="" /></button>
          </div>
        </div>

        <div className="rightside">
          <h2>{texts.info}</h2>
          <hr />

          <div className="info">
            <div>
              <h3>{texts.birthdateLabel}</h3>
              <span>{texts.birthdate}</span>
            </div>

            <div>
              <h3>{texts.fromLabel}</h3>
              <span>{texts.from}</span>
            </div>

            <div>
              <h3>{texts.languagesLabel}</h3>
              <span>{texts.languages}</span>
            </div>

            <div>
              <h3>{texts.hobbiesLabel}</h3>
              <span style={{ fontSize: "25px" }}>🎮 🎵 🧑‍💻</span>
            </div>
          </div>

          <h2>{texts.technologies}</h2>
          <hr />

          <div className="stack">
            <h3>{texts.frontend}</h3>
            <div>
              <img src="/html.png" alt="" />
              <img src="/css.svg" alt="" />
              <img src="/javascript.png" alt="" />
              <img src="/react.png" alt="" />
            </div>

            <h3>{texts.backend}</h3>
            <div>
              <img src="/php2.png" alt="" />
              <img src="/laravel.png" alt="" />
              <img src="/node2.png" alt="" />
              <img
                src="/express.png"
                style={{
                  background: "white",
                  padding: "5px",
                  boxSizing: "border-box",
                  borderRadius: "100%"
                }}
              />
            </div>

            <h3>{texts.database}</h3>
            <div>
              <img
                src="/mysql.png"
                alt=""
                style={{
                  background: "white",
                  padding: "5px",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <h3>{texts.cms}</h3>
            <div>
              <img src="/wordpress.png" alt="" />
              <img src="/elementor.png" alt="" />
              <img src="/woocommerce.png" alt="" />
              <img src="/gp.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="back">
        <h2>{texts.aboutMe}</h2>
        <hr />

        <p>{texts.aboutParagraph1}</p>
        <p>{texts.aboutParagraph2}</p>
        <p>{texts.aboutParagraph3}</p>
        <p>{texts.aboutParagraph4}</p>
      </div>
    </Card>

    <div className="swipe">
      <h2>{texts.swipe}</h2>
      <div className="gradient">
        <div className="ball" />
      </div>
    </div>
    {showProjects ?
      <Projects exitfn={setShowProjects} texts={texts}/> : null}
    <video
      src="/video.mp4"
      className="backgroundVideo"
      ref={bgVideo}
      autoPlay
      muted
      loop
      onEnded={(e) => {
        e.currentTarget.currentTime = 0
        e.currentTarget.play()
      }}
    />
  </>

  )
}

export default App
