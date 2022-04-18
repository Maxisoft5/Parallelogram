    var rectAgnlePoints = [];

    window.onload = function() {
        let title = document.getElementById("clickPoint");
        title.textContent = `Click in the frame to set point`;
        let canvas = document.getElementById("canvas");
        canvas.addEventListener('click', function(event) 
        {
            let title = document.getElementById("clickPoint");
            if (rectAgnlePoints.length < 4) {
                title.textContent = `Click in the frame to set point there are still ${3 - rectAgnlePoints.length}`;
            }
            if (rectAgnlePoints.length < 3) {
                let point = document.createElement("span");
                point.classList.add(`point${rectAgnlePoints.length + 1}`);
                point.classList.add(`circle`);
                point.classList.add(`draggable`);
                point.style.position = 'absolute';
                point.style.left = `${event.clientX}px`;
                point.style.top = `${event.clientY}px`;
                let p = document.createElement("p"); 
                p.style.width = '40px';
                p.textContent = `(${event.clientX};${event.clientY})`;
                p.style.zIndex = '999';
                p.style.fontSize = '18px';
                p.id = `point${rectAgnlePoints.length + 1}-p`;
                point.append(p);
                canvas.append(point);
    
                rectAgnlePoints.push({
                    point: `point${rectAgnlePoints.length + 1}`,
                    X: event.clientX,
                    Y: event.clientY
                });
            }
    
            if (rectAgnlePoints.length == 3) {
                let title = document.getElementById('clickPoint');
                title.style.display = 'none';
                let point = document.createElement("span");
                point.classList.add(`point${rectAgnlePoints.length + 1}`);
                point.classList.add(`circle`);
                point.classList.add(`draggable`);
                point.style.position = 'absolute';
                let p = document.createElement("p"); 
    
                let oX = (rectAgnlePoints[0].X + rectAgnlePoints[2].X) / 2;
                let oY = (rectAgnlePoints[0].Y + rectAgnlePoints[2].Y) / 2;
    
                let dX = oX * 2 - rectAgnlePoints[1].X;
                let dY = oY * 2 - rectAgnlePoints[1].Y;
    
                point.style.left = `${dX}px`;
                point.style.top = `${dY}px`;
                p.textContent = `(${dX};${dY})`;
                p.style.zIndex = '999';
                p.style.fontSize = '18px';
                p.id = `point${rectAgnlePoints.length + 1}-p`;
                point.append(p);
                canvas.append(point);
    
                rectAgnlePoints.push({
                    point: `point${rectAgnlePoints.length}`,
                    X: dX,
                    Y: dY
                });
    
                DrawCenterCircle(oX, oY);
             
                let svg = document.getElementById("lines");
    
                let line1 = document.createElementNS('http://www.w3.org/2000/svg','line');
                line1.setAttribute("x1", `${rectAgnlePoints[0].X - 5}`);
                line1.setAttribute("y1", `${rectAgnlePoints[0].Y - 35}`);
                line1.setAttribute("x2", `${rectAgnlePoints[1].X- 5}`);
                line1.setAttribute("y2", `${rectAgnlePoints[1].Y - 35}`);
                line1.setAttribute("id", `point1-line`);
                line1.classList.add('rect-line');
                line1.setAttribute("stroke", "blue");
    
                let line2 = document.createElementNS('http://www.w3.org/2000/svg','line');
                line2.setAttribute("x1", `${rectAgnlePoints[1].X- 5}`);
                line2.setAttribute("y1", `${rectAgnlePoints[1].Y - 35}`);
                line2.setAttribute("x2", `${rectAgnlePoints[2].X- 5}`);
                line2.setAttribute("y2", `${rectAgnlePoints[2].Y - 35}`);
                line2.setAttribute("id", `point2-line`);
                line2.classList.add('rect-line');
                line2.setAttribute("stroke", "blue");
    
                let line3 = document.createElementNS('http://www.w3.org/2000/svg','line');
                line3.setAttribute("x1", `${rectAgnlePoints[2].X- 5}`);
                line3.setAttribute("y1", `${rectAgnlePoints[2].Y - 35}`);
                line3.setAttribute("x2", `${rectAgnlePoints[3].X- 5}`);
                line3.setAttribute("y2", `${rectAgnlePoints[3].Y - 35}`);
                line3.setAttribute("id", `point3-line`);
                line3.classList.add('rect-line');
                line3.setAttribute("stroke", "blue");
    
                let line4 = document.createElementNS('http://www.w3.org/2000/svg','line');
                line4.setAttribute("x1", `${rectAgnlePoints[3].X- 5}`);
                line4.setAttribute("y1", `${rectAgnlePoints[3].Y - 35}`);
                line4.setAttribute("x2", `${rectAgnlePoints[0].X- 5}`);
                line4.setAttribute("y2", `${rectAgnlePoints[0].Y - 35}`);
                line4.setAttribute("id", `point4-line`);
                line4.classList.add('rect-line');
                line4.setAttribute("stroke", "blue");
    
                svg.append(line1);
                svg.append(line2);
                svg.append(line3);
                svg.append(line4);
                
    
            }
        });

        let about = document.getElementById("about");
        about.addEventListener('click', function() {

            swal('Web application allows you to create a parallelogram with specified points and '+ 
            'shows you point`s coordiantes with square. A circle draws automatically in the center of '
            + 'parallelogram with parallelogram`s square.\n' + 
            'Instructions:\n1. Click on frame to draw 3 points\n' + 
                          '2. 4th point will draw automatically to draw full parallelogram figure\n'+
                          '3. Points are draggble, you can move them and sqaure with coordiantes will calculates accordionally\n'
                         +'4. To remove canvas figures you should click `Reset`\n\n\n © Maksym Hryniuk');

        });

        
        let reset = document.getElementById("reset");
        reset.addEventListener('click', function() {

            rectAgnlePoints.length = 0;
            let title = document.getElementById("clickPoint");
            title.textContent = `Click to set point`;
            title.style.display = 'block';
            let square = document.getElementById("circleSquare");
            square.style.display = 'none';
            let rectLines = document.getElementsByClassName("rect-line");
            let circles = document.getElementsByClassName("circle");
            let center = document.getElementById("center");
            center.remove();
            let corrds = document.getElementById("coordsCenter");
            corrds.remove();

            for(let i = rectLines.length; i != 0; i--){
                rectLines[i-1].remove();
            }

            for(let i = circles.length; i != 0; i--){
                circles[i-1].remove();
            }

        });

    };

  
    function DrawCenterCircle(oX, oY){

        let canvas = document.getElementById("canvas");
        let point = document.createElement("span");
        point.id = `center`;
        point.style.position = 'absolute';
        let s = GetParallelogramSquare(oX, oY);
        let square = document.getElementById("circleSquare");
        square.style.display = 'block';
        square.innerHTML = `Circle and parallelogram square: ${s.toFixed(4)} sm<sup><small>2</small></sup>`;
        point.style.left = `${oX - s / 2}px`;
        point.style.top = `${oY - s / 2}px`;
        point.style.width = `${s}px`;
        point.style.height = `${s}px`;

        var p = document.createElement("p");
        p.id = 'coordsCenter';
        p.style.position = 'absolute';
        p.style.fontSize = '18px';
        p.style.left = `${oX}px`;
        p.style.top = `${oY}px`;
        p.style.color = 'black';
        p.style.zIndex = '999';
        let x = oX - s / 2;
        let y = oY - s / 2;
        p.textContent = `(${x.toFixed(3)}; ${y.toFixed(3)})`;
        canvas.append(p);
        canvas.append(point);
    }

    function GetParallelogramSquare(oX, oY){

        // Calcluate 4 squares of triangles in parallelogram then we sum them to get parallelogram square

        let a = rectAgnlePoints[0];
        let b = rectAgnlePoints[1];
        let c = rectAgnlePoints[2];
        let d = rectAgnlePoints[3];

        let aO = Math.sqrt((Math.pow(oX - a.X), 2) + Math.pow(oY - a.Y, 2));
        let oD = Math.sqrt((Math.pow(d.X - oX), 2) + Math.pow(d.Y - oY, 2));
        let aD = Math.sqrt((Math.pow(d.X - a.X), 2) + Math.pow(d.Y - a.Y, 2));

        let p1 = (aO + oD + aD) / 2;

        let s1 = p1*(p1-aO)*(p1-oD)*(p1-aD);
        let aoDSquare = Math.sqrt(s1);

        let bO = Math.sqrt((Math.pow(oX - b.X), 2) + Math.pow(oY - b.Y, 2));
        let aB = Math.sqrt((Math.pow(b.X - a.X), 2) + Math.pow(b.Y - a.Y, 2));

        p2 = (aO + bO + aB) / 2;

        let s2 = p2*(p2-aO)*(p2-bO)*(p2-aB);
        let aoBSquare = Math.sqrt(s2);

        let cO = Math.sqrt((Math.pow(c.X - oX), 2) + Math.pow(c.Y - oY, 2));
        let bC = Math.sqrt((Math.pow(c.X - b.X), 2) + Math.pow(c.Y - b.Y, 2));

        p3 = (bO + cO + bC) / 2;

        let s3 = p3*(p3-cO)*(p3-bC)*(p3-bO);
        let boCSquare = Math.sqrt(s3);

        let cD = Math.sqrt((Math.pow(d.X - c.X), 2) + Math.pow(d.Y - c.Y, 2));

        p4 = (oD + cO + cD) / 2;

        let s4 = p4*(p4-cO)*(p4-cD)*(p4-oD);
        let coDSquare = Math.sqrt(s4);

        return aoDSquare + aoBSquare + boCSquare + coDSquare;
    }


    var DragManager = new function() {
        
        var dragPoint = {};
        var self = this;

        function onMouseDown(e) {

            if (e.which != 1) return;
        
            var elem = e.target.closest('.draggable');
            if (!elem) return;
        
            dragPoint.elem = elem;
        
            // запомним, что элемент нажат на текущих координатах pageX/pageY
            dragPoint.downX = e.pageX;
            dragPoint.downY = e.pageY;

            return false;
        }

        function onMouseMove(e) {
            if (dragPoint.elem == undefined) return; // элемент не зажат
        
            if (dragPoint.avatar == undefined) { // если перенос не начат...
              var moveX = e.pageX - dragPoint.downX;
              var moveY = e.pageY - dragPoint.downY;
                
              // если мышь передвинулась в нажатом состоянии недостаточно далеко
              if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
                return;
              }
              
              // начинаем перенос
              dragPoint.avatar = createAvatar(e); // создать аватар
              if (dragPoint.avatar == undefined) { // отмена переноса, нельзя "захватить" за эту часть элемента
                dragPoint = {};
                return;
              }
        
              // аватар создан успешно
              // создать вспомогательные свойства shiftX/shiftY
              var coords = getCoords(dragPoint.avatar);
              dragPoint.shiftX = dragPoint.downX - coords.left;
              dragPoint.shiftY = dragPoint.downY - coords.top;
        
              startDrag(e); // отобразить начало переноса
            }
        
            // отобразить перенос объекта при каждом движении мыши
            dragPoint.avatar.style.left = e.pageX - dragPoint.shiftX + 'px';
            dragPoint.avatar.style.top = e.pageY - dragPoint.shiftY + 'px';

            let pointName = e.target.classList[0];
            setDraggableLines(pointName, dragPoint);
            let center = document.getElementById("center");
            let oX = (rectAgnlePoints[2].X + rectAgnlePoints[0].X) / 2;
            let oY = (rectAgnlePoints[2].Y + rectAgnlePoints[0].Y) / 2;
            let s = GetParallelogramSquare(oX, oY);
            let square = document.getElementById("circleSquare");
            square.style.display = 'block';
            square.innerHTML = `Circle and parallelogram square: ${s.toFixed(4)} sm<sup><small>2</small></sup>`;
            center.style.left = `${oX - s / 2}px`;
            center.style.top = `${oY - s / 2}px`;
            center.style.width = `${s}px`;
            center.style.height = `${s}px`; 
            let p = document.getElementById("coordsCenter");
            p.style.left = `${oX}px`;
            p.style.top = `${oY}px`;
            let x = oX - s / 2;
            let y = oY - s / 2;
            p.textContent = `(${x.toFixed(3)}; ${y.toFixed(3)})`;
        
            return false;
          }

          function onMouseUp(e) {
            if (dragPoint.avatar) { // если перенос идет
              finishDrag(e);
            }
        
            // перенос либо не начинался, либо завершился
            // в любом случае очистим "состояние переноса" dragObject
            dragPoint = {};
          }
        
          function finishDrag(e) {
            var dropElem = findDroppable(e);
        
            if (!dropElem) {
              self.onDragCancel(dragPoint);
            } else {
              self.onDragEnd(dragPoint, dropElem);
            }
          } 

          function createAvatar(e) {

            // запомнить старые свойства, чтобы вернуться к ним при отмене переноса
            var avatar = dragPoint.elem;
            var old = {
              parent: avatar.parentNode,
              nextSibling: avatar.nextSibling,
              position: avatar.position || '',
              left: avatar.left || '',
              top: avatar.top || '',
              zIndex: avatar.zIndex || ''
            };
        
            // функция для отмены переноса
            avatar.rollback = function() {
              old.parent.insertBefore(avatar, old.nextSibling);
              avatar.style.position = old.position;
              avatar.style.left = old.left;
              avatar.style.top = old.top;
              avatar.style.zIndex = old.zIndex
            };
        
            return avatar;
          }

          function startDrag(e) {
            var avatar = dragPoint.avatar;
        
            // инициировать начало переноса
            document.body.appendChild(avatar);
            avatar.style.zIndex = 9999;
            avatar.style.position = 'absolute';
          }
        
          function findDroppable(event) {
            // спрячем переносимый элемент
            dragPoint.avatar.hidden = true;
        
            // получить самый вложенный элемент под курсором мыши
            var elem = document.elementFromPoint(event.clientX, event.clientY);
        
            // показать переносимый элемент обратно
            dragPoint.avatar.hidden = false;
        
            if (elem == null) {
              // такое возможно, если курсор мыши "вылетел" за границу окна
              return null;
            }
        
            return elem.closest('.droppable');
          }
        
          document.onmousemove = onMouseMove;
          document.onmouseup = onMouseUp;
          document.onmousedown = onMouseDown;
        
          this.onDragEnd = function(dragPoint, dropElem) {};
          this.onDragCancel = function(dragPoint) {};
    };

      function getCoords(elem) { // кроме IE8-
        var box = elem.getBoundingClientRect();
      
        return {
          top: box.top + window.pageYOffset,
          left: box.left + window.pageXOffset
        };
      
      }

      function setDraggableLines(point, dragPoint){
        switch(point){
            case "point1": {
                var l1 = document.getElementById("point1-line");
                var l4 = document.getElementById("point4-line");
                l1.setAttribute("x1", `${dragPoint.avatar.style.left}`);
                l1.setAttribute("y1", `${parseInt(dragPoint.avatar.style.top, 10) - 40}px`);
                l4.setAttribute("x2", `${dragPoint.avatar.style.left}`);
                l4.setAttribute("y2", `${parseInt(dragPoint.avatar.style.top, 10) - 40}px`);
                let p1 = document.getElementById(`point1-p`);
                p1.style.left = `${dragPoint.avatar.style.left}px`;
                p1.style.top = `${parseInt(dragPoint.avatar.style.top, 10) - 40}px`;
                p1.textContent = `(${dragPoint.avatar.style.left};${parseInt(dragPoint.avatar.style.top, 10) - 40})`;

                rectAgnlePoints[0] = {
                    point: `point1`,
                    X: parseInt(dragPoint.avatar.style.left, 10),
                    Y: parseInt(dragPoint.avatar.style.top, 10) - 40
                };
                rectAgnlePoints[3] = {
                  point: `point4`,
                  X: parseInt(dragPoint.avatar.style.left, 10),
                  Y: parseInt(dragPoint.avatar.style.top, 10) - 40
                };
                break;
            }
            case "point2": {
                var l1 = document.getElementById("point1-line");
                var l2 = document.getElementById("point2-line");
                l2.setAttribute("x1", `${dragPoint.avatar.style.left}`);
                l2.setAttribute("y1", `${parseInt(dragPoint.avatar.style.top, 10) -40}px`);
                l1.setAttribute("x2", `${dragPoint.avatar.style.left}`);
                l1.setAttribute("y2", `${parseInt(dragPoint.avatar.style.top, 10) -40}px`);
                let p1 = document.getElementById(`point2-p`);
                p1.style.left = `${dragPoint.avatar.style.left}px`;
                p1.style.top = `${parseInt(dragPoint.avatar.style.top, 10) - 40}px`;
                p1.textContent = `(${dragPoint.avatar.style.left};${parseInt(dragPoint.avatar.style.top, 10) - 40})`;
                rectAgnlePoints[0] = {
                    point: `point1`,
                    X: parseInt(dragPoint.avatar.style.left, 10),
                    Y: parseInt(dragPoint.avatar.style.top, 10) - 40
                };
                rectAgnlePoints[1] = {
                    point: `point2`,
                    X: parseInt(dragPoint.avatar.style.left),
                    Y: parseInt(dragPoint.avatar.style.top, 10) - 40
                };
                break;
            }
            case "point3": {
                var l2 = document.getElementById("point2-line");
                var l3 = document.getElementById("point3-line");
                l3.setAttribute("x1", `${dragPoint.avatar.style.left}`);
                l3.setAttribute("y1", `${parseInt(dragPoint.avatar.style.top, 10)-40}px`);
                l2.setAttribute("x2", `${dragPoint.avatar.style.left}`);
                l2.setAttribute("y2", `${parseInt(dragPoint.avatar.style.top, 10)-40}px`);
                let p1 = document.getElementById(`point3-p`);
                p1.style.left = `${dragPoint.avatar.style.left}px`;
                p1.style.top = `${parseInt(dragPoint.avatar.style.top, 10) - 40}px`;
                p1.textContent = `(${dragPoint.avatar.style.left};${parseInt(dragPoint.avatar.style.top, 10) - 40})`;
                rectAgnlePoints[1] = {
                    point: `point2`,
                    X: parseInt(dragPoint.avatar.style.left, 10),
                    Y: parseInt(dragPoint.avatar.style.top, 10) - 40
                };
                rectAgnlePoints[2] = {
                    point: `point3`,
                    X: parseInt(dragPoint.avatar.style.left, 10),
                    Y: parseInt(dragPoint.avatar.style.top, 10) - 40
                };
                break;
            }
            case "point4": {
                var l3 = document.getElementById("point3-line");
                var l4 = document.getElementById("point4-line");
                l4.setAttribute("x1", `${dragPoint.avatar.style.left}`);
                l4.setAttribute("y1", `${parseInt(dragPoint.avatar.style.top, 10) - 40}px`);
                l3.setAttribute("x2", `${dragPoint.avatar.style.left}`);
                l3.setAttribute("y2", `${parseInt(dragPoint.avatar.style.top, 10) - 40}px`);
                let p1 = document.getElementById(`point4-p`);
                p1.style.left = `${dragPoint.avatar.style.left}px`;
                p1.style.top = `${parseInt(dragPoint.avatar.style.top, 10) - 40}px`;
                p1.textContent = `(${dragPoint.avatar.style.left};${parseInt(dragPoint.avatar.style.top, 10) - 40})`;
                rectAgnlePoints[2] = {
                    point: `point3`,
                    X: parseInt(dragPoint.avatar.style.left,10),
                    Y: parseInt(dragPoint.avatar.style.top, 10) - 40
               };
                rectAgnlePoints[3] = {
                    point: `point4`,
                    X: parseInt(dragPoint.avatar.style.left,10),
                    Y: parseInt(dragPoint.avatar.style.top, 10) - 40
                };
                break;
            }
        }
    }
