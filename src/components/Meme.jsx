import html2canvas from 'html2canvas';
import React from "react";

function Meme () {

  const imgFromUser = document.getElementById('image-file')
  const memeToDownload = document.querySelector('.meme')
  // const widthRef = React.useRef()
  // const [memeWidth, setMemeWidth] = React.useState()
  // React.useEffect(() => {
  //   //const memeImg = document.querySelector('.meme-img')
  //   setMemeWidth(widthRef.current.clientWidth)
  //   console.log(memeWidth)
  //   // function handleResize() {
  //   //   const width = widthRef.current.clientWidth;
  //   //   setMemeWidth(width)
  //   // }
  //   //handleResize(); // initial call to get width and height of the element
  //   //console.log(memeImg)
  //   //memeImg.onload = function(){handleResize};
  //   // return () => window.removeEventListener("resize", handleResize);
  //   }, );

  const [allMemes, setAllMemes] = React.useState([])
  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then(res => res.json())
      .then(data => setAllMemes(data.data.memes))
  }, [])

  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText:"",
    randomImg:"https://i.imgflip.com/30b1gx.jpg"
  })

  function handleChange(event) {
    setMeme(prevMeme => ({
      ...prevMeme,
      [event.target.name]: event.target.value
    }))
  }

  function getMemeImg() {
    const randomNumber = Math.floor(Math.random()* allMemes.length)
    const url = allMemes[randomNumber].url
    setMeme(prevMeme => {
      return {
        ...prevMeme,
        randomImg: url
      }
    })
    if(imgFromUser.files.length != 0){
      imgFromUser.value = ""
    }
  }
  function loadImage(event){
    if (event.target.files && event.target.files[0]){
      setMeme(prevMeme => {
        return {
          ...prevMeme,
          randomImg: URL.createObjectURL(event.target.files[0])
        }
      })
    }
  }

  function exportAsImage (element) {
    html2canvas(element, {useCORS: true}).then(function (canvas) {
        var a = document.createElement('a');
        a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        a.download = 'somefilename.jpg';
        a.click();
      }
    )
  }
  return (
    <div className="meme-container">
      <div action="" className="form">
        <input type="text"
          name="topText"
          onChange={handleChange}
          placeholder="Top text"
          className="form-input"
          value={meme.topText}
        />
        <input type="text"
          name="bottomText"
          onChange={handleChange}
          placeholder="Bottom text"
          className="form-input"
          value={meme.bottomText}
          />
        <button className="form-btn" onClick={getMemeImg}>Get a new meme image  🖼</button>
      </div>
      <div className="image-downloader">
          <input type="file"
            id="image-file"
            name="meme"
            accept=".png, .jpg, .jpeg"
            className="image-file"
            onChange={loadImage}
          />
          <label htmlFor="image-file" className="image-file-label">Upload your own picture</label>
        </div>
      <div className="meme">
        <img src={meme.randomImg} alt="" className="meme-img"/>
        <h2 className="meme-text top">{meme.topText}</h2>
        <h2 className="meme-text bottom">{meme.bottomText}</h2>
      </div>
      <div className="image-file-label" onClick={() => exportAsImage(memeToDownload)} href="#">Download meme </div>
    </div>
  )
}

export default Meme