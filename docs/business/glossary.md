# Bảng Thuật Ngữ Nghiệp Vụ NovaStore (Glossary & Domain Terminology)

| Thuộc tính              | Chi tiết                                                                                    |
| :---------------------- | :------------------------------------------------------------------------------------------ |
| **Mã tài liệu**         | `DOC-BIZ-GLOSSARY`                                                                          |
| **Tên tài liệu**        | Từ Điển Thuật Ngữ Nghiệp Vụ Chuẩn Hóa Song Ngữ (Vietnamese - English Domain Glossary)       |
| **Phiên bản**           | `1.0.0`                                                                                     |
| **Trạng thái tài liệu** | `BASELINE REVIEW READY`                                                                     |
| **Phạm vi**             | Định nghĩa chuẩn xác toàn bộ khái niệm, thực thể và trạng thái trong toàn bộ tài liệu dự án |
| **Ngôn ngữ**            | Tiếng Việt & Tiếng Anh chuyên ngành                                                         |
| **Ngày cập nhật**       | 14/11/2026                                                                                  |

---

## 1. Nguyên Tắc Thống Nhất Thuật Ngữ (Terminology Principles)

Nhằm đảm bảo tính chính xác và loại bỏ sự hiểu nhầm giữa Chuyên viên phân tích nghiệp vụ (BA), Kiến trúc sư phần mềm (Architect), Lập trình viên (Developer), Chuyên viên kiểm thử (QA/QC) và Khách hàng:

- Mỗi khái niệm chỉ mang **MỘT Ý NGHĨA DUY NHẤT** trong toàn bộ hệ thống tài liệu và mã nguồn.
- Giữ nguyên các thuật ngữ kỹ thuật tiếng Anh phổ biến trong ngành phần cứng và thương mại điện tử để đảm bảo tính chuẩn xác khi ánh xạ sang cơ sở dữ liệu và API.

---

## 2. Bảng Thuật Ngữ Nghiệp Vụ Cốt Lõi

