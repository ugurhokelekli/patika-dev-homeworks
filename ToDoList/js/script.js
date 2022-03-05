const liste = document.querySelector("#list");
const ekle = document.querySelector("#add");
const gorev = document.querySelector("#task");

ekle.addEventListener("click", clickEvent);


function clickEvent() {
    if (gorev) {
        let li = document.createElement("li");
        li.textContent = gorev.value;
        liste.appendChild(li);
        gorev.value = "";
    }
};
