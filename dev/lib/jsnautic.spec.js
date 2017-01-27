
/*
 *     jsnautic.spec.js
 *     2015-2016 by Andrii Sorokin
 */

import $_N from './jsnautic';
import {describe, it, before, beforeEach} from 'mocha';

describe('jsNautic', () => {
    describe('getIndexOfElementByClass', () => {

        let div = document.createElement('div');
        let newChild;
        let spanList;

        before(() => {
            for (let i = 0; i < 5; i++) {
                newChild = document.createElement('span');
                newChild.classList.add('green');
                div.appendChild(newChild);
            }
            spanList = div.getElementsByTagName('span');
            spanList[2].classList.add('red');
        });

        it('return index of element with class name' , () => {
            expect($_N.getIndexOfElementByClass(spanList, 'red')).to.equal(2);
            expect($_N.getIndexOfElementByClass(spanList, 'green')).to.equal(0);
        })

        it('return null, if class don\'t found' , () => {
            expect($_N.getIndexOfElementByClass(spanList, 'blue')).to.be.null;
        })

        it('return undefined if arguments isn\'t correct' , () => {
            expect($_N.getIndexOfElementByClass()).to.be.undefined;
            expect($_N.getIndexOfElementByClass(spanList)).to.be.undefined;
            expect($_N.getIndexOfElementByClass({}, 'red')).to.be.undefined;
            expect($_N.getIndexOfElementByClass(spanList, {})).to.be.undefined;
        })

    });

    describe('toggleClassToIndex', () => {

        let div = document.createElement('div');
        let newChild;
        let spanList;

        before(() => {
            for (let i = 0; i < 5; i++) {
                newChild = document.createElement('span');
                newChild.classList.add('green');
                div.appendChild(newChild);
            }
            spanList = div.getElementsByTagName('span');
            spanList[2].classList.add('red');
        });

        it('return true if toggle was succesfull' , () => {
            expect($_N.toggleClassToIndex(spanList, 'orange', 2)).to.be.true;
            spanList[2].classList.contains('orange').should.be.true;
        })

        it('return null, if index element don\'t found, classes shouldn\'t change ' , () => {
            expect($_N.toggleClassToIndex(spanList, 'orange', 5)).to.be.null;
            spanList[2].classList.contains('orange').should.be.true;
        })

        it('return undefined if arguments aren\'t correct' , () => {
            expect($_N.toggleClassToIndex()).to.be.undefined;
            expect($_N.toggleClassToIndex(spanList)).to.be.undefined;
            expect($_N.toggleClassToIndex(spanList, 'red')).to.be.undefined;
            expect($_N.toggleClassToIndex({}, 'red', 2)).to.be.undefined;
            expect($_N.toggleClassToIndex(spanList, {}, 1)).to.be.undefined;
            expect($_N.toggleClassToIndex(spanList, 'red', '')).to.be.undefined;
        })

    });

    describe('replaceClassInElement', () => {

        let element = document.createElement('div');

        beforeEach(() => {
            element.classList.add('super');
            element.classList.remove('awesome');
        })

        it('return true if replacing was succesfull' , () => {
            expect($_N.replaceClassInElement(element, 'super', 'awesome' )).to.be.true;
        })

        it('after replace element containts only new class' , () => {
            $_N.replaceClassInElement(element, 'super', 'awesome');
            expect(element.classList.contains('awesome')).to.be.true;
            expect(element.classList.length).to.equal(1);
        })

        it('return null if removing class not found' , () => {
            expect($_N.replaceClassInElement(element, 'good', 'awesome')).to.be.null;
        })

        it('return false if arguments aren\'t correct' , () => {
            expect($_N.replaceClassInElement()).to.be.undefined;
            expect($_N.replaceClassInElement(element)).to.be.undefined;
            expect($_N.replaceClassInElement(element, '', 'awesome')).to.be.undefined;
            expect($_N.replaceClassInElement({}, 'super', 'awesome')).to.be.undefined;
            expect($_N.replaceClassInElement(element, 'super', {})).to.be.undefined;
        })

    });

    describe('replaceClassInNodeList', () => {

        let div = document.createElement('div');
        let newChild;
        let spanList;

        before(() => {
            for (let i = 0; i < 5; i++) {
                newChild = document.createElement('span');
                newChild.classList.add('green');
                div.appendChild(newChild);
            }
        });

        beforeEach(() => {
            spanList = div.getElementsByTagName('span');
            for (let i = 0; i < 5; i++) {
                spanList[i].classList.add('green');
                spanList[i].classList.remove('red');
                spanList[i].classList.remove('blue');
                spanList[i].classList.remove('yellow');
            }
        })

        it('return true if replacing was succesfull' , () => {
            expect($_N.replaceClassInNodeList(spanList, 'green', 'blue')).to.be.true;
        })

        it('after replace target element containts only new class,' +
            'other elements isn\'t changed' , () => {
            spanList[2].classList.add('red');
            expect($_N.replaceClassInNodeList(spanList, 'red', 'yellow')).to.be.true;
            expect(spanList[2].classList.contains('yellow')).to.be.true;
            expect(spanList[3].classList.contains('green')).to.be.true;
            expect(spanList[3].classList.contains('yellow')).to.be.false;
        })

        it('return null if removing class not found' , () => {
            expect($_N.replaceClassInNodeList(spanList, 'purple', 'blue')).to.be.null;
        })

        it('return undefined if arguments aren\'t correct' , () => {
            expect($_N.replaceClassInNodeList()).to.be.undefined;
            expect($_N.replaceClassInNodeList(spanList)).to.be.undefined;
            expect($_N.replaceClassInNodeList({}, 'red', 'yellow')).to.be.undefined;
            expect($_N.replaceClassInNodeList(spanList, '', 'yellow')).to.be.undefined;
            expect($_N.replaceClassInNodeList(spanList, 'purple', {})).to.be.undefined;
        })
    });

    describe('removeClassInNodeList', () => {

        let div = document.createElement('div');
        let newChild;
        let spanList;

        before(() => {
            for (let i = 0; i < 5; i++) {
                newChild = document.createElement('span');
                newChild.classList.add('green');
                div.appendChild(newChild);
            }
        });

        beforeEach(() => {
            spanList = div.getElementsByTagName('span');
            for (let i = 0; i < 5; i++) {
                spanList[i].classList.add('green');
                spanList[i].classList.add('red');
            }
        })

        it('return true if replacing was succesfull' , () => {
            expect($_N.removeClassInNodeList(spanList, 'green')).to.be.true;
        })

        it('after remove elements containt only class' , () => {
            expect($_N.removeClassInNodeList(spanList, 'red')).to.be.true;
            expect(spanList[2].classList.contains('red')).to.be.flase;
            expect(spanList[3].classList.contains('green')).to.be.true;
            expect(spanList[3].classList.contains('yellow')).to.be.false;
        })

        it('return null if removing class not found' , () => {
            expect($_N.removeClassInNodeList(spanList, 'purple')).to.be.null;
        })

        it('return undefined if arguments aren\'t correct' , () => {
            expect($_N.removeClassInNodeList()).to.be.undefined;
            expect($_N.removeClassInNodeList(spanList)).to.be.undefined;
            expect($_N.removeClassInNodeList({}, 'red', 'yellow')).to.be.undefined;
            expect($_N.removeClassInNodeList(spanList, '')).to.be.undefined;
        })
    });
});