| Thuật ngữ Tiếng Việt          | Thuật ngữ Tiếng Anh            | Định nghĩa chuẩn xác trong ngữ cảnh NovaStore                                                                                                                                                                                                     |
| :---------------------------- | :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Mẫu Sản Phẩm Danh Mục**     | **Catalog Product Model**      | Khái niệm trừu tượng đại diện cho một dòng sản phẩm của nhà sản xuất (ví dụ: _NVIDIA GeForce RTX 4070 Ti SUPER_). Chứa thông số kỹ thuật chung, mô tả, ảnh marketing, thương hiệu và thuộc tính danh mục. Không gắn với một món đồ vật lý cụ thể. |
| **Biến Thể Sản Phẩm**         | **Product Variant**            | Một phiên bản cụ thể của Mẫu sản phẩm, phân biệt theo màu sắc, dung lượng hoặc phân tầng tình trạng (ví dụ: Bản Mới 100% vs Bản Cũ). Có mã SKU riêng biệt.                                                                                        |
| **Đơn Vị Tồn Kho Vật Lý**     | **Physical Stock Unit**        | Món hàng vật lý có thật nằm trong kho NovaStore. Với hàng mới, được quản lý theo số lượng gộp của lô hàng. Với hàng cũ, là một đơn vị độc nhất có số Serial riêng biệt.                                                                           |
| **Đơn Vị Hàng Cũ**            | **Used Stock Unit**            | Một sản phẩm đã qua sử dụng cụ thể, có số Serial thực tế, biên bản kiểm định riêng, ảnh chụp vết trầy xước riêng, giá bán riêng và số lượng mua luôn cố định bằng 1 (Qty = 1). Không thể hoán đổi (Non-interchangeable).                          |
| **Tồn Kho Khả Dụng**          | **Available Stock**            | Số lượng hàng hóa thực tế trong kho sẵn sàng để khách hàng bấm mua hoặc đưa vào phiên thanh toán. Được tính bằng: $\text{Tổng tồn kho vật lý} - \text{Tồn kho đang giữ chỗ (Reserved)}$.                                                          |
| **Giữ Chỗ Tồn Kho**           | **Inventory Reservation**      | Hành động hệ thống tạm khóa một số lượng hàng mới hoặc khóa trạng thái một Đơn vị hàng cũ gắn với phiên thanh toán (Checkout Session) của khách hàng trong một khoảng thời gian giới hạn (15-30 phút) để tránh bán vượt.                          |
| **Khách Vãng Lai**            | **Guest**                      | Người dùng truy cập website nhưng chưa đăng nhập. Được phép tra cứu, tìm kiếm, dùng Builder và thêm hàng vào giỏ hàng cục bộ trên trình duyệt (`localStorage`), nhưng **BỊ CẤM THANH TOÁN**.                                                      |
| **Khách Hàng**                | **Customer**                   | Người dùng đã đăng ký tài khoản hợp lệ, đã đăng nhập và được hệ thống cấp mã định danh duy nhất (`UserId`). Được phép thực hiện thanh toán và quản lý đơn hàng.                                                                                   |
| **Giỏ Hàng**                  | **Shopping Cart**              | Nơi lưu giữ tạm thời các sản phẩm khách hàng dự định mua. Tồn tại ở 2 hình thức: Giỏ hàng Khách vãng lai (Guest Cart trên `localStorage`) và Giỏ hàng Khách hàng (Customer Cart trên Database).                                                   |
| **Mục Giỏ Hàng**              | **Cart Item**                  | Một dòng sản phẩm trong giỏ hàng. Gồm 3 loại: Mục hàng mới tiêu chuẩn (chỉnh được số lượng), Mục hàng cũ (cố định số lượng = 1), và Mục bộ cấu hình nhóm.                                                                                         |
| **Bộ Cấu Hình Nhóm**          | **Grouped Configuration Item** | Một cụm sản phẩm gồm nhiều linh kiện được ghép nối logic (như Dàn PC, Góc Setup, Bàn phím custom). Được hiển thị như một gói duy nhất, không thể xóa lẻ từng linh kiện trong giỏ hàng.                                                            |
| **Bộ Cấu Hình PC**            | **PC Builder**                 | Công cụ tương tác cho phép khách hàng chọn từng linh kiện PC và được Động cơ tương thích (Compatibility Engine) tự động kiểm tra Socket, DDR, kích thước Case và công suất Nguồn.                                                                 |
| **Quy Hoạch Góc Setup**       | **Full Gaming Setup Builder**  | Công cụ thiết kế không gian làm việc/chơi game hoàn chỉnh gồm: PC Core, Màn hình kép, Arm chịu tải, Bàn nâng hạ, Ghế công thái học và phụ kiện dây cáp/ánh sáng.                                                                                  |
| **Tùy Biến Bàn Phím Cơ**      | **Product Customizer**         | Công cụ dựng bàn phím cơ từng tầng: Layout, Case nhôm, PCB hot-swap, Plate, Switch, Keycap, Stabilizer và dịch vụ lube switch.                                                                                                                    |
| **Động Cơ Tương Thích**       | **Compatibility Engine**       | Phân hệ tính toán logic thuần túy chịu trách nhiệm kiểm tra các quy chuẩn vật lý, kích thước, điện năng và giao thức giữa các linh kiện phần cứng.                                                                                                |
| **Thanh Toán**                | **Checkout**                   | Quy trình nghiệp vụ chuyển đổi các mặt hàng trong giỏ hàng thành Đơn hàng chính thức, bao gồm chọn địa chỉ nhận hàng, tính phí vận chuyển, áp mã giảm giá và chọn phương thức thanh toán.                                                         |
| **Đơn Hàng**                  | **Order**                      | Hợp đồng thương mại chính thức giữa Khách hàng và NovaStore sau khi xác nhận thanh toán. Chứa bản chụp bất biến (Immutable Snapshot) của toàn bộ sản phẩm và số Serial linh kiện.                                                                 |
| **Bản Chụp Bất Biến**         | **Immutable Order Snapshot**   | Dữ liệu lưu trữ cố định không bao giờ thay đổi của đơn hàng, bảo tồn nguyên vẹn tên sản phẩm, thông số kỹ thuật, giá bán và số serial tại thời điểm mua, bất chấp các thay đổi sau này trên danh mục.                                             |
| **Gộp Giỏ Hàng**              | **Cart Merge**                 | Thuật toán hợp nhất dữ liệu từ Giỏ hàng Guest (`localStorage`) vào Giỏ hàng Customer (Database) ngay sau khi khách hàng đăng nhập thành công.                                                                                                     |
| **Bảo Hành Cửa Hàng**         | **NovaStore Store Warranty**   | Chính sách bảo hành áp dụng riêng cho hàng đã qua sử dụng do NovaStore trực tiếp cam kết (1, 3, 6 hoặc 12 tháng), bao gồm chính sách 1 đổi 1 trong 15 ngày đầu nếu phát sinh lỗi kỹ thuật.                                                        |
| **Biên Bản Kiểm Định**        | **Inspection Report**          | Hồ sơ kỹ thuật số ghi nhận kết quả kiểm thử phần cứng của linh kiện cũ: nhiệt độ tải tối đa FurMark, xung nhịp, kết quả test RAM, tuổi thọ ổ cứng và danh sách phụ kiện.                                                                          |
| **Minh Bạch Khuyết Tật**      | **Defect Disclosure**          | Việc công khai rõ ràng toàn bộ các vết trầy xước, cấn móp nhẹ hoặc phụ kiện thiếu của linh kiện cũ thông qua hình ảnh thực tế và mô tả chi tiết trên trang PDP.                                                                                   |
| **Tiền Tệ Số Nguyên VNĐ**     | **Integer VND Currency**       | Quy tắc định dạng tài chính bắt buộc toàn bộ giá cả, phụ phí và hóa đơn đều là số nguyên Đồng Việt Nam (không có số thập phân hoặc đơn vị cents).                                                                                                 |
| **Trạng Thái Xuất Bản**       | **Publication Status**         | Vòng đời hiển thị của sản phẩm gồm 3 trạng thái: `DRAFT` (Bản nháp), `PUBLISHED` (Đã xuất bản công khai), và `ARCHIVED` (Lưu trữ / Ngừng kinh doanh).                                                                                             |
| **Kiến Trúc Đơn Khối Mô-đun** | **Modular Monolith**           | Kiến trúc phần mềm trong đó toàn bộ mã nguồn được đóng gói trong một ứng dụng duy nhất nhưng được chia tách nghiêm ngặt thành các mô-đun độc lập theo Domain-Driven Design.                                                                       |
| **Trợ Lý Mua Sắm AI**         | **AI Shopping Assistant**      | Phân hệ trợ lý hội thoại thông minh (Phạm vi tương lai) hỗ trợ tư vấn cấu hình và thao tác giỏ hàng thông qua cơ chế Gọi Công Cụ Có Kiểm Soát (Tool Calling), không truy cập trực tiếp cơ sở dữ liệu.                                             |

---

## 3. Tài Liệu Tham Chiếu

- [Tổng quan nghiệp vụ NovaStore](./business-overview.md)
- [Bảng phân quyền và vai trò tác nhân](./actors-and-roles.md)
- [Bảng quy tắc nghiệp vụ tập trung](./business-rules-catalog.md)
- [Danh mục yêu cầu chức năng](./functional-requirements.md)
