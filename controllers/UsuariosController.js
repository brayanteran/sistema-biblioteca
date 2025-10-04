class UsuariosController {
  constructor() {
    this.usuarios = [
      {
        id: 1,
        nombre: "Ana García",
        email: "ana@email.com",
        telefono: "123456789",
        fechaRegistro: "2024-01-01"
      },
      {
        id: 2,
        nombre: "Carlos López",
        email: "carlos@email.com", 
        telefono: "987654321",
        fechaRegistro: "2024-01-05"
      }
    ];
    this.nextId = 3;
  }

  listar(req, res) {
    res.json(this.usuarios);
  }

  mostrarPorId(req, res) {
    const usuario = this.usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(usuario);
  }

  crear(req, res) {
    const { nombre, email, telefono } = req.body;
    const nuevoUsuario = {
      id: this.nextId++,
      nombre,
      email,
      telefono,
      fechaRegistro: new Date().toISOString().split("T")[0]
    };
    this.usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
  }

  actualizar(req, res) {
    const usuario = this.usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const { nombre, email, telefono } = req.body;
    usuario.nombre = nombre || usuario.nombre;
    usuario.email = email || usuario.email;
    usuario.telefono = telefono || usuario.telefono;

    res.json(usuario);
  }

  eliminar(req, res) {
    const index = this.usuarios.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    this.usuarios.splice(index, 1);
    res.status(204).send();
  }

  ultimosCinco(req, res) {
    const ultimos = this.usuarios
      .sort((a, b) => b.id - a.id)
      .slice(0, 5);
    res.json(ultimos);
  }
}

module.exports = UsuariosController;