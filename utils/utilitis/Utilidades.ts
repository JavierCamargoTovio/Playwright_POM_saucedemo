export class Utilidades {

       /**
 * Extrae el primer número encontrado en un string.
 * @param texto Ejemplo: "Total: $41.02" o "30,50€"
 */
    async extraerNumero(texto: string): Promise<number> {
        // Remplaza todo lo que no sea número o punto por nada
        const valorLimpio = texto.replace(/[^0-9.]/g, '');
        return parseFloat(valorLimpio);
    }

}