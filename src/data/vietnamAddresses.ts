// Dữ liệu hành chính và danh sách địa chỉ gợi ý cho Việt Nam chuẩn E-commerce

export interface ProvinceData {
  id: string;
  name: string;
  districts: {
    id: string;
    name: string;
    wards: string[];
  }[];
}

// 63 Tỉnh/Thành phố của Việt Nam với chi tiết Quận/Huyện/Phường cho các đô thị lớn
export const VIETNAM_PROVINCES: ProvinceData[] = [
  {
    id: 'HN',
    name: 'Hà Nội',
    districts: [
      {
        id: 'HN-CG',
        name: 'Quận Cầu Giấy',
        wards: ['Phường Dịch Vọng', 'Phường Dịch Vọng Hậu', 'Phường Mai Dịch', 'Phường Nghĩa Đô', 'Phường Nghĩa Tân', 'Phường Quan Hoa', 'Phường Trung Hòa', 'Phường Yên Hòa']
      },
      {
        id: 'HN-DD',
        name: 'Quận Đống Đa',
        wards: ['Phường Cát Linh', 'Phường Hàng Bột', 'Phường Khâm Thiên', 'Phường Khương Thượng', 'Phường Kim Liên', 'Phường Láng Hạ', 'Phường Láng Thượng', 'Phường Nam Đồng', 'Phường Ô Chợ Dừa', 'Phường Phương Mai', 'Phường Quang Trung', 'Phường Trung Liệt', 'Phường Văn Miếu']
      },
      {
        id: 'HN-TX',
        name: 'Quận Thanh Xuân',
        wards: ['Phường Hạ Đình', 'Phường Khương Đình', 'Phường Khương Mai', 'Phường Khương Trung', 'Phường Kim Giang', 'Phường Nhân Chính', 'Phường Phương Liệt', 'Phường Thanh Xuân Bắc', 'Phường Thanh Xuân Nam', 'Phường Thanh Xuân Trung', 'Phường Thượng Đình']
      },
      {
        id: 'HN-BD',
        name: 'Quận Ba Đình',
        wards: ['Phường Cống Vị', 'Phường Điện Biên', 'Phường Đội Cấn', 'Phường Giảng Võ', 'Phường Kim Mã', 'Phường Liễu Giai', 'Phường Ngọc Hà', 'Phường Ngọc Khánh', 'Phường Quán Thánh', 'Phường Thành Công', 'Phường Trúc Bạch']
      },
      {
        id: 'HN-HK',
        name: 'Quận Hoàn Kiếm',
        wards: ['Phường Cửa Đông', 'Phường Cửa Nam', 'Phường Đồng Xuân', 'Phường Hàng Bạc', 'Phường Hàng Bài', 'Phường Hàng Bồ', 'Phường Hàng Bông', 'Phường Hàng Buồm', 'Phường Hàng Đào', 'Phường Hàng Gai', 'Phường Lý Thái Tổ', 'Phường Phan Chu Trinh', 'Phường Tràng Tiền', 'Phường Trần Hưng Đạo']
      },
      {
        id: 'HN-HBT',
        name: 'Quận Hai Bà Trưng',
        wards: ['Phường Bách Khoa', 'Phường Bạch Đằng', 'Phường Bạch Mai', 'Phường Cầu Dền', 'Phường Đồng Tâm', 'Phường Lê Đại Hành', 'Phường Minh Khai', 'Phường Phố Huế', 'Phường Quỳnh Lôi', 'Phường Thanh Nhàn', 'Phường Vĩnh Tuy']
      },
      {
        id: 'HN-NTL',
        name: 'Quận Nam Từ Liêm',
        wards: ['Phường Cầu Diễn', 'Phường Đại Mỗ', 'Phường Mễ Trì', 'Phường Mỹ Đình 1', 'Phường Mỹ Đình 2', 'Phường Phú Đô', 'Phường Tây Mỗ', 'Phường Trung Văn', 'Phường Xuân Phương']
      },
      {
        id: 'HN-BTL',
        name: 'Quận Bắc Từ Liêm',
        wards: ['Phường Cổ Nhuế 1', 'Phường Cổ Nhuế 2', 'Phường Đông Ngạc', 'Phường Đức Thắng', 'Phường Minh Khai', 'Phường Phú Diễn', 'Phường Phúc Diễn', 'Phường Xuân Đỉnh', 'Phường Xuân Tảo']
      },
      {
        id: 'HN-HD',
        name: 'Quận Hà Đông',
        wards: ['Phường Dương Nội', 'Phường Hà Cầu', 'Phường Kiến Hưng', 'Phường La Khê', 'Phường Mộ Lao', 'Phường Nguyễn Trãi', 'Phường Phú La', 'Phường Phúc La', 'Phường Quang Trung', 'Phường Vạn Phúc', 'Phường Văn Quán', 'Phường Yên Nghĩa']
      },
      {
        id: 'HN-TH',
        name: 'Quận Tây Hồ',
        wards: ['Phường Bưởi', 'Phường Nhật Tân', 'Phường Phú Thương', 'Phường Quảng An', 'Phường Thụy Khuê', 'Phường Tứ Liên', 'Phường Xuân La', 'Phường Yên Phụ']
      },
      {
        id: 'HN-LB',
        name: 'Quận Long Biên',
        wards: ['Phường Bồ Đề', 'Phường Đức Giang', 'Phường Gia Thụy', 'Phường Long Biên', 'Phường Ngọc Lâm', 'Phường Ngọc Thụy', 'Phường Sài Đồng', 'Phường Thạch Bàn', 'Phường Việt Hưng']
      },
      {
        id: 'HN-HM',
        name: 'Quận Hoàng Mai',
        wards: ['Phường Đại Kim', 'Phường Định Công', 'Phường Giáp Bát', 'Phường Hoàng Liệt', 'Phường Hoàng Văn Thụ', 'Phường Lĩnh Nam', 'Phường Mai Động', 'Phường Tân Mai', 'Phường Tương Mai', 'Phường Yên Sở']
      },
      {
        id: 'HN-GL',
        name: 'Huyện Gia Lâm',
        wards: ['Thị trấn Trâu Quỳ', 'Xã Đa Tốn', 'Xã Bát Tràng', 'Xã Kiêu Kỵ', 'Xã Yên Thường', 'Xã Ninh Hiệp']
      },
      {
        id: 'HN-DT',
        name: 'Huyện Đông Anh',
        wards: ['Thị trấn Đông Anh', 'Xã Tiên Dương', 'Xã Vĩnh Ngọc', 'Xã Hải Bối', 'Xã Kim Chung']
      },
      {
        id: 'HN-HT',
        name: 'Huyện Hoài Đức',
        wards: ['Thị trấn Trạm Trôi', 'Xã An Khánh', 'Xã Kim Chung', 'Xã Vân Canh', 'Xã Song Phương']
      },
      {
        id: 'HN-TT',
        name: 'Huyện Thanh Trì',
        wards: ['Thị trấn Văn Điển', 'Xã Tứ Hiệp', 'Xã Ngũ Hiệp', 'Xã Tân Triều', 'Xã Tam Hiệp']
      }
    ]
  },
  {
    id: 'HCM',
    name: 'TP. Hồ Chí Minh',
    districts: [
      {
        id: 'HCM-Q1',
        name: 'Quận 1',
        wards: ['Phường Bến Nghé', 'Phường Bến Thành', 'Phường Cầu Kho', 'Phường Cầu Ông Lãnh', 'Phường Cô Giang', 'Phường Đa Kao', 'Phường Nguyễn Cư Trinh', 'Phường Nguyễn Thái Bình', 'Phường Phạm Ngũ Lão', 'Phường Tân Định']
      },
      {
        id: 'HCM-TD',
        name: 'TP. Thủ Đức',
        wards: ['Phường Thảo Điền', 'Phường An Phú', 'Phường An Khánh', 'Phường Thủ Thiêm', 'Phường Hiệp Bình Chánh', 'Phường Hiệp Bình Phước', 'Phường Linh Chiểu', 'Phường Linh Trung', 'Phường Linh Xuân', 'Phường Phước Long A', 'Phường Phước Long B', 'Phường Tăng Nhơn Phú A', 'Phường Tăng Nhơn Phú B', 'Phường Trường Thọ']
      },
      {
        id: 'HCM-Q3',
        name: 'Quận 3',
        wards: ['Phường Võ Thị Sáu', 'Phường 1', 'Phường 2', 'Phường 3', 'Phường 4', 'Phường 5', 'Phường 9', 'Phường 10', 'Phường 11', 'Phường 12', 'Phường 14']
      },
      {
        id: 'HCM-BT',
        name: 'Quận Bình Thạnh',
        wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 5', 'Phường 6', 'Phường 7', 'Phường 11', 'Phường 12', 'Phường 13', 'Phường 14', 'Phường 15', 'Phường 17', 'Phường 19', 'Phường 21', 'Phường 22', 'Phường 24', 'Phường 25', 'Phường 26', 'Phường 27', 'Phường 28']
      },
      {
        id: 'HCM-Q7',
        name: 'Quận 7',
        wards: ['Phường Tân Phong', 'Phường Tân Phú', 'Phường Phú Mỹ', 'Phường Phú Thuận', 'Phường Tân Hưng', 'Phường Tân Kiểng', 'Phường Tân Quy', 'Phường Bình Thuận']
      },
      {
        id: 'HCM-GV',
        name: 'Quận Gò Vấp',
        wards: ['Phường 1', 'Phường 3', 'Phường 4', 'Phường 5', 'Phường 6', 'Phường 7', 'Phường 8', 'Phường 9', 'Phường 10', 'Phường 11', 'Phường 12', 'Phường 14', 'Phường 15', 'Phường 16', 'Phường 17']
      },
      {
        id: 'HCM-TB',
        name: 'Quận Tân Bình',
        wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4', 'Phường 5', 'Phường 6', 'Phường 7', 'Phường 8', 'Phường 9', 'Phường 10', 'Phường 11', 'Phường 12', 'Phường 13', 'Phường 14', 'Phường 15']
      },
      {
        id: 'HCM-PN',
        name: 'Quận Phú Nhuận',
        wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4', 'Phường 5', 'Phường 7', 'Phường 8', 'Phường 9', 'Phường 10', 'Phường 11', 'Phường 13', 'Phường 15', 'Phường 17']
      },
      {
        id: 'HCM-Q10',
        name: 'Quận 10',
        wards: ['Phường 1', 'Phường 2', 'Phường 4', 'Phường 5', 'Phường 6', 'Phường 7', 'Phường 8', 'Phường 9', 'Phường 10', 'Phường 11', 'Phường 12', 'Phường 13', 'Phường 14', 'Phường 15']
      },
      {
        id: 'HCM-Q5',
        name: 'Quận 5',
        wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4', 'Phường 5', 'Phường 6', 'Phường 7', 'Phường 8', 'Phường 9', 'Phường 10', 'Phường 11', 'Phường 12', 'Phường 13', 'Phường 14']
      },
      {
        id: 'HCM-TP',
        name: 'Quận Tân Phú',
        wards: ['Phường Hiệp Tân', 'Phường Hòa Thạnh', 'Phường Phú Thạnh', 'Phường Phú Thọ Hòa', 'Phường Phú Trung', 'Phường Sơn Kỳ', 'Phường Tân Quý', 'Phường Tân Sơn Nhì', 'Phường Tân Thành', 'Phường Tân Thới Hòa', 'Phường Tây Thạnh']
      },
      {
        id: 'HCM-BTA',
        name: 'Quận Bình Tân',
        wards: ['Phường An Lạc', 'Phường An Lạc A', 'Phường Bình Hưng Hòa', 'Phường Bình Hưng Hòa A', 'Phường Bình Hưng Hòa B', 'Phường Bình Trị Đông', 'Phường Bình Trị Đông A', 'Phường Bình Trị Đông B', 'Phường Tân Tạo', 'Phường Tân Tạo A']
      },
      {
        id: 'HCM-Q12',
        name: 'Quận 12',
        wards: ['Phường An Phú Đông', 'Phường Đông Hưng Thuận', 'Phường Hiệp Thành', 'Phường Tân Chánh Hiệp', 'Phường Tân Hưng Thuận', 'Phường Tân Thới Hiệp', 'Phường Tân Thới Nhất', 'Phường Thạnh Lộc', 'Phường Thạnh Xuân', 'Phường Thới An', 'Phường Trung Mỹ Tây']
      },
      {
        id: 'HCM-BC',
        name: 'Huyện Bình Chánh',
        wards: ['Thị trấn Tân Túc', 'Xã An Phú Tây', 'Xã Bình Hưng', 'Xã Phong Phú', 'Xã Vĩnh Lộc A', 'Xã Vĩnh Lộc B']
      },
      {
        id: 'HCM-NB',
        name: 'Huyện Nhà Bè',
        wards: ['Thị trấn Nhà Bè', 'Xã Phước Kiển', 'Xã Phước Lộc', 'Xã Nhơn Đức', 'Xã Phú Xuân']
      }
    ]
  },
  {
    id: 'DN',
    name: 'Đà Nẵng',
    districts: [
      {
        id: 'DN-HC',
        name: 'Quận Hải Châu',
        wards: ['Phường Hải Châu 1', 'Phường Hải Châu 2', 'Phường Thạch Thang', 'Phường Thanh Bình', 'Phường Thuận Phước', 'Phường Hòa Thuận Đông', 'Phường Hòa Thuận Tây', 'Phường Nam Dương', 'Phường Bình Hiên', 'Phường Bình Thuận', 'Phường Hòa Cường Bắc', 'Phường Hòa Cường Nam']
      },
      {
        id: 'DN-TK',
        name: 'Quận Thanh Khê',
        wards: ['Phường Tam Thuận', 'Phường Thanh Khê Tây', 'Phường Thanh Khê Đông', 'Phường Xuân Hà', 'Phường Tân Chính', 'Phường Chính Gián', 'Phường Vĩnh Trung', 'Phường Thạc Gián', 'Phường An Khê', 'Phường Hòa Khê']
      },
      {
        id: 'DN-ST',
        name: 'Quận Sơn Trà',
        wards: ['Phường An Hải Bắc', 'Phường An Hải Đông', 'Phường An Hải Tây', 'Phường Mân Thái', 'Phường Nại Hiên Đông', 'Phường Phước Mỹ', 'Phường Thọ Quang']
      },
      {
        id: 'DN-NHS',
        name: 'Quận Ngũ Hành Sơn',
        wards: ['Phường Mỹ An', 'Phường Khuê Mỹ', 'Phường Hòa Hải', 'Phường Hòa Quý']
      },
      {
        id: 'DN-LC',
        name: 'Quận Liên Chiểu',
        wards: ['Phường Hòa Minh', 'Phường Hòa Khánh Nam', 'Phường Hòa Khánh Bắc', 'Phường Hòa Hiệp Nam', 'Phường Hòa Hiệp Bắc']
      },
      {
        id: 'DN-CL',
        name: 'Quận Cẩm Lệ',
        wards: ['Phường Khuê Trung', 'Phường Hòa Thọ Đông', 'Phường Hòa Thọ Tây', 'Phường Hòa An', 'Phường Hòa Phát', 'Phường Hòa Xuân']
      }
    ]
  },
  {
    id: 'HP',
    name: 'Hải Phòng',
    districts: [
      {
        id: 'HP-HB',
        name: 'Quận Hồng Bàng',
        wards: ['Phường Hoàng Văn Thụ', 'Phường Minh Khai', 'Phường Phan Bội Châu', 'Phường Quán Toan', 'Phường Sở Dầu', 'Phường Thượng Lý']
      },
      {
        id: 'HP-NQ',
        name: 'Quận Ngô Quyền',
        wards: ['Phường Cầu Đất', 'Phường Cầu Tre', 'Phường Đằng Giang', 'Phường Lạc Viên', 'Phường Lạch Tray', 'Phường Máy Chai', 'Phường Máy Tơ']
      },
      {
        id: 'HP-LC',
        name: 'Quận Lê Chân',
        wards: ['Phường An Biên', 'Phường An Dương', 'Phường Cát Dài', 'Phường Dư Hàng', 'Phường Dư Hàng Kênh', 'Phường Hàng Kênh', 'Phường Kênh Dương']
      },
      {
        id: 'HP-HA',
        name: 'Quận Hải An',
        wards: ['Phường Cát Bi', 'Phường Đằng Hải', 'Phường Đằng Lâm', 'Phường Đông Hải 1', 'Phường Đông Hải 2', 'Phường Nam Hải']
      }
    ]
  },
  {
    id: 'BD',
    name: 'Bình Dương',
    districts: [
      {
        id: 'BD-TDM',
        name: 'TP. Thủ Dầu Một',
        wards: ['Phường Phú Cường', 'Phường Hiệp Thành', 'Phường Chánh Nghĩa', 'Phường Phú Hòa', 'Phường Phú Thọ', 'Phường Định Hòa', 'Phường Hòa Phú']
      },
      {
        id: 'BD-TA',
        name: 'TP. Thuận An',
        wards: ['Phường Lái Thiêu', 'Phường An Phú', 'Phường Bình Chuẩn', 'Phường Thuận Giao', 'Phường Vĩnh Phú', 'Phường Bình Hòa']
      },
      {
        id: 'BD-DA',
        name: 'TP. Dĩ An',
        wards: ['Phường Dĩ An', 'Phường An Bình', 'Phường Bình An', 'Phường Bình Thắng', 'Phường Đông Hòa', 'Phường Tân Bình', 'Phường Tân Đông Hiệp']
      }
    ]
  },
  {
    id: 'DNA',
    name: 'Đồng Nai',
    districts: [
      {
        id: 'DNA-BH',
        name: 'TP. Biên Hòa',
        wards: ['Phường Trung Dũng', 'Phường Quyết Thắng', 'Phường Thống Nhất', 'Phường Tân Phong', 'Phường Tân Tiến', 'Phường Trảng Dài', 'Phường Long Bình']
      },
      {
        id: 'DNA-LT',
        name: 'Huyện Long Thành',
        wards: ['Thị trấn Long Thành', 'Xã An Phước', 'Xã Bình Sơn', 'Xã Lộc An', 'Xã Tam An']
      }
    ]
  },
  {
    id: 'CT',
    name: 'Cần Thơ',
    districts: [
      {
        id: 'CT-NK',
        name: 'Quận Ninh Kiều',
        wards: ['Phường Tân An', 'Phường An Lạc', 'Phường An Hội', 'Phường An Cư', 'Phường An Nghiệp', 'Phường An Hòa', 'Phường Xuân Khánh']
      },
      {
        id: 'CT-CR',
        name: 'Quận Cái Răng',
        wards: ['Phường Lê Bình', 'Phường Hưng Phú', 'Phường Hưng Thạnh', 'Phường Ba Láng', 'Phường Tân Phú']
      }
    ]
  },
  { id: 'QN', name: 'Quảng Ninh', districts: [{ id: 'QN-HL', name: 'TP. Hạ Long', wards: ['Phường Bãi Cháy', 'Phường Hồng Gai', 'Phường Cao Xanh', 'Phường Hồng Hà'] }] },
  { id: 'BN', name: 'Bắc Ninh', districts: [{ id: 'BN-TP', name: 'TP. Bắc Ninh', wards: ['Phường Suối Hoa', 'Phường Ninh Xá', 'Phường Tiền An', 'Phường Võ Cường'] }] },
  { id: 'HD', name: 'Hải Dương', districts: [{ id: 'HD-TP', name: 'TP. Hải Dương', wards: ['Phường Lê Thanh Nghị', 'Phường Trần Phú', 'Phường Nguyễn Trãi'] }] },
  { id: 'HY', name: 'Hưng Yên', districts: [{ id: 'HY-TP', name: 'TP. Hưng Yên', wards: ['Phường Lam Sơn', 'Phường Hiến Nam', 'Phường An Tảo'] }] },
  { id: 'ND', name: 'Nam Định', districts: [{ id: 'ND-TP', name: 'TP. Nam Định', wards: ['Phường Trần Hưng Đạo', 'Phường Vị Xuyên', 'Phường Lộc Vượng'] }] },
  { id: 'TB', name: 'Thái Bình', districts: [{ id: 'TB-TP', name: 'TP. Thái Bình', wards: ['Phường Bồ Xuyên', 'Phường Lê Hồng Phong', 'Phường Đề Thám'] }] },
  { id: 'TH', name: 'Thanh Hóa', districts: [{ id: 'TH-TP', name: 'TP. Thanh Hóa', wards: ['Phường Ba Đình', 'Phường Điện Biên', 'Phường Đông Hương', 'Phường Lam Sơn'] }] },
  { id: 'NA', name: 'Nghệ An', districts: [{ id: 'NA-V', name: 'TP. Vinh', wards: ['Phường Lê Mao', 'Phường Trường Thi', 'Phường Hưng Dũng', 'Phường Quang Trung'] }] },
  { id: 'HT', name: 'Hà Tĩnh', districts: [{ id: 'HT-TP', name: 'TP. Hà Tĩnh', wards: ['Phường Bắc Hà', 'Phường Nam Hà', 'Phường Trần Phú'] }] },
  { id: 'TTH', name: 'Thừa Thiên Huế', districts: [{ id: 'TTH-H', name: 'TP. Huế', wards: ['Phường Vĩnh Ninh', 'Phường Phú Nhuận', 'Phường Phú Hội', 'Phường Thuận Hòa'] }] },
  { id: 'KH', name: 'Khánh Hòa', districts: [{ id: 'KH-NT', name: 'TP. Nha Trang', wards: ['Phường Lộc Thọ', 'Phường Tân Lập', 'Phường Phước Hải', 'Phường Vĩnh Hải'] }] },
  { id: 'LD', name: 'Lâm Đồng', districts: [{ id: 'LD-DL', name: 'TP. Đà Lạt', wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4', 'Phường 10'] }] },
  { id: 'VT', name: 'Bà Rịa - Vũng Tàu', districts: [{ id: 'VT-TP', name: 'TP. Vũng Tàu', wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 7', 'Phường Thắng Tam'] }] },
  { id: 'LA', name: 'Long An', districts: [{ id: 'LA-TA', name: 'TP. Tân An', wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4'] }] },
  { id: 'TG', name: 'Tiền Giang', districts: [{ id: 'TG-MT', name: 'TP. Mỹ Tho', wards: ['Phường 1', 'Phường 2', 'Phường 4', 'Phường 5'] }] },
  { id: 'AG', name: 'An Giang', districts: [{ id: 'AG-LX', name: 'TP. Long Xuyên', wards: ['Phường Mỹ Long', 'Phường Mỹ Bình', 'Phường Mỹ Xuyên'] }] },
  { id: 'KG', name: 'Kiên Giang', districts: [{ id: 'KG-RG', name: 'TP. Rạch Giá', wards: ['Phường Vĩnh Thanh', 'Phường Vĩnh Lạc', 'Phường An Hòa'] }] },
  // Các tỉnh thành khác
  { id: 'BG', name: 'Bắc Giang', districts: [{ id: 'BG-TP', name: 'TP. Bắc Giang', wards: ['Phường Hoàng Văn Thụ', 'Phường Ngô Quyền'] }] },
  { id: 'BK', name: 'Bắc Kạn', districts: [{ id: 'BK-TP', name: 'TP. Bắc Kạn', wards: ['Phường Sông Cầu', 'Phường Đức Xuân'] }] },
  { id: 'BL', name: 'Bạc Liêu', districts: [{ id: 'BL-TP', name: 'TP. Bạc Liêu', wards: ['Phường 1', 'Phường 3', 'Phường 7'] }] },
  { id: 'BTRE', name: 'Bến Tre', districts: [{ id: 'BTRE-TP', name: 'TP. Bến Tre', wards: ['Phường An Hội', 'Phường Phú Khương'] }] },
  { id: 'BDIN', name: 'Bình Định', districts: [{ id: 'BDIN-QN', name: 'TP. Quy Nhơn', wards: ['Phường Lê Lợi', 'Phường Trần Phú', 'Phường Nguyễn Văn Cừ'] }] },
  { id: 'BPH', name: 'Bình Phước', districts: [{ id: 'BPH-DX', name: 'TP. Đồng Xoài', wards: ['Phường Tân Phú', 'Phường Tân Đồng'] }] },
  { id: 'BTH', name: 'Bình Thuận', districts: [{ id: 'BTH-PT', name: 'TP. Phan Thiết', wards: ['Phường Đức Nghĩa', 'Phường Phú Thủy', 'Phường Hàm Tiến'] }] },
  { id: 'CM', name: 'Cà Mau', districts: [{ id: 'CM-TP', name: 'TP. Cà Mau', wards: ['Phường 1', 'Phường 2', 'Phường 5', 'Phường 8'] }] },
  { id: 'CB', name: 'Cao Bằng', districts: [{ id: 'CB-TP', name: 'TP. Cao Bằng', wards: ['Phường Hợp Giang', 'Phường Sông Hiến'] }] },
  { id: 'DL', name: 'Đắk Lắk', districts: [{ id: 'DL-BMT', name: 'TP. Buôn Ma Thuột', wards: ['Phường Thắng Lợi', 'Phường Tân An', 'Phường Tự An'] }] },
  { id: 'DNONG', name: 'Đắk Nông', districts: [{ id: 'DNONG-GN', name: 'TP. Gia Nghĩa', wards: ['Phường Nghĩa Thành', 'Phường Nghĩa Đức'] }] },
  { id: 'DB', name: 'Điện Biên', districts: [{ id: 'DB-TP', name: 'TP. Điện Biên Phủ', wards: ['Phường Mường Thanh', 'Phường Nam Thanh'] }] },
  { id: 'DT', name: 'Đồng Tháp', districts: [{ id: 'DT-CL', name: 'TP. Cao Lãnh', wards: ['Phường 1', 'Phường 2', 'Phường Hòa Thuận'] }] },
  { id: 'GL', name: 'Gia Lai', districts: [{ id: 'GL-PL', name: 'TP. Pleiku', wards: ['Phường Diên Hồng', 'Phường Hoa Lư', 'Phường Tây Sơn'] }] },
  { id: 'HG', name: 'Hà Giang', districts: [{ id: 'HG-TP', name: 'TP. Hà Giang', wards: ['Phường Trần Phú', 'Phường Minh Khai'] }] },
  { id: 'HNA', name: 'Hà Nam', districts: [{ id: 'HNA-PLY', name: 'TP. Phủ Lý', wards: ['Phường Minh Khai', 'Phường Hai Bà Trưng'] }] },
  { id: 'HGI', name: 'Hậu Giang', districts: [{ id: 'HGI-VT', name: 'TP. Vị Thanh', wards: ['Phường 1', 'Phường 3', 'Phường 4'] }] },
  { id: 'HB', name: 'Hòa Bình', districts: [{ id: 'HB-TP', name: 'TP. Hòa Bình', wards: ['Phường Phương Lâm', 'Phường Đồng Tiến'] }] },
  { id: 'KT', name: 'Kon Tum', districts: [{ id: 'KT-TP', name: 'TP. Kon Tum', wards: ['Phường Quyết Thắng', 'Phường Quang Trung'] }] },
  { id: 'LC', name: 'Lai Châu', districts: [{ id: 'LC-TP', name: 'TP. Lai Châu', wards: ['Phường Quyết Tiến', 'Phường Tân Phong'] }] },
  { id: 'LS', name: 'Lạng Sơn', districts: [{ id: 'LS-TP', name: 'TP. Lạng Sơn', wards: ['Phường Hoàng Văn Thụ', 'Phường Tam Thanh'] }] },
  { id: 'LCA', name: 'Lào Cai', districts: [{ id: 'LCA-TP', name: 'TP. Lào Cai', wards: ['Phường Cốc Lếu', 'Phường Kim Tân', 'Phường Duyên Hải'] }] },
  { id: 'NB', name: 'Ninh Bình', districts: [{ id: 'NB-TP', name: 'TP. Ninh Bình', wards: ['Phường Vân Giang', 'Phường Nam Thành'] }] },
  { id: 'NT', name: 'Ninh Thuận', districts: [{ id: 'NT-PR', name: 'TP. Phan Rang - Tháp Chàm', wards: ['Phường Kinh Dinh', 'Phường Mỹ Hương'] }] },
  { id: 'PT', name: 'Phú Thọ', districts: [{ id: 'PT-VT', name: 'TP. Việt Trì', wards: ['Phường Gia Cẩm', 'Phường Tiên Cát'] }] },
  { id: 'PY', name: 'Phú Yên', districts: [{ id: 'PY-TH', name: 'TP. Tuy Hòa', wards: ['Phường 1', 'Phường 2', 'Phường 5'] }] },
  { id: 'QB', name: 'Quảng Bình', districts: [{ id: 'QB-DH', name: 'TP. Đồng Hới', wards: ['Phường Đồng Mỹ', 'Phường Hải Đình'] }] },
  { id: 'QNA', name: 'Quảng Nam', districts: [{ id: 'QNA-TK', name: 'TP. Tam Kỳ', wards: ['Phường An Mỹ', 'Phường Tân Thạnh'] }] },
  { id: 'QNG', name: 'Quảng Ngãi', districts: [{ id: 'QNG-TP', name: 'TP. Quảng Ngãi', wards: ['Phường Trần Phú', 'Phường Lê Hồng Phong'] }] },
  { id: 'QT', name: 'Quảng Trị', districts: [{ id: 'QT-DH', name: 'TP. Đông Hà', wards: ['Phường 1', 'Phường 2', 'Phường 5'] }] },
  { id: 'ST', name: 'Sóc Trăng', districts: [{ id: 'ST-TP', name: 'TP. Sóc Trăng', wards: ['Phường 1', 'Phường 2', 'Phường 3'] }] },
  { id: 'SLA', name: 'Sơn La', districts: [{ id: 'SLA-TP', name: 'TP. Sơn La', wards: ['Phường Tô Hiệu', 'Phường Quyết Thắng'] }] },
  { id: 'TN', name: 'Tây Ninh', districts: [{ id: 'TN-TP', name: 'TP. Tây Ninh', wards: ['Phường 1', 'Phường 2', 'Phường 3'] }] },
  { id: 'TNG', name: 'Thái Nguyên', districts: [{ id: 'TNG-TP', name: 'TP. Thái Nguyên', wards: ['Phường Phan Đình Phùng', 'Phường Hoàng Văn Thụ'] }] },
  { id: 'TV', name: 'Trà Vinh', districts: [{ id: 'TV-TP', name: 'TP. Trà Vinh', wards: ['Phường 1', 'Phường 2', 'Phường 3'] }] },
  { id: 'TQ', name: 'Tuyên Quang', districts: [{ id: 'TQ-TP', name: 'TP. Tuyên Quang', wards: ['Phường Tân Quang', 'Phường Phan Thiết'] }] },
  { id: 'VL', name: 'Vĩnh Long', districts: [{ id: 'VL-TP', name: 'TP. Vĩnh Long', wards: ['Phường 1', 'Phường 2', 'Phường 4'] }] },
  { id: 'VP', name: 'Vĩnh Phúc', districts: [{ id: 'VP-VY', name: 'TP. Vĩnh Yên', wards: ['Phường Tích Sơn', 'Phường Liên Bảo'] }] },
  { id: 'YB', name: 'Yên Bái', districts: [{ id: 'YB-TP', name: 'TP. Yên Bái', wards: ['Phường Đồng Tâm', 'Phường Yên Ninh'] }] }
];

// Danh sách các địa chỉ gợi ý chuẩn phổ biến (được người mua hàng chọn nhiều nhất)
export interface PopularAddressSuggestion {
  title: string;
  detail: string;
  tag: 'Chung cư / Tòa nhà' | 'Văn phòng / Phố' | 'Trường học' | 'Khu đô thị';
  city: string;
}

export const POPULAR_ADDRESS_SUGGESTIONS: PopularAddressSuggestion[] = [
  // TP. Hồ Chí Minh
  {
    title: 'Tòa nhà Landmark 81',
    detail: '720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh',
    tag: 'Chung cư / Tòa nhà',
    city: 'TP. Hồ Chí Minh'
  },
  {
    title: 'Tòa nhà Bitexco Financial Tower',
    detail: 'Số 2 Hải Triều, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    tag: 'Chung cư / Tòa nhà',
    city: 'TP. Hồ Chí Minh'
  },
  {
    title: 'Vincom Center Đồng Khởi',
    detail: '72 Lê Thánh Tôn, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    tag: 'Văn phòng / Phố',
    city: 'TP. Hồ Chí Minh'
  },
  {
    title: 'Khu đô thị Sala Đại Quang Minh',
    detail: 'Số 10 Mai Chí Thọ, Phường An Lợi Đông, TP. Thủ Đức, TP. Hồ Chí Minh',
    tag: 'Khu đô thị',
    city: 'TP. Hồ Chí Minh'
  },
  {
    title: 'Khu dân cư Phú Mỹ Hưng (Crescent Mall)',
    detail: '101 Tôn Dật Tiên, Phường Tân Phú, Quận 7, TP. Hồ Chí Minh',
    tag: 'Khu đô thị',
    city: 'TP. Hồ Chí Minh'
  },
  {
    title: 'Tòa nhà Saigon Centre & Takashimaya',
    detail: '65 Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    tag: 'Văn phòng / Phố',
    city: 'TP. Hồ Chí Minh'
  },
  {
    title: 'Chung cư Masteri Thảo Điền',
    detail: '159 Xa Lộ Hà Nội, Phường Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh',
    tag: 'Chung cư / Tòa nhà',
    city: 'TP. Hồ Chí Minh'
  },
  {
    title: 'Ký túc xá Đại học Quốc gia TP.HCM',
    detail: 'Khu phố 6, Phường Linh Trung, TP. Thủ Đức, TP. Hồ Chí Minh',
    tag: 'Trường học',
    city: 'TP. Hồ Chí Minh'
  },

  // Hà Nội
  {
    title: 'Khu đô thị Vinhomes Royal City',
    detail: '72A Nguyễn Trãi, Phường Thượng Đình, Quận Thanh Xuân, Hà Nội',
    tag: 'Khu đô thị',
    city: 'Hà Nội'
  },
  {
    title: 'Khu đô thị Vinhomes Times City',
    detail: '458 Minh Khai, Phường Vĩnh Tuy, Quận Hai Bà Trưng, Hà Nội',
    tag: 'Khu đô thị',
    city: 'Hà Nội'
  },
  {
    title: 'Tòa nhà Keangnam Landmark 72',
    detail: 'Đường Phạm Hùng, Phường Mễ Trì, Quận Nam Từ Liêm, Hà Nội',
    tag: 'Chung cư / Tòa nhà',
    city: 'Hà Nội'
  },
  {
    title: 'Tòa nhà Lotte Center Hà Nội',
    detail: '54 Liễu Giai, Phường Cống Vị, Quận Ba Đình, Hà Nội',
    tag: 'Chung cư / Tòa nhà',
    city: 'Hà Nội'
  },
  {
    title: 'Khu đô thị Vinhomes Ocean Park 1',
    detail: 'Xã Đa Tốn, Huyện Gia Lâm, Hà Nội',
    tag: 'Khu đô thị',
    city: 'Hà Nội'
  },
  {
    title: 'Khu đô thị Vinhomes Smart City',
    detail: 'Phường Tây Mỗ, Quận Nam Từ Liêm, Hà Nội',
    tag: 'Khu đô thị',
    city: 'Hà Nội'
  },
  {
    title: 'Trường Đại học Bách Khoa Hà Nội',
    detail: 'Số 1 Đại Cồ Việt, Phường Bách Khoa, Quận Hai Bà Trưng, Hà Nội',
    tag: 'Trường học',
    city: 'Hà Nội'
  },
  {
    title: 'Trường Đại học Quốc gia Hà Nội',
    detail: '144 Xuân Thủy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Hà Nội',
    tag: 'Trường học',
    city: 'Hà Nội'
  },
  {
    title: 'Khu đô thị Ciputra Nam Thăng Long',
    detail: 'Đường Lạc Long Quân, Phường Xuân La, Quận Tây Hồ, Hà Nội',
    tag: 'Khu đô thị',
    city: 'Hà Nội'
  },
  {
    title: 'Khu đô thị Gamuda Gardens',
    detail: 'Km 4.4 Pháp Vân, Phường Yên Sở, Quận Hoàng Mai, Hà Nội',
    tag: 'Khu đô thị',
    city: 'Hà Nội'
  },

  // Đà Nẵng
  {
    title: 'Tòa nhà Indochina Riverside Towers',
    detail: '74 Bạch Đằng, Phường Hải Châu 1, Quận Hải Châu, Đà Nẵng',
    tag: 'Chung cư / Tòa nhà',
    city: 'Đà Nẵng'
  },
  {
    title: 'Khu phức hợp Vincom Plaza Ngô Quyền',
    detail: '910A Ngô Quyền, Phường An Hải Bắc, Quận Sơn Trà, Đà Nẵng',
    tag: 'Văn phòng / Phố',
    city: 'Đà Nẵng'
  },
  {
    title: 'Trường Đại học Bách Khoa - ĐH Đà Nẵng',
    detail: '54 Nguyễn Lương Bằng, Phường Hòa Khánh Bắc, Quận Liên Chiểu, Đà Nẵng',
    tag: 'Trường học',
    city: 'Đà Nẵng'
  },

  // Hải Phòng & Cần Thơ & Bình Dương
  {
    title: 'Vincom Plaza Lê Thánh Tông',
    detail: 'Số 1 Lê Thánh Tông, Phường Máy Tơ, Quận Ngô Quyền, Hải Phòng',
    tag: 'Văn phòng / Phố',
    city: 'Hải Phòng'
  },
  {
    title: 'Vincom Plaza Hùng Vương',
    detail: 'Số 2 Hùng Vương, Phường Thới Bình, Quận Ninh Kiều, Cần Thơ',
    tag: 'Văn phòng / Phố',
    city: 'Cần Thơ'
  },
  {
    title: 'Khu đô thị Becamex City Center',
    detail: 'Đại lộ Bình Dương, Phường Phú Hòa, TP. Thủ Dầu Một, Bình Dương',
    tag: 'Khu đô thị',
    city: 'Bình Dương'
  }
];

// Hàm tìm kiếm địa chỉ thông minh (loại bỏ dấu tiếng Việt để tìm kiếm nhanh)
export const removeVietnameseTones = (str: string): string => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  return str.toLowerCase().trim();
};

export const searchAddressSuggestions = (query: string): PopularAddressSuggestion[] => {
  if (!query || query.trim().length === 0) {
    return POPULAR_ADDRESS_SUGGESTIONS.slice(0, 6);
  }

  const cleanQuery = removeVietnameseTones(query);

  const matched = POPULAR_ADDRESS_SUGGESTIONS.filter((item) => {
    const titleNorm = removeVietnameseTones(item.title);
    const detailNorm = removeVietnameseTones(item.detail);
    const cityNorm = removeVietnameseTones(item.city);
    return (
      titleNorm.includes(cleanQuery) ||
      detailNorm.includes(cleanQuery) ||
      cityNorm.includes(cleanQuery)
    );
  });

  return matched.slice(0, 8);
};
