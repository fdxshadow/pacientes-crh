
exports.isFormatValid = function(rut){
    return /^\d{1,9}-[\d|kK]{1}$/.test(rut);
};

exports.isDigitValid = function (rut) {
    var sum = 0,
        mul = 2,
        digito = 0;

    for (i = (rut.length - 3); i >= 0; i--) {
        sum = sum + rut.charAt(i) * mul;
        if (mul == 7) {
            mul = 2;
        } else {
            mul++;
        }
    }
    digito = 11 - (sum % 11);

    if (digito == 11) {
        return (rut.slice(-1) == '0');
    }
    else if (digito == 10) {
        return (rut.slice(-1).toLowerCase() == 'k');
    }
    else {
        return (rut.slice(-1) == digito);
    }};