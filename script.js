let input = document.querySelector("#text");
let main = document.querySelector(".main");
let textarea = document.querySelector(".textarea");
let container = document.querySelector(".container");
let form = document.querySelector("form");
let add = document.querySelector("#add");
let starttext = document.querySelector(".starttext");

let currentlyEditing = null;

add.addEventListener("click", function (det) {
    det.preventDefault();

    if (input.value.trim() === "") {
        alert("try again");
    }

    else {
        let todo = document.createElement("div");
        todo.classList.add("todo");
        let inp = document.createElement("input");
        inp.id = "checkbox";
        inp.type = "checkbox";
        let h5 = document.createElement("h5");
        h5.classList.add("complete");
        h5.textContent = input.value;
        let del = document.createElement("button");
        del.id = "del";
        del.textContent = "Delete";
        let edit = document.createElement("button");
        edit.id = "edit";
        edit.textContent = "Edit";
        edit.classList.add = ("hide");
        function toggleE(el) {
            el.classList.toggle("hide");
        }

        inp.addEventListener("click", function () {

            let editch = todo.querySelector("input[type='text']");

            if (editch) {

                if (editch.value.trim() !== "") {
                    h5.textContent = editch.value;
                    h5.classList.remove("hide");
                    editch.remove();
                }
                else {
                    todo.remove();
                    return;
                }

            }

            h5.classList.toggle("completed");
            toggleE(edit);

        });
        del.addEventListener("click", function () {
            if (currentlyEditing === todo) currentlyEditing = null;
            todo.remove();
        });

        let editinp;

        edit.addEventListener("click", function () {
            if (currentlyEditing && currentlyEditing !== todo) {
                currentlyEditing.querySelector("h5").textContent =
                    currentlyEditing.querySelector("input[type=text]").value;
                currentlyEditing.querySelector("h5").classList.remove("hide");
                currentlyEditing.querySelector("input[type=text]").remove();
                currentlyEditing = null;
            }

            if (!currentlyEditing) {
                editinp = document.createElement("input");
                editinp.type = "text";
                editinp.value = h5.textContent;

                todo.insertBefore(editinp, h5);

                toggleE(h5);


                currentlyEditing = todo;

                editinp.addEventListener("keypress", function (det) {
                    if (det.key == "Enter") {
                        if (editinp.value.trim() != "") {
                            saveEdit();
                        }
                        else {
                            todo.remove();
                            currentlyEditing = null;
                        }
                    }
                });
            }
            else {
                saveEdit();
            }

        });
        function saveEdit() {
            h5.textContent = editinp.value;
            h5.classList.remove("hide");
            editinp.remove();
            currentlyEditing = null;


        }
        todo.appendChild(inp);
        todo.appendChild(h5);
        todo.appendChild(del);
        todo.appendChild(edit);
        container.insertBefore(todo, container.firstChild);
        main.appendChild(container);

        input.value = "";
    }
});
