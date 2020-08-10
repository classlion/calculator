var numbers = document.querySelectorAll('.number'),
    operations = document.querySelectorAll('.operation'),
    clearBTNS = document.querySelectorAll('.clear_btn'),
    decimalBTN = document.getElementById('decimal'),
    ce = document.getElementById('ce'),
    c = document.getElementById('c'),
    resultBTN = document.getElementById('result'),
    display = document.getElementById('display'),
    MemoryCurrentNumber = 0,
    MemoryNewNumber = false,
    MemoryPendingOperation = '';


for (var i = 0; i < numbers.length; i++) {
    var number = numbers[i];
    number.addEventListener('click', function(e) {
        numberPress(e.target.textContent);
    })
};

for (var i = 0; i < operations.length; i++) {
    var operationBTN = operations[i];
    operationBTN.addEventListener('click', function(e) {
        operation(e.target.textContent);
    })
};

for (var i = 0; i < clearBTNS.length; i++) {
    var clear_btn = clearBTNS[i];
    clear_btn.addEventListener('click', function(e) {
        clear(e.srcElement.id);
    })
};

resultBTN.addEventListener('click', result);


decimalBTN.addEventListener('click', decimal);



function numberPress(number) {
    if (MemoryNewNumber) {
        display.value = number;
        MemoryNewNumber = false;
    } else {
        if (display.value === '0') {
            display.value = number;
        } else { display.value += number; };

    };
};

function operation(op) {
    var localOperationMemory = display.value;
    if (MemoryCurrentNumber && op !== '=') { // 1. Какая текущая операция затребована?
        display.value = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;
        if (MemoryPendingOperation === '+') {
            MemoryCurrentNumber += parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '-') {
            MemoryCurrentNumber -= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '*') {
            MemoryCurrentNumber *= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '/') {
            MemoryCurrentNumber /= parseFloat(localOperationMemory);
        } else {
            MemoryCurrentNumber = parseFloat(localOperationMemory);
        };
        display.value = MemoryCurrentNumber;

    };
    MemoryPendingOperation = op; // 2. Сохраняем последнюю запрошенную команду
};

function decimal(argument) {
    var localDecimalMemory = display.value;

    if (MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        };
    };

    display.value = localDecimalMemory;
};

function clear(id) {
    if (id === 'ce') {
        display.value = '0';
        MemoryNewNumber = true;
    } else if (id === 'c') {
        display.value = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
    }
}