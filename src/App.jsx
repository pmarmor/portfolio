import { useState, useRef, useEffect } from 'react'
import Project from './components/Project'
import lang from '../json/lang.json'
let animationPerforming = false
let swipes = [0, 1] //Start of swipe, end of swipe
let hideAdvice = false
function App() {
  /**
   * vars and states
   */
  const [xPerspective, setXperspective] = useState('0deg')
  const bgVideo = useRef(null);
  const card = useRef(null);
  const projects = useRef(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [yPerspective, setYperspective] = useState('0deg')
  const [currentLang, setLang] = useState(0)
  const [showProjects, setShowProjects] = useState(false)
  let langInfo;
  currentLang == 0 ? langInfo = lang.es : langInfo = lang.en
  let projectsToDisplay = {
    0: {
      title:langInfo.projects.titles.cfgs,
      img: '/laravelproject.webp',
      stack: ['/php2.png', '/laravel.png', '/javascript.png', '/css.svg', '/mysql.png'],
      description: langInfo.projects.cfgs,
      developing:false
    },
    1: {
      title:langInfo.projects.titles.tpv,
      img: '/tpv.png',
      stack: ['/javascript.png', '/css.svg', '/react.png','/express.png','/node.png','/mongodb.png'],
      description: langInfo.projects.tpv,
      developing:true
    },
    2: {
      title:langInfo.projects.titles.cards,
      img: '/memorygame.png',
      stack: ['/javascript.png', '/css.svg', '/html.png'],
      description: langInfo.projects.cards,
      developing:false
    }
  }
  let [currentFace, setCurrentFace] = useState(0)
  let conf = {
    maxDeg: 5
  }
  useEffect(() => { 
    const videoElement = bgVideo.current;
    if (videoElement) {
      if (!showProjects) {
      videoElement.muted = true;
      videoElement.play()
      }
      else videoElement.pause()
    }
  }, [showProjects])
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
      <div className="banner"
        onMouseUp={(e) => {
          swipes[1] = e.clientX
          swipes.sort((a, b) => b - a);
          let substraction = swipes[0] - swipes[1]
          if (substraction > 150 && swipes[1] > 5) flipCard(0.5)
          swipes[0] = 0
          swipes[1] = 0
        }}>
        <div ref={card} className='card'
          onMouseDown={(e) => {
            swipes[0] = e.clientX
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
                        onClick={() => {
                          setShowProjects(true)
                          let projectsRef = projects.current
                          projectsRef.style.top = '0';
                        }}>{langInfo[1]}</button>
                    </div>

                    <section className='flags'>
                      <img src="/spflag.webp" alt="" onClick={() => { setLang(0) }} />
                      <img src="/ukflag.png" alt="" onClick={() => { setLang(1) }} />
                    </section>
                  </div>
                </section>

                <section className='rightSide'>
                  <h2>{langInfo[2]}</h2>
                  <hr />
                  <div className="info">
                    <div><h3><span>🎂</span> {langInfo[3]}</h3>04/03/2003 ({langInfo[4]})</div>
                    <div><h3><span>📍</span> {langInfo[5]}</h3>{langInfo[8]}</div>
                    <div><h3><span>🌐</span> {langInfo[6]}</h3>{langInfo[7]}</div>
                    <div><h3><span>🗿</span> Hobbies</h3><span>🎶 🕹️ 🚲</span></div>
                  </div>
                  <h2>{langInfo[9]}</h2>
                  <hr />
                  <div className="stack">
                    <div><h3>Frontend: </h3>
                      <div className="images">
                        <img draggable='false' src="/html.png" alt="" />
                        <img draggable='false' src="/css.svg" alt="" />
                        <img draggable='false' src="/javascript.png" alt="" />
                        <img draggable='false' src="/react.png" alt="" />
                      </div>
                    </div>
                    <div><h3>Backend: </h3>
                      <div className="images">
                        <img draggable='false' src="/php2.png" alt="" />
                        <img draggable='false' src="/laravel.png" alt="" />
                        <img draggable='false' src="/node2.png" alt="" />
                        <img draggable='false' src="/express.png" alt="" style={{ background: 'white', borderRadius: '100%', padding: '5px', boxSizing: 'border-box' }} />
                      </div>
                    </div>
                    <div><h3>{langInfo[10]}: </h3>
                      <div className="images">
                        <img draggable='false' src="/mysql.png" alt="" style={{ background: 'white', boxSizing: 'border-box', padding: '5px' }} />
                        <img draggable='false' src="/mongodb.png" alt="" style={{ background: '#222222', boxSizing: 'border-box', padding: '2px' }} />
                      </div>
                    </div>
                    <div><h3>CMS: </h3>
                      <div className="images">
                        <img draggable='false' src="/wordpress.png" alt="" />
                        <img draggable='false' src="/elementor.png" alt="" />
                        <img draggable='false' src="/woocommerce.png" alt="" style={{ height: '35px' }} />
                        <img draggable='false' src="/gp.png" alt="" style={{ background: '#222222' }} />
                      </div>
                    </div>
                  </div>
                </section>
              </>
              :
              <section className='aboutMe' dangerouslySetInnerHTML={{ __html: langInfo.aboutMe}}>
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
      <main className="projects" ref={projects}>
        <section className='flags'>
          <img src="/spflag.webp" alt="" onClick={() => { setLang(0) }} />
          <img src="/ukflag.png" alt="" onClick={() => { setLang(1) }} />
        </section>
        <img src="/arrowdown.svg" alt="" className='arrowdown' onClick={() => {
          setShowProjects(false)
          let projectsRef = projects.current
          projectsRef.style.top = '100%';
        }} />
        <h2 style={{ fontSize: '50px' }}>{langInfo.projects.title}</h2>
        <hr />
        <section className="displayProjects">
          {Object.values(projectsToDisplay).map((elem, index) => <Project elem={elem} langInfo={{langInfo}} key={index}></Project>)}
        </section>
      </main>
    </>
  )
  /**
   * 
   * @param {*} seconds 
   * @param {*} direction true = flip from left to right, false = flip from left to right
   */
  function flipCard(seconds) {
    let extraTime = 150 //ms
    if (!hideAdvice) document.querySelector('.swipeAdvice').style.opacity = '0'
    const cardElem = card.current;
    if (!animationPerforming) {
      animationPerforming = true
      let currentTarget = cardElem
      currentTarget.style.animation = `flipLeftSide ${seconds}s forwards linear`;
      setTimeout(() => {
        hideAdvice = true
        setXperspective(0)
        setYperspective(0)
        currentFace == 0 ? setCurrentFace(1) : setCurrentFace(0)
        setTimeout(() => {
          currentTarget.style.animation = `flipRightSide ${seconds}s forwards linear`;
        }, extraTime)
        setTimeout(() => {
          animationPerforming = false
        }, seconds * 1000 + extraTime);
      }, seconds * 1000);
    }
  }
  function cardMouseMove(e) {
    if (!animationPerforming) {
      setXperspective(0)
      let currentTarget = e.currentTarget
      const rect = e.currentTarget.getBoundingClientRect();
      clearTimeout(timeoutId);
      let widhtHalf = rect.width / 2
      let heightHalf = rect.height / 2
      let mouseX = e.clientX - rect.left;
      let mouseY = e.clientY - rect.top;
      let grados = 0;
      /**
       * eje X
       */
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