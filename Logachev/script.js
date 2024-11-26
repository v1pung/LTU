let parametr = location.search.substring(1).split("&");

function myLoad() {
    if (localStorage["ChisloYchastkov"] > 0) {
        ChisloYchastkov.value = localStorage["ChisloYchastkov"];
    }

    if (parametr.length > 1) { 
        ChisloYchastkov.value = parametr.length; 
        TableYchastki(); 
        Calc();
    }
}


function AnomalMaxCalc() {
    let n = ChisloYchastkov.value;

    for (let i = 1; i <= n; i++) {
        element1 = "ploshad" + i;

        if ((document.getElementById(element1).value - SredPloshad.value) / Otklonenie.value >= koef.value) {
            document.getElementById(element1).value = Math.floor(0.99 * (koef.value * Otklonenie.value+ +SredPloshad.value));
            document.getElementById(element1).style.background = 'white';
        }
    }
}


function AnomalMax() {
    let mymax = 0;
    let n = ChisloYchastkov.value;

    for (let i = 1; i <= n; i++) {
        element1 = "ploshad" + i;

        if (document.getElementById(element1).value > Number(mymax) &&
            (document.getElementById(element1).value - SredPloshad.value) / Otklonenie.value < koef.value) {
            mymax = document.getElementById(element1).value
            }
    }
    for (let i = 1; i <= n; i++) {
        element1 = "ploshad" + i;
        if((document.getElementById(element1).value - SredPloshad.value) / Otklonenie.value >= koef.value) {
            document.getElementById(element1).value = Math.floor(mymax);
            document.getElementById(element1).style.background = 'white';
        }
    }
}



function AnomalMid() {
    let n = ChisloYchastkov.value;

    for (let i = 1; i <= n; i++) {
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

    for (let i = 1; i <= j; i++) {
        element1 = "ploshad" + i;
        document.getElementById(element1).value = myarray[i-1];
    }
}

let koordstorage = ["180;0;170;20;230;30;250;0;",
    "260;0;240;35;280;55;310;0;",
    "330;0;300;55;340;75;380;0;",
    "390;0;360;80;600;150;600;0;",
    "155;35;200;80;600;200;600;170;",
    "20;5;60;65;40;160;190;120;120;20;",
    "45;260;110;250;120;300;60;300;",
    "210;120;240;125;245;300;160;300;",
    "270;135;440;170;360;300;260;300;",
    "455;173;540;200;520;300;380;300;"]

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

            element2="koord"+i;	
//            localStorage[element2]=document.getElementById(element2).value;
//            localStorage[element2] = koordstorage[i];
            document.getElementById(element2).value = koordstorage[i - 1]

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

            element2="koord"+i;	
            localStorage[element2]=document.getElementById(element2).value;

            Otklonenie.value =+ Otklonenie.value + Math.pow(document.getElementById(element1).value - SredPloshad.value, 2);
        }
    }

    Otklonenie.value = Math.sqrt(Otklonenie.value / n);

    for (let i = 1; i <= n; i++) {
            let element1 = "ploshad" + i;

            element2="koord"+i;	
            localStorage[element2]=document.getElementById(element2).value;

            let element3 = "lolkek" + i;
            let deviation = (document.getElementById(element1).value - SredPloshad.value) / Otklonenie.value;
            if (deviation >= k) {
                document.getElementById(element1).style.background = 'red';

                document.getElementById(element3).innerHTML = "<input type=button value='-' onClick='AnomalHide(), Calc()' id='Button${i}'>"
                + "<input type=button value='mid' onClick='AnomalMid(), Calc()' id='Button${i}'>" 
                + "<input type=button value='max' onClick='AnomalMax(), Calc()' id='Button${i}'>"
                + "<input type=button value='maxA' onClick='AnomalMaxCalc(), Calc()' id='Button${i}'>";
                
            } 
            else {
                document.getElementById(element1).style.background = '';
                document.getElementById(element3).innerHTML = '';
            }
        }
        CanvDraw();
        map(); //////////////////////////////////////////////////////////////////////////////////
}

