import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
function App() {
  const [xPerspective, setXperspective] = useState('0deg')

  const [timeoutId, setTimeoutId] = useState(null);
  const [yPerspective, setYperspective] = useState('0deg')
  let conf = {
    maxDeg: 4
  }
  return (
    <>
      <video src="../public/Sin título.mp4" className='backgroundVideo' onCanPlay={(e) => {
        e.currentTarget.play()
      }}
        onEnded={(e) => {
          e.currentTarget.currentTime = 0;
          e.currentTarget.play()
        }}
      ></video>

      <div className="banner">
        <div className='card' onMouseMove={cardMouseMove}
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
          <div className="content" style={{ '--xPerspective': xPerspective, '--yPerspective': yPerspective }}>
            <div className='leftSide'>
              <img src="../avatar.png" alt="" draggable='false' />
              <div className='info'>
                <h2>Pablo Martín</h2>
                <h3>Full Stack Developer</h3>
                <div className='flags'>
                  <img src="../public/spflag.webp" alt="" />
                  <img src="../public/ukflag.png" alt="" />
                </div>
                <div className="buttons">                  
                <button>My stack & projects</button>
                <button>More about me</button>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  )
  function cardMouseMove(e) {
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
    //console.log('grados: ', grados);
    setXperspective(grados + 'deg')
    /**
     * eje Y
     */
    percentage = (mouseY / rect.height) * 100
    //console.log('percentage: ', percentage);
    grados = -conf.maxDeg * (1 - (mouseY / heightHalf));
    setYperspective(grados + 'deg')
    setTimeout(() => {

      currentTarget.children[0].classList.remove('animation')
    }, 1);
  }
}

export default App
/*
1. Sin esto, en firefox ocurre el error del parpadeo. Además, en el resto de navegadores
también se soluciona este error, aunque no era tan común
*/