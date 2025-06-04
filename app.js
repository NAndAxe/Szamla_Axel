import express from 'express'
import * as db from './util/database.js'
import cors from "cors";

const PORT = 8080;
const app = express()
app.use(cors())
app.use(express.json())

app.get("/szamla", (req, res) => {
    try {
        const szamla = db.getAllSzamlak();
        res.status(200).json(szamla)
    } catch (error) {
        res.status(500).json({ message: "Error: " + error })
    }
})
app.get("/kiallito", (req, res) => {
    try {
        const kiallito = db.getAllKiallito();
        res.status(200).json(kiallito)
    } catch (error) {
        res.status(500).json({ message: "Error: " + error })
    }
})
app.get("/vevo", (req, res) => {
    try {
        const vevo = db.getAllVevo();
        res.status(200).json(vevo)
    } catch (error) {
        res.status(500).json({ message: "Error: " + error })
    }
})

app.post("/szamla", (req, res) => {
    try {
        const { kiallito, vevo, szSzama, szKelte } = req.body
        if (!kiallito || !vevo || !szSzama || !szKelte) {
            return res.status(400).json({ message: "Data missing" })
        }
        const savedszamla = db.createszamla(kiallito, vevo, szSzama, szKelte)
        if (savedszamla.changes != 1) {
            return res.status(422).json({ message: "Failed to upload" })
        }
        res.status(201).json({ id: savedszamla.lastInsertRowid, kiallito, vevo, szSzama })
    } catch (error) {
        res.status(500).json({ message: "Error: " + error })
    }
})
app.post("/kiallito", (req, res) => {
    try {
        const { nev, cim, adoszam } = req.body
        if (!nev || !cim || !adoszam) {
            return res.status(400).json({ message: "Data missing" })
        }
        const savedkiallito = db.createKiallito(nev, cim, adoszam)
        if (savedkiallito.changes != 1) {
            return res.status(422).json({ message: "Failed to upload" })
        }
        res.status(201).json({ id: savedkiallito.lastInsertRowid, nev, cim, adoszam })
    } catch (error) {
        res.status(500).json({ message: "Error: " + error })
    }
})
app.post("/vevo", (req, res) => {
    try {
        const { nev, cim, adoszam } = req.body
        if (!nev || !cim || !adoszam) {
            return res.status(400).json({ message: "Data missing" })
        }
        const savedvevo = db.createVevo(nev, cim, adoszam)
        if (savedvevo.changes != 1) {
            return res.status(422).json({ message: "Failed to upload" })
        }
        res.status(201).json({ id: savedvevo.lastInsertRowid, nev, cim, adoszam })
    } catch (error) {
        res.status(500).json({ message: "Error: " + error })
    }
})

app.put("/szamla/:id", (req, res) => {
    try {
        const { kiallito, vevo, szSzama, szKelte } = req.body
        if (!kiallito || !vevo || !szSzama || !szKelte) {
            return res.status(400).json({ message: "Data missing" })
        }
        const savedszamla = db.setszamla(req.params.id, kiallito, vevo, szSzama, szKelte)
        if (savedszamla.changes != 1) {
            return res.status(422).json({ message: "Failed to upload" })
        }
        res.status(200).json({ id: savedszamla.lastInsertRowid, kiallito, vevo, szSzama, szKelte })
    } catch (error) {
        res.status(500).json({ message: "Error: " + error })
    }
})
app.put("/kiallito/:id", (req, res) => {
    try {
        const { nev, cim, adoszam } = req.body
        if (!nev || !cim || !adoszam) {
            return res.status(400).json({ message: "Data missing" })
        }
        const savedkiallito = db.setKiallito(req.params.id, nev, cim, adoszam)
        if (savedkiallito.changes != 1) {
            return res.status(422).json({ message: "Failed to upload" })
        }
        res.status(200).json({ id: savedkiallito.lastInsertRowid, nev, cim, adoszam })
    } catch (error) {
        res.status(500).json({ message: "Error: " + error })
    }
})
app.put("/vevo/:id", (req, res) => {
    try {
        const { nev, cim, adoszam } = req.body
        if (!nev || !cim || !adoszam) {
            return res.status(400).json({ message: "Data missing" })
        }
        const savedvevo = db.setVevo(req.params.id, nev, cim, adoszam)
        if (savedvevo.changes != 1) {
            return res.status(422).json({ message: "Failed to upload" })
        }
        res.status(200).json({ id: savedvevo.lastInsertRowid, nev, cim, adoszam })
    } catch (error) {
        res.status(500).json({ message: "Error: " + error })
    }
})

app.delete("/szamla/:id", (req, res) => {
    try {
        const deleteszamla = db.deleteszamla(req.params.id)
        if (deleteszamla.changes != 1) {
            return res.status(422).json({ message: "Failed to upload" })
        }
        res.status(200).json({ message: "Delete successful" });
    } catch (error) {
        res.status(500).json({ message: "Error: " + error })
    }
})
app.delete("/kiallito/:id", (req, res) => {
    try {
        const deletekiallito = db.deleteKiallito(req.params.id)
        if (deletekiallito.changes != 1) {
            return res.status(422).json({ message: "Failed to upload" })
        }
        res.status(200).json({ message: "Delete successful" });
    } catch (error) {
        res.status(500).json({ message: "Error: " + error })
    }
})
app.delete("/vevo/:id", (req, res) => {
    try {
        const deletevevo = db.deleteVevo(req.params.id)
        if (deletevevo.changes != 1) {
            return res.status(422).json({ message: "Failed to upload" })
        }
        res.status(200).json({ message: "Delete successful" });
    } catch (error) {
        res.status(500).json({ message: "Error: " + error })
    }
})

app.listen(PORT, () => console.log("Runs at " + PORT))