package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"strconv"
)

const recordCount = 1000000
const columnCount = 11

var columns = [columnCount]string{"ID", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"}
var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

func main() {

	fs := http.FileServer(http.Dir("../"))
	http.Handle("/", fs)

	http.HandleFunc("/recordCount", handlerRecordCount)
	http.HandleFunc("/columns", handlerColumns)
	http.HandleFunc("/records", handlerRecords)

	log.Fatal(http.ListenAndServe(":2050", nil))
}

func httpSendError(w http.ResponseWriter, err error) {
	w.WriteHeader(http.StatusBadRequest)
	fmt.Fprintf(w, "%v", err)
}

func handlerRecordCount(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "%v", recordCount)
}

func handlerColumns(w http.ResponseWriter, r *http.Request) {
	jsonString, err := json.Marshal(columns)
	if err == nil {
		fmt.Fprintf(w, "%s", jsonString)
	} else {
		httpSendError(w, err)
	}
}

func randSeq(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}

func handlerRecords(w http.ResponseWriter, r *http.Request) {
	fromIdx, err := strconv.Atoi(r.FormValue("from"))
	if err != nil {
		httpSendError(w, err)
		return
	}
	toIdx, err := strconv.Atoi(r.FormValue("to"))
	if err != nil {
		httpSendError(w, err)
		return
	}
	if toIdx < fromIdx || fromIdx < 0 || fromIdx > recordCount-1 || toIdx < 0 || toIdx > recordCount-1 {
		httpSendError(w, errors.New("Invalid from or to parameter"))
		return
	}

	records := make([][]string, toIdx-fromIdx)
	for i := range records {
		records[i] = make([]string, columnCount)
		for j := range records[i] {
			if j == 0 {
				records[i][j] = fmt.Sprintf("%v", i)
			} else {
				records[i][j] = fmt.Sprintf("%s%v-%s", columns[j], i, randSeq(3))
			}
		}
	}

	jsonString, err := json.Marshal(records)
	if err == nil {
		fmt.Fprintf(w, "%s", jsonString)
	} else {
		httpSendError(w, err)
	}
}
