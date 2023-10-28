document.addEventListener("DOMContentLoaded", () => {

    const btnNums = document.querySelectorAll(".num")
    const lowerDisplay = document.querySelector(".lower-display")
    const upperDisplay = document.querySelector(".upper-display")
    const btnDel = document.querySelector(".del")
    const btnNegPos = document.querySelector(".toggleNegPos")
    const btnAC = document.querySelector(".allClear")
    const btnDecimal = document.querySelector(".decimal")
    const btnOperations = document.querySelectorAll(".operation")
    const btnCalc = document.querySelector(".calculate")

    //operations
    btnOperations.forEach((btnOperation) => {
        btnOperation.addEventListener("click", () => {
            if (lowerDisplay.textContent != "") {
                if(upperDisplay.textContent.charAt(upperDisplay.textContent.length - 1) === "=") {
                    upperDisplay.textContent = `${lowerDisplay.textContent} ${btnOperation.textContent}`
                } else {
                    upperDisplay.textContent = `${upperDisplay.textContent} ${lowerDisplay.textContent} ${btnOperation.textContent}`;
                }
                lowerDisplay.textContent = "";
            }
        })
    })

    //calculate
    btnCalc.addEventListener("click", () => {
        calculate(upperDisplay, lowerDisplay)
    })

    //Display clicked numbers on the lower display
    btnNums.forEach((btnNum) => {
        btnNum.addEventListener("click", () => {
            const num = btnNum.textContent;
            if(lowerDisplay.textContent === "0"){
                lowerDisplay.textContent = num;
            } else {
                lowerDisplay.textContent = lowerDisplay.textContent + num;
            }
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
        } else if (lowerDisplay.textContent.charAt(0) != "0") {
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

    //Keyboard press event listener
    document.addEventListener('keypress', (event) => {
        if (!isNaN(parseInt(event.key))) {
            if(lowerDisplay.textContent === "0"){
                lowerDisplay.textContent = event.key;
            } else {
                lowerDisplay.textContent = lowerDisplay.textContent + event.key;
            }
        } else if (event.key === "/" || event.key === "*" || event.key === "-" || event.key === "+") {

            let sign;

            if(event.key === "/") {
                sign = '\u00F7';
            } else if (event.key === "*") {
                sign = '\u00D7';
            } else if (event.key === "-") {
                sign = '\u2212';
            } else {
                sign = '\u002B';   
            }

            if (lowerDisplay.textContent != "") {
                if(upperDisplay.textContent.charAt(upperDisplay.textContent.length - 1) === "=") {
                    upperDisplay.textContent = `${lowerDisplay.textContent} ${sign}`
                } else {
                    upperDisplay.textContent = `${upperDisplay.textContent} ${lowerDisplay.textContent} ${sign}`;
                }
                lowerDisplay.textContent = "";
            }
        } else if (event.key === "Enter" || event.key === "=") {
            calculate(upperDisplay, lowerDisplay)
        }
    })

});

function calculate(upperDisplay, lowerDisplay) {
    upperDisplay.textContent = `${upperDisplay.textContent} ${lowerDisplay.textContent}`

        let array = upperDisplay.textContent.trim().split(" ");
        let result, oper = "";
        
        for(let i = 0; i < array.length; i++) {
            if (result == null){
                result = parseFloat(array[i])
            } else {
                if(array[i] === '\u002B'){ //Plus
                    oper = "plus"
                } else if (array[i] === '\u2212') { //Minus
                    oper = "minus"
                } else if (array[i] === '\u00D7') { //multiply
                    oper = "multiply"
                } else if (array[i] === '\u00F7') { //divide
                    oper = "divide"
                } else if (array[i] === '%') { //remainder
                    oper = "remainder"
                } else { //Numbers except the first number
                    num = parseFloat(array[i])

                    //calculate
                    if(oper === "plus") {
                        result = result + num
                    } else if(oper === "minus") {
                        result = result - num
                    } else if(oper === "multiply") {
                        result = result * num
                    } else if(oper === "divide") {
                        result = Math.round((result / num) * 10000) / 10000
                    } else { //remainder
                        result = result % num
                    }
                }
            }
        }
        upperDisplay.textContent = `${upperDisplay.textContent} =`
        lowerDisplay.textContent = `${result}`
}