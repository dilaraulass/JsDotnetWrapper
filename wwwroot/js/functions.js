window.validateForm = (user, dotnetRef) => {
    if (user.name && user.email && user.age > 0) {
        const userList = JSON.parse(localStorage.getItem("users") || "[]");
        userList.push(user);
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
