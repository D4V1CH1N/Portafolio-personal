// Semana 3 - Backend Supabase
const PROYECTO_ACTUAL = 'portafolio_david';
const SUPABASE_URL = 'https://bmcdlimkoxnlyqeyksdk.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ci-J9b7yQEoYOqxbm3IDMA_DrOTWRr-';
const CLAVE_SESION_PROYECTO = 'sesionActiva_' + PROYECTO_ACTUAL;
const CLAVE_COLA_FIFO = 'colaSincronizacion_' + PROYECTO_ACTUAL;
const TABLAS_SUPABASE = [
    'cuentas',
    'pedidos',
    'reservas',
    'productos_extra',
    'consultas',
    'promociones',
    'actividad_clientes'
];

// Semana 2 - Arquitectura PWA y Bloqueo Prompt
window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
});

// Semana 3 - Roles y Sesion Volatil
function normalizarRol(rol) {
    const r = String(rol || 'visitante').toLowerCase().trim();
    if (r === 'admin') return 'administrador';
    return ['visitante', 'cliente', 'encargado', 'administrador'].includes(r) ? r : 'visitante';
}

function obtenerSesionActiva() {
    try {
        localStorage.removeItem('sesionActivaRol');
        localStorage.removeItem(CLAVE_SESION_PROYECTO);
        const raw = sessionStorage.getItem(CLAVE_SESION_PROYECTO);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && parsed.rol) {
                parsed.rol = normalizarRol(parsed.rol);
                return parsed;
            }
        }
        const rolLegacy = sessionStorage.getItem('sesionRolActiva');
        if (rolLegacy) {
            return {
                rol: normalizarRol(rolLegacy),
                nombre: sessionStorage.getItem('sesionUsuarioNombre') || '',
                correo: sessionStorage.getItem('sesionUsuarioCorreo') || '',
                proyecto: PROYECTO_ACTUAL
            };
        }
    } catch (err) {}
    return { rol: 'visitante', nombre: '', correo: '', proyecto: PROYECTO_ACTUAL };
}

function guardarSesionActiva(datos) {
    const rol = normalizarRol(datos && datos.rol);
    if (rol === 'visitante') {
        limpiarSesionActiva();
        return { rol: 'visitante', nombre: '', correo: '', proyecto: PROYECTO_ACTUAL };
    }
    const sesion = {
        rol: rol,
        nombre: String((datos && datos.nombre) || rol).trim(),
        correo: String((datos && datos.correo) || '').trim().toLowerCase(),
        proyecto: PROYECTO_ACTUAL,
        inicio: new Date().toISOString()
    };
    try {
        sessionStorage.setItem(CLAVE_SESION_PROYECTO, JSON.stringify(sesion));
        sessionStorage.setItem('sesionRolActiva', sesion.rol);
        sessionStorage.setItem('sesionUsuarioNombre', sesion.nombre);
        sessionStorage.setItem('sesionUsuarioCorreo', sesion.correo);
        localStorage.removeItem('sesionActivaRol');
        localStorage.removeItem(CLAVE_SESION_PROYECTO);
    } catch (err) {}
    return sesion;
}

function limpiarSesionActiva() {
    try {
        sessionStorage.removeItem(CLAVE_SESION_PROYECTO);
        sessionStorage.removeItem('sesionRolActiva');
        sessionStorage.removeItem('sesionUsuarioNombre');
        sessionStorage.removeItem('sesionUsuarioCorreo');
        localStorage.removeItem('sesionActivaRol');
        localStorage.removeItem(CLAVE_SESION_PROYECTO);
    } catch (err) {}
}

function aplicarClasesRolBody(rol) {
    if (!document.body) return;
    const rolNorm = normalizarRol(rol);
    document.body.classList.remove('rol-visitante', 'rol-cliente', 'rol-encargado', 'rol-administrador', 'rol-admin');
    if (rolNorm === 'administrador') {
        document.body.classList.add('rol-administrador', 'rol-admin');
    } else if (rolNorm === 'encargado') {
        document.body.classList.add('rol-encargado');
    } else if (rolNorm === 'cliente') {
        document.body.classList.add('rol-cliente');
    } else {
        document.body.classList.add('rol-visitante');
    }
}

// Semana 3 - Peticiones REST Supabase
async function requestSupabase(tabla, opciones) {
    const opts = opciones || {};
    const method = (opts.method || 'GET').toUpperCase();
    const query = opts.query ? String(opts.query) : '';
    const sep = query ? '&' : '';
    const filtroProyecto = method === 'GET' ? 'proyecto=eq.' + encodeURIComponent(PROYECTO_ACTUAL) : '';
    const qs = [filtroProyecto, query].filter(Boolean).join('&');
    const url = SUPABASE_URL + '/rest/v1/' + encodeURIComponent(tabla) + (qs ? '?' + qs : '');

    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
        return { ok: false, offline: true, data: null };
    }

    try {
        const headers = {
            apikey: SUPABASE_KEY,
            Authorization: 'Bearer ' + SUPABASE_KEY,
            'Content-Type': 'application/json',
            Prefer: 'return=representation'
        };
        const fetchOpts = { method: method, headers: headers };
        if (opts.body && method !== 'GET') {
            fetchOpts.body = JSON.stringify(Object.assign({}, opts.body, { proyecto: PROYECTO_ACTUAL }));
        }
        const res = await fetch(url, fetchOpts);
        if (!res.ok) {
            return { ok: false, offline: false, status: res.status, data: null };
        }
        const data = await res.json().catch(function () { return null; });
        return { ok: true, offline: false, status: res.status, data: data };
    } catch (err) {
        return { ok: false, offline: true, error: String(err && err.message ? err.message : err), data: null };
    }
}

