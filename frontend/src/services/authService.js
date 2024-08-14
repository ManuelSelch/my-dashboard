import taigaService from "./taigaService";

async function checkLogin(username, password) {
    return await taigaService.post(
        "auth",
        {
            username: username,
            password: password,
            type: "normal"
        }
    );
};

export default service = { checkLogin }