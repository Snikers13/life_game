'use strict';
const canvas = document.getElementById('main');
const ctx = canvas.getContext('2d');
const restart = document.getElementById('restart');
let mas = [];
let count = 0;

function set () { 
	for (let x = 0.5; x < 500; x += 10) {
		ctx.moveTo(x, 0);
		ctx.lineTo(x, 500);
	}

	for (let y = 0.5; y < 500; y += 10) {
		ctx.moveTo(0, y);
  		ctx.lineTo(500, y);
	}

	ctx.strokeStyle = "#888";
	ctx.stroke();

}
set();

let st = canvas.addEventListener('click', (ev) => {
	let x = ev.offsetX;
	let y = ev.offsetY;
	x = Math.floor(x/10); //500 / 10 = 50;
	y = Math.floor(y/10);
	mas[y][x] = 1;
	drawField();
	set();

})

restart.addEventListener('click', () => {
	let y = confirm(`Are you sure?`);
	if (y) {
		alert('Game over');
		window.location.reload();
	} 
	return;
})

function goLife () {
	let n = 50, m = 50;
	for (let i=0; i < m; i++) {
		mas[i] = [];
		for (let j = 0; j < n; j++) {
			mas[i][j] = 0;
		}
	}
}
goLife();

function drawField() {
	ctx.clearRect(0, 0, 500, 500);

	for (let i=0; i < 50; i++) {
		for (let j = 0; j < 50; j++) {
			if (mas[i][j] === 1) {
				ctx.fillRect(j * 10, i * 10, 10, 10);
			}
		}
	}
}

function startLife() {
	//life
	let timer;
	let mas2 = [];
	for (let i = 0; i < 50; i++) {
		mas2[i] = [];
		for (let j = 0; j < 50; j++) {
			let neighbors = 0;

			if (mas[fpm(i) - 1][j] === 1) neighbors++; //up
			if (mas[i][fpp(j) + 1] === 1) neighbors++; //right
			if (mas[fpp(i) + 1][j] === 1) neighbors++; //bottom
			if (mas[i][fpm(j) - 1] === 1) neighbors++; //left
			if (mas[fpm(i) - 1][fpp(j) + 1] === 1) neighbors++; 
			if (mas[fpp(i) + 1][fpp(j) + 1] === 1) neighbors++; 
			if (mas[fpp(i) + 1][fpm(j) - 1] === 1) neighbors++; 
			if (mas[fpm(i) - 1][fpm(j) - 1] === 1) neighbors++;

			(neighbors === 2 || neighbors === 3) ? mas2[i][j] = 1 : mas2[i][j] = 0;
		}
	}
	mas = mas2;
	count++;
	document.getElementById('count').innerHTML = count;
	drawField();
	set();
	timer = setTimeout(startLife, 1000);
	
}

function fpm(i) {
	if (i === 0) return 50;
	else return i;
}

function fpp(i) {
	if (i === 49) return -1;
	else return i;
}

document.getElementById('start').addEventListener('click', () => {
	startLife();
});