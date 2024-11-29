import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getDataDNCThunk } from "../../../../slices/dncVosSlice";
import { Flex, Spin } from "antd";

export default function DNCVosContent() {
    const dispatch = useDispatch();
    const ipVos = useSelector(state => state.dataDNC.ipVos);
    const dataListDNC = useSelector(state => state.dataDNC.listDNC);
    const isLoading = useSelector(state => state.dataDNC.isLoading);
    const isError = useSelector(state => state.dataDNC.isError);
    const infoUser = useSelector(state => state.user.infoUser);
    useEffect(() => {
        if (infoUser._id) {
            dispatch(getDataDNCThunk(ipVos));
        }
    }, [ipVos])
    console.log(isLoading);
    return (
        <>
            {isLoading && (
                <Flex gap="small" vertical>
                    <Flex gap="small">
                        <Spin tip="Loading" size="large">
                            <div
                                style={{
                                    justifyContent: "center",
                                    margin: "20px 0px",
                                    marginBottom: "20px",
                                    padding: "30px 50px",
                                    textAlign: "center",
                                    background: "rgba(0,0,0,0.05)",
                                    borderRadius: "4px"
                                }}
                            ></div>
                        </Spin>
                    </Flex>
                </Flex>
            )}

        </>
    )
}