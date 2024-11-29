import { DNC_INIT_DATABASE, DNC_PASSWORD, DNC_SERVER, DNC_USER } from "../../key.env.js";

export const configInfo = {
    "user": DNC_USER,
    "password": DNC_PASSWORD,
    "server": DNC_SERVER,
    "database": DNC_INIT_DATABASE,
    options: {
        encrypt: false, // Sử dụng SSL nếu cần thiết
        enableArithAbort: true
    }
}