// db.js - Gestor de Datos
const DB_KEY = "IGLESIA_ERP_DATA";

const defaultData = {
  config: {
    nombreIglesia: "Iglesia Central",
    moneda: "$"
  },
  miembros: [
    { id: 1, nombre: "Juan Pérez", telefono: "+504 9900-0000", tipo: "Miembro", estado: "Líder" },
    { id: 2, nombre: "María López", telefono: "+504 8811-2233", tipo: "Visitante", estado: "Nuevo" }
  ],
  finanzas: [
    { id: 1, fecha: "2026-08-20", tipo: "ingreso", categoria: "Diezmo", descripcion: "Aporte semanal", monto: 150.00 },
    { id: 2, fecha: "2026-08-22", tipo: "egreso", categoria: "Servicios", descripcion: "Pago de electricidad", monto: 45.00 }
  ],
  actividades: [
    "Sistema iniciado correctamente."
  ]
};

function getDB() {
  const data = localStorage.getItem(DB_KEY);
  return data ? JSON.parse(data) : defaultData;
}

function saveDB(data) {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
}
