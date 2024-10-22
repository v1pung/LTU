let parametr=location.search.substring(1).split("&");

function myLoad() {
    if(localStorage["ChisloYchastkov"] > 0) {ChisloYchastkov.value = localStorage["ChisloYchastkov"];}
    if(parametr.length > 1) { ChisloYchastkov.value = parametr.length; TableYchastki();Calc();}
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
            localStorage[element1] = document.getElementById(element1).value;
            SumPloshad.value =+ SumPloshad.value+ + document.getElementById(element1).value;

            maxv = 0
            if (parseFloat(document.getElementById(element1).value) > maxv) {
                maxv=parseFloat(document.getElementById(element1).value)
            }

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
            let element2 = "lolkek" + i;
            let deviation = (document.getElementById(element1).value - SredPloshad.value) / Otklonenie.value;
            if (deviation >= k) {
                document.getElementById(element1).style.background = 'red';

                document.getElementById(element2).innerHTML = "<input type=button value='-' onClick='AnomalHide(), Calc()' id='Button${i}'>"
                + "<input type=button value='mid' onClick='AnomalMid(), Calc()' id='Button${i}'>" 
                + "<input type=button value='max' onClick='AnomalMax(), Calc()' id='Button${i}'>"
                + "<input type=button value='maxA' onClick='AnomalMaxCalc(), Calc()' id='Button${i}'>";
                
            } 
            else {
                document.getElementById(element1).style.background = '';
                document.getElementById(element2).innerHTML = '';
            }
        }
        CanvDraw()
}

function FillTestData() {
    let testData = [10, 10, 10, 15, 25, 200];
    ChisloYchastkov.value = testData.length;

    TableYchastki(); // Создаем таблицу участков

    // Заполняем поля тестовыми данными
    for (let i = 1; i <= testData.length; i++) {
        document.getElementById('ploshad' + i).value = testData[i-1];
    }
}

function Next() {
    TableYchastki();
    Calc();
    mytextarea.value = "";
}

function TableYchastki() {
    let n = ChisloYchastkov.value;

    let a = mytextarea.value.split(/$\s*/m);

    if (a.length==0) {
        n=ChisloYchastkov.value;
    }

    else {
        n=a.length;
        ChisloYchastkov.value=n;
    }


    div1.style.display = "block";
    div1.innerHTML = "";

    for(let i = 1; i <= n; i++) {
        if (i <= n) {
            element1 = "ploshad" + i;

            if (localStorage[element1] == undefined) {
                localStorage[element1] = ""
            }
            if (parametr.length > 1) { localStorage[element1] = parametr[i - 1]; }
            div1.innerHTML += "<div style='display: inline-block; width: 400px;'>Площадь повреждённой территории на <b>" + i + " участке</b>:</div><input type='text' id='ploshad" + i + "' value='"+localStorage[element1]+"'><div id='lolkek" + i + "' style='display:inline-block'></div><br>";
        }
    }


    div1.innerHTML = div1.innerHTML + "<hr><input type=button value='Поиск аномальных значений' onClick='Calc()' id='Button2'><br>"



    div1.innerHTML = div1.innerHTML + "Общая площадь повреждённой территории: <input type=text id='SumPloshad'><br>"
    div1.innerHTML = div1.innerHTML + "Средняя площадь повреждённой территории: <input type=text id='SredPloshad'><br>"
    div1.innerHTML = div1.innerHTML + "Среднеквадратическое отклонение: <input type=text id='Otklonenie'><br>"
    div1.innerHTML = div1.innerHTML + "Коэффициент: <input type=text id='koef'><br>"

    if (a.length>0) {
        for (let i=1;i<=n;i++) {
            element1 = "ploshad" + i;
            document.getElementById(element1).value = a[i-1];
        }
    }

    localStorage["ChisloYchastkov"] = n;
}

