import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import lang from '../json/lang.json'
let animationPerforming = false
let swipes = [0, 1] //Start of swipe, end of swipe
let hideAdvice=false
function App() {
  /**
   * vars and states
   */
  const [xPerspective, setXperspective] = useState('0deg')
  const bgVideo = useRef(null);
  const card = useRef(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [yPerspective, setYperspective] = useState('0deg')
  const [currentLang, setLang] = useState(0)
  let langInfo;
  currentLang == 0 ? langInfo = lang.es : langInfo = lang.en
  let [currentFace, setCurrentFace] = useState(0)
  let conf = {
    maxDeg: 5
  }
  useEffect(() => {
    const videoElement = bgVideo.current;
    if (videoElement) {
      videoElement.muted = true;
      videoElement.play()
    }
  }, [])
  /**
   * 
   */
  return (
    <>
      <video src="/Sin título.mp4" className='backgroundVideo' ref={bgVideo}
        onEnded={(e) => {
          e.currentTarget.currentTime = 0;
          e.currentTarget.play()
        }}
      ></video>
      <div className="banner">
        <div ref={card} className='card'
          onMouseDown={(e) => {
            swipes[0] = e.clientX
          }}
          onMouseUp={(e) => {
            swipes[1] = e.clientX
            swipes.sort((a, b) => b - a);
            let substraction = swipes[0] - swipes[1]
            if (substraction > 100) flipCard(0.5)
          }}
          onMouseMove={cardMouseMove}
          onMouseLeave={(e) => {
            let currentTarget = e.currentTarget
            setTimeout(() => {
              currentTarget.children[0].classList.add('animation')
              setTimeoutId(setTimeout(() => {
                setXperspective(0)
                setYperspective(0)
                setTimeout(() => { //*1
                  currentTarget.children[0].classList.remove('animation')
                }, 50);
              }, 1000));
            }, 2);
          }}>
          <div className={`content ${currentFace == 0 ? "frontFace" : "backFace"}`} style={{ '--xPerspective': xPerspective, '--yPerspective': yPerspective }}>
            {currentFace == 0 ?
              <>
                <section className='leftSide'>
                  <div className='profileDiv'>
                    <img src="/foto_carnet.jpg" alt="" draggable='false' />
                  </div>
                  <div className='info'>
                    <h2>Pablo Martín</h2>
                    <h3>{langInfo[0]}</h3>
                    <section className='socialMedia'>
                      <a href=""><img src="/youtube.png" alt="" /></a>
                      <a href="https://github.com/pmarmor" target='blank'><img src="/github.png" alt="" /></a>
                      <a href="https://www.linkedin.com/in/pablo-mart%C3%ADn-morente-96935b2a9/" target='blank'><img src="/linkedin.webp" alt="" /></a>
                    </section>
                    <div className="buttons">
                      <button
                        onClick={() => { flipCard(0.5) }}>{langInfo[1]}</button>
                    </div>

                    <section className='flags'>
                      <img src="/spflag.webp" alt="" onClick={() => { setLang(0) }} />
                      <img src="/ukflag.png" alt="" onClick={() => { setLang(1) }} />
                    </section>
                  </div>
                </section>
                
                <section className='rightSide'>
                  <h2>Información</h2>
                  <hr />
                  <div className="info">
                  <div><h3><span>🎂</span>    Fecha de nacimiento</h3>04/03/2003 (21 años)</div>
                  <div><h3><span>📍</span> De</h3>Estepona (Málaga)</div>
                  <div><h3><span>🌐</span> Idiomas</h3>Español e Inglés (Intermedio - Avanzado)</div>
                  <div><h3><span>🧑🏻</span> Hobbies</h3><span>🎶 🎮 🚲</span></div>
                  </div>
                  <div className="stack"></div>
                </section>
              </>
              :
              <section className='aboutMe'>
                <h2>Sobre mí</h2>
                <hr />
                <p>¡Hola a todos!. Mi nombre es Pablo, y soy desarrollador web. Desde pequeño siempre he tenido un teclado
                  y un ratón en mis manos, por lo que nunca tuve dudas de que quería dedicarme al mundo de la informática
                  que, como ya sabemos, es un mundo muy amplio y complejo.
                </p>
                <p>
                  Siempre tuve curiosidad por la programación, así que
                  por eso decidí estudiar el <b>Ciclo Formativo de Grado Superior de Desarrollo Web</b>, en el <b>I.E.S. Trassierra
                    (Córdoba)</b>. Aquí fue donde di mis primeros pasos como desarrollador, trabajando con lenguajes como <b>PHP y
                      Javascript</b>. El ciclo me permitió tener mi primera toma de contacto con el mundo profesional del desarrollo web a
                  través de la <b>formación en centros de trabajo</b>, en la empresa FourMarketing360.
                </p>
                <p>
                  No solo desempeñé funciones de mantenimiento de código PHP y páginas web, sino que también aprendí a
                  crear un e-commerce con <b>Wordpress</b>. Para ello utilicé plugins como <b>Woocommerce y Elementor</b>, entre otros. Aunque a
                  día de hoy estoy aprendiendo otras tecnologías como <b>React y Expressjs</b>, no he perdido el contacto con Wordpress, ya que
                  me gustó mucho la experiencia trabajando con esta plataforma.
                </p>
                <p>
                  Estoy siempre abierto a nuevas oportunidades y desafíos. Si tienes un proyecto en mente o simplemente quieres conectar, no dudes
                  en contactarme.
                </p>
              </section>}
          </div>
        </div>
        {!hideAdvice ? <div className="swipeAdvice">
          <h2>Swipe to flip card</h2>
          <div>
            
          <div className='circle'></div>
          <div className='background'></div>
          </div>
        </div> : null}
      </div >
    </>
  )
  /**
   * 
   * @param {*} seconds 
   * @param {*} direction true = flip from left to right, false = flip from left to right
   */
  function flipCard(seconds) {
    if(!hideAdvice) document.querySelector('.swipeAdvice').style.opacity='0'
    const cardElem = card.current;
    if (!animationPerforming) {
      animationPerforming = true
      let currentTarget = cardElem
      currentTarget.style.animation = `flipLeftSide ${seconds}s forwards linear`;
      setTimeout(() => {
        hideAdvice=true
        setXperspective(0)
        setYperspective(0)
        currentFace == 0 ? setCurrentFace(1) : setCurrentFace(0)
        setTimeout(()=>{
        currentTarget.style.animation = `flipRightSide ${seconds}s forwards linear`;
        },40)
        setTimeout(() => {
          animationPerforming = false
        }, seconds* 1000 +40);
      }, seconds * 1000);
    }
  }
  function cardMouseMove(e) {
    if (!animationPerforming) {
      setXperspective(0)
      let currentTarget = e.currentTarget
      const rect = e.currentTarget.getBoundingClientRect();
      clearTimeout(timeoutId);
      // console.log('rect: ', rect);
      let widhtHalf = rect.width / 2
      let heightHalf = rect.height / 2
      let mouseX = e.clientX - rect.left;
      let mouseY = e.clientY - rect.top;
      /**
       * calcula porcentaje
       */
      let percentage = 0;
      let grados = 0;
      //percentage=(conf.maxDeg*mouseX)/widhtHalf
      /**
       * eje X
       */
      percentage = (mouseX / rect.width) * 100
      //console.log('percentage: ', percentage);
      grados = conf.maxDeg * (1 - (mouseX / widhtHalf));
      setXperspective(grados + 'deg')
      /**
       * eje Y
       */
      grados = -conf.maxDeg * (1 - (mouseY / heightHalf));
      setYperspective(grados + 'deg')
      setTimeout(() => {

        currentTarget.children[0].classList.remove('animation')
      }, 1);
    }
  }
}

export default App
/*
1. Sin esto, en firefox ocurre el error del parpadeo. Además, en el resto de navegadores
también se soluciona este error, aunque no era tan común
*/