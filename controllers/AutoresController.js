class AutoresController {
  constructor() {
    this.autores = [
      {
        id: 1,
        nombre: "Gabriel García Márquez",
        pais: "Colombia",
        fechaNacimiento: "1927-03-06"
      },
      {
        id: 2,
        nombre: "Miguel de Cervantes",
        pais: "España", 
        fechaNacimiento: "1547-09-29"
      }
    ];
    this.nextId = 3;
  }

  listar(req, res) {
    res.json(this.autores);
  }

  mostrarPorId(req, res) {
    const autor = this.autores.find(a => a.id === parseInt(req.params.id));
    if (!autor) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }
    res.json(autor);
  }

  crear(req, res) {
    const { nombre, pais, fechaNacimiento } = req.body;
    const nuevoAutor = {
      id: this.nextId++,
      nombre,
      pais,
      fechaNacimiento
    };
    this.autores.push(nuevoAutor);
    res.status(201).json(nuevoAutor);
  }

  actualizar(req, res) {
    const autor = this.autores.find(a => a.id === parseInt(req.params.id));
    if (!autor) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

    const { nombre, pais, fechaNacimiento } = req.body;
    autor.nombre = nombre || autor.nombre;
    autor.pais = pais || autor.pais;
    autor.fechaNacimiento = fechaNacimiento || autor.fechaNacimiento;

    res.json(autor);
  }

  eliminar(req, res) {
    const index = this.autores.findIndex(a => a.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

    this.autores.splice(index, 1);
    res.status(204).send();
  }

  ultimosCinco(req, res) {
    const ultimos = this.autores
      .sort((a, b) => b.id - a.id)
      .slice(0, 5);
    res.json(ultimos);
  }
}

module.exports = AutoresController;