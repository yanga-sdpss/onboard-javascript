/*
 *Class Onboard and functions 
 */
export class Board {
    /*
    * Variables
    */
    totalRecordCount: number = 0;
    columnNames: string[] = [];
    records: any[] = [];
    from: number = 1;
    to: number = 30;

    constructor() {
        console.log('Board Class');
    }

    private buildTable() {
        const body = document.getElementsByTagName("body")[0];

        const ourTable = document.createElement("table");
        ourTable.setAttribute("id", "Table");

        const thead = document.createElement("thead");
        ourTable.appendChild(thead);

        for (let c = 0; c < this.columnNames.length; c++) {
            thead
                .appendChild(document.createElement("th"))
                .appendChild(document.createTextNode(this.columnNames[c]));
        }

        for (let i = 0; i < this.records.length; i++) {
            const tableRow = document.createElement("tr");
            ourTable.appendChild(tableRow);

            const innerArrayLength = this.records[i].length;

            for (let j = 0; j < innerArrayLength; j++) {
                tableRow
                    .appendChild(document.createElement("td"))
                    .appendChild(document.createTextNode(this.records[i][j]));
            }
        }
        body.appendChild(ourTable);
    }
    private getRecordCount() {
        $.ajax({
            url: "/recordCount",
            type: "GET",
            timeout: 1200,
            dataType: "text"
        })
            .done((responseText: any) => {
                this.totalRecordCount = responseText;
            })
            .fail((err) => {
                alert("Could not retrive total record number : " + err);
            });
    }
    async getColumnNames() {
        try {
            const respons = await $.ajax({
                url: "/columns",
                type: "GET",
                timeout: 12000,
                dataType: "json"
            });

            this.columnNames = respons;
            this.sync();

        } catch (erro) {
            alert("Could not display column names");
        }
    }
    async getActualRecords() {
        try {
            const response = await $.ajax({
                url: "/records?from=" + this.from + "&to" + this.to,
                timeout: 12000,
                dataType: "json"
            });

            this.getActualRecords = response;
            this.sync();

        } catch (err) {
            alert("No available records for your selection");
        }
    }
    private sync() {
        this.getActualRecords();
    }

    private nextSync() {
        this.buildTable();
    }
}
