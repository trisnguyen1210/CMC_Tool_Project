// sshTunnel.js
import { Client } from "ssh2";
import { VOS_68_SSH_HOST, VOS_68_SSH_PASSWORD, VOS_68_SSH_PORT, VOS_68_SSH_USERNAME } from "../../key.env.js";

const sshClient568 = new Client();

const tunnelConfig568 = {
    host: VOS_68_SSH_HOST,
    port: VOS_68_SSH_PORT,
    username: VOS_68_SSH_USERNAME,
    password: VOS_68_SSH_PASSWORD,
};
const forwardConfig568 = {
    srcHost: "127.0.0.1",
    srcPort: 3306,
    dstHost: "127.0.0.1",
    dstPort: 3306,
};

export const setupSshTunnel568 = (dbServer, onConnect) => {
    try {
        sshClient568
            .on("ready", () => {
                console.log("SSH Client568 ready");
                sshClient568.forwardOut(
                    forwardConfig568.srcHost,
                    forwardConfig568.srcPort,
                    forwardConfig568.dstHost,
                    forwardConfig568.dstPort,
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
            .connect(tunnelConfig568);
    } catch (error) {
        console.log(error)
        console.log("Error tunnel ssh568");
    }
};

export const closeSshTunnel568 = () => {
    sshClient568.end();
};

export default sshClient568;
