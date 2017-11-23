function calcDistance(x1, y1, x2, y2) {

    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}


function extend(Child, Parent) {
    var F = function () { };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;
}


function isAllElementsAreSame(elems) {
    var counter = 0,
            i;
    for (i = 0; i < elems.length; i++) {
        if (elems[0] == elems[i]) {
            counter++;
        }
    }
    if (counter == elems.length) {

        return true;
    }
    return false;
}

