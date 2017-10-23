var app = angular.module('RutValidador', []);

var msgValidacion = {
    'si' : 'Rut Válido',
    'no' : 'Rut no Válido'
};

resultadoValidacionRut = true;
rutFormateado = "";

function getDigito(rut) {
    var dvr = '0';
    suma = 0;
    mul = 2;
    for (i = rut.length - 1; i >= 0; i--) {
        suma = suma + rut.charAt(i) * mul;
        if (mul == 7) {
            mul = 2;
        } else {
            mul++;
        }
    }
    res = suma % 11;
    if (res == 1) {
        return 'k';
    } else if (res == 0) {
        return '0';
    } else {
        return 11 - res;
    }
}

function digitoCorrecto(crut) {
    largo = crut.length;
    if (largo < 2) {
        return false;
    }
    if (largo > 2) {
        rut = crut.substring(0, largo - 1);
    } else {
        rut = crut.charAt(0);
    }
    dv = crut.charAt(largo - 1);
    digitoValido(dv);
    if (rut == null || dv == null) {
        return 0;
    }
    dvr = getDigito(rut);
    if (dvr != dv.toLowerCase()) {
        return false;
    }
    return true;
}

function digitoValido(dv) {
    if (dv != '0' && dv != '1' && dv != '2' && dv != '3' && dv != '4' && dv != '5' && dv != '6' && dv != '7' && dv != '8' && dv != '9' && dv != 'k' && dv != 'K') {
        return false;
    }
    return true;
}

function quitarFormato(rut){
    var strRut = new String(rut);
    while (strRut.indexOf(".") != -1) {
        strRut = strRut.replace(".", "");
    }
    while (strRut.indexOf("-") != -1) {
        strRut = strRut.replace("-", "");
    }
    return strRut;
}
/*Servicio el cual valida si es un rut válido o no*/
app.service('validarRut', function() {
    return function(texto, scope) {
        texto = quitarFormato(texto);
        largo = texto.length;
        // rut muy corto
        if (largo < 8) {
            resultadoValidacionRut = false;
            return "";
        }
        // verifica que los numeros correspondan a los de rut
        for (i = 0; i < largo; i++) {
            // numero o letra que no corresponda a los del rut
            if (!digitoValido(texto.charAt(i))) {
                resultadoValidacionRut = false;
                return false;
            }
        }
        var invertido = "";
        for (i = (largo - 1), j = 0; i >= 0; i--, j++) {
            invertido = invertido + texto.charAt(i);
        }
        var dtexto = "";
        dtexto = dtexto + invertido.charAt(0);
        dtexto = dtexto + '-';
        cnt = 0;
        for (i = 1, j = 2; i < largo; i++, j++) {
            if (cnt == 3) {
                dtexto = dtexto + '.';
                j++;
                dtexto = dtexto + invertido.charAt(i);
                cnt = 1;
            } else {
                dtexto = dtexto + invertido.charAt(i);
                cnt++;
            }
        }
        invertido = "";
        for (i = (dtexto.length - 1), j = 0; i >= 0; i--, j++) {
            invertido = invertido + dtexto.charAt(i);
        }
        rutFormateado = invertido;
        //alert($scope.rutV);
        //return invertido;
        console.log(invertido);
        if (digitoCorrecto(texto)) {
            return msgValidacion['si'];
        }
        return msgValidacion['no'];
    }
});

app.service('$RutValidador', function() {
    return {
        /*Permite cambiar el texto de la validacion(sie l rut es válido o no)*/
        textoValidacion: function(texto) {
            if(texto){
                msgValidacion['si'] = texto.si;
                msgValidacion['no'] = texto.no;
            }
        }
    };
});

/*La directiva se llama mediante una etiqueta en el html <rut>,la cual
muestra el resultado de la validación*/
app.directive('rut', function($timeout, $interpolate, validarRut) {
    return {
        restrict: 'E',
        template: '<pre><code></code></pre>',
        replace: true,
        require: '?ngModel',
        link: function(scope, elm, attrs, ngModel) {
            scope.PacienteData.rut = '';
            ngModel.$render = function() {
                //console.log(scope.rutValido);
                var tmp = $interpolate(scope.PacienteData.rut)(scope);
                elm.find('code').html(validarRut(tmp));
            }
        }
    };
});
