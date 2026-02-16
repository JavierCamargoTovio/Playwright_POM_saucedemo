import { test, expect } from '@playwright/test';
import { LoginDto } from '../models/LoginDto';
import { LoginPage } from '../pages/LoginPage';
import { ConstantesFront } from '../utils/constantes/ConstantesFront';
import { AbrirPagina } from '../pages/AbrirPagina';
import { AgregarProducto } from '../pages/AgregarProducto';
import { CarritoPage } from '../pages/CarritoPage';
import { FormularioInformacionPage } from '../pages/FormularioInformacionPage';
import { ResumenCarrito } from '../pages/ResumenCarrito';
import { Utilidades } from '../utils/utilitis/utilidades';

test('e2e saucedemo Login - comprar productos', async ({ page }) => {

  const nombresSeleccionados = { nombres: [] as string[] };

  await test.step('Abiendo la pagina', async () => {
    const abrirPagina = new AbrirPagina(page);
    await abrirPagina.abrirPagina(ConstantesFront.URL_BASE);
  })

  await test.step('Haciendo login', async () => {
    const datosLogin: LoginDto = {
      username: ConstantesFront.USERNAME,
      password: ConstantesFront.PASSWORD
    };

    const loginPage = new LoginPage(page);
    await loginPage.login(datosLogin);

    await expect(page).toHaveURL(ConstantesFront.URL_INVENTORY);
  })

  await test.step('Agregar dos producto al carrito', async () => {
    const agregarProducto = new AgregarProducto(page);
    // numero a producto a agregar al carrito no puede ser mayor a la cantidad de productos disponibles en la pagina, actualmente hay 6 productos disponibles
    await agregarProducto.agregarDosProductosAlCarrito(3);
    nombresSeleccionados.nombres = await agregarProducto.obtenerNombresProductosAgregados();
  })
  
  await test.step('ir al carrito', async () => {
    const carritoPage = new CarritoPage(page);
    await carritoPage.irAlCarrito();
    await carritoPage.irAlCheckout();
  })

  await test.step('Diligenciar información de compra', async () => {
    const formularioInformacionPage = new FormularioInformacionPage(page);
    await formularioInformacionPage.llenarFormulario({
      nombre: 'Juan',
      apellido: 'Perez',
      codePostal: '12345'
    });
  })
   
  await test.step('validar el resumen los nombres de los productos y valor total', async () => {
    const resumenCarrito = new ResumenCarrito(page);
    const utilidades = new Utilidades();
    const nombresEnResumen = await resumenCarrito.obtenerNombresProductos(); 
    expect(nombresEnResumen).toEqual(nombresSeleccionados.nombres);

    const precioTotal = await resumenCarrito.precioTotal();

    const valorNumerico = await utilidades.extraerNumero(await page.locator('.summary_total_label').innerText());
    
    expect(precioTotal).toBeCloseTo(valorNumerico, 2);
  })
  
  
});
