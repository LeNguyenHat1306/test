function press_enter(evt) {
    if(evt.keyCode==13)
        guidulieu()
}

function guidulieu(){
    var val = document.getElementById('input_timkiem').value
    if(val.length > 0)
        document.getElementById("timkiem").submit();
}

function gotodonhang(){
    window.location.href = "donhang.html";
}
var itemList={//JSON
    "sp001":{ "name":"Sữa Chua Vị Kiwi", "price":21000, "photo":"data/images/sanpham/kiwi.jpg"}, 
    "sp002":{ "name":"Sữa Chua Vị Xoài", "price":22000, "photo":"data/images/sanpham/mango.jpg"}, 
    "sp003":{ "name":"Sữa Chua Vị Dưa lưới", "price":23000, "photo":"data/images/sanpham/cantaloupe.jpg"}, 
    "sp004":{ "name":"Sữa Chua Vị Mâm Xôi", "price":24000, "photo":"data/images/sanpham/blackberry.jpg"}, 
    "sp005":{ "name":"Sữa Chua Vị Dâu Tây", "price":25000, "photo":"data/images/sanpham/strawberry.jpg"}, 
    "sp006":{ "name":"Sữa Chua Vị Việt Quất", "price":26000, "photo":"data/images/sanpham/blueberry.jpg"}, 
    "sp007":{ "name":"Sữa Chua Vị Bưởi", "price":27000, "photo":"data/images/sanpham/grapes.jpg"}, 
    "sp008":{ "name":"Sữa Chua Vị Táo Xanh", "price":28000, "photo":"data/images/sanpham/green-apple.jpg"}, 
    "sp009":{ "name":"Sữa Chua Vị Dứa", "price":29000, "photo":"data/images/sanpham/pineapple.jpg"}
};

 function showCart(){     
    var TotalPreTax = 0 //Tổng Trước Thuế
    var table = document.getElementById('item-list')
    var start_row = 0
    var formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'vnd' })
    for(let key in itemList){
        var item = itemList[key]
        var orderDetails = window.localStorage.getItem(key)
        if(orderDetails!=null){
            var row = table.insertRow(start_row)
            //hình
            var cell = row.insertCell(0)
            cell.innerHTML = "<div style='text-align:center'><img width='100px' src='"+item.photo+"' /></div>"
            //Tên sản phẩm
            cell = row.insertCell(1)
            cell.innerHTML = item.name
            //số lượng
            cell = row.insertCell(2)
            cell.classList.add('text-right')
            cell.innerHTML = orderDetails
            //giá 
            cell = row.insertCell(3)
            cell.classList.add('text-right')
            cell.innerHTML = formatter.format(item.price)
            //thành tiền
            cell = row.insertCell(4)
            cell.classList.add('text-right')
            cell.innerHTML = formatter.format(item.price * orderDetails)
            //nút xoá
            cell = row.insertCell(5)
            cell.innerHTML = "<i onclick='removeCart(\""+key+"\")' class='fas fa-trash-alt'></i>"
            //Tính tổng tiền
            TotalPreTax += item.price * orderDetails
            //Dòng mới
            start_row++
        }
    }
    //Hàng tổng tiền
    var row = table.insertRow(start_row)
    var cell = row.insertCell(0)
    cell.colSpan = '6'
    cell.classList.add('text-right')
    cell.innerHTML = 'Tổng thành tiền (A) = '+formatter.format(TotalPreTax)
    //xuống dòng
    start_row++;
    //Hàng chiết khấu
    row = table.insertRow(start_row)
    cell = row.insertCell(0)
    cell.colSpan = '6'
    cell.classList.add('text-right')
    var totalWithDiscount = getDiscountRate() * TotalPreTax
    cell.innerHTML = 'Chiết khấu (😎 = '+getDiscountRate()+ ' x A = ' + formatter.format(totalWithDiscount)
    start_row++
    //Hàng thuế
    row = table.insertRow(start_row)
    cell = row.insertCell(0)
    cell.colSpan = '6'
    cell.classList.add('text-right')
    var totalTax = 0.1 * (TotalPreTax - totalWithDiscount)
    cell.innerHTML = 'Thuế (C) = 10% x (A - 😎 = ' + formatter.format(totalTax)
    start_row++
    //Hàng tổng đơn hàng
    row = table.insertRow(start_row)
    cell = row.insertCell(0)
    cell.colSpan = '6'
    cell.classList.add('text-right')
    var total = TotalPreTax - totalWithDiscount + totalTax
    cell.innerHTML = 'Tổng đơn hàng = A - B + C = ' + formatter.format(total)
    start_row++
    //Hàng xác nhận đơn hàng
    row = table.insertRow(start_row)
    cell = row.insertCell(0)
    cell.colSpan = '6'
    cell.innerHTML = '<button>Xác nhận đơn hàng</button>'
}

function removeCart(code){ 
    if(typeof window.localStorage[code] !== "undefined"){
        //xóa sản phẩm khỏi localStorage 
        window.localStorage.removeItem(code);
        //Xóa nội dung của phần thân của bảng (<tbody>)
        document.getElementById("bang_sanpham").getElementsByTagName('tbody')[0].innerHTML="";
        //Hiển thị lại nội dung chi tiết của đơn hàng 
        showCart();
    } 
 }

function getDiscountRate(){
    var d = new Date();//lấy ngày hiện tại của máy tính 
    var weekday=d.getDay();//lấy ngày trong tuần 
    var totalMins=d.getHours()*60+d.getMinutes();//đổi thời gian hiện tại ra số phút tương đối trong ngày 
    if(weekday>=1 && weekday<=3 && ((totalMins>=420 && totalMins<=660) || (totalMins>=780 && totalMins<=1020)))
        return 0.1;
 return 0;
}

showCart()
window.onstorage = () => {
    showCart();
    };
