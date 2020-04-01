$(document).ready(function () {
    class maze{
        constructor(){
            this.sizeX=100;
            this.sizeY=100;
            this.startingX=0;
            this.startingY=0;
            this.ints=[];
        }
    }


    var mode = 0;
    var locked = false;
    var pointed;
    var myMaze=new maze();
    $("#draw").click(function () {
        mode = 0;
        $(".child").css("cursor", "crosshair");
    })

    $("#delete").click(function () {
        mode = 1;
        $(".child").css("cursor", "grab");
    })

    $("#point").click(function () {
        mode = 2;
        $(".child").css("cursor", "crosshair");
    })

    $("#finish").click(function () {
        mode = 3;
        $(".child").css("cursor", "crosshair");
        id=0;
        myMaze.startingX= Math.floor(pointed/100) ;
        myMaze.startingY= pointed%100 ;

        while(id<10000){
            if($(`#${id}`).css( "background-color" ) == "rgba(235, 235, 235, 0.8)") myMaze.ints.push(0);
            else myMaze.ints.push(1);
        id++;
        }
        var jsonContent =JSON.stringify(myMaze)
        console.log(jsonContent)
        var fs=require("fs");
        fs.writeFile("./sample.txt", jsonContent, (err) => {
            if (err) {
                console.error(err);
                return;
            };
        });

    })

    $("#lock").click(function () {
        locked = true;
        $("header").fadeOut("1000")
        $("header").slideUp()

        $(".burger div").fadeIn("1000")

    })


    let c = 5;
    $(document).mousemove(function (e) {
        let x = event.pageX;
        let y = event.pageY;
        let h = window.innerHeight;
        let w = window.innerWidth;
        let a = (w / 2 - x) / 20;
        let b = (h / 2 - y) / 20;
        $('.main').css(`box-shadow`, `rgb(48, 48, 48) ${a}px ${b}px ${c}px,rgb(248, 248, 248) 0px 0px 10px`);
        console.log(mode)
        if (locked == false) {
            if (y < h / 8) {
                $("header").fadeIn("1000")
                $("header").slideDown()
            }
            else {
                $("header").fadeOut("1000")
                $("header").slideUp()
            }
        }
        else {
            if (y < h / 8) $(".burger").animate({ top: '90%' });
            else $(".burger").animate({ top: '5%' });
        }

    })

    i = 0;
    while (i < 10000) { $('.main').append(`<button id=${i} class="child"></button>`); i = i + 1; }

    $('.child').mouseenter(function (e) {
        let id = e.target.id;
        if (mode == 0) {
            $(`#${id}`).css(`background-color`, `#1B1E27`);
            c = c + 0.03;
        }
        else if (mode == 1) {
            $(`#${id}`).css(`background-color`, `rgba(235,235,235,0.8)`);
            c = c - 0.03;
        }
    })

    $(".burger").hover(function () {
        $(".burger div").css(
            "box-shadow", "0px 0px 5px rgb(248, 248, 248)"
        );
    }, function () {
        $(".burger div").css(
            "box-shadow", "0px 0px 5px rgb(130, 12, 13)"
        );
    });

    $(".burger").click(function (e) {
        locked = false;
        $("header").fadeIn("1000")
        $("header").slideDown()
        $(".burger div").fadeOut("1000")
        $(".burger div").css("display", "none")

    })


    $('.child').click(function (e) {
        if (mode == 2) {

            let id = e.target.id;
            $(`#${id}`).css(`background-color`, `rgb(95, 214, 186)`);
            first = false;
            pointed = id;
        }
    }
    )

})