import { Page } from '@playwright/test';    

export class AbrirPagina {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }


    async abrirPagina(url: string) {
        await this.page.goto(url);
    }
}