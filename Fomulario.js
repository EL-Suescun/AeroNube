
const deptoscitys = {
    an: ["Medellín", "Envigado", "Sabaneta", "Caldas"],
    cu: ["Bogotá", "Tunja", "Soacha", "Bosa"],
    va: ["Cali", "Yumbo", "Palmira", "Jamundi"]
}

const deptosel = document.getElementById('seldepto')
const ciudades = document.getElementById('selciudad')

deptosel.addEventListener("change", function asignarciudades() {
    let depart = document.getElementById("seldepto").value;
    ciudades.innerHTML = "";
    if (depart == "an") {
        llenarselectciudades(deptoscitys.an.sort())
    }
    if (depart == "cu") {
        llenarselectciudades(deptoscitys.cu.sort())
    }
    if (depart == "va") {
        llenarselectciudades(deptoscitys.va.sort())
    }

});

function llenarselectciudades(arraycitys) {
    arraycitys.forEach((n) => {
        var option = document.createElement("option");
        console.log(n);
        option.text = n;
        ciudades.add(option);
    });
}

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');


const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    identifica: /^\d{1,15}$/, // 7 a 15 numeros.
}

const campos = {
    correo: false,
    correo2: false,
    usuario: false,
    password: false,
    nombres: false,
    apellidos: false,
    identifica: false,
    fechanac: false,
    telmovil: false
}

// funcion flecha ..igual a function validarFormulario (e) {}
const validarFormulario = (e) => {
    switch (e.target.name) {
        case "txtcorreo1":
            validarCampo(expresiones.correo, e.target, 'correo');
            break;
        case "txtcorreo2":
            validarCampo(expresiones.correo, e.target, 'correo2');
            break;
        case "txtusuario":
            validarCampo(expresiones.usuario, e.target, 'usuario');
            break;
        case "txtpsw1":
            validarCampo(expresiones.password, e.target, 'psw');
            validarPassword2();
            break;
        case "txtpsw2":
            validarCampo(expresiones.password, e.target, 'psw2');
            validarPassword2();
            break;
        case "txtnombres":
            validarCampo(expresiones.nombre, e.target, 'nombres');
            break;
        case "txtapell":
            validarCampo(expresiones.nombre, e.target, 'apellidos');
            break;
        case "numIde":
            validarCampo(expresiones.identifica, e.target, 'identificacion');
            break;
        case "txtfechanac":
            validarCampo(expresiones.fechanacimiento, e.target, 'fechanac');
            break;
        case "txtcelular":
            validarCampo(expresiones.telefono, e.target, 'telmovil');
            break;
    }
}

const validarCampo = (expresion, input, campo) => {

    if (expresion.test(input.value)) {

        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        //console.log((`grupo__${campo}`).classList);
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        console.log('incorrecto');
        campos[campo] = false;
    }
}

const validarPassword2 = () => {
    const inputPassword1 = document.getElementById('txtpsw1');
    const inputPassword2 = document.getElementById('txtpsw2');

    if (inputPassword1.value !== inputPassword2.value) {
        //console.log("no coinciden")
        document.getElementById(`grupo__psw2`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__psw2`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`grupo__psw2 i`).classList.add('fa-times-circle');
        document.querySelector(`grupo__psw2 i`).classList.remove('fa-check-circle');
        document.querySelector(`grupo__psw2 .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos["password"] = false;
    } else {
        document.getElementById(`grupo__psw2`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__psw2`).classList.add('formulario__grupo-correcto');
        document.querySelector(`grupo__psw2 i`).classList.remove('fa-times-circle');
        document.querySelector(`grupo__psw2 i`).classList.remoaddve('fa-check-circle');
        document.querySelector(`grupo__psw2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos["password"] = true;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const terminos = document.getElementById('chkacepto');
    if (campos.usuario && campos.nombres && campos.apellidos && campos.identifica && campos.password && campos.correo && campos.telmovil && terminos.checked) {
        formulario.reset();

        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 5000);

        document.querySelectorAll('formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        });
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    } 
});