function FillTestData() {
    let testData = [1, 24, 24, 25, 25, 26, 26, 24, 25, 48];
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

    if (a.length == 0) {
        n = ChisloYchastkov.value;
    } else {
        n = a.length;
        ChisloYchastkov.value = n;
    }

    div1.style.display = "block";
    div1.innerHTML = "";

    // Массив для хранения значений
    let values = [];

    for (let i = 1; i <= n; i++) {
        let element1 = "ploshad" + i;

        if (localStorage[element1] == undefined) {
            localStorage[element1] = "";
        }

        let element2 = "koord" + i;

        if (localStorage[element2] == undefined) {
            localStorage[element2] = "";
        }

        if (parametr.length > 1) {
            localStorage[element1] = parametr[i - 1];
        }

        div1.innerHTML += `
            <div style='display: inline-block; width: 400px;'>Площадь повреждённой территории на ${i} участке:</div>
            <input type='text' id='ploshad${i}' value='${localStorage[element1]}' onclick="drawColourMap(${i})">
            <div style='display:inline-block;width:275px'>Координаты контура <b>${i}-го участка</b></div>
            <input type='text' id='koord${i}' value='${localStorage[element2]}'>
            <div id='lolkek${i}' style='display:inline-block'></div><br>`;

        // Добавляем значения в массив для сортировки
        values.push(parseFloat(localStorage[element1]));
    }

    // Сортируем значения по возрастанию
    values.sort((a, b) => a - b);

    // Обновляем поля ввода с отсортированными значениями
    for (let i = 1; i <= n; i++) {
        let element1 = "ploshad" + i;
        document.getElementById(element1).value = values[i - 1];  // Присваиваем отсортированное значение
    }

    div1.innerHTML += `
        <hr>
        <input type='button' value='Поиск аномальных значений' onClick='Calc()' id='Button2'><br>
        Общая площадь повреждённой территории: <input type='text' id='SumPloshad'><br>
        Средняя площадь повреждённой территории: <input type='text' id='SredPloshad'><br>
        Среднеквадратическое отклонение: <input type='text' id='Otklonenie'><br>
        Коэффициент: <input type='text' id='koef'><br>`;

    localStorage["ChisloYchastkov"] = n;
    Calc();
    mytextarea.value = '';

    // Привязываем события после добавления элементов
    bindFocusEvents();
}


// Функция для привязки событий focus и blur к полям
function bindFocusEvents() {
    document.getElementById("SumPloshad").addEventListener("focus", function () { selectedLine = ""; CanvDraw(); });
    document.getElementById("SredPloshad").addEventListener("focus", function () { selectedLine = "mid"; CanvDraw(); });
    document.getElementById("Otklonenie").addEventListener("focus", function () { selectedLine = "disp"; CanvDraw(); });
    document.getElementById("koef").addEventListener("focus", function () { selectedLine = ""; CanvDraw(); });

    // Привязываем события к каждому динамически созданному элементу (ploshad1, ploshad2, ...)
    let n = ChisloYchastkov.value;
    for (let i = 1; i <= n; i++) {
        document.getElementById("ploshad" + i).addEventListener("focus", function () { selectedLine = "max"; CanvDraw(); });
        document.getElementById("koord" + i).addEventListener("focus", function () { selectedLine = "mid"; CanvDraw(); });
    }
}


