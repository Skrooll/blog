const canvas = document.getElementById('background-canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');
const nPoints = 400;
const points = [];
const minSpeed = 5;
const deltaSpeed = 10;
const maxBondLength = 140;
const fps = 60;
const timeDelta = 1/fps;
for (let i=0; i<nPoints; i++) {
    let angle = Math.random()*2*Math.PI;
    points.push([
        Math.random()*canvas.width,
        Math.random()*canvas.height,
        (minSpeed+Math.random()*deltaSpeed)*Math.cos(angle),
        (minSpeed+Math.random()*deltaSpeed)*Math.sin(angle),
    ]);
}

function updateBackground() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let point of points) {
        point[0] += point[2]*timeDelta;
        point[1] += point[3]*timeDelta;
        if (point[0]<0 || point[0]>canvas.width || point[1]<0 || point[1]>canvas.height) {
            let angle = Math.random()*2*Math.PI;
            point[0] = Math.random()*canvas.width;
            point[1] = Math.random()*canvas.height;
            point[2] = (minSpeed+Math.random()*deltaSpeed)*Math.cos(angle);
            point[3] = (minSpeed+Math.random()*deltaSpeed)*Math.sin(angle);
        }
        [x, y, vx, vy] = point;
        context.beginPath();
        context.arc(x, y, 3, 0, 2*Math.PI);
        context.fill();
    }
    for (let i=0; i<nPoints; i++) {
        for (let j=i+1; j<nPoints; j++) {
            let distance = Math.sqrt((points[i][0]-points[j][0])**2 + (points[i][1]-points[j][1])**2);
            if (distance < maxBondLength) {
                context.strokeStyle = 'rgba(0, 0, 0, ' + Math.floor((1-distance/maxBondLength)*100)/100 + ')'; 
                context.beginPath();
                context.moveTo(points[i][0], points[i][1]);
                context.lineTo(points[j][0], points[j][1]);
                context.stroke();
            }
        }
    }
}

updateBackground();
setInterval(updateBackground, 1000*timeDelta);
