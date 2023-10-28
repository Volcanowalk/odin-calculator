document.addEventListener("DOMContentLoaded", () => {

    const btnNums = document.querySelectorAll(".num")
    const lowerDisplay = document.querySelector(".lower-display")
    const upperDisplay = document.querySelector(".upper-display")
    const btnDel = document.querySelector(".del")
    const btnNegPos = document.querySelector(".toggleNegPos")
    const btnAC = document.querySelector(".allClear")
    const btnDecimal = document.querySelector(".decimal")

    //Display clicked numbers on the lower display
    btnNums.forEach((btnNum) => {
        btnNum.addEventListener("click", () => {
            const num = btnNum.textContent;
            lowerDisplay.textContent = lowerDisplay.textContent + num;
        });
    });

    //Delete the end character when 'DEL' button is clicked
    btnDel.addEventListener("click", () => {
        lowerDisplay.textContent = lowerDisplay.textContent.slice(0, -1);
        //If '-' sign is the only char left, delete it
        if(lowerDisplay.textContent.length = 1 && lowerDisplay.textContent === "-") {
            lowerDisplay.textContent = "";
        }

        //If the last character is 'decimal' point, delete it
        if(lowerDisplay.textContent.charAt(lowerDisplay.textContent.length - 1) === "."){
            console.log("true");
            lowerDisplay.textContent = lowerDisplay.textContent.slice(0, -1);
        }
    })

    //Toggle between negative sign and positive sign
    btnNegPos.addEventListener("click", () => {
        if (lowerDisplay.textContent.charAt(0) === "-"){
            lowerDisplay.textContent = lowerDisplay.textContent.slice(1, lowerDisplay.textContent.length)
        } else {
            lowerDisplay.textContent = "-" + lowerDisplay.textContent
        }
    })

    //All Clear button
    btnAC.addEventListener("click", () => {
        lowerDisplay.textContent = "";
        upperDisplay.textContent = "";
    })

    //Add decimal
    btnDecimal.addEventListener("click", () => {
        lowerDisplay.textContent = lowerDisplay.textContent + "."
    })

});
