"use strict";var mocha;module.link("mocha",{default(v){mocha=v}},0);var chai;module.link("chai",{default(v){chai=v}},1);var TerminalController;module.link("../src/terminalController.js",{TerminalController(v){TerminalController=v}},2);
const { describe, it } = mocha;


const { expect } = chai;



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
