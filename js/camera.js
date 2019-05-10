
export const vlib = {
    FPS: 30,
    initialize() {

        document.getElementById('camera').innerHTML += "<canvas id=\"c1\"></canvas> " +
            "  <button id=\"start\" class=\"btnn\">Turn on Camera</button>\n" +
            "  <button id=\"capture\" class=\"btnn\">Take  <i class=\"fas fa-camera-retro\"></i></button>\n" +
            "<button id=\"save\" class=\"btnn\">Save <i class=\"fas fa-save\"></i></button>\n" +
            "                <button id=\"reCapture\" class=\"btnn\">Remove <i class=\"fas fa-window-close\"></i></button>\n" +
            "                <button id=\"download\" class=\"btnn\">Download <i class=\"fas fa-download\"></i></button>\n" ;

        document.getElementById('camera').innerHTML += "   " +
            "<video id=\"v2\" controls width=\"600\" height=\"400\"> </video>\n" +
            "    <video id=\"v1\" controls width=\"600\" height=\"400\"> </video>\n" +
            "    <img src=\"\" id=\"image\">";

        this.initialize1()
    },
    initialize1(){
        this.canvas = document.querySelector('#c1')
        this.ctx = this.canvas.getContext('2d')
        this.start = document.getElementById('start');
        this.captur = document.getElementById('capture');
        this.reCapture = document.getElementById('reCapture');
        this.save = document.getElementById('save');
        this.download = document.getElementById('download');
        this.video2 = document.querySelector('#v2');
        this.video1 = document.querySelector('#v1');
        this.image = document.querySelector('#image');
        this.ad=false;

        this.video2.style.display = "none"
        this.video1.style.display = "none"
        this.canvas.style.display = "none"
        this.captur.style.display = "none"
        this.reCapture.style.display = "none"
        this.save.style.display = "none"
        this.download.style.display = "none"
        this.image.style.display = "none";

        this.start.addEventListener("click", _ => {
            this.startCamera();
            this.w = this.canvas.width = this.video2.width
            this.h = this.canvas.height = this.video2.height
            this.canvas.style.display = "block"
            this.start.style.display = "none"
            this.captur.style.display = "block"
            this.video2.play();
            this.etat;
            this.copy()
        }, true)
        this.captur.addEventListener("click", _ => {
            this.etat = false;
            this.CompleteCapture();
        }, true)
        this.save.addEventListener("click", _ => {
            this.download.style.display = "block"
            if(this.ad){
                this.edit.style.display = "block"
            }
            this.reCapture.style.display = "none"
            this.save.style.display = "none"
        }, true)
        this.reCapture.addEventListener('click', _ => {
            this.captur.style.display = "block"
            this.reCapture.style.display = "none"
            this.save.style.display = "none"
            this.video2.play();
            this.copy()
        }, true)
        this.download.addEventListener('click', _ => {
            this.downloadImage();
        }, true)
    },
    async startCamera() {
        let stream
        try {
            stream = await navigator.mediaDevices.getUserMedia({video: true})
            this.video2.srcObject = stream
        } catch (error) {
            this.video1.style.display = "block"
            this.video1.src = '1.mp4';
            console.log("ima in catch")
            this.video1.loop = true;
            this.video1.play();
        }
    },
    copy() {
        if (this.etat == false) {
            this.copy2()
            return
        }
        this.ctx.drawImage(this.video2, 0, 0, this.w, this.h)
        setTimeout(_ => this.copy(), 1000 / this.FPS)

    },
    copy2() {
        if (this.video2.paused) {
            this.reCapture.style.display = "block"
            this.save.style.display = "block"
            this.captur.style.display = "none"
            return
        }
        this.ctx.drawImage(this.video2, 0, 0, this.w, this.h)
        this.ctx.drawImage(this.image, 0, 0, 100, 100)
        setTimeout(_ => this.copy2(), 1000 / this.FPS)
    },
    downloadImage() {
        const imgsrc = this.canvas.toDataURL();
        var element = document.createElement('a');
        element.setAttribute('href', imgsrc);
        element.setAttribute('download', 'image.png');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    },
    async CompleteCapture() {
        this.countdown(3);
        await this.sleep(4000);
        this.video2.pause();
    },
    async countdown(ms) {
        while (ms >= 0) {
            this.image.src = "photo/" + ms + ".png";

            await this.sleep(1000);
            ms--;
        }
    },
    sleep(milliseconds) {

        return new Promise(resolve => setTimeout(resolve, milliseconds))
    },
    adjust(){
        document.getElementById('camera').innerHTML += " " +
            "                <button id=\"edit\" class=\"btnn\">Edit <i class=\"fas fa-edit\"></i></button>\n" +
            "                <button id=\"filtre\" class=\"btnn\">Adjust <i class=\"fas fa-th\"></i></button>\n" +
            "                <button id=\"saveFiltre\" class=\"btnn\">Save  <i class=\"fas fa-save\"></i></button>\n" +
            "                <button id=\"saveEdit\" class=\"btnn\">Save  <i class=\"fas fa-save\"></i></button>\n" +
            "                <button id=\"cancel2\" class=\"btnn\">Cancel  <i class=\"fas fa-window-close\"></i></button>\n" +
            "                <button id=\"cancel3\" class=\"btnn\">Cancel  <i class=\"fas fa-window-close\"></i></button>\n";
        document.getElementById('camera').innerHTML += "  " +
            " <div class=\"slidecontainer\">\n" +
            "            <label>Brightness</label>\n" +
            "            <input id=\"fbrightness\" type=\"range\" min=\"0\" max=\"200\" step=\"1\" value=\"100\" class=\"slider\"/>\n" +
            "        </div>\n" +
            "        <div class=\"slidecontainer\">\n" +
            "            <label>Contrast</label>\n" +
            "            <input id=\"fcontrast\" type=\"range\" min=\"0\" max=\"200\" step=\"1\" value=\"100\" class=\"slider\"/>\n" +
            "        </div>\n" +
            "        <div class=\"slidecontainer\">\n" +
            "            <label>Grayscale</label>\n" +
            "            <input id=\"fgrayscale\" type=\"range\" min=\"0\" max=\"100\" step=\"1\" value=\"0\" class=\"slider\"/>\n" +
            "        </div>\n" +
            "        <div class=\"slidecontainer\">\n" +
            "            <label>Opacity</label>\n" +
            "            <input id=\"fopacity\" type=\"range\" min=\"0\" max=\"100\" step=\"1\" value=\"100\" class=\"slider\"/>\n" +
            "        </div>\n" +
            "        <div class=\"slidecontainer\">\n" +
            "            <label>Saturate</label>\n" +
            "            <input id=\"fsaturate\" type=\"range\" min=\"0\" max=\"200\" step=\"1\" value=\"100\" class=\"slider\"/>\n" +
            "        </div>";
        this.initialize1();
        this.adjust2();
    },
     adjust1(id, val) {
         let val1 = parseFloat(document.getElementById('fbrightness').value);
         let val2 = parseFloat(document.getElementById('fcontrast').value);
         let val3 = parseFloat(document.getElementById('fgrayscale').value);
         let val4 = parseFloat(document.getElementById('fopacity').value);
         let val5 = parseFloat(document.getElementById('fsaturate').value);
         switch (id) {
             case "fbrightness" : {
                 val1 = val;
                 break;
             }
             case "fcontrast": {
                 val2 = val;
                 break;
             }
             case "fgrayscale": {
                 val3 = val;
                 break;
             }
             case "fopacity": {
                 val4 = val;
                 break;
             }
             case "fsaturate": {
                 val5 = val;
                 break;
             }
         }
         this.ctx.filter = "brightness(" + val1 + "%) contrast(" + val2 + "%) grayscale(" + val3 + "%) opacity(" + val4 + "%) saturate(" + val5 + "%)";
         this.ctx.drawImage(this.canvas, 0, 0, this.w, this.h)
     },
     adjust2(){
         this.edit = document.getElementById('edit');
         this.filtre = document.getElementById('filtre');
         this.saveEdit = document.getElementById('saveEdit');
         this.cancel2 = document.getElementById('cancel2');
         this.saveFiltre = document.getElementById('saveFiltre');
         this.cancel3 = document.getElementById('cancel3');
         this.fbrightness = document.querySelector('#fbrightness')
         this.fcontrast = document.querySelector('#fcontrast')
         this.fgrayscale = document.querySelector('#fgrayscale')
         this.fopacity = document.querySelector('#fopacity')
         this.fsaturate = document.querySelector('#fsaturate')
         this.label = document.querySelectorAll('label')
         this.etat = true;
         this.ad=true;
         this.cad=false;

         this.edit.style.display = "none"
         this.filtre.style.display = "none";
         this.saveEdit.style.display = "none";
         this.cancel2.style.display = "none"
         this.saveFiltre.style.display = "none";
         this.cancel3.style.display = "none";
         this.fbrightness.style.display = "none";
         this.fcontrast.style.display = "none";
         this.fgrayscale.style.display = "none";
         this.fopacity.style.display = "none";
         this.fsaturate.style.display = "none";
         for (let i = 0; i < this.label.length; i++) {
             this.label[i].style.display = "none"
         }





         this.edit.addEventListener('click', _ => {
             this.filtre.style.display = "block"
             if(this.cad){
                 this.cadre.style.display = "block";
             }
             this.edit.style.display = "none"
             this.download.style.display = "none"
             this.cancel2.style.display = "block"
         }, true)
         this.filtre.addEventListener('click', _ => {
             this.cancel3.style.display = "block";
             this.saveFiltre.style.display = "block";
             this.cancel2.style.display = "none";
             this.saveEdit.style.display = "none";
             if(this.cad){
                 this.cadre.style.display = "none";
             }
             this.filtre.style.display = "none"
             this.fbrightness.style.display = "block"
             this.fcontrast.style.display = "block"
             this.fgrayscale.style.display = "block"
             this.fopacity.style.display = "block"
             this.fsaturate.style.display = "block"
             for (let i = 0; i < this.label.length; i++) {
                 this.label[i].style.display = "block"
             }
         }, true)
         this.saveEdit.addEventListener('click', _ => {
             if(this.cad){
                 this.cadre.style.display = "none";
             }
             this.cancel2.style.display = "none";
             this.download.style.display = "block";
             this.filtre.style.display = "none";
             this.edit.style.display = "block";
             this.saveEdit.style.display = "none";
         }, true)
         this.cancel2.addEventListener('click', _ => {
             this.fbrightness.value = "100"
             this.fcontrast.value = "100"
             this.fgrayscale.value = "0"
             this.fopacity.value = "100"
             this.fsaturate.value = "100"
             if(this.cad){
                 this.cadre.style.display = "none";
             }
             this.cancel2.style.display = "none";
             this.download.style.display = "block";
             this.filtre.style.display = "none";
             this.saveEdit.style.display = "none";
             this.edit.style.display = "block";
             this.ctx.filter = "brightness(100%) contrast(100%) grayscale(0%) opacity(100%) saturate(100%)"
             this.ctx.clearRect(0, 0, this.w, this.h)
             this.ctx.drawImage(this.video2, 0, 0, this.w, this.h)
         }, true)
         this.saveFiltre.addEventListener('click', _ => {
             this.fbrightness.style.display = "none"
             this.fcontrast.style.display = "none"
             this.fgrayscale.style.display = "none"
             this.fopacity.style.display = "none"
             this.fsaturate.style.display = "none"
             for (let i = 0; i < this.label.length; i++) {
                 this.label[i].style.display = "none"
             }
             this.cancel2.style.display = "block"
             if(this.cad){
                 this.cadre.style.display = "block"
             }
             this.filtre.style.display = "block"
             this.cancel3.style.display = "none";
             this.saveFiltre.style.display = "none";
             this.saveEdit.style.display = "block";
         }, true)
         this.cancel3.addEventListener('click', _ => {
             this.fbrightness.style.display = "none"
             this.fbrightness.value = "100"
             this.fcontrast.style.display = "none"
             this.fcontrast.value = "100"
             this.fgrayscale.style.display = "none"
             this.fgrayscale.value = "0"
             this.fopacity.style.display = "none"
             this.fopacity.value = "100"
             this.fsaturate.style.display = "none"
             this.fsaturate.value = "100"
             for (let i = 0; i < this.label.length; i++) {
                 this.label[i].style.display = "none"
             }
             this.cancel2.style.display = "block"
             if(this.cad){
                 this.cadre.style.display = "block"
                 this.saveRecadre.style.display = "none";
             }
             this.filtre.style.display = "block"
             this.cancel3.style.display = "none";
             this.saveFiltre.style.display = "none";
             this.saveEdit.style.display = "none";
             this.ctx.filter = "brightness(100%) contrast(100%) grayscale(0%) opacity(100%) saturate(100%)";
             this.ctx.clearRect(0, 0, this.w, this.h)
             this.ctx.drawImage(this.video2, 0, 0, this.w, this.h)
         }, true)
         this.fbrightness.addEventListener('change', _ => {
             this.adjust1(this.fbrightness.id, this.fbrightness.value);
         }, true)
         this.fcontrast.addEventListener('change', _ => {
             this.adjust1(this.fcontrast.id, this.fcontrast.value);
         }, true)
         this.fgrayscale.addEventListener('change', _ => {
             this.adjust1(this.fgrayscale.id, this.fgrayscale.value);
         }, true)
         this.fopacity.addEventListener('change', _ => {
             this.adjust1(this.fopacity.id, this.fopacity.value);
         }, true)
         this.fsaturate.addEventListener('change', _ => {
             this.adjust1(this.fsaturate.id, this.fsaturate.value);
         }, true)
     },
    crop() {

        document.getElementById('camera').innerHTML +="  \n"+
            "                <button id=\"saveRecadre\" class=\"btnn\">Save <i class=\"fas fa-save\"></i></button>\n" +
            "                <button id=\"cadre\" class=\"btnn\">Crop <i class=\"fas fa-crop-alt\"></i></button>\n";
        this.initialize1();
        this.adjust2();
        this.saveRecadre = document.getElementById('saveRecadre');
        this.cadre = document.getElementById('cadre');
        this.cad=true;


        this.cadre.style.display = "none"
        this.saveRecadre.style.display = "none";
        this.cadre.addEventListener('click', _ => {
            this.crop1();
            this.cancel3.style.display = "block";
            this.saveRecadre.style.display = "block";
            this.cancel2.style.display = "none";
            this.cadre.style.display = "none";
            this.cancel2.style.display = "none";
            this.filtre.style.display = "none"
            this.saveEdit.style.display = "none"
        }, true)


        this.crop1();

    },
    crop1(){
        var mouseIsDown = false
        this.canvas.addEventListener('mousedown', function () {
            mouseIsDown = true
        }, true)
        this.canvas.addEventListener('mouseup', function () {
            mouseIsDown = false
        }, true)
        this.canvas.addEventListener('mousemove', ff, true)
        this.saveRecadre.addEventListener('click', _ => {
            this.filtre.style.display = "block"
            this.cadre.style.display = "block"
            this.cancel3.style.display = "none";
            this.saveRecadre.style.display = "none";
            this.saveEdit.style.display = "block";
            this.cancel2.style.display = "block";
            rects[0].saveRecadrage();
        }, true)
        let rects = [
            {
                //NO
                ctx2: this.ctx,
                vidd: this.video2,
                wi: this.w,
                hi: this.h,
                x: 0,
                y: 0,
                drawrect: function () {
                    this.ctx2.clearRect(0, 0, this.wi, this.hi)
                    this.ctx2.drawImage(this.vidd, 0, 0, this.wi, this.hi)
                    const imageData1 = this.ctx2.getImageData(0, 0, this.wi, this.hi)
                    const imageData2 = this.ctx2.getImageData(rects[0].x + 7, rects[0].y + 7, rects[4].x, rects[4].y)
                    const data1 = imageData1.data
                    const data2 = imageData2.data
                    for (let i = 0; i < data1.length; i += 4) {
                        var r = data1[i];
                        var g = data1[i + 1];
                        var b = data1[i + 2];
                        var v = 0.2126 * r + 0.7152 * g + 0.001 * b;
                        data1[i] = data1[i + 1] = data1[i + 2] = v
                    }
                    this.ctx2.putImageData(imageData1, 0, 0)
                    this.ctx2.putImageData(imageData2, rects[0].x + 7, rects[0].y + 7, 0, 0, rects[4].x - rects[0].x, rects[4].y - rects[0].y)
                    for (let i = 1; i < 8; i++) {
                        rects[i].drawrect();
                    }
                    this.ctx2.beginPath()
                    this.ctx2.moveTo(this.x + 7, this.y + 7);
                    this.ctx2.lineTo(rects[1].x + 7, rects[1].y + 7)
                    this.ctx2.stroke();
                    for (let i = 1; i < 7; i++) {
                        this.ctx2.lineTo(rects[i + 1].x + 7, rects[i + 1].y + 7);
                    }
                    this.ctx2.closePath();
                    this.ctx2.stroke();
                    this.ctx2.beginPath()
                    this.ctx2.moveTo((rects[1].x + rects[0].x + 18) / 2, rects[0].y + 7);
                    this.ctx2.lineTo((rects[1].x + rects[0].x + 18) / 2, rects[6].y + 7);
                    this.ctx2.closePath();
                    this.ctx2.stroke();
                    this.ctx2.beginPath()
                    this.ctx2.moveTo((rects[1].x + rects[2].x + 18) / 2, rects[0].y + 7);
                    this.ctx2.lineTo((rects[1].x + rects[2].x + 18) / 2, rects[6].y + 7);
                    this.ctx2.closePath();
                    this.ctx2.stroke();
                    this.ctx2.beginPath()
                    this.ctx2.moveTo(rects[0].x + 7, (rects[7].y + rects[0].y + 18) / 2);
                    this.ctx2.lineTo(rects[2].x + 7, (rects[7].y + rects[0].y + 18) / 2);
                    this.ctx2.closePath();
                    this.ctx2.stroke();
                    this.ctx2.beginPath()
                    this.ctx2.moveTo(rects[0].x + 7, (rects[7].y + rects[6].y + 18) / 2);
                    this.ctx2.lineTo(rects[2].x + 7, (rects[7].y + rects[6].y + 18) / 2);
                    this.ctx2.closePath();
                    this.ctx2.stroke();
                    this.ctx2.fillRect(this.x, this.y, 18, 18);
                },
                saveRecadrage() {

                    this.ctx2.clearRect(0, 0, this.wi, this.hi)
                    this.ctx2.drawImage(this.vidd, 0, 0, this.wi, this.hi)
                    const imageData1 = this.ctx2.getImageData(rects[0].x + 7, rects[0].y, rects[2].x - rects[0].x, rects[6].y - rects[0].y);
                    this.ctx2.clearRect(0, 0, this.wi, this.hi)

                    const x = (rects[2].x - rects[0].x) / 2;
                    const y = (rects[6].y - rects[0].y) / 2
                    this.ctx2.putImageData(imageData1, (this.wi / 2) - x, (this.hi / 2) - y, 0, 0, 600, 400);
                }
            },
            {
                // NN
                x: 300,
                y: 0,
                ctx2: this.ctx,
                drawrect: function () {
                    this.ctx2.fillStyle = "black";
                    this.ctx2.fillRect(this.x, this.y, 18, 18);
                }
            },
            {
                //NE
                x: 586,
                ctx2: this.ctx,
                y: 0,
                drawrect: function () {
                    this.ctx2.fillRect(this.x, this.y, 18, 18);
                }
            },
            {
                //EE
                x: 586,
                ctx2: this.ctx,
                y: 200,
                drawrect: function () {
                    this.ctx2.fillStyle = "black";
                    this.ctx2.fillRect(this.x, this.y, 18, 18);
                }
            },
            {
                //SE
                x: 586,
                ctx2: this.ctx,
                y: 386,
                drawrect: function () {
                    this.ctx2.fillStyle = "black";
                    this.ctx2.fillRect(this.x, this.y, 18, 18);
                }
            },
            {
                //SS
                ctx2: this.ctx,
                x: 300,
                y: 386,
                drawrect: function () {
                    this.ctx2.fillStyle = "black";
                    this.ctx2.fillRect(this.x, this.y, 18, 18);
                }
            },
            {
                // SO
                ctx2: this.ctx,
                x: 0,
                y: 386,
                drawrect: function () {
                    this.ctx2.fillStyle = "black";
                    this.ctx2.fillRect(this.x, this.y, 18, 18);
                }
            },
            {
                //  OO
                ctx2: this.ctx,
                x: 0,
                y: 200,
                drawrect: function () {
                    this.ctx2.fillStyle = "black";
                    this.ctx2.fillRect(this.x, this.y, 18, 18);
                }
            }

        ]
        rects[0].drawrect()
        function ff(e)  {
            if (mouseIsDown) {
                var a = e.clientX - (window.innerWidth - 600) / 2;
                var b = e.clientY - 80;
                if ((rects[0].x <= a && (rects[0].x + 18) >= a) && (rects[0].y <= b && (rects[0].y + 18) >= b)) {
                    rects[0].x = a - 7;
                    rects[0].y = b - 7;
                    rects[4].x = rects[4].x;
                    rects[4].y = rects[4].y;
                    rects[1].y = rects[0].y
                    rects[2].y = rects[0].y
                    rects[7].x = rects[0].x
                    rects[6].x = rects[0].x
                    rects[1].x = (rects[0].x + rects[2].x) / 2;
                    rects[7].y = (rects[6].y + rects[0].y) / 2;
                    rects[3].y = (rects[2].y + rects[4].y) / 2;
                    rects[5].x = (rects[6].x + rects[4].x) / 2;
                    rects[0].drawrect()
                }

                else {
                    if ((rects[1].x <= a && (rects[1].x + 18) >= a) && (rects[1].y <= b && (rects[1].y + 18) >= b)) {
                        rects[1].y = b - 7;
                        rects[0].y = b - 7;
                        rects[2].y = b - 7;
                        rects[3].y = (rects[4].y + rects[0].y) / 2;
                        rects[7].y = (rects[4].y + rects[0].y) / 2;
                        rects[0].drawrect()
                    }
                    else {
                        if ((rects[2].x <= a && (rects[2].x + 18) >= a) && (rects[2].y <= b && (rects[2].y + 18) >= b)) {
                            //NE
                            rects[2].x = a - 7;
                            rects[2].y = b - 7;
                            rects[1].y = rects[2].y
                            rects[0].y = rects[2].y
                            rects[3].x = rects[2].x
                            rects[4].x = rects[2].x
                            rects[1].x = (rects[0].x + rects[2].x) / 2;
                            rects[7].y = (rects[6].y + rects[0].y) / 2;
                            rects[3].y = (rects[2].y + rects[4].y) / 2;
                            rects[5].x = (rects[6].x + rects[4].x) / 2;
                            rects[0].drawrect()
                        }
                        else {
                            if ((rects[3].x <= a && (rects[3].x + 18) >= a) && (rects[3].y <= b && (rects[3].y + 18) >= b)) {
                                //EE
                                rects[3].x = a - 7;
                                rects[2].x = a - 7;
                                rects[4].x = a - 7;
                                rects[1].x = (rects[0].x + rects[2].x) / 2;
                                rects[5].x = (rects[0].x + rects[2].x) / 2;
                                rects[0].drawrect()
                            }
                            else {
                                if ((rects[4].x <= a && (rects[4].x + 18) >= a) && (rects[4].y <= b && (rects[4].y + 18) >= b)) {
                                    //SE
                                    rects[4].x = a - 7;
                                    rects[4].y = b - 7;
                                    rects[6].y = rects[4].y
                                    rects[5].y = rects[4].y
                                    rects[2].x = rects[4].x
                                    rects[3].x = rects[4].x
                                    rects[1].x = (rects[0].x + rects[2].x) / 2;
                                    rects[7].y = (rects[6].y + rects[0].y) / 2;
                                    rects[3].y = (rects[2].y + rects[4].y) / 2;
                                    rects[5].x = (rects[6].x + rects[4].x) / 2;
                                    rects[0].drawrect()
                                }
                                else {
                                    if ((rects[5].x <= a && (rects[5].x + 18) >= a) && (rects[5].y <= b && (rects[5].y + 18) >= b)) {
                                        rects[5].y = b - 7;
                                        rects[4].y = b - 7;
                                        rects[6].y = b - 7;
                                        rects[3].y = (rects[4].y + rects[0].y) / 2;
                                        rects[7].y = (rects[4].y + rects[0].y) / 2;
                                        rects[0].drawrect()
                                    }
                                    else {
                                        if ((rects[6].x <= a && (rects[6].x + 18) >= a) && (rects[6].y <= b && (rects[6].y + 18) >= b)) {
                                            //SO
                                            rects[6].x = a - 7;
                                            rects[6].y = b - 7;
                                            rects[4].y = rects[6].y
                                            rects[5].y = rects[6].y
                                            rects[0].x = rects[6].x
                                            rects[7].x = rects[6].x
                                            rects[1].x = (rects[0].x + rects[2].x) / 2;
                                            rects[7].y = (rects[6].y + rects[0].y) / 2;
                                            rects[3].y = (rects[2].y + rects[4].y) / 2;
                                            rects[5].x = (rects[6].x + rects[4].x) / 2;
                                            rects[0].drawrect()
                                        }
                                        else {
                                            if ((rects[7].x <= a && (rects[7].x + 18) >= a) && (rects[7].y <= b && (rects[7].y + 18) >= b)) {
                                                //OO
                                                rects[6].x = a - 7;
                                                rects[7].x = a - 7;
                                                rects[0].x = a - 7;
                                                rects[1].x = (rects[0].x + rects[2].x) / 2;
                                                rects[5].x = (rects[0].x + rects[2].x) / 2;
                                                rects[0].drawrect()

                                            }
                                        }
                                    }

                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


