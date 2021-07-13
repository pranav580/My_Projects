const canvas = document.querySelector('#mycanvas');
const ctx = canvas.getContext("2d");
const eraser = document.querySelector('.eraser');
const pen = document.querySelector('.pen');
const penSize = document.querySelectorAll('.penSize');
const clrsrc= document.querySelector('.clearScreen');
const shapes = document.querySelector('.shapes');
const ShapeSize = document.querySelectorAll('.ShapeSize');
const colorChange=document.getElementById('favcolor');
const Undo = document.querySelector('.Undo')
const savebtn=document.querySelector('.savebtn');
const loadbtn=document.querySelector('.loadbtn');

// EVENTLISTNER

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);


// VARIABLES

var linesArray=[];
var Restore_array=[];
var index = -1;
var eraserOn = false;
var PenSize = 3;
var Shape;

window.addEventListener("load", () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    
})


// COLOR CHANGER

setInterval(colorChanged(),10);
function colorChanged(){
    var color=colorChange.value;
    return color;
}

var onbtnPress = false;




// ERASER

eraser.addEventListener("click", () => {
    if (eraserOn) {
        eraserOn = false;
        console.log(eraserOn);
    }
    else {
        eraserOn = true;
        console.log(eraserOn);
    }
});

// PEN SIZING

for(let i=0;i<penSize.length;i++){
    pen.addEventListener('click',()=>{
        eraserOn=false;
        if( penSize[i].classList.contains('flex')){
            penSize[i].classList.remove('flex');
        }else{
            penSize[i].classList.add('flex')
        }
        
    })
    penSize[i].addEventListener('click',()=>{
        PenSize = penSize[i].innerHTML;
        console.log(penSize[i].innerHTML)
    })
}

for(let i=0;i<ShapeSize.length;i++){
    shapes.addEventListener('click',()=>{
        if(ShapeSize[i].classList.contains('flex')){
            ShapeSize[i].classList.remove('flex');
        }else{
            ShapeSize[i].classList.add('flex')
        }
        
    })
    ShapeSize[i].addEventListener('click', ()=>{
        Shape = ShapeSize[i].innerHTML;
    })
}


// UNDO

Undo.addEventListener('click', ()=>{
    Restore_array.pop();
    index -=1;
    if(index <0 ){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }else{
        ctx.putImageData(Restore_array[index], 0, 0)

    }
})



// DRAWING AND COLOR CHANGING
function draw(event){
    if(!onbtnPress) return;
    ctx.lineWidth = PenSize;
    ctx.lineCap = "round";
    if(eraserOn){
        ctx.lineWidth = PenSize;
        ctx.strokeStyle = "#ffffff";
    }else{
        var cc=colorChanged();
        ctx.strokeStyle = cc;
    }
    
    ctx.lineTo(event.clientX,event.clientY);
    var stro = ctx.stroke();
    
    newArr=stro;
    
    
    ctx.beginPath();
    ctx.moveTo(event.clientX,event.clientY);
    
}

function startPosition(event){
    onbtnPress = true;
   
}

function endPosition(){
    onbtnPress = false;
    Restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    index +=1;
    console.log(Restore_array)
    ctx.beginPath();
}


clrsrc.addEventListener("click",()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

// SAVE AND LOAD DATA

savebtn.addEventListener("click",save)
    function save()
    {
      localStorage.setItem(canvas, canvas.toDataURL());
    }



loadbtn.addEventListener("click",load)
    function load()
    {
       var dataURL = localStorage.getItem(canvas);
       var img = new Image;
       console.log(img);
       img.src = dataURL;
       img.onload = function () 
       {
       ctx.drawImage(img, 0, 0);
        }
    }



