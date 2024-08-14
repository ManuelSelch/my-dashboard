import taigaService from "./taigaService";

export function checkLogin() {
    return async function run(dispatch, getState) {
        const state = getState().login;
        const result = await taigaService.post(
            "auth",
            {
                username: state.username,
                password: state.password,
                type: "normal"
            }
        );
        dispatch(loginSuccess(result.auth_token))
    };
};

export default service = { checkLogin }