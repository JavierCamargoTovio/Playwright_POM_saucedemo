import { Locator, Page } from "@playwright/test";

export class AgregarProducto {
    private nombres: string[] = [];

    readonly page: Page; 
    readonly allElementos: Locator;
    readonly botonAgregar: Locator;
    readonly nombreProducto: Locator;


    constructor(page: Page) {
        this.page = page;
        this.allElementos = page.locator('.inventory_item');
        this.botonAgregar = page.getByRole('button', { name: 'Add to cart' });
        this.nombreProducto = page.locator('.inventory_item_name');
    }

    async agregarDosProductosAlCarrito(cantidadProductoAgregar:number) {
    
    const cantidadTotal = await this.allElementos.count();
    console.log('Cantidad total de productos disponibles:', cantidadTotal);

    if (cantidadTotal < cantidadProductoAgregar) {
        throw new Error(`No hay suficientes productos. Se encontraron: ${cantidadTotal}`);
    }

    // 1. Generar dos índices aleatorios únicos
    const indices = new Set<number>();
    while (indices.size < cantidadProductoAgregar) {
        const randomIndex = Math.floor(Math.random() * cantidadTotal);
        indices.add(randomIndex);
    }

    // 2. Iterar sobre los índices seleccionados al azar
    for (const index of indices) {
        const productoActual = this.allElementos.nth(index);
        
        const botonAgregar = productoActual.locator(this.botonAgregar);
        const nombreProducto = await productoActual.locator(this.nombreProducto).innerText();
        
        console.log(`[Indice ${index}] Agregando al carrito: ${nombreProducto}`);
        
        await botonAgregar.click();
        this.nombres.push(nombreProducto);
    }

    console.log('Productos agregados al carrito:', this.nombres);
}

 async obtenerNombresProductosAgregados(): Promise<string[]> {
    return this.nombres;
  }


}
