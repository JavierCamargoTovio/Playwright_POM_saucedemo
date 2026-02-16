import { Locator, Page } from "@playwright/test";
import { ValidarInformacion } from "../models/ValidarInformacion";

export class FormularioInformacionPage {
    readonly page: Page;
    readonly nombreInput: Locator;
    readonly apellidoInput: Locator;
    readonly codePostalInput: Locator;
    readonly botonContinuar: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nombreInput = page.locator('#first-name');
        this.apellidoInput = page.locator('#last-name');
        this.codePostalInput = page.locator('#postal-code');
        this.botonContinuar = page.locator('#continue');
    }

    async llenarFormulario({nombre, apellido, codePostal}: ValidarInformacion) {
        await this.nombreInput.fill(nombre);
        await this.apellidoInput.fill(apellido);
        await this.codePostalInput.fill(codePostal);
        await this.botonContinuar.click();
    }

   
}