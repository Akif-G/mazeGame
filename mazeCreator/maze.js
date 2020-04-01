$(document).ready(function(){

    var mode=0;
    var locked=true;
    $("#draw").click(function(){
        mode=0;
        $(".main").css("cursor","crosshair");
    })

    $("#delete").click(function(){
        mode=1;
        $(".main").css("cursor","grab");
    })

    $("#point").click(function(){
        mode=2;
        $(".main").css("cursor","crosshair");
    })

    $("#lock").click(function(){
        locked=true;
        $(".main").css("cursor","crosshair");
        $("header").fadeOut("1000")
        $("header").slideUp()

        $(".burger div").fadeIn("1000") 
           
    })


    let c=5;
    $(document).mousemove(function(e){
        let x = event.pageX;
        let y = event.pageY;
        let h=window.innerHeight;
        let w=window.innerWidth;
        let a=(w/2-x)/20;
        let b=(h/2-y)/20;
        $('.main').css(`box-shadow`,`rgb(48, 48, 48) ${a}px ${b}px ${c}px,rgb(248, 248, 248) 0px 0px 10px`);   
        console.log(mode)
        if (locked==false){
        if(y<h/8){
            $("header").fadeIn("1000")
            $("header").slideDown()
        }
        else{ 
            $("header").fadeOut("1000")
            $("header").slideUp()
        }
    }
        else {
            if(y<h/8)  $(".burger").animate({top: '90%'});
            else    $(".burger").animate({top: '90%'});
        
    
    }
    
    })
    i=0;

    while(i<10000) {$('.main').append(`<div id=${i} class="child"></div>`);i=i+1;}

        $('.main').mouseover(function (e) {
            if (mode == 0) {
                let id = e.target.id;
                $(`#${id}`).css(`background-color`, `#1B1E27`);
                c = c + 0.03;
            }
            else if (mode == 1) {
                let id = e.target.id;
                console.log("m")
                $(`#${id}`).css(`background-color`, `rgba(235,235,235,0.8)`);
                c = c - 0.03;
            }
        })
        

    })