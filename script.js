var nameMonth=['январь','февраль','март','апрель','май','июнь',
                'июль','август','сентябрь','октябрь','ноябрь','декабрь',
]
var active={price: null, income:null}
var activesArr=[];
var topTableTime=450;
var topTableResults=240;

var maxCountActives=10;
var countActives=0;

var countYearJob=1;
var offsetMounthYear=0;
var countMounth=60;

var jobMoneyFlow=3000;
var investMoneyFlow=0;
var moneyFlow=0;
var profitMoney=0;
var deedMoneyX=0;
var multDeedMoneyX=0.2;
var capital=0;
var cashCashion=0;
var summCashCashion=60000;
var multCashCashion=0.2;
var deferredToCapital=0;
var deferredToCashCashion=0;
var btnNewActives=null;
var file=null;
var tableIncome=null;
var tableActives=null;
window.addEventListener('load',function(event){
    tableIncome=document.getElementById('tableIncome');
    
    tableActives=document.getElementById('tableActives');

    var tableTime=document.getElementById('tableByTime');
    var columnElem=document.getElementById('columnZero');

    var cloneColumnZero=columnElem.cloneNode(true);
    var tdList=cloneColumnZero.getElementsByTagName('td');


    var btnDeleleActives=document.getElementById('buttonDeleteActives');
    var btnNewActives=document.getElementById('buttonNewActives');
    var btnNewJobIncome=document.getElementById('buttonNewJobIncome');

    var btnFormAddActive=document.getElementById('buttonFormAddActive');

    var formNewActive = document.getElementById("formNewActive");
    var formNewJobIncome =document.getElementById("formNewJobIncome");


    var yearInput=document.getElementById('yearInput');
    var mounthSelect=document.getElementById('mounthSelect');

    var inputArr = document.querySelectorAll('#formOptions input');

    var inputNewActives=document.querySelectorAll('#formNewActive input')
    inputArr = [...inputArr, ...inputNewActives];

    var inputNewJobIncome=document.querySelectorAll('#formNewJobIncome input')
    inputArr = [...inputArr, ...inputNewJobIncome];

    let activesElemsPrice=tableActives.getElementsByClassName('priceActive');
    let activesElemsIncome=tableActives.getElementsByClassName('incomeActive');

    file = document.getElementById('fileInput');
    file.addEventListener("change", handleFiles);
    calcTableTime();
    document.querySelector('body').style.overflowY='visible';
    function clearTableTime()
    {
        //tableTime.replaceChildren();
        while (tableTime.children.length>1)
        {
            tableTime.removeChild(tableTime.lastChild);
        }

        countActives=0;

        moneyFlow=0;
        jobMoneyFlow=3000;
        investMoneyFlow=0;
        moneyFlow=0;
        profitMoney=0;
        deedMoneyX=0;
        capital=0;
        cashCashion=0;
        deferredToCapital=0;
        deferredToCashCashion=0;

        activesArr=[];
        let activesMonthYear=document.getElementsByClassName('monthYearActive');
        for (let i=0; i < activesMonthYear.length;i++)
        {
            activesMonthYear[i].innerText='Недостачно средств.'
        }
      
    }
    function calcTableTime()
    {
        function calcOffsetMountYear()
        {
            let mounth=Number(mounthSelect.value);
            let year=Number(yearInput.value)
            offsetMounthYear = mounth+(year - 2000)*12
            return offsetMounthYear;
        }
        // alert(calcOffsetMountYear())
        function calcBodyHeight(tableTime)
        {
            let heightBody=document.body.offsetHeight;
      
            let tableActives=document.getElementById('tableActives');
            let tableIncome=document.getElementById('tableIncome')
   
            let maxTop=max(tableIncome.offsetHeight, tableActives.offsetHeight).value;
      
            heightBody = tableTime.offsetHeight+maxTop+700;
            document.querySelector("body").style.minHeight = heightBody+'px'
        }
        if (countYearJob>5)
        {
            countMounth=countYearJob * 12;

        }
        else
        {
            countMounth=60;
           
        }
        for (let i=0;i<countMounth;i++)
        {
            let incomeElems=tableIncome.getElementsByClassName('income');
        
            // console.log(incomeElems);
            if (Math.trunc(i/12)<incomeElems.length)
            {
                let income=incomeElems[Math.trunc(i/12)].innerText;//Math.trunc(i/12)
                jobMoneyFlow=Number(income);
                
            }

            cloneColumnZero=columnElem.cloneNode(true);
            tdList=cloneColumnZero.getElementsByTagName('td');
            if (i==0)
            {
                cloneColumnZero.style.display='none'
                tdList=columnElem.getElementsByTagName('td');
                //tdList[3].innerText=moneyFlow; 
            }
            tdList[0].innerText=i+1; //номер
            let offset=calcOffsetMountYear();
            let year=2000+Math.trunc((i+offset)/12);

            tdList[1].innerText=nameMonth[(i+offset) % 12] +"/"+year; // время
            tdList[2].innerText=jobMoneyFlow;               //работа
            tdList[3].innerText=moneyFlow; //     денежный поток
            investMoneyFlow = 0;
            deferredToCapital=0;
    
            investMoneyFlow = calcInvestIncome(tdList, activesArr)
            moneyFlow=investMoneyFlow+jobMoneyFlow;
            if (i==0)
            {
                tdList[3].innerText=moneyFlow; 
            }
            if (cashCashion>summCashCashion)
            {
                console.log(multCashCashion)
                profitMoney = Math.trunc(investMoneyFlow * (1-multDeedMoneyX))//*0.8;
                deedMoneyX = Math.trunc(investMoneyFlow * multDeedMoneyX);

                moneyFlow=investMoneyFlow+jobMoneyFlow-deedMoneyX;

                deferredToCapital = Math.trunc(moneyFlow * (1-multCashCashion)) //+ profitMoney//*0.8;
                deferredToCashCashion = Math.trunc(moneyFlow * multCashCashion)//*0.2;

                cashCashion += deferredToCashCashion;

                capital += moneyFlow - deferredToCashCashion
                tdList[3].innerText=moneyFlow;
                tdList[4].innerText=moneyFlow - deferredToCashCashion; //отложено в капитал
                tdList[6].innerText=deferredToCashCashion //отложено в падушку
            }
            else
            {
                cashCashion += moneyFlow;
                tdList[4].innerText=0; //отложено в капитал

                tdList[6].innerText=moneyFlow; 
            }
           
            tdList[5].innerText=capital;       // капитал
            
          
            
            tdList[7].innerText=cashCashion // подушка
            tdList[8].innerText=0// остаток

            tdList[21].innerText=investMoneyFlow;

            tdList[22].innerText=profitMoney;
            tdList[23].innerText=deedMoneyX;

            // ACTIVES

            if (countActives >= activesElemsPrice.length)
            {
                tableTime.appendChild(cloneColumnZero);
                continue;
            }
            let priceActive=Number(activesElemsPrice[countActives].innerHTML);
            let incomeActive=Number(activesElemsIncome[countActives].innerHTML);
            if (priceActive < capital)
            {
                
                capital -= priceActive;
                tdList[9+10].innerText='Activ '+(countActives+1);
                tdList[9+11].innerText=priceActive;

                let activNew=JSON.parse(JSON.stringify(active));
                activNew={price: priceActive, income: incomeActive};
                activesArr.push(activNew)
                let monthYearValue = tdList[1].innerHTML;
                document.getElementsByClassName('monthYearActive')[countActives].innerHTML =  monthYearValue;
                //if (countActives < activesElemsPrice.length-1)
                {
                    countActives++;
                }
            }
            
            tableTime.appendChild(cloneColumnZero);
        }
        calcResults();
        calcBodyHeight(tableTime)
    }
    // btnNewActives

    btnNewActives.addEventListener('click',function(){
        formNewActive.style.display="block";

    })
    document.getElementById('buttonFormCancelActive').addEventListener('click', (e)=>{
        e.preventDefault();
        formNewActive.style.display='none';
    })
    btnFormAddActive.addEventListener('click',function(event){
        event.preventDefault();
        // alert(883);
        valuePrice = Number(document.getElementById('priceActiveInForm').value);
        valueIncome = Number(document.getElementById('incomeActiveInForm').value)
        let index=addActive(valuePrice, valueIncome);
        clearTableTime();
        moveTables('down', 2);
        calcTableTime();


        formNewActive.style.display='none';

        //!!!
        //btnDeleteActives.style.display='inline-block';
        document.getElementById("buttonDeleteActives").style.display='inline-block';

        
    
        if (index + 2 >= maxCountActives)
        {
            btnNewActives.style.display='none';
        }

    })
    document.getElementById('buttonDeleteActives').addEventListener('click', (e)=>{
        e.preventDefault();
        const table = document.getElementById('tableActives');
        let index= table.querySelectorAll('tr').length-2; 
        table.deleteRow(index);
        if (index <= 2)
        {
            document.getElementById('buttonDeleteActives').style.display='none';    
        }
        countActives--;
        if (countActives < maxCountActives)
        {
            btnNewActives.style.display='inline-block';
        }
        
        clearTableTime();
        moveTables('up',2);
        calcTableTime();
    })
    document.getElementById('buttonStartOptions').addEventListener('click', function(e){
        e.preventDefault();
    
    
        clearTableTime();

        let dataInput=document.getElementById("formOptions");

        let value=dataInput.firstIncome.value;
        tableIncome.getElementsByClassName('income')[0].innerText=value;

        summCashCashion=Number(dataInput.summCashCashion.value);

        multCashCashion=Number(dataInput.flowInCashCashion.value) / 100;

        value=dataInput.firstActivePrice.value;
        tableActives.getElementsByClassName('priceActive')[0].innerText=value;
      
        value=dataInput.firstActiveIncome.value;
        tableActives.getElementsByClassName('incomeActive')[0].innerText=value;

        multDeedMoneyX=Number(dataInput.flowCaseX.value) / 100;

        deferredToCashCashion=Number(dataInput.flowInCashCashion.value);
     
        calcTableTime();
    });
    btnNewJobIncome.addEventListener('click', function(e){
        e.preventDefault();
        formNewJobIncome.style.display="block";
    })
    document.getElementById('buttonFormAddJobIncome').addEventListener('click', function(e){
        e.preventDefault();
        clearTableTime();
        let tableJobIncome=document.getElementById('tableIncome');
        let dataInput=document.getElementById("formNewJobIncome");

        let value=dataInput.incomeJobInForm.value;
        insertIncome(tableJobIncome,value)
        document.getElementById('buttonDeleteJobIncome').style.display='inline-block';
        moveTables('down',1)
        calcTableTime();
        formNewJobIncome.style.display="none";

    })
    document.getElementById('buttonDeleteJobIncome').addEventListener('click', function(e){
        e.preventDefault();
        const table = document.getElementById('tableIncome');
        let index= table.querySelectorAll('tr').length-2; 
        console.log(index)
        table.deleteRow(index);
        if (index <= 2)
        {
            document.getElementById('buttonDeleteJobIncome').style.display='none';    
        }


        clearTableTime();
        moveTables('up',1)
        calcTableTime();
        countYearJob--;
    })
    document.getElementById('buttonFormCancelJobIncome').addEventListener('click', function(e){
        e.preventDefault();
        formNewJobIncome.style.display="none";
    })

    document.getElementById('buttonDownloadFile').addEventListener('click', function(e){
        e.preventDefault();


        let dataInput=document.getElementById("formOptions");

        let firstIncome=dataInput.firstIncome.value;
        //tableIncome.getElementsByClassName('income')[0].innerText=value;

        summCashCashion=Number(dataInput.summCashCashion.value);

        multCashCashion=Number(dataInput.flowInCashCashion.value) / 100;

        let priceFirstActive=dataInput.firstActivePrice.value;
        ////tableActives.getElementsByClassName('priceActive')[0].innerText=value;
      
        let incomeFirstActive=dataInput.firstActiveIncome.value;
        // tableActives.getElementsByClassName('incomeActive')[0].innerText=value;

        multDeedMoneyX=Number(dataInput.flowCaseX.value) / 100;

        deferredToCashCashion=Number(dataInput.flowInCashCashion.value);
        let dataOption={
            firstIncome: firstIncome,
            summCashCashion: summCashCashion,
            priceFirstActive: priceFirstActive,
            incomeFirstActive: incomeFirstActive,
            multCashCashion: multCashCashion,
            multDeedMoneyX: multDeedMoneyX,
        }
        let incomeElems=tableIncome.getElementsByClassName('income');
        let incomeArr=[];
        for (let i=0;i<incomeElems.length;i++)
        {
            incomeArr.push(incomeElems[i].innerText);
        }
        
        dataSave={
            offsetMounthYear: offsetMounthYear,
            option: dataOption,
            incomeArr: incomeArr,
            activesArr: activesArr,
        }
        downloadAsFile(JSON.stringify(dataSave));

    })
  
    
    
    offsetMounthYear
    
    document.getElementById('buttonReadFile').addEventListener('click',(e)=>{
        e.preventDefault();
        document.getElementById('formFile').style.display='block';
        document.querySelector('body').style.overflowY="hidden";
    })
    valueInputArr=[
        {num:0, value: 2000},
        {num:1, value: 3000},
        {num:2, value: 60000},
        {num:3, value: 100000},
        {num:4, value: 10000},
        {num:5, value: 20},
        {num:6, value: 20},
        // form new Active
        {num:7, value: 10000},
        {num:8, value: 1000},
        ///form job income
        {num:9, value: 3000},
        

    ];
    // console.log(inputArr)
    setInterval(function () {
        for (let i = 0; i < inputArr.length; i++)
        {
            if (( Number(inputArr[i].value) > 99 && (i==5 || i==6 ))) 
            {
                inputArr[i].style.color = "red";
               // console.log('inputArr[i].value='+inputArr[i].value);
            } 
            else
            {
                inputArr[i].style.color = "black";
            }
     
            if (i==0)
            {   
                if ( 
                    (Number(inputArr[i].value) < 2000 ||
                    Number(inputArr[i].value) > 10000)
                    )
                {
                    inputArr[i].style.color = "red";
                }
                else
                {
                    inputArr[i].style.color = "black";
                }
            }
            
        
        }
    }, 16);
    for (let i = 0; i < inputArr.length; i++) 
    {
        inputArr[i].onblur = function (){
                    
            for (let j = 0; j < valueInputArr.length; j++) 
            {

                if (i == valueInputArr[j].num)
                if ((Number(inputArr[i].value) > 99 && (i==5  || i==6))
                       ||
                       inputArr[i].value == ''  
                    ) 

                {
                    inputArr[i].value = valueInputArr[j].value;
                }
                
                if (i==0)
                {   
                    if ( 
                        (Number(inputArr[i].value) < 2000 ||
                        Number(inputArr[i].value) > 10000)//==false
                        )
                    {
                        inputArr[i].value = valueInputArr[j].value;
                        //inputArr[i].style.color = "red";
                    }
                }
            }

        }
    }

    
    for (let i = 0; i < inputArr.length;i++)
    {

        inputArr[i].oninput = function (e) {
            console.log(inputArr[9]);
            console.log(e.target.value);
            if(i==9)
            {
                {       
                    if (inputArr[i].value.match("^0+")) 
                    {   
                        inputArr[i].value = '0';
                    }
                    e.target.value = e.target.value.replace(/\D/g, '');
                }
            }
            else
            {
                e.target.value = e.target.value.replace(/^0/, ''); 
                e.target.value = e.target.value.replace(/\D/g, '');
                if (inputArr[i].value.match("^0+")) 
                {
                    inputArr[i].value = '';
                }
            }
        }
    
    
    }

    function calcInvestIncome(tdList, activesArr)
    {
        investMoneyFlow = 0;
        for (let i=0;i<10;i++)
        {
            if (i<activesArr.length)
            {
                tdList[9+i].innerText=activesArr[i].income;
                investMoneyFlow += Number(activesArr[i].income);
            }
        }
        return investMoneyFlow;
    }
    function calcResults()
    {
        tableResult=document.getElementById('tableResults');
        tdResultList=tableResult.querySelectorAll('.tdResult');
        // Форматирование в рубли (₽)
        const formatterRub = new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
        });
        tdResultList[0].innerText=formatterRub.format(capital + cashCashion);
        tdResultList[1].innerText=formatterRub.format(capital);
        tdResultList[2].innerText=formatterRub.format(cashCashion);
        tdResultList[3].innerText=formatterRub.format(investMoneyFlow);
        let summPriceActive=0;
        for (let i=0;i<10;i++)
        {
            if (i<activesArr.length)
            {
                ///tdList[9+i].innerText=activesArr[i].pri;
                summPriceActive += Number(activesArr[i].price);
            }
        }
        tdResultList[4].innerText=formatterRub.format(summPriceActive)
        let result=summPriceActive + capital + cashCashion;
        tdResultList[5].innerText=formatterRub.format(result);
        ;
    }
    function moveTables(vector='down', numTable)
    {
        let heightBody=document.body.offsetHeight;
        let tableTime=document.getElementById('tableByTime');
        let tableActives=document.getElementById('tableActives');
        let tableIncome=document.getElementById('tableIncome')
        let tableResults=document.getElementById('tableResults');
        // console.log(tableActives.offsetHeight);
        let maxTop=max(tableIncome.offsetHeight, tableActives.offsetHeight).value;
        let heightTableTime = tableByTime.offsetHeight;
        if (maxTop > 150)
        {    
            topTableResults = maxTop+180;
            topTableTime = maxTop+590;
            heightBody = heightTableTime + maxTop + 630;//maxTop+2180;
        }
        tableTime.style.top = topTableTime+'px';
        if (topTableResults >= 330)
        {
            tableResults.style.left = 770+'px';//topTableResults+'px';
            tableResults.style.top=  390+'px';
        }
        document.querySelector("body").style.minHeight = heightBody+'px';
    }
    function max(val1, val2)
    {
        if (val1 >= val2)
        {
            return {value: val1, index: 1}
        }
        if (val1 < val2)
        {
            return {value: val2, index: 2};
        }
    }
    function handleFiles()
    {
        var form=document.getElementById('formFile');
        
        var fileOne=file.files[0];
        var reader = new FileReader();
        reader.readAsText(fileOne);
        reader.onload = function() {
            console.log(reader.result);
            clearTablesIncomeAndActive();
            clearTableTime();
            appropriationFormFile(JSON.parse(reader.result));
            calcTableTime();
            moveTables();
            document.querySelector('body').style.overflowY='visible';
       
        }
        reader.onerror = function() {
        
            alert('ошибка загрузки данных');
        }
        file.value="";
        form.style.display='none';

    }
})
function clearTablesIncomeAndActive()
{

    // tableActives
    console.log(tableByTime);
    console.log(tableActives);
    for (let i=tableActives.rows.length-2;i>1;i--)
    {
      
        tableActives.deleteRow(i);
    }
    for (let i=tableIncome.rows.length-2;i>1;i--)
    {
 
        tableIncome.deleteRow(i);
    }
}
function insertIncome(tableJobIncome,value)
{

    let trElemArr = document.querySelectorAll('.trIncome')
    
    let index = tableJobIncome.rows.length-3;//children.length-1;
    countYearJob=index+2;
    console.log(index, countYearJob);
    let trElemLastIncome =  trElemArr[index].cloneNode(true);
    let tdElemArr = trElemLastIncome.querySelectorAll('td');
    tdElemArr[0].innerText = index+2;
    tdElemArr[1].innerText = value; 
    document.querySelector('#tableIncome tr:last-child').before(trElemLastIncome);
}
function addActive(price, income)
{


    let trElemArr = document.querySelectorAll('.trActive')
    let index = trElemArr.length-1;
    console.log(index);
    let trElemLastActive =  trElemArr[index].cloneNode(true);
    console.log(trElemLastActive);
    let tdElemArr = trElemLastActive.querySelectorAll('td');
    tdElemArr[0].innerText = index+2;
    tdElemArr[2].innerText = Number(price);
    tdElemArr[3].innerText = Number(income);
    console.log(trElemLastActive);
    document.querySelector('#tableActives tr:last-child').before(trElemLastActive);
    return index;
}
function appropriationFormFile(data)
{

    // let dataOption={
    //     firstIncome: firstIncome,
    //     summCashCashion: summCashCashion,
    //     priceFirstActive: priceFirstActive,
    //     incomeFirstActive: incomeFirstActive,
    //     multCashCashion: multCashCashion,
    //     multDeedMoneyX: multDeedMoneyX,
    // }


    let dataInput=document.getElementById("formOptions");


    let value=Number(data.offsetMounthYear) % 12;
    document.getElementById('mounthSelect').value=value+'';

    value=2000+Math.trunc(Number(data.offsetMounthYear) / 12);
    document.getElementById('yearInput').value=value;

    value=data.option.firstIncome;//dataInput.firstIncome.value;
    tableIncome.getElementsByClassName('income')[0].innerText=value;

    summCashCashion=Number(data.option.summCashCashion);

    multCashCashion=Number(data.option.multCashCashion) ;

    value=data.option.priceFirstActive;//ataInput.firstActivePrice.value;
    tableActives.getElementsByClassName('priceActive')[0].innerText=value;
    
    value=data.option.incomeFirstActive//dataInput.firstActiveIncome.value;
    tableActives.getElementsByClassName('incomeActive')[0].innerText=value;

    multDeedMoneyX=Number(data.option.multDeedMoneyX);
    
    
    document.querySelector("#formOptions #firstIncome").value=data.option.firstIncome;
    document.querySelector("#formOptions #summCashCashion").value=data.option.summCashCashion;

    value=data.option.priceFirstActive;
    document.querySelector("#formOptions #firstActivePrice").value=value;
     document.querySelector("#tableActives .priceActive").innerHTML=value;

    value=data.option.incomeFirstActive
    document.querySelector("#formOptions #firstActiveIncome").value=value;
    document.querySelector("#tableActives .incomeActive").innerHTML=value;

    value=Math.trunc(data.option.multDeedMoneyX * 100);
    document.querySelector("#formOptions #flowCaseX").value=value;
    value=Math.trunc(data.option.multCashCashion * 100);
    document.querySelector("#formOptions #flowInCashCashion").value=value

    
    
    
    let tableJobIncome=document.getElementById('tableIncome');
    for (let i=1;i<data.incomeArr.length;i++)
    {
        insertIncome(tableJobIncome,Number(data.incomeArr[i]));
    }
    if (data.incomeArr.length > 0)
    {
        document.getElementById('buttonDeleteJobIncome').style.display='inline-block';
    }
    let index=null;
    //activesArr=[];
    for (let i=1;i<data.activesArr.length;i++)
    {
        index=addActive(Number(data.activesArr[i].price), Number(data.activesArr[i].income));
    }   
    if (data.activesArr.length > 0)
    {
        buttonDeleteActives.style.display='inline-block';
    }
    if (data.activesArr.length >= maxCountActives-1)
    {
        btnNewActives.style.display='none';
    }
}
function downloadAsFile(data) 
{
      let a = document.createElement("a");
      let file = new Blob([data], {type: 'application/json'});
      a.href = URL.createObjectURL(file);
      a.download = "finans-plan.txt";
      a.click();
}
function readFile(object)
{
  var file = object.files[0]
  var reader = new FileReader()
  var res;
  reader.onload = function() {
    res = reader.result;
  }
  reader.readAsText(file);
  return res;
}