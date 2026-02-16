📋 Plan de Pruebas: Automatización SauceDemo E2E

1. Introducción
El objetivo es automatizar el flujo principal de compra en la plataforma SauceDemo, garantizando que la selección aleatoria de productos mantenga la integridad de los datos (precios y nombres) hasta la confirmación final.

2. Estrategia Técnica
Lenguaje/Framework: TypeScript + Playwright.
Patrón de Diseño: Page Object Model (POM).
Ejecución: Headless en CI (GitHub Actions).
Reportes: HTML Report con capturas de pantalla y rastreos (Traces) en caso de falla.

3. Arquitectura del Proyecto (POM)
Para que el plan sea escalable, el código se dividirá de la siguiente manera:

   | Capa | Responsabilidad | 
   |----------|----------|
   | LoginPage    | Manejo de login y validación de acceso.   |
   | Agregar Producto    | Contar productos, selección aleatoria y captura de nombres/precios iniciales.   |
   | CarritoPage    | Verificación de productos agregados.   |
   | ResumenCarrito    | Entrada de datos de usuario, validación de sumas matemáticas y confirmación.   |

4. Diseño del Script (Lógica de Suma)
En el nivel de código, la validación matemática se manejará limpiando los caracteres especiales:
$$\text{PrecioNum} = \text{parseFloat}(\text{PrecioTexto}.replace('\$', ''))$$

5. Integración Continua (CI/CD)
El plan incluye un archivo de configuración para GitHub Actions que ejecutará las pruebas en cada push o pull_request.
Entorno: Ubuntu Latest.
Artefactos: En caso de falla, se adjuntará el playwright-report para descargar el video de la ejecución.

6. Criterios de Aceptación
Funcional: El flujo de compra se completa desde el login hasta el "Thank you".
Integridad: No hay discrepancias de centavos en la suma de los productos.
Reportabilidad: Los resultados se visualizan correctamente en el dashboard de GitHub Actions.

7. Cronograma Sugerido
Día 1: Creación de la estructura de carpetas y Page Objects (Login e Inventory).
Día 2: Lógica de selección aleatoria y validación de cálculos en Checkout.
Día 3: Configuración del YAML de GitHub Actions y pruebas de regresión.

¿Cómo deseas continuar?
Puedo ayudarte con:
El código completo de los Page Objects basados en este plan.
El script de la selección aleatoria (es la parte más técnica).
La configuración del archivo playwright.config.ts para optimizarlo para GitHub.


