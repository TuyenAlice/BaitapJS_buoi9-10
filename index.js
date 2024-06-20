let arrNhanVien = [];
// lấy nhân viên
const layThongTinNhanVien = () => {
  let arrField = document.querySelectorAll("#formQLNV input, #formQLNV select");
  let nhanVien = {};
  for (let field of arrField) {
    let { id, value } = field;
    nhanVien[id] = value;
  }

  return nhanVien;
};
// Hiển thị NV ra giao diện
function renderAllNhanVien(arr) {
  let content = "";
  for (let nhanVien of arr) {
    let {
      account,
      name,
      email,
      password,
      datepicker,
      luongCB,
      chucvu,
      gioLam,
    } = nhanVien;
    let tong = 0;
    let tenChucVu = "";

    if (chucvu === "1") {
      // Giám dốc
      tong = Number(luongCB) * 3;
      tenChucVu = "Sếp";
    } else if (chucvu === "2") {
      //Trưởng phòng
      tong = Number(luongCB) * 2;
      tenChucVu = "Trưởng phòng";
    } else {
      // Nhân viên
      tong = Number(luongCB);
      tenChucVu = "Nhân Viên";
    }

    content += `
    <tr id='${account}'>
    <td>${account}</td>
    <td>${name}</td>
    <td>${email}</td>
    <td>${datepicker}</td>
    <td>${tenChucVu}</td>
    <td>${tong}</td>
    <td>${xepLoaiNhanVien(gioLam)}</td>
    
    <td >
      <button  class='btn btn-danger ' onclick="deleteNhanVien('${
        nhanVien.account
      }')">Xoá</button>
      <button class='btn btn-warning' onclick="editNhanVien(${
        nhanVien.account
      })">Sửa</button>
    </td>
  </tr>
    `;
  }
  return content;
}
// add nhân viên
function addNhanvien(event) {
  let nhanVien = layThongTinNhanVien();
  console.log(nhanVien);
  let arr = [];
  arr.push(nhanVien);
  let content = renderAllNhanVien(arr);
  let tableBody = document.getElementById("tableDanhSach");
  tableBody.innerHTML += content;
}

//Xếp loại nhân viên
function xepLoaiNhanVien(giolam) {
  let xepLoai = "";
  if (giolam >= 192) {
    xepLoai = "Nhân viên xuất sắc";
  } else if (giolam >= 176) {
    xepLoai = "Nhân viên giỏi";
  } else if (giolam >= 160) {
    xepLoai = "Nhân viên khá";
  } else {
    xepLoai = "Nhân viên trung bình";
  }
  return xepLoai;
}

// Validation

//Chức năng xoá
function deleteNhanVien(account) {
  let nhanVien = document.getElementById(account);
  nhanVien.remove();
}
// chức năng search
function searchNhanVien(event) {
  let newKeyWord = removeVietnameseTones(
    event.target.value.toLowerCase().trim()
  );
  let arrSearchNhanVien = arrNhanVien.filter((item, index) => {
    // format lại dữ liệu của tên sinh viên
    let newTenNhanVien = removeVietnameseTones(
      item.txtTenSV.toLowerCase().trim()
    ); // "Quang Khải" ==> "z" ==> false
    return newTenNhanVien.includes(newKeyWord);
  });
}