function savedtext(){
    let n=ChisloYchastkov.value;
    let mysavedtext="";
    for(let i=1;i<=n;i++)
    {
    element1="ploshad"+i;
    mysavedtext=mysavedtext+document.getElementById(element1).value+';';
    }
    document.write('<a href="data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent(mysavedtext) + '" download="значения.txt">значения.txt</a>');
}

function deletepole(){
    let n=ChisloYchastkov.value;
    for(let i=1;i<=n;i++)
    {
    element1="ploshad"+i;
    document.getElementById(element1).value="";
    localStorage[element1]="";
    }
    Calc();
}


function preSaveCheck() {
        if (checkForAnomal().anomalFound) {
          userConfirmation = confirm(
            "В данных все еще могут быть аномальные значения. Точно сохранить?"
          );
          if (userConfirmation) {
            savedtext();
          }
        } else {
          savedtext();
        }
      }

function loadNumbersFromCells() {
    let result = [];
    for (let i = 1; i < Number.MAX_SAFE_INTEGER; i++) {
      try {
        let cell = document.getElementById("ploshad" + i);
        result[i] = cell.value;
      } catch (error) {
        return result;
      }
    }
}

function getK(n) {
    if (n <= 5) {
      return 1.791;
    } else if (5 < n < 10) {
      return 2.146;
    } else if (15 < n < 20) {
      return 2.447;
    } else if (20 < n < 25) {
      return 2.537;
    } else if (25 < n) {
      return 2.633;
    } else {
      return 2.146;
    }
}

function checkForAnomal() {
    let numbers = loadNumbersFromCells();
    n = numbers.length;
    k = getK(numbers.length);

    clearNumbers = [];
    clearIndexes = [];

    anomalNumbers = [];
    anomalIndexes = [];

    for (let i = 0; i < n; i++) {
      if ((numbers[i] - SredPloshad.value) / Otklonenie.value >= k) {
        anomalIndexes.push(i);
        anomalNumbers.push(numbers[i]);
      } else {
        clearIndexes.push(i);
        clearNumbers.push(numbers[i]);
      }
    }
    const anomalFound = anomalIndexes.length > 0 ? true : false;

    return {
      clearIndexes: clearIndexes,
      clearNumbers: clearNumbers,
      anomalIndexes: anomalIndexes,
      anomalNumbers: anomalNumbers,
      anomalFound: anomalFound,
    };
}

function CanvDraw() {
    let max = koef.value * Otklonenie.value + +SredPloshad.value;
    let mid = parseFloat(SredPloshad.value);
    let disp = mid + parseFloat(Otklonenie.value);
    let canv = document.getElementById("canv");
    let ctx = canv.getContext('2d');
    let koord;

    canv.width = 600;
    canv.height = 300;

    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.moveTo(5.5,5.5);
    ctx.lineTo(3.5,15.5);
    ctx.moveTo(5.5,5.5);
    ctx.lineTo(7.5,15.5);
    ctx.moveTo(5.5,5.5);
    ctx.lineTo(5.5,280.5);
    ctx.lineTo(590.5,280.5);
    ctx.lineTo(580.5,278.5);
    ctx.moveTo(590.5,280.5);
    ctx.lineTo(580.5,282.5);
    ctx.stroke();

    let n = ChisloYchastkov.value;

    // pov = podshet povtorov koorda
    // функция повторов работает нормально

    // let i = 10 * n
    // for { рисуем крестик + i по оси y чтобы они повторялись}
    // нужно как-то их нарисовать

//    for(let i = 1; i <= n, i++) {
//        element1 = "ploshad" + i;
//        koord = document.getElementById(element1).value;
//
//        pov = povtor(loadNumbersFromCells(), koord)
//    }

    for(let i = 1; i <= n; i++)
    {
        element1 = "ploshad" + i;
        koord = document.getElementById(element1).value;

        ctx.moveTo(5.5+570.5*koord/maxv-3,152.5);
        ctx.lineTo(5.5+570.5*koord/maxv+3,146.5);
        ctx.stroke();
        ctx.moveTo(5.5+570.5*koord/maxv+3,152.5);
        ctx.lineTo(5.5+570.5*koord/maxv-3,146.5);
        ctx.stroke();
    }
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.moveTo(5.5+570.5*max/maxv,5.5);
    ctx.lineTo(5.5+570.5*max/maxv,280.5);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.moveTo(5.5+570.5*mid/maxv,5.5);
    ctx.lineTo(5.5+570.5*mid/maxv,280.5);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.strokeStyle = "yellow";
    ctx.moveTo(5.5+570.5*disp/maxv,5.5);
    ctx.lineTo(5.5+570.5*disp/maxv,280.5);
    ctx.stroke();
    ctx.closePath();
}

function povtor(myarray, value) {
    let count = 0;
    array = myarray.slice(1)
    console.log(array)
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            count++;
        }
    }
    return count;
}
//создание глобальнйо переменной, добавить в место, где проверяем на красный цвет, а потом добавка в кнопку сохранить