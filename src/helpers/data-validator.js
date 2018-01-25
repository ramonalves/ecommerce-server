let errors = [];

function DataValidator() {
    errors = [];
}

DataValidator.prototype.isRequired = (value, message) => {
    if (!value || value.length <= 0)
        errors.push({ message: message });
}

DataValidator.prototype.hasMinLen = (value, min, message) => {
    if (!value || value.length < min)
        errors.push({ message: message });
}

DataValidator.prototype.hasMaxLen = (value, max, message) => {
    if (!value || value.length > max)
        errors.push({ message: message });
}

DataValidator.prototype.hasPositive = (value, min, message) => {
    if (!value || value <= min)
        errors.push({ message: message });
}

DataValidator.prototype.isFixedLen = (value, len, message) => {
    if (value.length != len)
        errors.push({ message: message });
}

DataValidator.prototype.isEmail = (value, message) => {
    var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value))
        errors.push({ message: message });
}

DataValidator.prototype.errors = () => { 
    return errors; 
}

DataValidator.prototype.clear = () => {
    errors = [];
}

DataValidator.prototype.isValid = () => {
    return errors.length == 0;
}

module.exports = DataValidator;