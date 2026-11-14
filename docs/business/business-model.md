# Mô Hình Vận Hành NovaStore (Model A: Retailer-Owned Inventory)

| Thuộc tính              | Chi tiết                                                                                |
| :---------------------- | :-------------------------------------------------------------------------------------- |
| **Mã tài liệu**         | `DOC-BIZ-MODEL`                                                                         |
| **Tên tài liệu**        | Mô hình Vận hành Doanh nghiệp Bán lẻ Sở hữu Kho hàng (Retailer-Owned Inventory)         |
| **Phiên bản**           | `1.0.0`                                                                                 |
| **Trạng thái tài liệu** | `BASELINE REVIEW READY`                                                                 |
| **Phạm vi**             | Quyền sở hữu hàng hóa, kiểm soát chất lượng, định giá và ranh giới loại trừ Marketplace |
| **Ngôn ngữ**            | Tiếng Việt (kèm thuật ngữ chuyên ngành tiếng Anh)                                       |
| **Ngày cập nhật**       | 14/11/2026                                                                              |

---

## 1. Bản Chất Mô Hình Vận Hành (Operating Model Overview)

NovaStore vận hành theo nguyên lý **Model A: Doanh Nghiệp Bán Lẻ Trực Tiếp Sở Hữu Và Quản Lý Tồn Kho (Retailer-Owned Inventory / Store-Owned Retail Business)**. Trong mô hình này, NovaStore đóng vai trò là nhà buôn hợp pháp duy nhất (Merchant of Record), nắm giữ quyền sở hữu vật lý, chịu trách nhiệm pháp lý và kỹ thuật đối với 100% hàng hóa được phân phối trên nền tảng.

```text
+-----------------------------------------------------------------------------------+
|                        Nhà Cung Cấp & Phân Phối Trực Tiếp                         |
|   (Nhà phân phối ủy quyền linh kiện mới, chương trình thu cũ đổi mới, thanh lý)   |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          | Nhập kho trực tiếp & Thẩm định chất lượng
                                          v
+-----------------------------------------------------------------------------------+
|                            Trung Tâm Vận Hành NovaStore                           |
|   - Phòng Lab Kiểm Định Kỹ Thuật (FurMark, Prime95, MemTest86, Đánh giá cấp bậc)  |
|   - Kho Hàng Tập Trung (Quản lý Serial đơn vị hàng cũ & Tồn kho số lượng hàng mới) |
|   - Xưởng Dịch Vụ Kỹ Thuật (Lắp ráp PC chuyên nghiệp, Mod & Lube bàn phím cơ)     |
|   - Chính Sách Định Giá & Bảo Hành Thống Nhất (VNĐ nguyên số)                     |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          | Bán lẻ trực tiếp & Hậu mãi toàn diện
                                          v
+-----------------------------------------------------------------------------------+
|                             Khách Hàng Cuối Cùng (B2C)                            |
+-----------------------------------------------------------------------------------+
```

---

## 2. Các Trách Nhiệm Cốt Lõi Của NovaStore

Mô hình Retailer-Owned Inventory trao toàn quyền và gắn chặt trách nhiệm của NovaStore vào các mắt xích sau:

### 2.1 Thu Mua & Quản Lý Nguồn Cung (Procurement & Sourcing)

- **Hàng Mới (Brand-New)**: Nhập khẩu và phân phối chính ngạch từ các đối tác ủy quyền của các thương hiệu hàng đầu thế giới (ASUS, MSI, Gigabyte, Intel, AMD, Corsair, Kingston, v.v.). Đảm bảo tem phân phối chính thức và chứng nhận chất lượng CO/CQ.
- **Hàng Đã Qua Sử Dụng (Used / Pre-Owned)**: Thu gom thông qua chương trình thu cũ đổi mới (Trade-in) trực tiếp từ người dùng cá nhân hoặc thanh lý lô từ các doanh nghiệp, phòng lab công nghệ. Mọi sản phẩm thu mua đều phải có nguồn gốc hợp pháp rõ ràng.

### 2.2 Quản Lý Tồn Kho Vật Lý Tập Trung (Physical Inventory Custody)

- Toàn bộ sản phẩm được tập kết và bảo quản tại hệ thống kho tập trung của NovaStore với điều kiện kiểm soát nhiệt độ, độ ẩm và chống tĩnh điện (ESD safe) theo chuẩn công nghiệp.
- **Tính khả dụng theo thời gian thực (Real-time Stock Availability)**: Hệ thống cập nhật tức thời số lượng tồn kho khả dụng khi có giao dịch giữ hàng hoặc thanh toán thành công, loại bỏ hoàn toàn hiện tượng báo hàng ảo (phantom inventory).

### 2.3 Kiểm Định Kỹ Thuật & Minh Bạch Khuyết Tật (Technical Inspection Lab)

- **100% linh kiện đã qua sử dụng** đều phải trải qua quy trình kiểm thử tải nặng độc quyền tại phòng Lab kỹ thuật của NovaStore trước khi được tạo mã lưu kho và niêm yết lên hệ thống bán hàng:
  - Card đồ họa (GPU): 30 phút FurMark tải tối đa, theo dõi độ lệch nhiệt độ (thermal delta giữa GPU Temp và Hotspot), kiểm tra rò rỉ điện và độ êm của quạt tản nhiệt.
  - Vi xử lý (CPU): Chạy bài test Prime95 Small FFTs, kiểm tra chân socket và khả năng ép xung nhẹ.
  - Bộ nhớ RAM: 4 chu kỳ kiểm tra MemTest86 không phát sinh bất kỳ lỗi bit nào.
  - Ổ cứng lưu trữ: Quét CrystalDiskInfo ghi nhận chỉ số sức khỏe ổ cứng (Health 100%), tuổi thọ ghi dữ liệu (TBW) và kiểm tra bad sector bằng Victoria/HD Tune.
