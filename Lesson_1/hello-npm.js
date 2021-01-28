//1) Установить Node.js и запустить примеры из урока: hello.js в
//интерактивной консоли, hello.js из файла и hello-npm.js

const ansi = require("ansi");
const cursor = ansi(process.stdout);
cursor.beep();


// 3) Продвинутый блок: создать с помощью Node.js API консольную
// программу, которая будет выводить что-либо в консоль разными
// цветами и издавать звук(и) с помощью модуля или модулей,
//     отличных от рассмотренного на уроке.
const colors = require('colors');
console.log('hello'.green);
console.log('inverse the color'.green.inverse);
console.log('Node is cool'.rainbow);
console.log('Run the trap'.trap);
