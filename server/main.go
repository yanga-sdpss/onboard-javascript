package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

const recordCount = 10000

var columns = [...]string{"ID", "A", "B", "C", "D", "E", "F", "G", "H", "I"}

func main() {

	fs := http.FileServer(http.Dir("../"))
	http.Handle("/", fs)

	http.HandleFunc("/recordCount", handlerRecordCount)
	http.HandleFunc("/columns", handlerColumns)
	http.HandleFunc("/records", handlerRecords)

	log.Fatal(http.ListenAndServe(":2050", nil))
}

func handlerRecordCount(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "%v", recordCount)
}

func handlerColumns(w http.ResponseWriter, r *http.Request) {
	jsonString, _ := json.Marshal(columns)
	fmt.Fprintf(w, "%s", jsonString)
}

func handlerRecords(w http.ResponseWriter, r *http.Request) {
	fromIdx := r.FormValue("from")
	toIdx := r.FormValue("to")
	fmt.Fprintf(w, "From %v to %v", fromIdx, toIdx)
}
