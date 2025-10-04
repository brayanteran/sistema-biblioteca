class PrestamosController {
  constructor() {
    this.prestamos = [
      {
        id: 1,
        libroId: 1,
        usuarioId: 1,
        fechaPrestamo: "2024-01-20",
        fechaDevolucion: "2024-02-03",
        estado: "activo"
      },
      {
        id: 2,
        libroId: 2,
        usuarioId: 2,
        fechaPrestamo: "2024-01-15",
        fechaDevolucion: "2024-01-30",
        estado: "devuelto"
      }
    ];
    this.nextId = 3;
  }

  listar(req, res) {
    res.json(this.prestamos);
  }

  mostrarPorId(req, res) {
    const prestamo = this.prestamos.find(p => p.id === parseInt(req.params.id));
    if (!prestamo) {
      return res.status(404).json({ error: "Préstamo no encontrado" });
    }
    res.json(prestamo);
  }

  crear(req, res) {
    const { libroId, usuarioId, fechaPrestamo, fechaDevolucion } = req.body;
    const nuevoPrestamo = {
      id: this.nextId++,
      libroId: parseInt(libroId),
      usuarioId: parseInt(usuarioId),
      fechaPrestamo,
      fechaDevolucion,
      estado: "activo"
    };
    this.prestamos.push(nuevoPrestamo);
    res.status(201).json(nuevoPrestamo);
  }

  actualizar(req, res) {
    const prestamo = this.prestamos.find(p => p.id === parseInt(req.params.id));
    if (!prestamo) {
      return res.status(404).json({ error: "Préstamo no encontrado" });
    }

    const { libroId, usuarioId, fechaPrestamo, fechaDevolucion, estado } = req.body;
    prestamo.libroId = libroId ? parseInt(libroId) : prestamo.libroId;
    prestamo.usuarioId = usuarioId ? parseInt(usuarioId) : prestamo.usuarioId;
    prestamo.fechaPrestamo = fechaPrestamo || prestamo.fechaPrestamo;
    prestamo.fechaDevolucion = fechaDevolucion || prestamo.fechaDevolucion;
    prestamo.estado = estado || prestamo.estado;

    res.json(prestamo);
  }

  eliminar(req, res) {
    const index = this.prestamos.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: "Préstamo no encontrado" });
    }

    this.prestamos.splice(index, 1);
    res.status(204).send();
  }

  ultimosCinco(req, res) {
    const ultimos = this.prestamos
      .sort((a, b) => b.id - a.id)
      .slice(0, 5);
    res.json(ultimos);
  }

  porRangoFecha(req, res) {
    const { desde, hasta } = req.query;
    const prestamosFiltrados = this.prestamos.filter(prestamo => {
      return prestamo.fechaPrestamo >= desde && prestamo.fechaPrestamo <= hasta;
    });
    res.json(prestamosFiltrados);
  }
}

module.exports = PrestamosController;