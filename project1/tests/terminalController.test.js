import mocha from "mocha";
const { describe, it } = mocha;

import chai from "chai";
const { expect } = chai;

import { TerminalController } from "../src/terminalController.js";

describe("TerminalController", () => {
  const database = [
    {
      id: 1,
      vehicles: ["Motocicleta", "Carro", "Caminhão"],
      kmTraveled: 10000,
      from: "2021-01-01",
      to: "2023-01-01",
    },
  ];
  it("should be initialize terminal", () => {
    const terminalController = new TerminalController();

    const DEFAULT_LANGUAGE = "pt-BR";

    const result = terminalController.initializeTerminal(
      database,
      DEFAULT_LANGUAGE
    );

    expect(result).to.be.deep.equal(terminalController.updateTable(database));
  });
});
