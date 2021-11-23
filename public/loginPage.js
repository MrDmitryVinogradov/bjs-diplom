"use strict"


// Вход в личный кабинет

const userform = new UserForm;
userform.loginFormCallback = data => {
    if (data.login && data.password) {
        const login = data.login;
        const password = data.password;
        ApiConnector.login({ login, password }, response => {
            if (response.success === false) {
                userform.setLoginErrorMessage(response.error);
            }
            else {
                ApiConnector.login({ login, password }, () => {
                    location.reload()
                });
            }
        });
    }
}

// Регистрация пользователя

userform.registerFormCallback = data => {
    if (data.login && data.password) {
        const login = data.login;
        const password = data.password;
        ApiConnector.register({ login, password }, response => {
            if (response.success === false) {
                userform.registerErrorMessageBox(response)
            }
            else {
                ApiConnector.register({ login, password });
            }
            location.reload();
        });
    }
}