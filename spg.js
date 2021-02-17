// ==UserScript==
// @name         SPG (Secure Password Generator)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Generates random secure password near and password input
// @author       GSRHackZ
// @match        *://*/*
// @grant        none
// @icon         https://image.flaticon.com/icons/svg/159/159478.svg
// @license                  MIT
// @compatible               chrome
// @compatible               firefox
// @compatible               opera
// @compatible               safari
// ==/UserScript==

const symbols="!#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
const letters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const numbers="1234567890";

const parts=[
    symbols,
    letters,
    numbers
];

let len=12,pass,set=false;

// Method one

function randC(x,len){
    let val="";
    for(let i=0;i<len;i++){
        let rand=Math.floor(Math.random() * x.length);
        val+=x[rand];
        if(len- 1 === i){
            return val;
        }
    }
}


function randP(){
    let result="";
    for(let i=0;i<len;i++){
        let rand=Math.floor(Math.random() * parts.length);
        let randPart=parts[rand];
        result+=randC(randPart,1)
        if(len-1 === i){
            return result;
        }
    }
}

setInterval(function(){
    if(!set){
        let pass_field=document.getElementsByTagName("input");
        for(let i=0;i<pass_field.length;i++){
            if(pass_field[i].getAttribute("type")=="password"){
                let display=document.createElement("div");
                pass_field[i].parentNode.insertBefore(display,pass_field[i]);
                let pwdS="*";
                let hidden=pwdS.repeat(len);
                display.innerText=hidden;
                let suggPass=randP();
                let max="150px";
                display.style=`display:block;width:fit-content;height:fit-content;background:white;color:black;float:left;padding:10px;margin:5px;border:1px solid lightgrey;border-radius:10px;cursor:text;text-align:center;max-width:${max};transition:.6s;position:relative;z-index:10;`;
                display.addEventListener("contextmenu",function(evt){
                    evt.preventDefault();
                    this.remove();
                })
                display.addEventListener('mouseover',function(){
                    this.innerText=suggPass;
                })
                display.addEventListener('mouseout',function(){
                    this.innerText=hidden;
                })
                set=true;
            }
        }
    }
},100)




