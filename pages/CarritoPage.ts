import { Locator, Page } from "@playwright/test";

export class CarritoPage {
    readonly page: Page;
    readonly botoncarrito: Locator;
    readonly botonCheckout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.botoncarrito = page.locator('.shopping_cart_link');
        this.botonCheckout = page.locator('#checkout');
    }

    async irAlCarrito() {
        await this.botoncarrito.click();
    }

    async irAlCheckout() {
        await this.botonCheckout.click();
    }

}