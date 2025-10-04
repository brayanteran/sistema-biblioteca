class LibrosController {
  constructor() {
    this.libros = [
      {
        id: 1,
        titulo: 'Cien años de soledad',
        autor: 'Gabriel García Márquez',
        año: 1967,
        disponible: true,
        fechaRegistro: '2024-01-15'
      },
      {
        id: 2, 
        titulo: 'El Quijote',
        autor: 'Miguel de Cervantes',
        año: 1605,
        disponible: true,
        fechaRegistro: '2024-01-10'
      }
    ];
    this.nextId = 3;
  }

  // GET - Listar todos los libros
  listar(req, res) {
    res.json(this.libros);
  }

  // GET - Mostrar libro por ID
  mostrarPorId(req, res) {
    const libro = this.libros.find(l => l.id === parseInt(req.params.id));
    if (!libro) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.json(libro);
  }

  // POST - Crear nuevo libro
  crear(req, res) {
    const { titulo, autor, año } = req.body;
    const nuevoLibro = {
      id: this.nextId++,
      titulo,
      autor,
      año: parseInt(año),
      disponible: true,
      fechaRegistro: new Date().toISOString().split('T')[0]
    };
    this.libros.push(nuevoLibro);
    res.status(201).json(nuevoLibro);
  }

  // PUT - Actualizar libro
  actualizar(req, res) {
    const libro = this.libros.find(l => l.id === parseInt(req.params.id));
    if (!libro) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    const { titulo, autor, año, disponible } = req.body;
    libro.titulo = titulo || libro.titulo;
    libro.autor = autor || libro.autor;
    libro.año = año ? parseInt(año) : libro.año;
    libro.disponible = disponible !== undefined ? disponible : libro.disponible;

    res.json(libro);
  }

  // DELETE - Eliminar libro
  eliminar(req, res) {
    const index = this.libros.findIndex(l => l.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    this.libros.splice(index, 1);
    res.status(204).send();
  }

  // GET - Últimos 5 libros
  ultimosCinco(req, res) {
    const ultimos = this.libros
      .sort((a, b) => b.id - a.id)
      .slice(0, 5);
    res.json(ultimos);
  }

  // GET - Libros por rango de fecha
  porRangoFecha(req, res) {
    const { desde, hasta } = req.query;
    const librosFiltrados = this.libros.filter(libro => {
      return libro.fechaRegistro >= desde && libro.fechaRegistro <= hasta;
    });
    res.json(librosFiltrados);
  }
}

module.exports = LibrosController;