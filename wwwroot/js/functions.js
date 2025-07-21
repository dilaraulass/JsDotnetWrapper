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
        Swal.fire({
            icon: 'success',
            title: 'Kayıt Başarılı!',
            text: `${user.name} (${user.email}) eklendi.`,
            timer: 2000,
            showConfirmButton: false
        });

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

window.confirmAndDelete = async (email, dotnetRef) => {
    const result = await Swal.fire({
        title: 'Silmek istediğinize emin misiniz?',
        text: `${email} kaydı silinecek.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Evet, sil',
        cancelButtonText: 'Vazgeç'
    });

    if (result.isConfirmed) {
        let users = JSON.parse(localStorage.getItem("users") || "[]");
        users = users.filter(u => u.email !== email);
        localStorage.setItem("users", JSON.stringify(users));

        dotnetRef.invokeMethodAsync("RemoveUserFromList", email);

        Swal.fire({
            icon: 'success',
            title: 'Silindi!',
            text: `${email} başarıyla silindi.`,
            timer: 1500,
            showConfirmButton: false
        });
    }
};
