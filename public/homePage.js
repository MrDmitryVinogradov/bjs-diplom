"use strict"

// Выход из личного кабинета

const logout = new LogoutButton;
logout.action = () => {
    ApiConnector.logout(response => {
        if (response === true) {
            ApiConnector.logout();
        }
        location.reload();
    });
}

// Вывод информации о пользователе

ApiConnector.current(response => {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data)
    }
});

// Получение текущих курсов валют

const ratesBoard = new RatesBoard;

function ratesUpdate() {
    ApiConnector.getStocks(response => {
        if (response.success === true) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    })
}
ratesUpdate();
let timerId = setInterval(ratesUpdate, 60000);


// Операции с деньгами

const moneyManager = new MoneyManager;

// Пополнение баланса

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success === false) {
            moneyManager.setMessage(response.success, response.error);
        }
        else {
            ProfileWidget.showProfile(response.data);
        }
    });
}

// Конвертация валют

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success === false) {
            moneyManager.setMessage(response.success, response.error);
        }
        else {
            ProfileWidget.showProfile(response.data);
        }
    });
}

// Перевод валюты

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success === false) {
            moneyManager.setMessage(true, response.error);
        }
        else {
            ProfileWidget.showProfile(response.data);
        }
    });
}

// Работа с избранным 

const favorites = new FavoritesWidget;
ApiConnector.getFavorites(response => {
    if (response.success === true) {
        favorites.clearTable();
        favorites.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
    else {
        favorites.setMessage(response.success, response.error);
    }
    
});

// Добавление в избранное

favorites.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success === true) {
            favorites.clearTable();
            favorites.fillTable(response.data);
        }
        else {
            favorites.setMessage(response.success, response.error);
        }
    });
}

// Удаление из избранного

favorites.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favorites.clearTable();
            favorites.fillTable(response.data);
        }
        else {
            favorites.setMessage(response.success, response.error);
        }
    });
}