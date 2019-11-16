// window.onload = () => { $("body").text("Hello world"); }
async function getColumnNames() :Promise<string[]>{
    const response = await fetch('http://localhost:2050/recordCount');
    return await response.json();
}

async function getRecords(fromID: number, toID: number): Promise<string[][]> {
    const response = await fetch('http://localhost:2050/records?from=${(fromID)}&to=${(toID)}');
    return await response.json();
}

async function getRecordCount() :Promise<number> {
    const response = await fetch('http://localhost:2050/recordCount');
    return await response.json();
}

async function placeRecords(fromID: number, toID: number): Promise<number[]> {
    const records = await getRecords(fromID, toID)
    let appendable = '';
    for (const record of records) {
        appendable += '<tr id="table-row-${record[0]}">';
        for (const column of record) {
            appendable += '<td align="center">${column}</td>';
        }
    appendable += '</tr>';
    }
    $("#wrapper-table-content-body").empty();
    $("#wrapper-table-content-body").append(appendable);
    return [fromID, toID];
    }
async function placeRecordsFromCursor(cursor: number[]) : Promise<number[]> {
    cursor = cursor.sort((a,b) => {return a-b});
    return await placeRecords(cursor[0], cursor[1]);
}
}