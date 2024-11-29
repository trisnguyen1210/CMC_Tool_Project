import ToolProcessResetFeeVos from "./ToolResetFeeVos";
import ToolProcessDeleteNumbGateway from "./ToolDeletePhoneNumbGateway";
/////////////////////////
///// generate data /////
/////////////////////////
const generateProcess = (title, description) => {
    return { title, description };
};

const generateComp = (slug, component) => {
    return { slug, component };
};

///////////////////////////////////////
///// check slug - give component /////
///////////////////////////////////////
export const listComponentToolProcess = [
    generateComp("reset-cuoc", <ToolProcessResetFeeVos />),
    generateComp("tra-cuu-so-trong-mapping-gateway", <></>),
    generateComp("xoa-so-trong-mapping-gateway", <ToolProcessDeleteNumbGateway />)
];

export const stepProcessResetFeeVos = [
    generateProcess("Nhập thông tin", "Đã nhập xong"),
    generateProcess("Thay đổi dữ liệu hệ thống", "Thay đổi thông số hệ thống"),
    generateProcess("Cập nhật dữ liệu VOS Client", "Truyền dữ liệu từ DB lên lại client VOS3000d"),
    generateProcess("Done", "Hoàn thành, kiểm tra lại thông tin để đảm bảo sự chính xác"),
];

export const stepProcessDeleteNumbGateway = [
    generateProcess("Nhập thông tin", "Đã nhập xong"),
    generateProcess("Thay đổi dữ liệu hệ thống", "Thay đổi thông số trên hệ thống"),
    generateProcess("Kiểm tra dữ liệu sau thay đổi", "Kiểm tra lại và hoàn tất"),
]