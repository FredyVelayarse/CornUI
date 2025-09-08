🌌 CornUI - Proyecto Angular

Este repositorio contiene el frontend del proyecto CornUI, desarrollado con Angular.
El objetivo es proporcionar una interfaz moderna y escalable, conectada a los servicios backend para la gestión de información.

📦 Requisitos previos

Antes de empezar, asegúrate de tener instalado:

Node.js
 (versión recomendada: 18.x o superior)

Angular CLI
 (versión recomendada: 17.x o superior)

Verifica tu instalación con:

node -v
npm -v
ng version

🚀 Instalación del proyecto

Clonar este repositorio:

git clone https://github.com/FredyVelayarse/CornUI.git
cd CornUI


Instalar dependencias:

npm install


Iniciar servidor de desarrollo:

ng serve


Luego abre en el navegador:

http://localhost:4200/

⚙️ Scripts disponibles

ng serve → Levanta la aplicación en modo desarrollo.

ng build → Genera los archivos optimizados de producción en la carpeta dist/.

ng test → Ejecuta las pruebas unitarias con Karma.

ng lint → Verifica la calidad del código.

📂 Estructura básica del proyecto
CornUI/
 ├── src/               # Código fuente principal
 │   ├── app/           # Componentes, servicios y módulos
 │   ├── assets/        # Imágenes, estilos globales, etc.
 │   └── environments/  # Configuración de entornos
 ├── angular.json       # Configuración del proyecto Angular
 ├── package.json       # Dependencias y scripts
 └── README.md          # Documentación

🌐 Despliegue

Para generar la versión de producción:

ng build --configuration production


Los archivos listos estarán en la carpeta dist/.
