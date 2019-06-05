export const validationConstants = {
    emailValidation: RegExp(/^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i),
    nameValidation: RegExp(/^[A-Z][a-zA-Z]{2,}$/),
    userNameValidation: RegExp(/^[a-zA-Z1-9]{3,}$/),
    createAdvertisementValidation: RegExp(/^[0-9]*$/),
};