import Database from "better-sqlite3";

const db = new Database('./data/database.sqlite')

db.prepare(`CREATE TABLE IF NOT EXISTS szamla (id INTEGER PRIMARY KEY AUTOINCREMENT, kiallito TEXT, vevo TEXT, szSzam INTEGER, szKelt DATETIME, tDatum DATETIME, fHatarido DATETIME, vegosszeg INTEGER, afa INTEGER)`).run()
db.prepare(`CREATE TABLE IF NOT EXISTS kiallito (id INTEGER PRIMARY KEY AUTOINCREMENT, nev TEXT, cim TEXT, adoszam INTEGER)`).run()
db.prepare(`CREATE TABLE IF NOT EXISTS vevo (id INTEGER PRIMARY KEY AUTOINCREMENT, nev TEXT, cim TEXT, adoszam INTEGER)`).run()


export const getAllSzamlak = () => db.prepare(`SELECT * FROM szamla`).all()
export const getAllKiallito = () => db.prepare(`SELECT * FROM kiallito`).all()
export const getAllVevo = () => db.prepare(`SELECT * FROM vevo`).all()

export const createSzamla = (kiallito, vevo, szSzam, vegosszeg, afa) => {
  const now_origi = new Date();
  const now = now_origi.toISOString();
  const future = new Date(now_origi);
  future.setDate(future.getDate() + 30);
  const future_date = future.toISOString();
  db.prepare(`INSERT INTO szamla (kiallito,vevo,szSzam,szKelt, tDatum, fHatarido, vegosszeg, afa) VALUES (?,?,?,?,?,?,?,?)`).run(kiallito, vevo, szSzam, now, now, future_date, vegosszeg, afa);
}
export const createKiallito = (nev, cim, adoszam) => { db.prepare(`INSERT INTO kiallito (nev, cim, adoszam) VALUES (?,?,?)`).run(nev, cim, adoszam); }
export const createVevo = (nev, cim, adoszam) => { db.prepare(`INSERT INTO vevo (nev, cim, adoszam) VALUES (?,?,?)`).run(nev, cim, adoszam); }

export const setSzamla = (id, kiallito, vevo, szSzam, vegosszeg, afa) => {db.prepare(`UPDATE szamla SET kiallito = ?,vevo = ?,kategória = ?,szSzam = ?, vegosszeg = ?, afa = ? WHERE id = ? `).run(kiallito, vevo, szSzam, vegosszeg, afa, id)}
export const setKiallito = (id, nev, cim, adoszam) => { db.prepare(`UPDATE kiallito SET nev = ?,cim = ?,adoszam = ? WHERE id = ?`).run(nev, cim, adoszam, id) }
export const setVevo = (id, nev, cim, adoszam) => { db.prepare(`UPDATE vevo SET nev = ?,cim = ?,adoszam = ? WHERE id = ?`).run(nev, cim, adoszam, id) }

export const deleteSzamla = (id) => db.prepare(`DELETE FROM szamla WHERE id = ?`).run(id)
export const deleteKiallito = (id) => db.prepare(`DELETE FROM kiallito WHERE id = ?`).run(id)
export const deleteVevo = (id) => db.prepare(`DELETE FROM vevo WHERE id = ?`).run(id)

const now_origi = new Date()
const now = now_origi.toISOString();




const kiallitok = [
  {
    nev: "Dr. Tóth András",
    cim: "1051 Budapest, Fő utca 12.",
    adoszam: 12345678141
  },
  {
    nev: "Dr. Bálint Eszter",
    cim: "1062 Budapest, Széchenyi tér 3.",
    adoszam: 87654321111
  },
  {
    nev: "Dr. Varga Katalin",
    cim: "1075 Budapest, Rákóczi út 45.",
    adoszam: 11223344322
  }
];

const vevok = [
  {
    nev: "Kovács Péter",
    cim: "1092 Budapest, Kinizsi utca 8.",
    adoszam: 99887766554
  },
  {
    nev: "Nagy Erika",
    cim: "1117 Budapest, Bartók Béla út 23.",
    adoszam: 55443322110
  },
  {
    nev: "Szabó László",
    cim: "1123 Budapest, Alkotás utca 47.",
    adoszam: 66778899001
  }
];

const kiallito = getAllKiallito()
const vevo = getAllVevo()

const szamlak = [{
  kiallito: kiallito[0],
  vevo: vevo[0],
  szSzam: 10,
  vegosszeg: 100,
  afa: 20,
}, {
  kiallito: kiallito[1],
  vevo: vevo[1],
  szSzam: 20,
  vegosszeg: 200,
  afa: 20,
}, {
  kiallito: kiallito[2],
  vevo: vevo[2],
  szSzam: 30,
  vegosszeg: 300,
  afa: 20,
}
];

if (getAllKiallito().length === 0) {
  kiallitok.forEach(kiallito => {
    createKiallito(kiallito.nev, kiallito.cim, kiallito.adoszam)
  })
}
if (getAllVevo().length === 0) {
  vevok.forEach(vevo => {
    createVevo(vevo.nev, vevo.cim, vevo.adoszam)
  })
}
if (getAllSzamlak().length === 0) {
  szamlak.forEach(szamla => {
    createSzamla(JSON.stringify(szamla.kiallito),
    JSON.stringify(szamla.vevo),
      szamla.szSzam,
      szamla.vegosszeg,
      szamla.afa)
  })
}