function savedtext() {

    let n=ChisloYchastkov.value;
    let mysavedtext="";

    for(let i=1;i<=n;i++) {
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

let selectedLine = null; // Переменная для отслеживания выбранной линии

// Функция для рисования на графике
function CanvDraw() {
    let max = koef.value * Otklonenie.value + +SredPloshad.value; // Максимально допустимое значение
    let min = SredPloshad.value - koef.value * Otklonenie.value; // Минимально допустимое значение

    let mid = parseFloat(SredPloshad.value);
    let disp = mid + parseFloat(Otklonenie.value);
    let canv = document.getElementById("canv");
    let ctx = canv.getContext('2d');

    canv.width = 600;
    canv.height = 300;

    // Оси координат
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.moveTo(5.5, 5.5);
    ctx.lineTo(3.5, 15.5);
    ctx.moveTo(5.5, 5.5);
    ctx.lineTo(7.5, 15.5);
    ctx.moveTo(5.5, 5.5);
    ctx.lineTo(5.5, 280.5);
    ctx.lineTo(590.5, 280.5);
    ctx.lineTo(580.5, 278.5);
    ctx.moveTo(590.5, 280.5);
    ctx.lineTo(580.5, 282.5);
    ctx.stroke();
    ctx.closePath();

    let n = ChisloYchastkov.value; // Количество участков
    let j = 0; // Смещение по оси Y для точек

    for (let i = 1; i <= n; i++) {
        let midy = canv.height / 2;
        const newy = midy + j;
        const elementId = "ploshad" + i;
        const koord = parseFloat(document.getElementById(elementId).value);

        // Проверяем на аномалию
        if (koord >= max || koord <= min) {
            ctx.strokeStyle = "red"; // Аномальные значения — красный
        } else {
            ctx.strokeStyle = "black"; // Нормальные значения — черный
        }

        // Рисуем крестик
        ctx.beginPath();
        ctx.moveTo(5.5 + 570.5 * koord / max - 3, newy + 2.5);
        ctx.lineTo(5.5 + 570.5 * koord / max + 3, newy - 2.5);
        ctx.stroke();
        ctx.moveTo(5.5 + 570.5 * koord / max + 3, newy + 2.5);
        ctx.lineTo(5.5 + 570.5 * koord / max - 3, newy - 2.5);
        ctx.stroke();
        ctx.closePath();

        // Смещение для следующей точки
        j -= 10;

        // Подписи значений
        ctx.fillText(Math.round(koord), 5.5 + 570.5 * koord / max - 5, 295.5);
        ctx.fillText(0, 5, 295.5); // Ноль
    }

    // Рисуем линию для максимума
    ctx.beginPath();
    ctx.strokeStyle = "red"; 
    ctx.fillText("Аномал.", 5.5 + 570.5 * max / maxv - 10, 10);
    ctx.fillText(Math.round(max), 5.5 + 570.5 * max / maxv - 10, 25);
    ctx.moveTo(5.5 + 570.5 * max / maxv, 5.5);
    ctx.lineTo(5.5 + 570.5 * max / maxv, 280.5);
    ctx.stroke();
    ctx.closePath();

    // Рисуем линию для минимума
    ctx.beginPath();
    ctx.strokeStyle = "red"; 
    ctx.fillText("Аномал.", 5.5 + 570.5 * min / maxv - 10, 10);
    ctx.fillText(Math.round(min), 5.5 + 570.5 * min / maxv - 10, 25);
    ctx.moveTo(5.5 + 570.5 * min / maxv, 5.5);
    ctx.lineTo(5.5 + 570.5 * min / maxv, 280.5);
    ctx.stroke();
    ctx.closePath();

    // Рисуем линию для среднего
    ctx.beginPath();
    ctx.strokeStyle = selectedLine === "mid" ? "blue" : "green"; // Если выбрана средняя линия, рисуем синим
    ctx.fillText("Сред.", 5.5 + 570.5 * mid / maxv - 10, 10); // Средняя площадь
    ctx.fillText(Math.round(mid), 5.5 + 570.5 * mid / maxv - 10, 25); // Средняя площадь
    ctx.moveTo(5.5 + 570.5 * mid / maxv, 5.5);
    ctx.lineTo(5.5 + 570.5 * mid / maxv, 280.5);
    ctx.stroke();
    ctx.closePath();

    // Рисуем линии для отклонения
    ctx.beginPath();
    ctx.strokeStyle = selectedLine === "disp" ? "blue" : "yellow"; // Если выбрано отклонение, рисуем синим
    ctx.fillText("Откл.", 5.5 + 570.5 * disp / maxv - 10, 10);
    ctx.fillText(Math.round(disp), 5.5 + 570.5 * disp / maxv - 10, 25);
    ctx.moveTo(5.5 + 570.5 * disp / maxv, 5.5);
    ctx.lineTo(5.5 + 570.5 * disp / maxv, 280.5);
    ctx.stroke();

    // Для отрицательного отклонения
    let disp2 = mid - parseFloat(Otklonenie.value);
    ctx.fillText("Откл.", 5.5 + 570.5 * disp2 / maxv - 10, 10);
    ctx.fillText(Math.round(disp2), 5.5 + 570.5 * disp2 / maxv - 10, 25);
    ctx.moveTo(5.5 + 570.5 * disp2 / maxv, 5.5);
    ctx.lineTo(5.5 + 570.5 * disp2 / maxv, 280.5);
    ctx.stroke();

    ctx.closePath();
}


// Функция для рисования линий порогов
function drawThresholdLines(max, min, mid, disp, ctx, maxv) {
    // Линия для максимума
    ctx.beginPath();
    ctx.strokeStyle = selectedLine === "max" ? "blue" : "red"; // Выделяем синим, если максимальная линия выбрана
    ctx.fillText("Аномал.", 5.5 + 570.5 * max / maxv - 10, 10);
    ctx.fillText(Math.round(max), 5.5 + 570.5 * max / maxv - 10, 25);
    ctx.moveTo(5.5 + 570.5 * max / maxv, 5.5);
    ctx.lineTo(5.5 + 570.5 * max / maxv, 280.5);
    ctx.stroke();
    ctx.closePath();

    // Линия для минимума
    ctx.beginPath();
    ctx.strokeStyle = selectedLine === "min" ? "blue" : "blue"; // Выделяем синим, если минимальная линия выбрана
    ctx.fillText("Минимум", 5.5 + 570.5 * min / maxv - 10, 10);
    ctx.fillText(Math.round(min), 5.5 + 570.5 * min / maxv - 10, 25);
    ctx.moveTo(5.5 + 570.5 * min / maxv, 5.5);
    ctx.lineTo(5.5 + 570.5 * min / maxv, 280.5);
    ctx.stroke();
    ctx.closePath();

    // Линия для средней точки
    ctx.beginPath();
    ctx.strokeStyle = selectedLine === "mid" ? "blue" : "green"; // Выделяем синим, если средняя линия выбрана
    ctx.fillText("Сред.", 5.5 + 570.5 * mid / maxv - 10, 10);
    ctx.fillText(Math.round(mid), 5.5 + 570.5 * mid / maxv - 10, 25);
    ctx.moveTo(5.5 + 570.5 * mid / maxv, 5.5);
    ctx.lineTo(5.5 + 570.5 * mid / maxv, 280.5);
    ctx.stroke();
    ctx.closePath();

    // Линия для отклонения
    ctx.beginPath();
    ctx.strokeStyle = selectedLine === "disp" ? "blue" : "yellow"; // Выделяем синим, если линия отклонения выбрана
    ctx.fillText("Откл.", 5.5 + 570.5 * disp / maxv - 10, 10);
    ctx.fillText(Math.round(disp), 5.5 + 570.5 * disp / maxv - 10, 25);
    ctx.moveTo(5.5 + 570.5 * disp / maxv, 5.5);
    ctx.lineTo(5.5 + 570.5 * disp / maxv, 280.5);
    ctx.stroke();
    ctx.closePath();
}







function map() {
        let canv = document.getElementById("canv2");
        let ctx = canv.getContext('2d');
        canv.width = 600;
        canv.height = 300;

        let pic = new Image();
        pic.src = 'map.jpg';

        pic.onload = function() {
            ctx.drawImage(pic, 0, 0, canv.width, canv.height);

            let n = parseFloat(document.getElementById("ChisloYchastkov").value);

            for (let i = 1; i <= n; i++) {
                let sredX = 0;
                let sredY = 0;

                let element1 = "ploshad" + i;
                let element2 = "koord" + i;

                let koord = document.getElementById(element2).value;
                let koordmass = koord.split(";");

                ctx.beginPath();
                let ploshadValue = parseFloat(document.getElementById(element1).value);
                let sredPloshad = parseFloat(document.getElementById("SredPloshad").value);
                let otklonenie = parseFloat(document.getElementById("Otklonenie").value);
                let koef = parseFloat(document.getElementById("koef").value);

                if (Math.abs((ploshadValue - sredPloshad) / otklonenie) >= koef) {
                    ctx.fillStyle = "rgba(255, 0, 0, 0.7)"; //аномальный участок, красный цвет
                }
                else if (Math.abs(ploshadValue - sredPloshad) <= otklonenie) {
                    let zelVariant = Math.floor(255 * (1 - Math.abs(ploshadValue - sredPloshad) / (otklonenie)));
                    ctx.fillStyle = `rgba(0, ${zelVariant}, 0, 0.7)`; //в пределах зелёной линии
                } else {
                    ctx.fillStyle = "rgba(255, 255, 0, 0.7)"; //вышло за линии отклонений, жёлтый
                }

                for (let j = 1; j < koordmass.length; j += 2) {
                    if (j > 1) {
                        ctx.lineTo(koordmass[j - 1], koordmass[j]);
                    } else {
                        ctx.moveTo(koordmass[j - 1], koordmass[j]);
                    }

                    sredX = (sredX * ((koordmass.length - 1) / 2) + parseFloat(koordmass[j - 1])) / ((koordmass.length - 1) / 2);
                    sredY = (sredY * ((koordmass.length - 1) / 2) + parseFloat(koordmass[j])) / ((koordmass.length - 1) / 2);
                }

                ctx.fill();
                ctx.closePath();

                ctx.fillStyle = "black";
                ctx.font = "italic 16pt Arial";
                ctx.fillText(ploshadValue, sredX, sredY);
            }
        };
    }

let colored = null;

//функция для выделения выбранного участка
function drawColourMap(index) {
    if (colored !== null) {
        redrawColourMap();
    }
    colored = index;
    redrawMap();
}

//сброс выделения
function redrawColourMap() {
    colored = null;
    redrawMap();
}

//перерисовка карты
function redrawMap() {
    let canv = document.getElementById("canv2");
    let ctx = canv.getContext("2d");
    ctx.clearRect(0, 0, canv.width, canv.height);

    let pic = new Image();
    pic.src = "map.jpg";
    pic.onload = function() {
        ctx.drawImage(pic, 0, 0, canv.width, canv.height);

        let n = parseFloat(ChisloYchastkov.value);
        for (let i = 1; i <= n; i++) {
            let sredX = 0;
            let sredY = 0;
            let element1 = "ploshad" + i;
            let element2 = "koord" + i;
            let koord = document.getElementById(element2).value;
            let koordmass = koord.split(";");

            let ploshadValue = parseFloat(document.getElementById(element1).value);
            let sredPloshad = parseFloat(SredPloshad.value);
            let otklonenie = parseFloat(Otklonenie.value);
            let koef = parseFloat(document.getElementById("koef").value);

            // Условие для раскраски
            if (colored === i) {
                ctx.fillStyle = "rgba(0, 0, 255, 0.5)"; // Выделенный участок
            } else if ((ploshadValue - sredPloshad) / otklonenie >= koef) {
                ctx.fillStyle = "rgba(255, 0, 0, 0.7)"; // Аномально большое значение
            } else if ((ploshadValue - sredPloshad) / otklonenie <= -koef) {
                ctx.fillStyle = "rgba(255, 0, 0, 0.7)"; // Аномально низкое значение
            } else {
                // Нормальные значения, цвет варьируется по интенсивности
                let zelVariant = Math.floor(255 * (1 - Math.abs(ploshadValue - sredPloshad) / otklonenie));
                ctx.fillStyle = `rgba(0, ${zelVariant}, 0, 0.7)`;
            }

            // Рисование участка
            ctx.beginPath();
            for (let j = 1; j < koordmass.length; j += 2) {
                if (j > 1) {
                    ctx.lineTo(koordmass[j - 1], koordmass[j]);
                } else {
                    ctx.moveTo(koordmass[j - 1], koordmass[j]);
                }

                sredX += parseFloat(koordmass[j - 1]);
                sredY += parseFloat(koordmass[j]);
            }

            ctx.fill();
            ctx.closePath();

            // Средняя точка для текста
            sredX /= (koordmass.length / 2);
            sredY /= (koordmass.length / 2);

            // Текст с значением площади
            ctx.fillStyle = "black";
            ctx.font = "italic 16pt Arial";
            ctx.fillText(ploshadValue, sredX, sredY);
        }
    };
}
    

document.addEventListener('DOMContentLoaded', () => {
    // Связываем чекбоксы и элементы
    const elements = {
        'toggle-textarea': document.getElementById('mytextarea'),
        'toggle-canvas1': document.getElementById('canv'),
        'toggle-canvas2': document.getElementById('canv2')
    };

    // Загрузка состояния из localStorage
    function loadState() {
        for (let key in elements) {
            const element = elements[key];
            if (element) { // Проверяем, что элемент существует
                const savedState = localStorage.getItem(key);
                const isVisible = savedState === 'true';
                const checkbox = document.getElementById(key);

                if (checkbox) {
                    checkbox.checked = isVisible;
                    element.classList.toggle('hidden', !isVisible);
                }
            }
        }
    }

    // Сохранение состояния в localStorage
    function saveState(key, state) {
        localStorage.setItem(key, state);
    }

    // Добавляем слушатели на чекбоксы
    for (let key in elements) {
        const element = elements[key];
        if (element) { // Проверяем, что элемент существует
            const checkbox = document.getElementById(key);

            if (checkbox) {
                checkbox.addEventListener('change', () => {
                    const isVisible = checkbox.checked;
                    element.classList.toggle('hidden', !isVisible);
                    saveState(key, isVisible);
                });
            }
        }
    }

    // Инициализация
    loadState();
});