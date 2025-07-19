window.validateForm = (user, dotnetRef) => {
    if (user.name && user.email && user.age > 0) {
        const userList = JSON.parse(localStorage.getItem("users") || "[]");

        // Aynı email varsa güncelleme
        const existingIndex = userList.findIndex(u => u.email === user.email);
        if (existingIndex !== -1) {
            userList[existingIndex] = user;
        } else {
            userList.push(user);
        }

        localStorage.setItem("users", JSON.stringify(userList));
        dotnetRef.invokeMethodAsync("ReceiveValidatedUser", user);
    } else {
        alert("Lütfen tüm alanları doldurun!");
    }
};

window.getAllUsersFromStorage = (dotnetRef) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.forEach(u => {
        dotnetRef.invokeMethodAsync("ReceiveValidatedUser", u);
    });
};

window.deleteUserFromStorage = (email) => {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    users = users.filter(u => u.email !== email);
    localStorage.setItem("users", JSON.stringify(users));
};
