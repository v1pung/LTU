function checkbg() {

}


function AnomalMaxCalc() {
    let n = ChisloYchastkov.value;

    for(let i = 1; i <= n; i++) {
        element1 = "ploshad" + i;
        if((document.getElementById(element1).value - SredPloshad.value) / Otklonenie.value >= koef.value) {
            document.getElementById(element1).value = Math.floor(0.99 * (koef.value * Otklonenie.value+ +SredPloshad.value));
            document.getElementById(element1).style.background = 'white';
        }
    }
}


function AnomalMax() {
    let mymax = 0;
    let n = ChisloYchastkov.value;

    for(let i = 1; i <= n; i++) {
        element1 = "ploshad" + i;
        if (document.getElementById(element1).value > Number(mymax) && (document.getElementById(element1).value - SredPloshad.value) / Otklonenie.value < koef.value) {
            mymax = document.getElementById(element1).value
            }
    }
    for(let i = 1; i <= n; i++) {
        element1 = "ploshad" + i;
        if((document.getElementById(element1).value - SredPloshad.value) / Otklonenie.value >= koef.value) {
            document.getElementById(element1).value = Math.floor(mymax);
            document.getElementById(element1).style.background = 'white';
        }
    }
}



function AnomalMid() {
    let n = ChisloYchastkov.value;

    for(let i = 1; i <= n; i++) {
        element1 = "ploshad" + i;
        if((document.getElementById(element1).value - SredPloshad.value) / Otklonenie.value >= koef.value) {
            document.getElementById(element1).value = Math.floor(SredPloshad.value);
            document.getElementById(element1).style.background = 'white';
        }
    }
}



function AnomalHide() {
    let myarray = [];
    let j = 0;
    let n = ChisloYchastkov.value;
    
    for(let i = 1; i <= n; i++) {
        element1 = "ploshad" + i;
        if((document.getElementById(element1).value - SredPloshad.value) / Otklonenie.value < koef.value) {
            myarray[j] = document.getElementById(element1).value;
            j += 1;
        }
    }

    ChisloYchastkov.value = j;
    TableYchastki();

    for(let i = 1; i <= j; i++) {
        element1 = "ploshad" + i;
        document.getElementById(element1).value = myarray[i-1];
    }
}


function TableYchastki() {
    let n = ChisloYchastkov.value;
    div1.style.display = "block";
    div1.innerHTML = "";
    
    for(let i = 1; i <= n; i++) {
        if (i <= n) {
            div1.innerHTML = div1.innerHTML + "<input type=button value='-' onClick='AnomalHide(), Calc()' id='Button3'>"
            div1.innerHTML = div1.innerHTML + "<input type=button value='mid' onClick='AnomalMid(), Calc()' id='Button4'>"
            div1.innerHTML = div1.innerHTML + "<input type=button value='max' onClick='AnomalMax(), Calc()' id='Button5'>"
            div1.innerHTML = div1.innerHTML + "<input type=button value='maxA' onClick='AnomalMaxCalc(), Calc()' id='Button6'>"
            div1.innerHTML += "<div style='display: inline-block; width: 400px;'>Площадь повреждённой территории на " + i + " участке:</div><input type='text' id='ploshad" + i + "'><br>";
        }
    }


    div1.innerHTML = div1.innerHTML + "<hr><input type=button value='Поиск аномальных значений' onClick='Calc()' id='Button2'><br>"



    div1.innerHTML = div1.innerHTML + "Общая площадь повреждённой территории: <input type=text id='SumPloshad'><br>"
    div1.innerHTML = div1.innerHTML + "Средняя площадь повреждённой территории: <input type=text id='SredPloshad'><br>"
    div1.innerHTML = div1.innerHTML + "Среднеквадратическое отклонение: <input type=text id='Otklonenie'><br>"
    div1.innerHTML = div1.innerHTML + "Коэффициент: <input type=text id='koef'><br>"
}

function Calc() {
    let n = ChisloYchastkov.value;
    let k = 2.146;

    if (n > 0 && n <= 5) {
            k = 1.791;
    } 
    else if (n > 5 && n <= 10) {
        k = 2.146;
    } 
    else if (n > 10 && n <= 15) {
        k = 2.321;
    } 
    else if (n > 15 && n <= 20) {
        k = 2.447;
    }
    else if (n > 20 && n <= 25) {
        k = 2.537;
    }
    else if (n > 25 ) {
        k = 2.633;
    }

    koef.value = k;

    SumPloshad.value = 0;
    SredPloshad.value = 0;
    Otklonenie.value = 0;

    for(let i = 1;i <= n; i++) {
        if(i <= n) {
            element1 = "ploshad" + i;
            SumPloshad.value =+ SumPloshad.value+ + document.getElementById(element1).value;
        }
    }

    SredPloshad.value = SumPloshad.value / n;

    for(let i = 1;i <= n; i++) {
        if(i <= n) {
            element1 = "ploshad" + i;
            Otklonenie.value =+ Otklonenie.value + Math.pow(document.getElementById(element1).value - SredPloshad.value, 2);
        }
    }

    Otklonenie.value = Math.sqrt(Otklonenie.value / n);

    for (let i = 1; i <= n; i++) {
            let element1 = "ploshad" + i;
            let deviation = (document.getElementById(element1).value - SredPloshad.value) / Otklonenie.value;
            if (deviation >= k) {
                document.getElementById(element1).style.background = 'red';
            } 
            else {
                document.getElementById(element1).style.background = '';
            }
        }
}

function FillTestData() {
    let testData = [1, 10, 20, 15, 25, 100];
    ChisloYchastkov.value = testData.length;

    TableYchastki(); // Создаем таблицу участков

    // Заполняем поля тестовыми данными
    for (let i = 1; i <= testData.length; i++) {
        document.getElementById('ploshad' + i).value = testData[i-1];
    }
}
