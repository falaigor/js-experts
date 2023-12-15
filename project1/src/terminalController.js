import chalk from "chalk";
import readline from "readline";
import { stdin, stdout } from "process";
import DraftLog from "draftlog";
import chalkTable from "chalk-table";

import { Person } from "./person.js";

export class TerminalController {
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