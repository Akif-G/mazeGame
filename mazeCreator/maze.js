$(document).ready(function(){

    let c=0;
    $(document).mousemove(function(e){
        let x = event.pageX;
        let y = event.pageY;
        let h=window.innerHeight;
        let w=window.innerWidth;
        let a=(w/2-x)/20;
        let b=(h/2-y)/20;
        $('.main').css(`box-shadow`,`#D9D9D9 ${a}px ${b}px ${c}px`);   
    })
    i=0;

    while(i<10000) {$('.main').append(`<div id=${i} class="child"></div>`);i=i+1;}
    $('.main').mouseover(function(e){
        let id=e.target.id;
        $(`#${id}`).css(`background-color`,`#1B1E27`);  
        c++ ;
    })

    
    })