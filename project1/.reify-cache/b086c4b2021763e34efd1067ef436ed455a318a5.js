"use strict";module.export({TerminalController:()=>TerminalController});var chalk;module.link("chalk",{default(v){chalk=v}},0);var readline;module.link("readline",{default(v){readline=v}},1);var stdin,stdout;module.link("process",{stdin(v){stdin=v},stdout(v){stdout=v}},2);var DraftLog;module.link("draftlog",{default(v){DraftLog=v}},3);var chalkTable;module.link("chalk-table",{default(v){chalkTable=v}},4);var Person;module.link("./person.js",{Person(v){Person=v}},5);







class TerminalController {
    constructor() {
        this.print = {};
        this.data = {};
    }

    initializeTerminal(database, language) {
        DraftLog(console).addLineListener(process.stdin);

        this.terminal = readline.createInterface({
            input: stdin,
            output: stdout,
        });

        this.initializeTable(database, language);
    }

    initializeTable(database, language) {
        const data = database.map((item) => new Person(item).formatted(language));
        const table = chalkTable(this.getTableOption(), data);

        this.print = console.draft(table);
        this.data = data;
    }

    question(msg = "") {
        return new Promise((resolve) => this.terminal.question(msg, resolve));
    }

    updateTable(item) {
        this.data.push(item)
        this.print(chalkTable(this.getTableOption(), this.data))
    }

    closeTerminal() {
        this.terminal.close();
    }

    getTableOption() {
        return {
            leftPad: 2,
            columns: [
                { field: "id", name: chalk.cyan("ID") },
                { field: "vehicles", name: chalk.magenta("Vehicles") },
                { field: "kmTraveled", name: chalk.cyan("KM Traveled") },
                { field: "from", name: chalk.cyan("From") },
                { field: "to", name: chalk.cyan("To") },
            ],
        };
    }
}