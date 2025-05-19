# Hunt the Wumpus – Suposiciones del juego

Este proyecto implementa una versión del clásico juego *Hunt the Wumpus* como SPA en Angular, siguiendo las especificaciones proporcionadas en la prueba técnica.

A lo largo del desarrollo se han hecho algunas suposiciones razonadas allí donde el enunciado no especificaba ciertos comportamientos. 
Estas decisiones permiten mantener una lógica clara, y pueden adaptarse fácilmente si se requiere.

## Suposiciones realizadas

- **Inicio del juego:**
  - El cazador empieza siempre en la casilla `(0, 0)`, que estará libre de peligros (sin pozo ni Wumpus).
  - Puede moverse libremente por el tablero (no hay restricciones en casillas ya visitadas).

- **Wumpus:**
  - Hay un único Wumpus por partida.
  - El Wumpus permanece inmóvil durante todo el juego.

- **Oro:**
  - Hay un único lingote de oro por partida.
  - El objetivo del juego es encontrar el oro y volver a la casilla de inicio.

- **Flechas:**
  - La cantidad de flechas disponibles es configurable al inicio. 
  - Por defecto, se asigna 1 flecha.
  - La flecha se dispara en línea recta, en la dirección actual del cazador, y avanza hasta que impacta contra el Wumpus o contra un muro.

- **Percepciones:**
  - El cazador percibe elementos solo desde la casilla que ocupa:
    - **Hedor:** si está en una casilla adyacente al Wumpus.
    - **Brisa:** si está en una casilla adyacente a un pozo.
    - **Brillo:** si está en la casilla del oro.
    - **Grito:** si la flecha alcanza y mata al Wumpus.
    - **Choque:** si intenta avanzar fuera del tablero.
  
- **Pozos:**
  - El número de pozos es configurable en la pantalla de inicio.
  - Si el cazador cae en un pozo, la partida termina (muerte inmediata).

- **Interfaz y flujo de juego:**
  - La aplicación contiene dos pantallas:
    - Una para configurar los parámetros del juego (tamaño del tablero, número de pozos, flechas).
    - Otra para jugar la partida mediante controles simples.

**_Estas suposiciones están sujetas a revisión en caso de recibir una aclaración oficial o requerimiento distinto._**

## Servidor de desarrollo

Para iniciar un servidor de desarrollo local, ejecuta:

```bash
ng serve
```
Este proyecto fue generado usando [Angular CLI](https://github.com/angular/angular-cli) versión 19.2.12.

Una vez que el servidor esté en ejecución, abre tu navegador y navega a `http://localhost:5700/`. 
La aplicación se recargará automáticamente cuando modifiques cualquiera de los archivos fuente.

Esto compilará tu proyecto y almacenará los artefactos de compilación en el directorio `dist/`. Por defecto, la compilación de producción optimiza tu aplicación para rendimiento y velocidad.


## Compilación

Para compilar el proyecto ejecuta:

```bash
ng build
```

## Herramientas de desarrollo

### Pruebas unitarias
Para ejecutar las pruebas unitarias con el ejecutor de pruebas [Jest](https://jestjs.io/es-ES/), usa el siguiente comando:

```bash
npm test
```
### Testing
El proyecto utiliza [Testing Library](https://testing-library.com/) para las pruebas de componentes, lo que nos permite escribir pruebas más robustas y centradas en el usuario. Enfoque en probar el comportamiento desde la perspectiva del usuario final.

### Linting y Formateo
El proyecto está configurado con:
- **ESLint**: Para el análisis estático del código y asegurar la calidad del código
- **Prettier**: Para el formateo automático del código y mantener un estilo consistente

Para ejecutar el linter:
```bash
npm run lint
```

Para formatear el código automáticamente:
```bash
npm run format
```
