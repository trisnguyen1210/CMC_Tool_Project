import sshClient565 from "../services/ConnectVos565/sshTunnel565.js";
import sshClient568 from "../services/ConnectVos568/sshTunnel568.js";

export const restartVos3000d = (ipVos) => {
    let sshClient;
    switch (ipVos) {
        case "101.99.5.68":
            sshClient = sshClient568;
            break;
        case "101.99.5.65":
            sshClient = sshClient565;
            break;
        default:
            throw Error;
    }
    try {
        sshClient.exec('/etc/init.d/vos3000d restart', (err, stream) => {
            if (err) {
                console.error("Error executing command:", err);
            } else {
                stream.on("close", (code, signal) => {
                    console.log(`Command executed with code ${code}`);
                }).on("data", (data) => {
                    console.log("STDOUT:", data.toString());
                }).stderr.on("data", (data) => {
                    console.error("STDERR:", data.toString());
                });
            }
        })
    } catch (error) {
        console.log(error)
        console.log("Error tunnel ssh when restart");
    }
}