# Prueba Olam Creative

Código realizado con React + TypeScript

## Demo
Pruedes entrar al siguiente enlace para probar la aplicación: https://prueba-olam.netlify.app

## Recursos especiales

- Se utilizaron arreglos para almacenar la sopa de letras y las palabras
- Uso de ciclos y funciones de arreglos tales como `includes` para dar con las palabras existentes y no existentes
- Las funciones que validan las entradas (`handleChangeSoup`, `handleChangeWords`) y retornan las palabras existentes y no existentes (`handleResult`) se encuentran en el archivo `src/context/PageProvider.tsx`
- Se desplegó la aplicación en netlify para facilitar la accesibilidad a la prueba
- Se utilizó vite para crear la aplicación de React + TypeScript

## Guía de despliegue
- Descargar el repositorio
- `npm install`
- `npm run dev`
- La aplicación queda corriendo localmente en el puerto 5173 http://localhost:5173

## Ejemplo de uso
Puedes ingresar cualquier matriz cuadrada desde 4x4
- Sopa de letras: Filas separadas con enter y las columnas con una coma
<br/><br/>
b,u,g,r,e,r,d,a,b,o<br/>
b,a,l,l,e,n,a,s,a,b<br/> 
o,j,l,m,a,b,o,h,r,n<br/>
l,e,b,o,t,o,n,e,c,i<br/>
s,h,m,u,n,b,n,u,o,b<br/>
o,b,u,f,a,n,d,a,b,o<br/>
n,b,s,g,b,t,h,b,p,t<br/>
b,u,h,o,j,b,c,e,b,a<br/>
o,d,u,b,s,o,h,u,v,t<br/>
m,b,a,n,d,e,r,a,s,a

- Palabras: Separadas con enter
<br/><br/>
barco<br/>
buho<br/>
bandera<br/>
bota<br/>
ballena<br/>
bolso<br/>
bufanda<br/>
ave<br/>
balon<br/>
boton<br/>
reloj<br/>
camisa
