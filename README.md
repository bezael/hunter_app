# Hunt the Wumpus

Este proyecto implementa una versión del clásico juego *Hunt the Wumpus* como SPA en Angular, siguiendo las especificaciones proporcionadas en la prueba técnica.

## Instalación

**Versiones compatibles de Node.js:**  
Este proyecto requiere una de las siguientes versiones de Node.js para funcionar correctamente con Angular **19.2.12**:

- `^18.19.1`
- `^20.11.1`
- `^22.0.0`

Puedes comprobar tu versión actual con:
```bash
node -v
```


## Instalación

Primero, instala las dependencias del proyecto:

```bash
npm install
```

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
npm run test
npm run test:watch
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