// Semana 2 - Offline-First Cola FIFO
function leerColaFIFO() {
    try {
        const raw = localStorage.getItem(CLAVE_COLA_FIFO);
        const lista = raw ? JSON.parse(raw) : [];
        return Array.isArray(lista) ? lista : [];
    } catch (err) {
        return [];
    }
}

function guardarColaFIFO(lista) {
    try {
        const segura = Array.isArray(lista) ? lista : [];
        localStorage.setItem(CLAVE_COLA_FIFO, JSON.stringify(segura));
        localStorage.setItem('colaSincronizacionPWA', JSON.stringify(segura));
    } catch (err) {}
}

function encolarOperacionFIFO(tabla, payload, tipo) {
    const cola = leerColaFIFO();
    cola.push({
        idLocal: Date.now() + '-' + Math.floor(Math.random() * 10000),
        tabla: tabla,
        tipo: tipo || tabla,
        proyecto: PROYECTO_ACTUAL,
        payload: Object.assign({}, payload, { proyecto: PROYECTO_ACTUAL }),
        fecha: new Date().toISOString()
    });
    guardarColaFIFO(cola);
    return cola;
}

async function guardarTablaConRespaldoFIFO(tabla, payload, tipoCola) {
    const registro = Object.assign({}, payload, { proyecto: PROYECTO_ACTUAL });
    const res = await requestSupabase(tabla, { method: 'POST', body: registro });
    if (res.ok) {
        return { sincronizado: true, data: res.data, offline: false };
    }
    encolarOperacionFIFO(tabla, registro, tipoCola || tabla);
    return { sincronizado: false, offline: true, enCola: leerColaFIFO().length };
}

async function registrarActividadCliente(datos) {
    const sesion = obtenerSesionActiva();
    const registro = {
        proyecto: PROYECTO_ACTUAL,
        cliente: (datos && (datos.cliente || datos.usuario)) || sesion.nombre || sesion.correo || 'Visitante',
        accion: (datos && datos.accion) || 'interaccion',
        detalle: (datos && datos.detalle) || ''
    };
    return guardarTablaConRespaldoFIFO('actividad_clientes', registro, 'actividad');
}

// Semana 3 - Sugerencias Musicales en Supabase
async function guardarSugerenciaMusical(textoSugerencia, clienteNombre) {
    const sesion = obtenerSesionActiva();
    const clienteFinal = String(clienteNombre || sesion.nombre || sesion.correo || 'Visitante').trim();
    const registro = {
        proyecto: PROYECTO_ACTUAL,
        cliente: clienteFinal,
        accion: 'SUGERENCIA_MUSICAL',
        detalle: String(textoSugerencia || '').trim()
    };
    return guardarTablaConRespaldoFIFO('actividad_clientes', registro, 'SUGERENCIA_MUSICAL');
}

async function cargarSugerenciasMusicales() {
    const res = await requestSupabase('actividad_clientes', {
        method: 'GET',
        query: 'accion=eq.SUGERENCIA_MUSICAL&order=creado_en.desc&limit=50'
    });
    return res.ok && Array.isArray(res.data) ? res.data : [];
}

let promesaSyncFIFO = null;

async function sincronizarColaFIFO() {
    if (promesaSyncFIFO) {
        return promesaSyncFIFO;
    }
    promesaSyncFIFO = (async function () {
        if (typeof navigator !== 'undefined' && navigator.onLine === false) {
            return { procesados: 0, pendientes: leerColaFIFO().length };
        }
        const cola = leerColaFIFO();
        if (cola.length === 0) {
            return { procesados: 0, pendientes: 0 };
        }
        let procesados = 0;
        while (cola.length > 0) {
            const item = cola[0];
            const tablaDestino = item && item.tabla && TABLAS_SUPABASE.includes(item.tabla) ? item.tabla : 'consultas';
            const bodyEnviar = item && item.payload ? item.payload : item;
            const res = await requestSupabase(tablaDestino, { method: 'POST', body: bodyEnviar });
            if (!res.ok) {
                break;
            }
            cola.shift();
            procesados++;
            guardarColaFIFO(cola);
        }
        if (cola.length === 0) {
            try {
                localStorage.removeItem(CLAVE_COLA_FIFO);
                localStorage.removeItem('colaSincronizacionPWA');
                localStorage.removeItem('colaContactosOffline');
            } catch (err) {}
        }
        return { procesados: procesados, pendientes: cola.length };
    })();

    try {
        return await promesaSyncFIFO;
    } finally {
        promesaSyncFIFO = null;
    }
}

