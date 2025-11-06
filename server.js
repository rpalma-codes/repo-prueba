const express = require('express');

const app = express()
const PORT = 3000

// Middleware para parsear JSON
app.use(express.json())

// Array para guardar las tareas en memoria
const tareas = [
  { id: 1, titulo: "Aprender Node.js", completada: false },
  { id: 2, titulo: "Hacer ejercicio", completada: true },
]

let siguienteId = 3

// GET - Obtener todas las tareas
app.get("/tareas", (req, res) => {
  res.json(tareas)
})

// GET - Obtener una tarea por ID
app.get("/tareas/:id", (req, res) => {
  const tarea = tareas.find((t) => t.id === Number.parseInt(req.params.id))

  if (!tarea) {
    return res.status(404).json({ error: "Tarea no encontrada" })
  }

  res.json(tarea)
})

// POST - Crear una nueva tarea
app.post("/tareas", (req, res) => {
  const { titulo } = req.body

  if (!titulo) {
    return res.status(400).json({ error: "El título es requerido" })
  }

  const nuevaTarea = {
    id: siguienteId++,
    titulo,
    completada: false,
  }

  tareas.push(nuevaTarea)
  res.status(201).json(nuevaTarea)
})

// PUT - Actualizar una tarea
app.put("/tareas/:id", (req, res) => {
  const id = Number.parseInt(req.params.id)
  const { titulo, completada } = req.body

  const tarea = tareas.find((t) => t.id === id)

  if (!tarea) {
    return res.status(404).json({ error: "Tarea no encontrada" })
  }

  if (titulo !== undefined) tarea.titulo = titulo
  if (completada !== undefined) tarea.completada = completada

  res.json(tarea)
})

// DELETE - Eliminar una tarea
app.delete("/tareas/:id", (req, res) => {
  const id = Number.parseInt(req.params.id)
  const index = tareas.findIndex((t) => t.id === id)

  if (index === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" })
  }

  tareas.splice(index, 1)
  res.json({ mensaje: "Tarea eliminada" })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
