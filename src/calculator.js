// Hello O_o
class Calculator{
    constructor(prevOperandText, curOperandText){
        this.prevOperandText = prevOperandText
        this.curOperandText = curOperandText
        this.clear()
    }

    clear(){
        this.prevOper = ""
        this.curOper = ""
        this.operation = undefined
    }

    delete(){
        this.curOper = this.curOper.toString().slice(0, -1)
    }

    appendNum(numb){
        if(numb === "," && this.curOper.includes(",")) return
        this.curOper = this.curOper.toString() + numb.toString()
    }

    currOperation(operation){
        if(this.curOper === "") return
        if(this.prevOper !== ""){
            this.compute()
        }
        this.operation = operation
        this.prevOper = this.curOper
        this.curOper = ""
    }

    compute(){
        let computation
        let prev = parseFloat(this.prevOper)
        let curr = parseFloat(this.curOper)
        if(isNaN(prev) || isNaN(curr)) return
        switch(this.operation){
            case "+":
                computation = prev + curr
                break
            case "-":
                computation = prev - curr
                break
            case "x":
                computation = prev * curr
                break
            case "÷":
                computation = prev / curr
                break
            default:
                return
        }
        this.curOper = computation
        this.operation = undefined
        this.prevOper = ""
    }

    getDisplayNum(number){
        const stringNum = number.toString()
        const integerDigits = parseFloat(stringNum.split(",")[0])
        const decimalDigits = stringNum.split(",")[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ""
        } else {
            integerDisplay = integerDigits
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay(){
        this.curOperandText.innerText = this.curOper
        if(this.operation != null) {
            this.prevOperandText.innerText = `${this.getDisplayNum(this.prevOper)} ${this.operation}`
        } else {
            this.prevOperandText.innerText = ""
        }
    }
}


// Constants
const numberButtons = document.querySelectorAll("#number")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector("[data-equals]")
const delButton = document.querySelector("[data-delete]")
const acButton = document.querySelector("[data-all-clear]")
const prevOperandText = document.querySelector("[data-previous-operand]")
const curOperandText = document.querySelector("[data-current-operand]")

const calculator = new Calculator(prevOperandText, curOperandText)

numberButtons.forEach(numb => {
    numb.addEventListener("click", () => {
        calculator.appendNum(numb.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(oper => {
    oper.addEventListener("click", () => {
        calculator.currOperation(oper.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener("click", button => {
    calculator.compute()
    calculator.updateDisplay()
})

acButton.addEventListener("click", button => {
    calculator.clear()
    calculator.updateDisplay()
})

delButton.addEventListener("click", button => {
    calculator.delete()
    calculator.updateDisplay()
})
