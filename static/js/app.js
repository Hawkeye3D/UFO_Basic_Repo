
// I want a global enumeration
// that I can use for keeping the index
// of my data datable.  This comes in the form of
// a dictionary, which is a useful device for keeping track 
// of column headings, especially if they are moved around
var enumHeading = {
    datetime: 0,
    city: 1,
    state: 2,
    country: 3,
    shape: 4

}
var consoleOn = true
var typeChart_global  ='lines'
var lastSelection =0
/**
 * Purpose: is to turn on or off consoling, without commenting it out
 * consoleOn=False should be set to turn off
 * @param {message or variable to be displayed inc onsole} v 
 */
function showThis(v) {
    if (consoleOn);
    console.log(v);
}

/**
 * 
 * @param {Dictionary with data} jsondict 
 * @param {Specific ID of table to generate} tableid 
 * @param {Outer area that contains the table} tableareaid 
 * @param {-unused, reserved for filtering the data} filterflag 
 */
function fillTableViaJson(jsondict, tableid, tableareaid, filterflag) {

    var col = [];
    for (var i = 0; i < jsondict.length; i++) {
        for (var key in jsondict[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.getElementById(tableid);

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1); // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th"); // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < jsondict.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = jsondict[i][col[j]];
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById(tableareaid);
    divContainer.innerHTML = ""; //clean it out if populated
    divContainer.appendChild(table); //place our new table there
}


/**This routnine is passed the current
 * Row index of the dictionary object and returns either True
 * or False depending upon whether the filter condition is met or not
 */
function appendFilters(jsondict,col,currentRow) {
    listInputIds = ['datetime', 'city', 'state', 'country', 'shape'];

    /**Cycle through all of the text fields , using the enumeration
     * for clarity.  If the field contains a blank or 'Search..' it will
     * be ignored and the next field evaluated.  If the row contains the 
     * field text, the next field is evaluated.  If the row does not contain
     * the field text then this function will return False and  the next ROW will be evaluated.
     *  If all fields have been processed this routine will return True and the 
     * current row will be included on the list, having passed all the tests 
     */
    for (var k= 0; k < listInputIds.length; k++) {
        //console.log(listInputIds[k])
        elem = document.getElementById(listInputIds[k])
        //console.log(k,"element value: ",$(elem).val())
        //console.log(jsondict[currentRow][col[k]])
        if (  $(elem).val()===jsondict[currentRow][col[k]]) {
            // has match, continue with loop
        }
        else if ( $(elem).val() ==='Search...') {
            // no filter, continue with loop

        }
        else if ( $(elem).val()=== ''){ 
            // no filter, continue with loop
 
        }
        else {//bail out of loop, no match on current field
          return false
        }
    }
    return true
}
/**
 * 
 * @param {Dictionary with data} jsondict 
 * @param {Specific ID of table to generate} tableid 
 * @param {Outer area that contains the table} tableareaid 
 * @param {index of column to filter on} filterflag 
 * @param {value to look for when building} filterValue 
 */
function filterTableViaJson(jsondict, tableid, tableareaid, filterflag, filterValue) {
    $('#ufo-table').empty()
    var col = [];
    for (var i = 0; i < jsondict.length; i++) {
        for (var key in jsondict[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.getElementById(tableid);
    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1); // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th"); // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < jsondict.length; i++) {
        //console.log(`Filter Value: ${filterValue}`)
        if (appendFilters(jsondict,col,i)===true) {
            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = jsondict[i][col[j]];

            }
        }

    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById(tableareaid);
    divContainer.innerHTML = ""; //clean it out if populated
    divContainer.appendChild(table); //place our new table there
}
/**
 * Intialize events
 */
function initEvents() {
    document.getElementById("filter-btn").addEventListener("click", refreshScreen )//always show entirelist upon refresh)
    document.getElementById("datetime").addEventListener("change", txtChangeDate(this))
    document.getElementById("city").addEventListener("change", txtChangeCity(this))
    document.getElementById("state").addEventListener("change", txtChangeState(this))
    document.getElementById("country").addEventListener("change", txtChangeCountry(this))
    document.getElementById("shape").addEventListener("change", txtChangeShape(this))
}
function refreshScreen(){
    location.reload()
}
function filterData() {
    console.log("Button was clicked and this will run the filter logic")
}


// function filterDateChecks(elem) {
//     if (elem.checked === true) {
//         console.log("Check date was clicked");
//     } else {
//         console.log("Check date was NOT clicked");
//     }
// }

// function filterCityChecks(elem) {
//     if (elem.checked === true) {
//         console.log("Check City was clicked");
//     } else {
//         console.log("Check City was NOT clicked");
//     }
// }

// function filterStateChecks(elem) {
//     if (elem.checked === true) {
//         console.log("Check State was clicked");
//     } else {
//         console.log("Check State was NOT clicked");
//     }
// }

// function filterCountryChecks(elem) {
//     if (elem.checked === true) {
//         console.log("Check Country was clicked");
//     } else {
//         console.log("Check Country was NOT clicked");
//     }
// }

// function filterShapeChecks(elem) {
//     if (elem.checked === true) {
//         console.log("Check Shape was clicked");
//     } else {
//         console.log("Check Shape was NOT clicked");
//     }
// }
var uniDate = []
/**getDistinct
 * Purpose is to find unique values for
 * each column of UFO data and 
 * Display them in the Console
 * The idea is to ultimately use the
 * to populate dropdowns, for example
 * 
 * Input - data is a collection of paired values, ie. dictionary
 */
// function getDistinct(data) {
//     uniDate = [...new Set(data.map(item => item.datetime))];
//     console.log(uniDate);
    
//     var uniCity = [...new Set(data.map(item => item.city))];
//     console.log(uniCity);

//     var uniState = [...new Set(data.map(item => item.state))];
//     console.log(uniState);

//     var uniCountry = [...new Set(data.map(item => item.country))];
//     console.log(uniCountry);

//     var uniShape = [...new Set(data.map(item => item.shape))];
//     console.log(uniShape);
// }
// /**
//  * 
//  * @param {array to be sorted,not dates} array 
//  * @param {id of droplist to be populated with sorted dropdown} dropID 
//  */
// function loadSortedList(array, dropID) {
//     // var array = ["vintage", "frames", "treats", "engraved", "stickers", "jewelerybox", "flask"];

//     array.sort(function (val1, val2) {
//         return val1.localeCompare(val2);
//     });

//     var select = document.getElementById(dropID);

//     for (var i = 0; i < array.length; i++) {

//         select.innerHTML += '<option>' + array[i] + '</option>';

//     }
//     // <select id=dropID>

//     // </select>
// }
////////////////////////////////////////////////////////////////////
/**This will return a list of two lists
 * List a is the primary list of unique names, sorted
 * list b is the number of occurences of the associated 
 * name in list a.
 * This is good for bar graphs and histograms
 */
function arrayCounter(arr) {
    let a = [], b = [], prev; //init array values

    arr.sort(); //necessary for increasing the speed of the count, all counts can be attained in one pass after sorting
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {//COUNT OCCURENCES OF SORTED VALUE UNTIL THEY CHANGE
            a.push(arr[i]); //Add to list of unique names
            
            b.push(1); //INIT FIRST OCCURENCE, STARTCOUNT AT 1
        } else {
            b[b.length-1]++;//INCREMENT COUNT BY ONE
        }
        prev = arr[i]; //KEEP WHAT WE ARE LOOKING FOR
    }

    return [a, b];
}
/**a is a collection
 * b is a collection
 */
function makeChart(a, b, layout, overLayFlag,typePlot) {
    console.log(typePlot)
    TESTER = document.getElementById('plot');
    var data =[{
        x:a,
        y:b ,     
        type:typePlot
}]
    if (overLayFlag) {
       
        Plotly.newplot(TESTER, data,layout);
    }
    else {
        Plotly.newPlot(TESTER, data,layout);
    }
}
/**
 * 
 * @param {element triggering call} elem 
 */
function txtChangeDate(elem) {
    lastSelection=enumHeading.datetime
    let countList = arrayCounter(data.map(item => item.datetime));
    layout = { margin: { t: 30 }, title: 'Sightings by Date', xaxis: { title: 'Date' }, yaxis: { title: 'Sightings' } };
    makeChart(countList[0], countList[1], layout, false, typeChart_global);
    var value = $(elem).val().toLowerCase();
    if (countList[0].includes(value) === true) {
        filterTableViaJson(data, 'ufo-table', 'table-area', enumHeading.datetime, value);
    }
}

function txtChangeCity(elem) {
    lastSelection=enumHeading.city
   
   
   let countList=arrayCounter(data.map(item => item.city))
 
    layout={	margin: { t: 30},title:'Sightings by City',xaxis: {title:''},yaxis:{title:'Sightings'} } 
    makeChart(countList[0],countList[1],layout,false,typeChart_global)
    let value = $(elem).val()
   
    if (countList[0].includes(value) == true) {
      
        filterTableViaJson(data, 'ufo-table', 'table-area', enumHeading.city, value)
    }
}

function txtChangeState(elem) {
    lastSelection=enumHeading.state
    //uniValues = [...new Set(data.map(item => item.state))]
      
   let countList=arrayCounter(data.map(item => item.state))
    layout={	margin: { t: 30},title:'Sightings by State',xaxis: {title:''},yaxis:{title:'Sightings'} } 
    makeChart(countList[0],countList[1],layout,false,typeChart_global)
    let value = $(elem).val()
    // console.log(value);
    // console.log(uniValues.includes(value));
    if (countList[0].includes(value) == true) {
        // console.log(`got the state:${value}`);
        filterTableViaJson(data, 'ufo-table', 'table-area', enumHeading.state, value)
    }

}

function txtChangeCountry(elem) {
    lastSelection=enumHeading.country
    //uniValues = [...new Set(data.map(item => item.country))]
      
   let countList=arrayCounter(data.map(item => item.country))
    layout={	margin: { t: 30},title:'Sightings by Country',xaxis: {title:'Country'},yaxis:{title:'Sightings'} } 
    makeChart(countList[0],countList[1],layout,false,typeChart_global)
    let value = $(elem).val()
    // console.log(value);
    // console.log(uniValues.includes(value));
    if (countList[0].includes(value) == true) {
        // console.log(`got the country:${value}`);
        filterTableViaJson(data, 'ufo-table', 'table-area', enumHeading.country, value)
    }
}

function txtChangeShape(elem) {
    lastSelection=enumHeading.shape
    //uniValues = [...new Set(data.map(item => item.shape))]
      
   let countList=arrayCounter(data.map(item => item.shape))
   layout={	margin: { t: 30},title:'Sightings by Shape',xaxis: {title:'Shape'},yaxis:{title:'Sightings'} } 
    makeChart(countList[0],countList[1],layout,false,typeChart_global)
    let value = $(elem).val()
    // console.log(value);
    // console.log(uniValues.includes(value));
    if (countList[0].includes(value) == true) {
        // console.log(`got the shape:${value}`);
        filterTableViaJson(data, 'ufo-table', 'table-area', enumHeading.shape, value)
    }

}
function refreshChart() {
    switch (lastSelection) {
        case 0:
            countList = arrayCounter(data.map(item => item.datetime))
            layout = { margin: { t: 30 }, title: 'Sightings by Date', xaxis: { title: 'Date' }, yaxis: { title: 'Sightings' } }
            makeChart(countList[0], countList[1], layout, false, typeChart_global)
            break;
        case 1:
            countList = arrayCounter(data.map(item => item.city))
            layout = { margin: { t: 30 }, title: 'Sightings by City', xaxis: { title: '' }, yaxis: { title: 'Sightings' } }
            makeChart(countList[0], countList[1], layout, false, typeChart_global)
            break;
        case 2:
            countList = arrayCounter(data.map(item => item.state))
            layout = { margin: { t: 30 }, title: 'Sightings by State', xaxis: { title: 'State' }, yaxis: { title: 'Sightings' } }
            makeChart(countList[0], countList[1], layout, false, typeChart_global)
            break;
        case 3:
            countList = arrayCounter(data.map(item => item.country))
            layout = { margin: { t: 30 }, title: 'Sightings by Country', xaxis: { title: 'Country' }, yaxis: { title: 'Sightings' } }
            makeChart(countList[0], countList[1], layout, false, typeChart_global)
            break;
        case 4:
            countList = arrayCounter(data.map(item => item.shape))
            layout = { margin: { t: 30 }, title: 'Sightings by Shape', xaxis: { title: 'Shape' }, yaxis: { title: 'Sightings' } }
            makeChart(countList[0], countList[1], layout, false, typeChart_global)
            break;
    }
}

function btnSearch_Click(elem) {
    // let value = $(elem).val().innerHTML
    // 'console.log('this button was clicked',elem.id)
    let typeChart = ''
    switch (elem.id) {
        case 'lineChart':
            typeChart = 'lines';
            break;
        case 'barChart':
            typeChart = 'bar';
            break;
        case 'scatterChart':
            typeChart = 'scatter';
            break;
        case 'pieChart':
            typeChart = 'pie';
            break;
    }
typeChart_global=typeChart
refreshChart()
//filterTableViaJson(data, 'ufo-table', 'table-area', 0, 0)
 
}                