import React from "react";
import logo from "../images/Troll_Face.svg"

function Header () {
  return (
    <header className="header-meme">
      <div className="logo">
        <img src={logo} alt="logo" className="logo-img" />
        <h3 className="logo-title">Meme Generator</h3>
      </div>
      <p className="header-title">React Course - Project 3</p>
    </header>
  )
}

export default Header