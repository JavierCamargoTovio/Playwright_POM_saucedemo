import { Locator, Page } from "@playwright/test";

export class ResumenCarrito {
    readonly page: Page; 
    readonly cantidadProductos: Locator;
    readonly nombreProducto: Locator;

    constructor(page: Page){
        this.page = page;
        this.cantidadProductos = page.locator("//*[@data-test='inventory-item']");
        this.nombreProducto = page.locator('.inventory_item_name');
    }

    async obtenerCantidadProductos(): Promise<number> {
        return await this.cantidadProductos.count();
    }

    async obtenerNombresProductos(): Promise<string[]> {
        return await this.nombreProducto.allTextContents();
    }


    async precioTotal(): Promise<number> {
    const subtotal = parseFloat(await this.page.locator('.summary_subtotal_label').innerText().then(t => t.replace('Item total: $', '')));
    const impuestos = parseFloat(await this.page.locator('.summary_tax_label').innerText().then(t => t.replace('Tax: $', '')));
    const total = subtotal + impuestos;
    console.log('Subtotal:', subtotal, 'Impuestos:', impuestos, 'Total:', total);
    return total;
}

}