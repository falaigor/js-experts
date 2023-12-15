import { TerminalController } from "./terminalController.js";
import { Person } from "./person.js";
import { save } from './repository.js'

import database from "../database.json";

const DEFAULT_LANG = "pt-BR";
const STOP_TERM = ":q"

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
    try {
        const answer = await terminalController.question();
        if (answer === STOP_TERM) {
            terminalController.closeTerminal();
            console.log('process finished!')
            return;
        }

        const person = Person.generateInstanceFromString(answer)
        terminalController.updateTable(person.formatted(DEFAULT_LANG))

        await save(person)

        return mainLoop()

    } catch (err) {
        console.error('Algo de errado não está certo**', error)
        return mainLoop()
    }
}

await mainLoop();