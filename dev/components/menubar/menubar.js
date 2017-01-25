/*
 *     menubar.js for jChess project
 *     2016 by Andrii Sorokin
 *     https://github.com/ignorantic/jchess.git
 */

export default function initMenubar() {
    'use strict';
    document.querySelector('.menubar__btn').addEventListener('click', function () {
        let btn = document.querySelector('.menubar__btn-icon'),
            menu = document.querySelector('.menu');
        btn.classList.toggle('menubar__btn-icon_active');
        menu.classList.toggle('menu_dropdown');
    }, false);
}