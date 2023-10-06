function changePic(element) {
    console.log("test");
    element.style.opacity = 0;
    let newElement = document.getElementById(element.id.substr(0,4) + (element.id.charAt(5) + 1).toString());
    newElement.style.opacity=1;
}
let count = 0;