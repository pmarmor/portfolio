/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
function Project(props){
let elem=props.elem
console.log('elem: ', elem);
let lang=props.langInfo.langInfo
let origin=window.location
return(
    <article>
        {elem.developing ? <span className="developing">{lang.projects.developing}</span>:null}
        <img src={origin+elem.img} alt="" className="thumbnail" />
        <h2>{elem.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: elem.description}}></p>
        <div className="buttons">
        <a href={elem.link}>{lang[12]}</a>
        </div>
        <div className="stack">
            {Object.values(elem.stack).map((stack)=>{
                let bg=null
                let borderRadius='3px'
                let padding='0px'
                if(stack=='/mysql.png' || stack=='/express.png')bg='white'
                else if(stack=='/mongodb.png') bg='#222222'
                if(stack=='/express.png') borderRadius='50%'
                if(bg) padding='5px'
                return <img src={origin+stack} style={{background:bg,padding:padding,borderRadius:borderRadius}}/>
            })}
        </div>
    </article>
)
}
export default Project