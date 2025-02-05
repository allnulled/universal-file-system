# universal-file-system

Sistema de ficheros universal, para node.js y browser.

No tiene dependencias y funciona igual en browser como en node.js.

## Instalación

```sh
npm install @allnulled/universal-file-system
```

## API

Usa localStorage o IDB en browser y fs en node.js.

Los métodos son síncronos, y son estos:

- `resolve_path(...args)`: devuelve la tura completa al nodo fs. Como `path.resolve`.
- `get_current_directory()`: devuelve el directorio actual.
- `make_directory(dir)`: crea un directorio.
- `change_directory(dir)`: mueve el directorio actual.
- `write_file(file, content)`: (sobre)escribe un nuevo fichero.
- `read_directory(dir)`: lista los nodos del directorio.
- `read_file(file)`: lee el contenido del fichero.
- `delete_file(file)`: elimina el directorio.
- `delete_directory(dir)`: elimina el fichero.
- `exists(node)`: devuelve si existe o no.
- `is_file(node)`: devuelve si es fichero o no.
- `is_directory(node)`: devuelve si es directorio o no.
- `rename(name, newName)`: le cambia el nombre a un fichero o directorio.

## Uso

Para empezar a usarlo bien, deberías especificar el driver que quieres usar, y las opciones son estas:

```js
const nodeFs = UFS_manager.driver("node").create();
const localStorageFs = UFS_manager.driver("localStorage").create(dbId);
const idbFs = UFS_manager.driver("idb").create(dbId);
```

Luego ya puedes usar la API que sea de la misma forma, con las salvedades que tenga, como llamadas asíncronas, o API interna, pero los contratos de los métodos son prácticamente iguales.

## Test

Puedes ver los tests dentro.