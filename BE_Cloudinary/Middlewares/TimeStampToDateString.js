export function timestampToDateString(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const dateString = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    return dateString;
}

export function getToDate() {
    const today = new Date();
    // Lấy múi giờ UTC+7
    const utcOffset = today.getTimezoneOffset() * 60000; // chuyển đổi phút sang mili giây
    const vietNamTime = new Date(today.getTime() + (utcOffset + 7 * 3600000));
    vietNamTime.setDate(vietNamTime.getDate());

    const dd = String(vietNamTime.getDate()).padStart(2, '0');
    const mm = String(vietNamTime.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = vietNamTime.getFullYear();

    return `${dd}.${mm}.${yyyy}`;
}

export function getYesterdayDate() {
    const today = new Date();
    // Lấy múi giờ UTC+7
    const utcOffset = today.getTimezoneOffset() * 60000; // chuyển đổi phút sang mili giây
    const vietNamTime = new Date(today.getTime() + (utcOffset + 7 * 3600000));
    vietNamTime.setDate(vietNamTime.getDate() - 1);

    const dd = String(vietNamTime.getDate()).padStart(2, '0');
    const mm = String(vietNamTime.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = vietNamTime.getFullYear();

    return `${dd}.${mm}.${yyyy}`;
}

export function getDayAgo(timeAgo) {
    const today = new Date();
    // Lấy múi giờ UTC+7
    const numbTimeAgo = isNaN(timeAgo)
    if (numbTimeAgo) {
        return false;
    }

    const utcOffset = today.getTimezoneOffset() * 60000; // chuyển đổi phút sang mili giây
    const vietNamTime = new Date(today.getTime() + (utcOffset + 7 * 3600000));
    vietNamTime.setDate(vietNamTime.getDate() - Number(timeAgo));

    const dd = String(vietNamTime.getDate()).padStart(2, '0');
    const mm = String(vietNamTime.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = vietNamTime.getFullYear();

    return `${dd}.${mm}.${yyyy}`;
}

export function timeStringToDate(timeString) {
    const parts = timeString.split('-'); // Tách chuỗi thành mảng các phần tử
    const day = parseInt(parts[0], 10); // Lấy ngày và chuyển đổi thành số nguyên
    const month = parseInt(parts[1], 10) - 1; // Lấy tháng (giảm đi 1 vì tháng trong Date bắt đầu từ 0)
    const year = parseInt(parts[2], 10); // Lấy năm và chuyển đổi thành số nguyên
    const dateObj = new Date(year, month, day); // Tạo đối tượng Date từ ngày, tháng, năm
    return dateObj;
}