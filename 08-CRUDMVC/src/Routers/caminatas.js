const express = require('express');
const router = express.Router();
const db = require('../DB/database');

// ============================================================
// FUNCIÓN: Validar datos de la caminata
// ============================================================
function validarCaminata(datos) {
    const errores = [];

    if (!datos.lugar || typeof datos.lugar !== 'string' || datos.lugar.trim().length < 2) {
        errores.push('El lugar es obligatorio (mínimo 2 caracteres)');
    }

    if (!datos.fecha) {
        errores.push('La fecha es obligatoria');
    }

    const distancia = parseFloat(datos.distancia);
    if (isNaN(distancia) || distancia <= 0) {
        errores.push('La distancia debe ser un número decimal mayor a 0');
    }

    const duracion = parseInt(datos.duracion);
    if (isNaN(duracion) || duracion <= 0) {
        errores.push('La duración debe ser un número entero (minutos) mayor a 0');
    }

    return errores;
}

// ============================================================
// GET /api/caminatas — Listar todas
// ============================================================
router.get('/', async (req, res) => {
    try {
        const [caminatas] = await db.execute(
            'SELECT id, lugar, DATE_FORMAT(fecha, "%Y-%m-%d") as fecha, distancia, duracion FROM caminatas ORDER BY fecha DESC'
        );
        res.json({ status: 'success', data: caminatas, count: caminatas.length });
    } catch (error) {
        console.error('Error al listar caminatas:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

// ============================================================
// POST /api/caminatas — Crear nueva
// ============================================================
router.post('/', async (req, res) => {
    try {
        const errores = validarCaminata(req.body);
        if (errores.length > 0) {
            return res.status(400).json({ status: 'error', message: errores.join('; ') });
        }

        const { lugar, fecha, distancia, duracion } = req.body;

        const [resultado] = await db.execute(
            'INSERT INTO caminatas (lugar, fecha, distancia, duracion) VALUES (?, ?, ?, ?)',
            [lugar.trim(), fecha, parseFloat(distancia), parseInt(duracion)]
        );

        res.status(201).json({ status: 'success', data: { id: resultado.insertId, lugar, fecha, distancia, duracion } });
    } catch (error) {
        console.error('Error al registrar caminata:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

// ============================================================
// DELETE /api/caminatas/:id — Eliminar
// ============================================================
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [existente] = await db.execute('SELECT id FROM caminatas WHERE id = ?', [id]);
        
        if (existente.length === 0) {
            return res.status(404).json({ status: 'error', message: `Caminata con ID ${id} no encontrada` });
        }

        await db.execute('DELETE FROM caminatas WHERE id = ?', [id]);
        res.json({ status: 'success', data: { mensaje: `Caminata eliminada` } });
    } catch (error) {
        console.error('Error al eliminar caminata:', error.message);
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
});

module.exports = router;