import Cookies from "universal-cookie";
import cookie from "cookie";

const cookies = new Cookies();

export const isLoggedIn = function (reqCookies = null) {
    if (!reqCookies) {
        return !!cookies.get("is_user_logged_in");
    }

    return !!cookie.parse(reqCookies).is_user_logged_in;
};

export const login = function () {
    cookies.set("is_user_logged_in", true, { expires: 86400, sameSite: "lax" });
};

export const logout = function () {
    cookies.remove("is_user_logged_in", { expires: 86400, sameSite: "lax" });
};
