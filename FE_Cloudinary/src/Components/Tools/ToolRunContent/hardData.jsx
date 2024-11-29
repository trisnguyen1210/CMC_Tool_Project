import ToolContentCheckPNGateway from "./ToolCheckPhoneNumberGateway";
import ToolContentDeletePNGateway from "./ToolDeletePhoneNumberGateway";
import ToolMonitorFlowMappingGateway from "./ToolMonitorFlowMappingGateway";
import ToolContentResetFeeVos from "./ToolResetFeeVos";

///////////////////////
///// list server /////
///////////////////////

export const ipData = [
    { name: "VOS QTE", ip: "101.99.5.68" },
    { name: "VOS VBrandName", ip: "101.99.5.65" },
    { name: "VOS CTel", ip: "101.99.1.36" }
];

/////////////////////////
///// generate data /////
/////////////////////////
const generateComp = (slug, component, step, process) => {
    return { slug, component, step, process };
};
const generateStep = (title) => {
    return { title };
};
///////////////////////////////////////
///// check slug - give component /////
///////////////////////////////////////
export const listComponentToolContent = [
    generateComp("reset-cuoc", <ToolContentResetFeeVos />, 2, 3),
    generateComp("tra-cuu-so-trong-gateway", <ToolContentCheckPNGateway />, 1, 0),
    generateComp("xoa-so-trong-mapping-gateway", <ToolContentDeletePNGateway />, 2, 2),
    generateComp("check-luu-luong-mapping-gateway", <ToolMonitorFlowMappingGateway />, 0, 0),
];

export const listStepTool = [
    {
        slug: "reset-cuoc",
        listStep: [
            generateStep("Nhập dữ liệu"),
            generateStep("Kiểm tra thông tin"),
            generateStep("Theo dõi tiến trình"),
        ],
    },
    {
        slug: "tra-cuu-so-trong-gateway",
        listStep: [
            generateStep("Nhập dữ liệu"),
            generateStep("Nhận kết quả"),
        ],
    },
    {
        slug: "xoa-so-trong-mapping-gateway",
        listStep: [
            generateStep("Nhập dữ liệu"),
            generateStep("Update dữ liệu"),
            generateStep("Kết quả sau thay đổi"),
        ]
    },
    {
        slug: "check-luu-luong-mapping-gateway", 
        listStep: [
        ]
    }
];
