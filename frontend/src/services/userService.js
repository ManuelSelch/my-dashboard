import taiga from "./backends/taigaBackend";

async function checkLogin(username, password) {
    return await taiga.post(
        "auth",
        {
            username: username,
            password: password,
            type: "normal"
        }
    );
};

export default { checkLogin }