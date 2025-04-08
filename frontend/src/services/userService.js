import taiga from "./backends/taigaBackend";

async function checkLogin(username, password) {
    return await taiga.post(
        "auth",
        {
            username, password,
            type: "normal"
        }
    );
};

export default { checkLogin }