/* ========================================================================
   REGISTRO / SUSCRIPCIÓN DE USUARIOS — MUEBLERÍA JOTA
   Simula el registro con localStorage. Sin backend, sin contraseña.
   ======================================================================== */

const USUARIOS_KEY = 'muebleriaJota-usuarios';

function formatearEmail(valor) {
  return String(valor || '').trim().toLowerCase();
}

function leerUsuarios() {
  try {
    const datos = localStorage.getItem(USUARIOS_KEY);
    const usuarios = datos ? JSON.parse(datos) : [];
    return Array.isArray(usuarios) ? usuarios : [];
  } catch (error) {
    return [];
  }
}

function guardarUsuarios(usuarios) {
  localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
}

function emailRegistrado(email) {
  const normalizado = formatearEmail(email);
  return leerUsuarios().some((usuario) => formatearEmail(usuario.email) === normalizado);
}

function mostrarError(idError, mensaje) {
  const campoError = document.getElementById(idError);
  if (campoError) {
    campoError.textContent = mensaje;
    campoError.hidden = false;
  }
}

function limpiarError(idError) {
  const campoError = document.getElementById(idError);
  if (campoError) {
    campoError.textContent = '';
    campoError.hidden = true;
  }
}

function esEmailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function validarFormulario() {
  limpiarError('error-nombre');
  limpiarError('error-email');
  limpiarError('error-suscripcion');
  limpiarError('registro-general-error');

  const nombre = document.getElementById('registro-nombre').value.trim();
  const email = document.getElementById('registro-email').value.trim();
  const suscripcion = document.getElementById('registro-suscripcion').checked;

  let valido = true;

  if (!nombre) {
    mostrarError('error-nombre', 'Por favor, ingresá tu nombre.');
    valido = false;
  }

  if (!email) {
    mostrarError('error-email', 'Por favor, ingresá tu email.');
    valido = false;
  } else if (!esEmailValido(email)) {
    mostrarError('error-email', 'Por favor, ingresá un email válido.');
    valido = false;
  } else if (emailRegistrado(email)) {
    mostrarError('error-email', 'Este email ya está registrado.');
    valido = false;
  }

  if (!suscripcion) {
    mostrarError('error-suscripcion', 'Debés aceptar recibir ofertas, novedades y promociones para registrarte.');
    valido = false;
  }

  return valido;
}

function guardarUsuario() {
  const nombre = document.getElementById('registro-nombre').value.trim();
  const email = formatearEmail(document.getElementById('registro-email').value);

  const usuarios = leerUsuarios();
  usuarios.push({ nombre, email });
  guardarUsuarios(usuarios);

  return usuarios;
}

function mostrarMensajeExito() {
  const formulario = document.getElementById('registro-form');
  const exito = document.getElementById('registro-success');
  if (formulario) {
    formulario.hidden = true;
  }
  if (exito) {
    exito.hidden = false;
  }
}

function limpiarFormulario() {
  document.getElementById('registro-form').reset();
  limpiarError('error-nombre');
  limpiarError('error-email');
  limpiarError('error-suscripcion');
  limpiarError('registro-general-error');
}

function registrarUsuario(evento) {
  evento.preventDefault();

  if (validarFormulario()) {
    guardarUsuario();
    limpiarFormulario();
    mostrarMensajeExito();
  }
}

function mostrarMensajeGeneral(mensaje) {
  const generalError = document.getElementById('registro-general-error');
  if (generalError) {
    generalError.textContent = mensaje;
    generalError.hidden = false;
  }
}

function initRegistro() {
  const formulario = document.getElementById('registro-form');
  const suscripcion = document.getElementById('registro-suscripcion');

  if (formulario) {
    formulario.addEventListener('submit', registrarUsuario);
  }

  if (suscripcion) {
    suscripcion.addEventListener('change', () => {
      if (suscripcion.checked) {
        limpiarError('error-suscripcion');
      }
    });
  }

  limpiarFormulario();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRegistro);
} else {
  initRegistro();
}