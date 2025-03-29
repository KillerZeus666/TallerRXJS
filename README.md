# Taller RXJS - Desarrollo Web

## Integrantes
- **Katheryn Sofia Guasca**
- **Daniel Castro**
- **Santiago Pinto**

## Pontificia Universidad Javeriana  
**Ingeniería de Sistemas**  
**Profesor:** Juan Sebastián Angarita Torres  

---

## Descripción del Taller
Este taller tiene como objetivo aplicar los conocimientos adquiridos sobre cómo realizar consultas REST a APIs utilizando la librería **RXJS** en Angular. Se implementará una búsqueda de perfil en una red social ficticia, obteniendo información desde la API: [DummyJSON](https://dummyjson.com/).

## Objetivo
Desarrollar una aplicación en Angular que permita buscar usuarios por su **username**, visualizar sus datos principales y mostrar los **posts** y **comentarios** asociados, utilizando **RXJS** para suscribirse a los resultados de las consultas.

## Requisitos Técnicos
1. **Creación del Proyecto:**
   - Iniciar un nuevo proyecto en Angular **sin routing**.
   - Usar **Bootstrap** para mejorar la apariencia.
   - Utilizar **iconos** para representar el número de reacciones.
   
2. **Estructura de la Página:**
   - **Sección 1:** Barra de búsqueda para encontrar un usuario por su `username`.
   - **Sección 2:** Datos principales del usuario (solo si existe).
   - **Sección 3:** Lista de posts del usuario junto con sus comentarios.
   - **Extra:** Mostrar la cantidad de **reacciones** de cada post y el nombre de quien realizó el comentario.

3. **Consumo de la API:**
   - `https://dummyjson.com/users` → Devuelve todos los usuarios.
   - `https://dummyjson.com/posts` → Devuelve todos los posts.
   - `https://dummyjson.com/comments` → Devuelve todos los comentarios.
   - `https://dummyjson.com/users/filter?key=username&value={username}` → Busca un usuario por su `username`.
   - `https://dummyjson.com/posts/user/{userId}` → Obtiene los posts de un usuario.
   - `https://dummyjson.com/comments/post/{postId}` → Obtiene los comentarios de un post.

4. **Componentes:**
   - **Componente principal:** Realiza las consultas a la API y distribuye los datos.
   - **Componente de usuario:** Muestra los datos principales del usuario.
   - **Componente de posts:** Muestra los posts del usuario junto con los comentarios.
   - Comunicación entre componentes usando `@Input`.

5. **Manejo de Errores:**
   - Si el usuario no existe, mostrar un mensaje de alerta sin desplegar información adicional.

## Tecnologías Utilizadas
- **Angular**
- **RXJS**
- **Bootstrap**
- **TypeScript**

## Instrucciones de Instalación
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-repo/taller-rxjs.git
   ```
2. Entrar al directorio del proyecto:
   ```bash
   cd taller-rxjs
   ```
3. Instalar dependencias:
   ```bash
   npm install
   ```
4. Ejecutar la aplicación:
   ```bash
   ng serve
   ```
5. Abrir en el navegador:
   ```
   http://localhost:4200
   ```

## Contribuciones
Si deseas contribuir, crea un **fork** del repositorio y envía un **pull request** con tus cambios.

## Licencia
Este proyecto se desarrolla con fines académicos en la **Pontificia Universidad Javeriana** y no tiene fines comerciales.

