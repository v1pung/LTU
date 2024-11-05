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
        if (document.getElementById(element1).value > Number(mymax) &&
            (document.getElementById(element1).value - SredPloshad.value) / Otklonenie.value < koef.value) {
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

            element2="koord"+i;	
            localStorage[element2]=document.getElementById(element2).value;
            
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
    let testData = [5, 5, 7, 10, 12, 40];
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

            element2 = "koord" + i;	
            if (localStorage[element2] == undefined) {
                localStorage[element2] = ""
            }


            if (localStorage[element1] == undefined) {
                localStorage[element1] = ""
            }

            if (parametr.length > 1) { 
                localStorage[element1] = parametr[i - 1]; 
            }

            div1.innerHTML += "<div style='display: inline-block; width: 400px;'>Площадь повреждённой территории на <b>" + i
             + " участке</b>:</div><input type='text' id='ploshad" + i
             + "' value='" + localStorage[element1]+"'><div id='lolkek" + i + "' style='display:inline-block'></div><br>";

            div1.innerHTML += "<div style='display: inline-block; width: 275px;'>Координаты контура <b>" + i
             + "-го участка</b></div><input type=text id='koord" + i + "' value='"+localStorage[element2] + "'></input>";
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
            element2="koord"+i;	
            if(localStorage[element2]==undefined) {localStorage[element2]=""}            

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
    let canv2 = document.getElementById("canv2"); ///////////////////////////////////////// ?????????
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

    ctx.closePath();

    let j = 0;

    for (let i = 1; i <= n; i++)
    {
        let flag = false;
        let midy = canv.height / 2;
        const newy = midy + j;
        element1 = "ploshad" + i;
        koord = document.getElementById(element1).value;

        if ( koord >= max) {
            console.log('anomal')
            ctx.strokeStyle = "red";
        }
        else {
            console.log('norm')
            ctx.strokeStyle = "black";
        }

        ctx.beginPath();
        ctx.moveTo(5.5+570.5*koord/maxv-3,newy + 2,5);
            ctx.lineTo(5.5+570.5*koord/maxv+3,newy - 2.5);
            ctx.stroke();
            ctx.moveTo(5.5+570.5*koord/maxv+3,newy + 2.5);
            ctx.lineTo(5.5+570.5*koord/maxv-3,newy - 2.5);
            ctx.stroke();
            ctx.closePath();


        j -= 10;

        ctx.fillText(Math.round(koord), 5.5 + 570.5 * koord / maxv - 5, 295.5) // zna4eniya
        ctx.fillText(0, 5, 295.5) // nol
    }

    ctx.beginPath();
    ctx.strokeStyle = "red";

    ctx.fillText("Аномал.", 5.5 + 570.5 * max / maxv - 10, 10) // things
    ctx.fillText(Math.round(max), 5.5 + 570.5 * max / maxv - 10, 25) // things

    ctx.moveTo(5.5+570.5*max/maxv,5.5);
    ctx.lineTo(5.5+570.5*max/maxv,280.5);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();

    ctx.strokeStyle = "green";

    ctx.fillText("Сред.", 5.5 + 570.5 * mid / maxv - 10, 10) // things
    ctx.fillText(Math.round(mid), 5.5 + 570.5 * mid / maxv - 10, 25) // things

    ctx.moveTo(5.5+570.5*mid/maxv,5.5);
    ctx.lineTo(5.5+570.5*mid/maxv,280.5);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();

    ctx.strokeStyle = "yellow";

    ctx.fillText("Откл.", 5.5 + 570.5 * disp / maxv - 10, 10) // things
    ctx.fillText(Math.round(disp), 5.5 + 570.5 * disp / maxv - 10, 25) // things

    ctx.moveTo(5.5+570.5*disp/maxv,5.5);
    ctx.lineTo(5.5+570.5*disp/maxv,280.5);
    ctx.stroke();

    let disp2 = mid - parseFloat(Otklonenie.value);

    ctx.fillText("Откл.", 5.5 + 570.5 * disp2 / maxv - 10, 10) // things
    ctx.fillText(Math.round(disp2), 5.5 + 570.5 * disp2/maxv - 10, 25) // things

    ctx.moveTo(5.5+570.5 * disp2 / maxv, 5.5);
    ctx.lineTo(5.5+570.5 * disp2 / maxv, 280.5);
    ctx.stroke();

    ctx.closePath();
    map(); //////////////// ???????????
}

function map() { //////////////////////////////////////////////////////
    let canv = document.getElementById("canv2");
    let ctx = canv.getContext('2d');

    canv.width = 600;
    canv.height = 300;

    let pic = new Image();
    ctx = canv.getContext('2d');
    pic.src = 'map.jpg';
    canv.width = 600;
    canv.height = 300;

    pic.onload = function()
    {
        ctx.drawImage(pic, 0, 0, canv.width, canv.height);
        let n = parseFloat(ChisloYchastkov.value);

        for (let i = 1; i <= n; i++) {
            sredX = 0;
            sredY = 0;

            element1 = "ploshad"+i;
            element2 = "koord"+i;

            koord = document.getElementById(element2).value;
            koordmass=koord.split(";");

            ctx.beginPath();
            // let p = 0;
            ctx.fillStyle = "rgba(255, 255, 0, 0.7)"; // 255 - p
            // p -= 5;

            if ((document.getElementById(element1).value - SredPloshad.value) / Otklonenie.value >= koef.value) {
                ctx.fillStyle = "rgba(255, 0, 0, 0.7)";
            }

            for (let j = 1; j < koordmass.length; j += 2) {
                if (j > 1) {
                    ctx.lineTo(koordmass[j-1], koordmass[j]);
                }
                else {
                    ctx.moveTo(koordmass[j-1], koordmass[j]);
                }
                sredX = (sredX * ((koordmass.length-1) / 2) + parseFloat(koordmass[j-1])) / ((koordmass.length-1) / 2);
                sredY = (sredY * ((koordmass.length-1) / 2) + parseFloat(koordmass[j])) / ((koordmass.length-1) / 2);
            }
            
            ctx.fill();
            ctx.closePath();
            ctx.fillStyle = "black";
            ctx.font = "italic 16pt Arial";
            ctx.fillText(document.getElementById(element1).value, sredX, sredY);
        }
    }

}