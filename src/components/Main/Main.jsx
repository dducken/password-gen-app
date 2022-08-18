import React, { useState } from 'react'
import Swal from 'sweetalert2';
import './main.css'

const Main = () => {

  const [passwordLen, setPasswordLen] = useState(10);
  const [upper, setUpper] = useState(false);
  const [lower, setLower] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [password, setPassword] = useState("Password");

  const upperLetters = "ABCDEFGHIJKLMNOPQSRTUVWXYZ";
  const lowerLetters = "abcdefghijklmnopqsrtuvwxyz";
  const numbers = "0123456789";
  const symbols = "~!@#$%^&*()_+=|";
  const [copyBtn, setCopyBtn] = useState("Copy");

 // Get functions
 const getLowercase = () => {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
 }
 const getUppercase = () => {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
 }
 const getNumber = () => {
    return numbers[Math.floor(Math.random() * numbers.length)];
 }
 const getSymbol = () => {
    return symbols[Math.floor(Math.random() * symbols.length)];
 }
 // Generate Password
 const generatePassword = () => {

    const len = passwordLen;

    let password = "";

    for (let i = 0; i < len; i++) {
        const x = generateX();
        password += x;
        
    }

    if(password !== ""){
        setPassword(password);
    }

 }
// Generate Random text
 const generateX = () => {
    const xs = [];

    if(upper) {
        xs.push(getUppercase());
    }
    if(lower) {
        xs.push(getLowercase());
    }
    if(number) {
        xs.push(getNumber());
    }
    if(symbol) {
        xs.push(getSymbol());
    }

    if(xs.length === 0){
        Swal.fire({
            icon: 'info',
            title: 'You must select one option',
            showConfirmButton: false,
            timer: 1500
          });
        return "";
    }else{
        return xs[Math.floor(Math.random() * xs.length)];
    }
 }

// Handle sections
const handleGenerate = () => {
    generatePassword();
 
}
const handleCopy = () => {
    const textarea = document.createElement("textarea");
    const Password = password;

    if(!Password){
        return;
    }
    setCopyBtn("Copied! 👍");
    setTimeout(() => {
        setCopyBtn("Copy");
    }, 1300);

    textarea.value = Password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
}
const handleChange = (e) => {
    const number = e.target.value;
    setPasswordLen(number);
}
const handleUpperCase = () => {
    if(upper){
        setUpper(false);
    }else{
        setUpper(true);
    }
}
const handleLowerCase = () => {
    if(lower){
        setLower(false);
    }else{
        setLower(true);
    }
}
const handleNumber = () => {
    if(number){
        setNumber(false);
    }else{
        setNumber(true);
    }
}
const handleSymbol = () => {
    if(symbol){
        setSymbol(false);
    }else{
        setSymbol(true);
    }
}

// Hora actual
const [actualTime, setActualTime] = useState([]);


setInterval(function () {
    
  setActualTime(new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"));

}, 1000);

  return (
    
    <div> 
    <div className="cover-img"></div>
    <nav>
        <ul className='nav-list'>
            <li className='language-btn'>{actualTime.slice(0,5)}</li>
            <li>made by <a href="https://github.com/dducken" target="_blank" rel='noreferrer' className='link'>Ducken</a></li>
        </ul>
    </nav>
    <div className="pw-container">
  
        <div className="pw-header">
            <div className="pw">
                <span id="pw">{password}</span>
                <button id="copy" onClick={handleCopy}>{copyBtn}</button>
            </div>
        </div>
        <div className="pw-body">
            <div className="form-control">
                <label htmlFor="length">Password length</label>
                <input type="number" id="len" defaultValue={passwordLen} min='6' max='20' onChange={(e) => handleChange(e)}/>
            </div>
            <div className="form-control">
                <label htmlFor="upper">Add Uppercase Letters</label>
                <input type="checkbox" id='upper' onChange={handleUpperCase}/>
            </div>
            <div className="form-control">
                <label htmlFor="upper">Add Lowercase Letters</label>
                <input type="checkbox" id='lower' onChange={handleLowerCase}/>
            </div>
            <div className="form-control">
                <label htmlFor="upper">Add Numbers</label>
                <input type="checkbox" id='number' onChange={handleNumber}/>
            </div>
            <div className="form-control">
                <label htmlFor="upper">Add Symbols</label>
                <input type="checkbox" id='symbol' onChange={handleSymbol}/>
            </div>
            <button className="generate" id="generate" onClick={handleGenerate}>Generate Password</button>
        </div>
    </div>
    </div>
  )
}

export default Main