let times = 0;
let clickCount = 0;
setInterval(function(){
    times++;
    console.log(times + " Chrome Save Image is: active");

    function rint() {
        return Math.floor(Math.random() * Math.floor(1000000));
    }

    let c = document.getElementsByTagName("canvas");
    //console.log("c", c)
    for (let i = 0; i < c.length; i++) {
    	
    	c[i].addEventListener('contextmenu',function(e){
            clickCount++;
    		console.log('canvas');
    		var link=document.createElement("a");
    		e.stopImmediatePropagation();
            e.preventDefault();
    		link.href= this.toDataURL('image/jpg');   //function blocks CORS
            link.download = 'chromeSaveImagePlugin' + '_' + clickCount + '_' + i + '_' + rint() + '.jpg';
            link.click();	
    	}, false);
    }

    let images = document.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
        images[i].addEventListener("click",function(e){
            console.log("img " + i + " was clicked");
            console.log(images[i].src);

            var link=document.createElement("a");

            e.preventDefault();

            if( images[i].src.startsWith("data:image/jpeg;base64") ||
                images[i].src.startsWith("data:image/jpg;base64") ||
                images[i].src.startsWith("data:image/png;base64") ){
                console.log('base64'); 
                link.href=images[i].src;   //function blocks CORS
                link.download = 'chromeSaveImagePlugin' + i + '_' + rint() + '.jpg';
                link.click(); 
            }else if( images[i].src.startsWith("http") ){
                console.log('normal img');
                let el = document.getElementById("chromeSaveImagePluginCanvas");
                if(el){
                    el.parentNode.removeChild(el);
                }

                canvas = document.createElement('canvas');
                canvas.id = "chromeSaveImagePluginCanvas";
                //canvas.setAttribute('width', 500);
                //canvas.setAttribute('height', 500);

                ctx = canvas.getContext('2d');
                var context = canvas.getContext('2d');

                // load image from data url
                var imageObj = new Image();
                imageObj.crossOrigin="anonymous";
                imageObj.onload = function() {
                    canvas.width = this.width;
                    canvas.height = this.height;
                    context.drawImage(this, 0, 0);

                    canvas.style.position = "fixed";
                    canvas.style.top = 0;
                    canvas.style.left = 0;
                    canvas.style.padding = "15px";
                    canvas.style.zIndex = 1000000;
                    canvas.style.background = "#FFF";
                    canvas.id = "chromeSaveImagePluginCanvas";
                    canvas.style.transition = "all .5s cubic-bezier(1, -0.43, 1, 1)";

                    document.body.appendChild(canvas);
                    link.href= canvas.toDataURL('image/jpg');   //function blocks CORS
                    link.download = 'chromeSaveImagePlugin' + i + '_' + rint() + '.jpg';
                    link.click();

                    setTimeout(function(){
                        console.log(' document.body.width',  document.documentElement.clientWidth);
                        console.log(' canvas',  canvas); 
                        document.getElementById("chromeSaveImagePluginCanvas").style.left = document.documentElement.clientWidth + 100 + "px";
                        //canvas.style.left = document.documentElement.clientWidth + 100;

                        setTimeout(function(){
                            let el = document.getElementById("chromeSaveImagePluginCanvas");
                            if(el){
                                el.parentNode.removeChild(el);
                            }
                        },600);
                    },1000);

                };

                imageObj.src = images[i].src;


            }else{
                alert("No go!");
                console.log('images[i].src ', images[i].src); 
            }
            
        });
    }

},1000);
