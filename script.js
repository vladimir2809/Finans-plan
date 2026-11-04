var nameMonth=['январь','февраль','март','апрель','май','июнь',
                'июль','август','сентябрь','октябрь','ноябрь','декабрь',
]
var active={price: null, income:null}
var activesArr=[];
var topTableTime=300;
var countActives=0;

var countMounth=60;

var jobMoneyFlow=3000;
var investMoneyFlow=0;
var moneyFlow=0;
var profitMoney=0;
var deedMoneyX=0;
var capital=0;
var cashCashion=0;
var deferredToCapital=0;
var deferredToCashCashion=0;
window.addEventListener('load',function(event){
    var tableIncome=document.getElementById('tableIncome');
    
    var tableActives=document.getElementById('tableActives');

    var tableTime=document.getElementById('tableByTime');
    var columnElem=document.getElementById('columnZero');

    var cloneColumnZero=columnElem.cloneNode(true);
    var tdList=cloneColumnZero.getElementsByTagName('td');


    var bthDeleleActives=document.getElementById('buttonDeleteActives');
    var btnNewActives=document.getElementById('buttonNewActives');

    var btnFormAddActive=document.getElementById('buttonFormAddActive');

    var formNewActive = document.getElementById("formNewActive");

    var inputArr = document.querySelectorAll('#formOptions input');
    // cloneColumnZero.style.display='none';
    // clearTableTime();
    calcTableTime();
    function clearTableTime()
    {
        //tableTime.replaceChildren();
        while (tableByTime.children.length>1)
        {
            tableByTime.removeChild(tableByTime.lastChild);
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
        // for (let i=0;i<countMounth;i++)
        // {
        //     tdList[i].remove();
        // }
    }
    function calcTableTime()
    {

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
            let year=2000+Math.trunc(i/12);

            tdList[1].innerText=nameMonth[i % 12] +"/"+year; // время
            tdList[2].innerText=jobMoneyFlow;               //работа
            tdList[3].innerText=moneyFlow; //     денежный поток
            investMoneyFlow = 0;
            // for (let i=0;i<10;i++)
            // {
            //     if (i<activesArr.length)
            //     {
            //         tdList[9+i].innerText=activesArr[i].income;
            //         investMoneyFlow += Number(activesArr[i].income);
            //     }
            // }
            investMoneyFlow = calcInvestIncome(tdList, activesArr)
            moneyFlow=investMoneyFlow+jobMoneyFlow;
            if (i==0)
            {
                tdList[3].innerText=moneyFlow; 
            }
            if (cashCashion>60000)
            {

                profitMoney = investMoneyFlow*0.8;
                deedMoneyX = investMoneyFlow*0.2;

                deferredToCapital = moneyFlow*0.8;
                deferredToCashCashion = moneyFlow*0.2;
                capital += deferredToCapital;
                cashCashion += deferredToCashCashion;
                
                moneyFlow -= deedMoneyX;
                tdList[3].innerText=moneyFlow;
                tdList[6].innerText=deferredToCashCashion //отложено в падушку
            }
            else
            {
                cashCashion += moneyFlow;
                tdList[6].innerText=moneyFlow; 
            }
            tdList[4].innerText=deferredToCapital;          //отложено в капитал
            tdList[5].innerText=capital;       // капитал
            
            // tdList[6].innerText=deferredToCashCashion //отложено в падушку
            
            tdList[7].innerText=cashCashion // подушка
            tdList[8].innerText=0// остаток

            tdList[21].innerText=investMoneyFlow;

            tdList[22].innerText=profitMoney;
            tdList[23].innerText=deedMoneyX;

            // ACTIVES
            let activesElemsPrice=tableActives.getElementsByClassName('priceActive');
            let activesElemsIncome=tableActives.getElementsByClassName('incomeActive');
            console.log(tableActives);
            console.log(activesElemsPrice);
            console.log(activesElemsIncome);
            // let priceActive=Number(activesElemsPrice[countActives].innerHTML);
            // let incomeActive=Number(activesElemsIncome[countActives].innerHTML);
            if (countActives >= activesElemsPrice.length)
            {
                // infestIncole=calcInvestIncome(tdList, activesArr);
                // moneyFlow=investMoneyFlow+jobMoneyFlow;

                // tdLIst[4]=moneyFlow;
                tableTime.appendChild(cloneColumnZero);
                continue;
            }
            let priceActive=Number(activesElemsPrice[countActives].innerHTML);
            let incomeActive=Number(activesElemsIncome[countActives].innerHTML);
            if (priceActive < capital)
            {
                // activesElems[countActives].innerText=
                capital -= priceActive;
                tdList[9+10].innerText='Activ '+(countActives+1);
                tdList[9+11].innerText=priceActive;

                // infestIncole=calcInvestIncome(tdList, activesArr);
                // moneyFlow=investMoneyFlow+jobMoneyFlow;

                // tdLIst[4]=moneyFlow;

                activNew=JSON.parse(JSON.stringify(active));
                activNew={price: priceActive, income: incomeActive};
                activesArr.push(activNew)
                //if (countActives < activesElemsPrice.length-1)
                {
                    countActives++;
                }
            //continue;
            }
            
            tableTime.appendChild(cloneColumnZero);
        }
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
        var trElemArr = document.querySelectorAll('.trActive')
        let index = trElemArr.length-1;
        console.log(index);
        let trElemLastActive =  trElemArr[index].cloneNode(true);
        console.log(trElemLastActive);
        let tdElemArr = trElemLastActive.querySelectorAll('td');
        tdElemArr[0].innerText = index+2;
        tdElemArr[2].innerText = Number(document.getElementById('priceActiveInForm').value);
        tdElemArr[3].innerText = Number(document.getElementById('incomeActiveInForm').value);
        console.log(trElemLastActive);

        // tableActives.appendChild(trElemLastActive);

        // btnNewActives.before(trElemLastActive);
        document.querySelector('#tableActives tr:last-child').before(trElemLastActive);
        // trElemLastActive.before

        clearTableTime();
        calcTableTime();

        let heightBody=document.body.offsetHeight;
        topTableTime += 30;
        heightBody += 30;
        tableTime.style.top = topTableTime+'px';

        document.querySelector("body").style.minHeight = heightBody+'px';
        // document.querySelector("footer").style.top="calc(100% - 150px)";
        // document.querySelector("footer").style.bottom="100%";

        formNewActive.style.display='none';
        buttonDeleteActives.style.display='inline-block'

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
    })
    valueInputArr=[
            {num:2, value: 1},
            {num:3, value: 1},

            {num:4, value: 20},
            {num:5, value: 20},
            {num:6, value: 1},
            {num:7, value: 1},

        ]
    for (let i = 0; i < inputArr.length; i++) 
    {
        for (let j = 0; j < valueInputArr.length; j++) 
        {
                if (i == valueInputArr[j].num)
                {
                    inputArr[i].nextElementSibling.innerHTML += valueInputArr[j].value;             
                }
        }            
    }
    console.log(inputArr)
    setInterval(function () {
        for (let i = 0; i < inputArr.length; i++)
        {
            for (let j = 0; j < valueInputArr.length;j++)
            {
            
                
                if (i==valueInputArr[j].num)
                if ((Number(inputArr[i].value) < valueInputArr[j].value && i<=3    )
                || 
                    ( Number(inputArr[i].value) > 99 && (i==4  || i==5))) 
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
                if ((Number(inputArr[i].value) < valueInputArr[j].value && i<=3 )||
                    (Number(inputArr[i].value) > 99 && (i==4  || i==5))
                    ||
                    inputArr[i].value == '' //|| 
                   // inputArr[i].value.length > 2
                ) 

                {
                    inputArr[i].value = valueInputArr[j].value;
                }
            }

        }
    }
    //setInterval(function () {
    ;
    for (let i = 0; i < inputArr.length;i++)
    {

        //inputArr[i].oninput = e => 
        inputArr[i].oninput = function (e) {
            //if (inputArr[i].value == '0') inputArr[i].value = '';
                e.target.value = e.target.value.replace(/^0/, ''); 
                e.target.value = e.target.value.replace(/\D/g, '');
                if (inputArr[i].value.match("^0+")) {
                    inputArr[i].value = '';
                }
            
        }
        
        
    }
    function calcInvestIncome(tdList, activesArr)
    {
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
})