- Mọi khuyết tật ngoại quan (vết trầy, vết cấn nhẹ) hoặc phụ kiện thiếu đều được lập thành biên bản điện tử, chụp ảnh độ phân giải cao và công khai minh bạch cho khách hàng trên trang chi tiết sản phẩm.

### 2.4 Tự Chủ Định Giá (Autonomous Pricing Policy)

- Giá bán do NovaStore quyết định dựa trên thuật toán cung - cầu, chi phí nhập hàng, cấp độ hao mòn ngoại quan (`LIKE_NEW`, `GOOD`, `FAIR`) và thời hạn bảo hành cam kết.
- Toàn bộ giá bán niêm yết bằng **số nguyên Đồng Việt Nam (VNĐ)**, minh bạch và đã bao gồm thuế suất hiện hành.

### 2.5 Cam Kết Bảo Hành & Hỗ Trợ Kỹ Thuật (Direct Warranty & Support)

- Khách hàng không cần làm việc với bất kỳ bên thứ ba nào khi phát sinh sự cố.
- **Hàng Mới**: Hỗ trợ quy trình RMA gửi về hãng sản xuất nhanh chóng, có chính sách cho mượn linh kiện thay thế tạm thời cho các dàn máy làm việc quan trọng.
- **Hàng Cũ**: Áp dụng chính sách **Bảo Hành Trực Tiếp Tại NovaStore (NovaStore Store Warranty)** với cam kết 1 đổi 1 trong 15 ngày đầu nếu phát sinh lỗi phần cứng, và bảo hành sửa chữa/hoàn tiền theo thời hạn cam kết (1, 3, 6 hoặc 12 tháng).

---

## 3. Lý Do Chiến Lược Loại Trừ Tuyệt Đối Mô Hình Sàn (Why No Marketplace?)

Quyết định lựa chọn Model A và kiên quyết loại trừ mô hình Sàn thương mại điện tử (Multi-Vendor Marketplace) xuất phát từ các lý do kỹ thuật và trải nghiệm người dùng sâu sắc:

| Yếu tố phân tích                   | Mô hình Sàn (Marketplace)                                                                                                                                   | Mô hình NovaStore (Retailer-Owned)                                                                                                               |
| :--------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tính tương thích phần cứng**     | Người bán khác nhau đăng thông số sai lệch, thiếu chuẩn hóa, dẫn đến nguy cơ xung đột phần cứng khi lắp ráp.                                                | Dữ liệu thuộc tính được chuẩn hóa đồng nhất bởi đội ngũ kỹ sư NovaStore, đảm bảo Động cơ tương thích (Compatibility Engine) chạy chính xác 100%. |
| **Kiểm soát chất lượng hàng cũ**   | Không thể kiểm soát người bán tráo đổi linh kiện lỗi, hàng sửa chữa nạp lại BIOS, hàng cày coin nát.                                                        | 100% linh kiện cũ được đội ngũ kỹ thuật NovaStore bung máy kiểm tra, đo kiểm mạch, stress test và bảo hành trực tiếp.                            |
| **Độ trễ và phân mảnh giao hàng**  | Đơn hàng cấu hình PC bị phân mảnh thành 5-7 kiện hàng từ các người bán khác nhau, mất nhiều ngày mới gom đủ để lắp máy.                                     | Toàn bộ linh kiện nằm chung một kho tập trung; kỹ thuật viên NovaStore lắp ráp hoàn chỉnh thành một thùng máy duy nhất và giao tới khách hàng.   |
| **Độ phức tạp kiến trúc phần mềm** | Đòi hỏi cơ chế tách đơn hàng (Order Splitting), tính hoa hồng đa tầng (Commission Engine), ví tiền điện tử ký quỹ (Escrow Wallet), cổng người bán phức tạp. | Kiến trúc Modular Monolith tinh gọn, tập trung cao độ vào hiệu năng tìm kiếm, độ mượt mà của bộ Builder và độ chính xác của giỏ hàng/thanh toán. |

### Các Thành Phần Hệ Thống Tuyệt Đối Không Xây Dựng:

1. ❌ Cổng thông tin cho người bán ngoài tự đăng ký và quản lý shop.
2. ❌ Bảng điều khiển người bán (Vendor Dashboard).
3. ❌ Danh mục sản phẩm do bên thứ ba tự ý tải lên và sửa đổi giá.
4. ❌ Thuật toán phân chia dòng tiền, tính chiết khấu hoa hồng và giải ngân cho người bán.
5. ❌ Hệ thống chia nhỏ đơn hàng (Split Order) theo mã định danh người bán.

---

## 4. Tài Liệu Tham Chiếu

- [Tổng quan nghiệp vụ NovaStore](./business-overview.md)
- [Bảng phân quyền và vai trò tác nhân](./actors-and-roles.md)
- [Tiêu chuẩn đánh giá tình trạng hàng và bảo hành](./product-condition-and-warranty.md)
- [Bảng quy tắc nghiệp vụ tập trung](./business-rules-catalog.md)
- [Quyết định kiến trúc ADR 0003: Mô hình Bán lẻ Sở hữu Kho hàng](../../docs/adr/0003-retailer-owned-inventory-business-model.md)
