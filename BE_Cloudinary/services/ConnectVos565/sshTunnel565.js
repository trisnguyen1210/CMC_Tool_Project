// sshTunnel.js
import { Client } from "ssh2";
import { VOS_65_SSH_HOST, VOS_65_SSH_PASSWORD, VOS_65_SSH_PORT, VOS_65_SSH_USERNAME } from "../../key.env.js";

const sshClient565 = new Client();

const tunnelConfig565 = {
    host: VOS_65_SSH_HOST,
    port: VOS_65_SSH_PORT,
    username: VOS_65_SSH_USERNAME,
    password: VOS_65_SSH_PASSWORD,
};
const forwardConfig565 = {
    srcHost: "127.0.0.1",
    srcPort: 3306,
    dstHost: "127.0.0.1",
    dstPort: 3306,
};

export const setupSshTunnel565 = (dbServer, onConnect) => {
    try {
        sshClient565
            .on("ready", () => {
                console.log("SSH Client565 ready");
                sshClient565.forwardOut(
                    forwardConfig565.srcHost,
                    forwardConfig565.srcPort,
                    forwardConfig565.dstHost,
                    forwardConfig565.dstPort,
                    (err, stream) => {
                        if (err) {
                            throw err; // Lỗi ssh tunnel
                        } else {
                            onConnect(stream);
                        }
                    }
                );
            })
            .on("error", (err) => {
                console.log("SSH tunnel error");
            })
            .connect(tunnelConfig565);
    } catch (error) {
        console.log("Error tunnel ssh565");
    }
};

export const closeSshTunnel565 = () => {
    sshClient565.end();
};

export default sshClient565;
