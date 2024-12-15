# universal-file-system

Usa localStorage en browser y fs en node.js.

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

Creo que hay otro proyecto, así que puedes ver este como innecesario y redundante, además imita la API de node.js.

De primeras, este proyecto parece ser el oficial.

- [https://github.com/zen-fs/core](https://github.com/zen-fs/core)

No voy a perder el tiempo, ahora no quiero emular node.js entero en el browser, y sé que se puede porque hay vscode en browser.

Pero ahora mismo no estoy por esas, si buscas en Google: browser fs node.js, te sale esto.

Vale. Esto es un script ligero que te hace el parche. Fin.