async function listarRegistrosProyecto(tabla, orden) {
    const res = await requestSupabase(tabla, {
        method: 'GET',
        query: 'order=' + encodeURIComponent(orden || 'id.desc') + '&limit=50'
    });
    return res.ok && Array.isArray(res.data) ? res.data : [];
}

async function verificarExisteUsuarioSupabase(correo) {
    const correoLimpio = String(correo || '').trim().toLowerCase();
    const q = 'usuario=eq.' + encodeURIComponent(correoLimpio) + '&select=id,usuario';
    const res = await requestSupabase('cuentas', { method: 'GET', query: q });
    if (!res.ok) {
        return { errorRed: true, existe: false };
    }
    return { errorRed: false, existe: Array.isArray(res.data) && res.data.length > 0 };
}

async function registrarClienteSupabase(nombre, correo, clave) {
    const correoLimpio = String(correo || '').trim().toLowerCase();
    const verificacion = await verificarExisteUsuarioSupabase(correoLimpio);
    if (verificacion.errorRed) {
        return { sincronizado: false, offline: true, duplicado: false };
    }
    if (verificacion.existe) {
        return { sincronizado: false, offline: false, duplicado: true };
    }
    const nuevo = {
        proyecto: PROYECTO_ACTUAL,
        usuario: correoLimpio,
        clave: String(clave || '').trim(),
        nombre: String(nombre || '').trim(),
        rol: 'cliente'
    };
    const res = await requestSupabase('cuentas', { method: 'POST', body: nuevo });
    if (res.ok) {
        const cuentaCreada = Array.isArray(res.data) && res.data[0] ? res.data[0] : nuevo;
        return { sincronizado: true, offline: false, duplicado: false, cuenta: cuentaCreada };
    }
    return { sincronizado: false, offline: Boolean(res.offline), duplicado: false };
}

async function buscarCuentaSupabase(correo, clave) {
    const correoLimpio = String(correo || '').trim().toLowerCase();
    const claveLimpia = String(clave || '').trim();
    const q = 'usuario=eq.' + encodeURIComponent(correoLimpio) + '&clave=eq.' + encodeURIComponent(claveLimpia) + '&select=*';
    const res = await requestSupabase('cuentas', { method: 'GET', query: q });
    if (!res.ok) {
        return { cuenta: null, offline: Boolean(res.offline) };
    }
    if (Array.isArray(res.data) && res.data.length > 0) {
        return { cuenta: res.data[0], offline: false };
    }
    return { cuenta: null, offline: false };
}

function ejecutarSyncAutomaticaFIFO(origen) {
    if (typeof navigator !== 'undefined' && navigator.onLine === false) return;
    if (leerColaFIFO().length === 0) return;
    sincronizarColaFIFO().then(function (resultado) {
        if (resultado && resultado.procesados > 0) {
            registrarActividadCliente({
                accion: origen || 'sync_fifo_online',
                detalle: 'Sincronizados ' + resultado.procesados + ' registros FIFO en ' + PROYECTO_ACTUAL
            });
            window.dispatchEvent(new CustomEvent('supabase-fifo-sincronizado', { detail: resultado }));
        }
    });
}

window.addEventListener('online', function () {
    ejecutarSyncAutomaticaFIFO('sync_fifo_online');
});

document.addEventListener('DOMContentLoaded', function () {
    ejecutarSyncAutomaticaFIFO('sync_fifo_inicio');
});

window.SupabasePortafolio = {
    PROYECTO_ACTUAL: PROYECTO_ACTUAL,
    SUPABASE_URL: SUPABASE_URL,
    SUPABASE_KEY: SUPABASE_KEY,
    CLAVE_SESION_PROYECTO: CLAVE_SESION_PROYECTO,
    CLAVE_COLA_FIFO: CLAVE_COLA_FIFO,
    TABLAS_SUPABASE: TABLAS_SUPABASE,
    normalizarRol: normalizarRol,
    obtenerSesionActiva: obtenerSesionActiva,
    guardarSesionActiva: guardarSesionActiva,
    limpiarSesionActiva: limpiarSesionActiva,
    aplicarClasesRolBody: aplicarClasesRolBody,
    requestSupabase: requestSupabase,
    leerColaFIFO: leerColaFIFO,
    guardarColaFIFO: guardarColaFIFO,
    encolarOperacionFIFO: encolarOperacionFIFO,
    guardarTablaConRespaldoFIFO: guardarTablaConRespaldoFIFO,
    registrarActividadCliente: registrarActividadCliente,
    sincronizarColaFIFO: sincronizarColaFIFO,
    listarRegistrosProyecto: listarRegistrosProyecto,
    guardarSugerenciaMusical: guardarSugerenciaMusical,
    cargarSugerenciasMusicales: cargarSugerenciasMusicales,
    verificarExisteUsuarioSupabase: verificarExisteUsuarioSupabase,
    registrarClienteSupabase: registrarClienteSupabase,
    buscarCuentaSupabase: buscarCuentaSupabase
};
