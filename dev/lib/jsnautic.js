
/*
 *     jsNautic ~ jsnautic.js
 *     2015-2016 by Andrii Sorokin
 */

export default class $_N {

    static getIndexOfElementByClass(nodeList, className) {

        if (typeof nodeList !== 'object') return undefined;
        if (typeof nodeList[0] !== 'object' || !nodeList[0].classList) return undefined;
        if (typeof className !== 'string' || !className) return undefined;

        for (let i = 0; i < nodeList.length; i++) {
            if (nodeList[i].classList.contains(className)) {
                return i;
            }
        }
        return null;
    }

    static toggleClassToIndex(nodeList, className, index) {

        if (typeof nodeList !== 'object') return undefined;
        if (typeof nodeList[0] !== 'object' || !nodeList[0].classList || !className) return undefined;
        if (typeof className !== 'string' || typeof index !== 'number') return undefined;

        if ((index >= 0) && (index < nodeList.length)) {
            for (let i = 0; i < nodeList.length; i++) {
                nodeList[i].classList.remove(className);
            }
            nodeList[index].classList.add(className);
            return true;
        }
        else return null;
    }

    static replaceClassInElement(elem, rmClass, insClass) {

        if (typeof elem !== 'object' || !elem.classList || !rmClass || !insClass) return undefined;
        if (typeof insClass !== 'string' || typeof rmClass !== 'string') return undefined;
        if (!elem.classList.contains(rmClass)) return null;

        elem.classList.add(insClass);
        elem.classList.remove(rmClass);
        return true;
    }

    static replaceClassInNodeList(nodeList, rmClass, insClass) {

        let result = null;
        if (typeof nodeList !== 'object') return undefined;
        if (typeof nodeList[0] !== 'object' || !nodeList[0].classList || !rmClass || !insClass) return undefined;
        if (typeof insClass !== 'string' || typeof rmClass !== 'string') return undefined;

        for (let i = 0; i < nodeList.length; i++) {
            if (nodeList[i].classList.contains(rmClass)) {
                result = true;
                nodeList[i].classList.add(insClass);
                nodeList[i].classList.remove(rmClass);
            }
        }
        return result;
    }
}