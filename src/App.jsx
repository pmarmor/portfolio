import { useState, useRef,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
let animationPerforming=false
function App() {
  const [xPerspective, setXperspective] = useState('0deg')
  const bgVideo = useRef(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [yPerspective, setYperspective] = useState('0deg')
  let [currentFace,setCurrentFace]=useState(0)
  let conf = {
    maxDeg: 4
  }
  useEffect(()=>{
    const videoElement = bgVideo.current;
    if (videoElement) {
      videoElement.muted = true;
      videoElement.play()
        .catch(error => {
          console.error('Error attempting to play video:', error);
        });
    }
  },[])
  let FrontFace=()=>(
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
</div>)
let BackFace=()=>(
  <div className='leftSide'>
  <img src="/avatar.png" alt="" draggable='false' />
  <div className='info'>
    <h2>Pablo Martín</h2>
    <h3>Full Stack Developer</h3>
  </div>
</div>
)
  return (
    <>
      <video src="/public/Sin título.mp4" className='backgroundVideo' ref={bgVideo}
        onEnded={(e) => {
          e.currentTarget.currentTime = 0;
          e.currentTarget.play()
        }}
      ></video>
      <div className="banner">
        <div className='card' onMouseMove={cardMouseMove}
          onMouseLeave={(e) => {
            let currentTarget = e.currentTarget
            console.log('currentTarget: ', currentTarget);
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
          }}
          onClick={(e)=>{
            if(!animationPerforming){
              animationPerforming=true
              let currentTarget=e.currentTarget
            e.currentTarget.style.animation='flipLeftSide 0.5s forwards linear'
            setTimeout(() => {
              currentFace==0 ?setCurrentFace(1):setCurrentFace(0)  
           currentTarget.style.animation='flipRightSide 0.5s forwards linear'
           setTimeout(() => {
            animationPerforming=false
           }, 500);
            }, 500);
            }
          }}
          >
          <div className={`content ${currentFace == 0 ? "frontFace" : "backFace"}`} style={{ '--xPerspective': xPerspective, '--yPerspective': yPerspective }}>
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