// window.onload = () => { $("body").text("Hello world"); }
let totalRecordCount;
let columnNames: string[];
let records: any[];
let from: number = 1;
let to: number =30;

function BuildTable () {
    const body = document.getElementsByTagName("body")[0];
    
    const ourTable = document.createElement("table");
    ourTable.setAttribute("id", "Table");

    const thead = document.createElement("thead");
    ourTable.appendChild(thead);

    for (let c = 0; c < columnNames.length; c++){
        thead
        .appendChild(document.createElement("th"))
        .appendChild(document.createTextNode(columnNames[c]));
    }

    for (let i = 0; i < records.length; i++){
        const tableRow = document.createElement("tr");
        ourTable.appendChild(tableRow);

        const innerArrayLength = records[i].length;

        for (let j = 0; j < innerArrayLength; j++) {
            tableRow
            .appendChild(document.createElement("td"))
            .appendChild(document.createTextNode(records[i][j]));
        }
    }
    body.appendChild(ourTable);
}

function getRecordCount() {
    $.ajax({
        url: "/recordCount",
        type: "GET",
        timeout: 1200,
        dataType: "text"
    })
    .done(function(responseText: any){
        totalRecordCount = responseText;
    })
    .fail(function(){
        alert("Could not retrive total record number");
    });
}

function GetColumnNames() {
    $.ajax({
        url: "/columns",
        type: "GET",
        timeout: 12000,
        dataType: "json"
    })
    .done(function(responseJSON: any){
        columnNames = responseJSON;
        Sync();
    })
    .fail(function() {
        alert("Could not display column names");
    });
}

function getActualRecords() {
    $.ajax({
        url: "/records?from=" + from + "&to" + to,
        timeout: 12000,
        dataType: "json"
    })
    .done(function(responseRecords: any){
        records = responseRecords;
        nextSync();
    })
    .fail(function(){
        alert("No available records for your selection")
    });
}


function Sync() {
    getActualRecords();
}

function nextSync() {
    BuildTable();
}