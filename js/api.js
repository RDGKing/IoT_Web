// === Ajusta esta URL al host de tu backend Flask ===
//   Local:       http://localhost:5000/api
//   Servidor:    http://TU_IP_PUBLICA:5000/api
const a = "100";
const b = "30";
const c = "141";
const d = "75";

const port = "5000";

export const url = `http://${a}.${b}.${c}.${d}:${port}/api/iot-devices/last-status-texto`;

// Une base + path evitando dobles o faltas de /
function joinUrl(base, path = "") {
  const b = String(base).replace(/\/+$/, "");
  const p = String(path).replace(/^\/+/, "");
  return `${b}/${p}`;
}

async function apiGet(path) {
  const url = joinUrl(API_BASE_URL, path);
  const res = await fetch(url, { method: "GET", mode: "cors" });
  if (!res.ok) throw new Error((await res.text()) || `GET ${url} failed`);
  return res.json();
}

async function apiPost(path, body) {
  const url = joinUrl(API_BASE_URL, path);
  const res = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error((await res.text()) || `POST ${url} failed`);
  return res.json();
}

// Endpoints (según tu backend Flask):
//   GET  /api/iot-devices/last5
//   GET  /api/iot-devices/last-status-texto
//   POST /api/iot-devices
export const getLast5 = () => apiGet("iot-devices/last5");
export const getLastStatusTexto = () => apiGet("iot-devices/last-status-texto");
export const insertStatus = (payload) => apiPost("iot-devices/", payload);

// Obtención de IP pública del cliente
export async function fetchPublicIP() {
  try {
    const r = await fetch("https://api.ipify.org?format=json");
    const j = await r.json();
    return j.ip || "0.0.0.0";
  } catch {
    return "0.0.0.0"; // Fallback en caso de error o bloqueo
  }
}