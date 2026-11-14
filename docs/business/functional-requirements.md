# Danh Mục Yêu Cầu Chức Năng Nghiệp Vụ (Functional Requirements Specification)

| Thuộc tính              | Chi tiết                                                                                                                       |
| :---------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| **Mã tài liệu**         | `DOC-BIZ-FUNC-REQ`                                                                                                             |
| **Tên tài liệu**        | Danh mục Yêu cầu Chức năng Nghiệp vụ Chuẩn hóa & Tiêu chí Nghiệm thu (Functional Requirements & Acceptance Criteria) NovaStore |
| **Phiên bản**           | `1.0.0`                                                                                                                        |
| **Trạng thái tài liệu** | `BASELINE REVIEW READY`                                                                                                        |
| **Phạm vi**             | Toàn bộ các yêu cầu chức năng nghiệp vụ, tác nhân, điều kiện tiên quyết và tiêu chí kiểm thử nghiệm thu                        |
| **Ngôn ngữ**            | Tiếng Việt (kèm thuật ngữ chuyên ngành tiếng Anh)                                                                              |
| **Ngày cập nhật**       | 14/11/2026                                                                                                                     |

---

## 1. Cấu Trúc Mã Định Danh Yêu Cầu Chức Năng (Requirement ID Convention)

Mỗi yêu cầu chức năng được đánh mã định danh ổn định duy nhất theo cú pháp:
$$\text{FR-[PHÂN HỆ]-[SỐ THỨ TỰ]}$$

Các phân hệ chức năng:

- **`FR-AUTH`**: Xác thực, Quản lý tài khoản & Phân quyền.
- **`FR-CAT`**: Danh mục sản phẩm, Tìm kiếm & Thuộc tính kỹ thuật.
- **`FR-EXP`**: Bốn trải nghiệm mua sắm & Các bộ Builder tương tác.
- **`FR-CART`**: Quản lý Giỏ hàng Guest & Customer, Gộp giỏ hàng.
- **`FR-CHK`**: Quy trình Đặt hàng, Tái thẩm định giá & Giữ chỗ kho.
- **`FR-PAY`**: Cổng thanh toán, Ký số Webhook & Xử lý COD.
- **`FR-ORD`**: Vòng đời đơn hàng, Bản chụp bất biến & Quản lý Serial.
- **`FR-INV`**: Quản lý kho, Kiểm định phòng Lab & Phân tầng hàng cũ.

---

## 2. Danh Mục Chi Tiết Yêu Cầu Chức Năng

### 2.1 Phân Hệ Xác Thực & Phân Quyền (FR-AUTH)

| Mã yêu cầu       | Tên chức năng                              | Tác nhân       | Điều kiện tiên quyết             | Kết quả mong đợi & Mô tả nghiệp vụ                                                        | Ưu tiên |   Trạng thái    | Quy tắc liên quan | Quy trình liên quan                                   |
| :--------------- | :----------------------------------------- | :------------- | :------------------------------- | :---------------------------------------------------------------------------------------- | :-----: | :-------------: | :---------------- | :---------------------------------------------------- |
| **`FR-AUTH-01`** | Đăng ký & Đăng nhập tài khoản Khách hàng   | Khách vãng lai | Có email/SĐT hợp lệ              | Người dùng tạo tài khoản, xác thực email, đăng nhập thành công và nhận JWT Token.         |  `P0`   | **`CONFIRMED`** | `BR-AUTH-03`      | Toàn hệ thống                                         |
| **`FR-AUTH-02`** | Chặn Khách vãng lai thanh toán (Auth Wall) | Khách vãng lai | Bấm nút Thanh toán hoặc Mua ngay | Hệ thống chặn không cho vào Checkout, chuyển hướng sang `/auth/login` và lưu `returnUrl`. |  `P0`   | **`CONFIRMED`** | `BR-AUTH-02`      | [WF-CART-01](./workflows/cart-management-workflow.md) |
| **`FR-AUTH-03`** | Quản lý sổ địa chỉ giao hàng               | Khách hàng     | Đã đăng nhập                     | Khách hàng có thể thêm, sửa, xóa nhiều địa chỉ nhận hàng và đặt 1 địa chỉ làm mặc định.   |  `P1`   | **`CONFIRMED`** | `BR-AUTH-01`      | [WF-CHK-01](./workflows/checkout-payment-workflow.md) |

#### Tiêu chí nghiệm thu (Acceptance Criteria):

- **AC-AUTH-01**: Khách hàng đăng ký bằng email hợp lệ và mật khẩu tối thiểu 8 ký tự; hệ thống băm mật khẩu bằng bcrypt/argon2 an toàn.
- **AC-AUTH-02**: Khi Khách vãng lai (chưa đăng nhập) bấm nút "Tiến Hành Thanh Toán" trong giỏ hàng, trình duyệt lập tức chuyển hướng sang trang `/auth/login?redirect=/checkout`.
- **AC-AUTH-03**: Sau khi đăng nhập thành công, hệ thống tự động đưa người dùng trở lại đúng trang `/checkout` mà không yêu cầu bấm lại từ đầu.

---

### 2.2 Phân Hệ Danh Mục & Tìm Kiếm Sản Phẩm (FR-CAT)

| Mã yêu cầu      | Tên chức năng                               | Tác nhân        | Điều kiện tiên quyết | Kết quả mong đợi & Mô tả nghiệp vụ                                                             | Ưu tiên |   Trạng thái    | Quy tắc liên quan                | Quy trình liên quan                                     |
| :-------------- | :------------------------------------------ | :-------------- | :------------------- | :--------------------------------------------------------------------------------------------- | :-----: | :-------------: | :------------------------------- | :------------------------------------------------------ |
| **`FR-CAT-01`** | Xem danh mục phân cấp & Tìm kiếm thông minh | Guest, Customer | Hệ thống hoạt động   | Hiển thị cây 8 danh mục A-H. Tìm kiếm theo tên sản phẩm, thương hiệu, mã SKU có gợi ý tự động. |  `P0`   | **`CONFIRMED`** | `BR-PRODUCT-01`<br/>`BR-DISC-01` | [WF-DISC-01](./workflows/product-discovery-workflow.md) |
| **`FR-CAT-02`** | Lọc thuộc tính kỹ thuật chuyên biệt         | Guest, Customer | Đang xem danh mục    | Bộ lọc thích ứng theo danh mục (lọc Socket cho CPU, VRAM cho GPU, Layout cho bàn phím cơ).     |  `P1`   | **`CONFIRMED`** | `BR-DISC-02`                     | [WF-DISC-01](./workflows/product-discovery-workflow.md) |
| **`FR-CAT-03`** | Lọc độc quyền hàng Đã qua sử dụng           | Guest, Customer | Đang xem danh mục    | Hiển thị các sản phẩm có sẵn đơn vị hàng cũ, hiển thị mức giá cũ thấp nhất "Chỉ từ X VNĐ".     |  `P1`   | **`CONFIRMED`** | `BR-DISC-01`                     | [WF-DISC-01](./workflows/product-discovery-workflow.md) |
| **`FR-CAT-04`** | Hiển thị sản phẩm hết hàng minh bạch        | Guest, Customer | Sản phẩm hết hàng    | Vẫn cho xem thông số kỹ thuật và ảnh nhưng gắn nhãn "Tạm Hết Hàng", khóa nút thêm vào giỏ.     |  `P0`   | **`CONFIRMED`** | `BR-PRODUCT-02`                  | [WF-DISC-01](./workflows/product-discovery-workflow.md) |

#### Tiêu chí nghiệm thu (Acceptance Criteria):

- **AC-CAT-01**: Sản phẩm ở trạng thái `Draft` hoặc `Archived` tuyệt đối không trả về trong kết quả tìm kiếm công khai hoặc API công khai.
- **AC-CAT-02**: Giá hiển thị trên toàn bộ thẻ sản phẩm là số nguyên Đồng Việt Nam (VNĐ), có dấu phân cách phần nghìn (ví dụ `15.500.000 VNĐ`).
- **AC-CAT-03**: Bộ lọc kỹ thuật hoạt động chính xác theo logic AND giữa các tiêu chí khác nhau và logic OR trong cùng một tiêu chí.
- **AC-CAT-04**: Khi một sản phẩm có số lượng = 0, thẻ sản phẩm có huy hiệu màu xám "Tạm Hết Hàng", không thể bấm mua nhanh.

---

### 2.3 Phân Hệ Trải Nghiệm Mua Sắm & Builders (FR-EXP)

| Mã yêu cầu      | Tên chức năng                              | Tác nhân        | Điều kiện tiên quyết | Kết quả mong đợi & Mô tả nghiệp vụ                                                                       | Ưu tiên |   Trạng thái    | Quy tắc liên quan             | Quy trình liên quan                                                                                                                            |
| :-------------- | :----------------------------------------- | :-------------- | :------------------- | :------------------------------------------------------------------------------------------------------- | :-----: | :-------------: | :---------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| **`FR-EXP-01`** | Mua lẻ sản phẩm tiêu chuẩn (Hàng mới & Cũ) | Guest, Customer | Sản phẩm Published   | Xem chi tiết, chọn biến thể hàng mới hoặc chọn đơn vị Serial hàng cũ kèm xem ảnh thật vết xước.          |  `P0`   | **`CONFIRMED`** | `BR-PDP-01`<br/>`BR-PDP-02`   | [WF-PDP-01](./workflows/product-detail-workflow.md)                                                                                            |
| **`FR-EXP-02`** | Bộ Cấu Hình PC Tương Tác (PC Builder)      | Guest, Customer | Hệ thống hoạt động   | Chọn 10 món linh kiện PC. Động cơ tương thích tự động kiểm tra Socket, DDR, Vỏ Case và Nguồn PSU.        |  `P0`   | **`CONFIRMED`** | `BR-CART-03`<br/>`BR-CART-05` | [PC Builder](../customer-experiences.md#2-trai-nghiem-2-tu-cau-hinh-dan-pc-tuong-tac-interactive-pc-builder)                                   |
| **`FR-EXP-03`** | Bộ Quy Hoạch Góc Setup (Setup Builder)     | Guest, Customer | Hệ thống hoạt động   | Thiết kế tổng thể góc bàn làm việc: PC/Laptop, Màn hình kép, Arm chịu tải, Bàn nâng hạ, Ghế ergonomic.   |  `P1`   | **`CONFIRMED`** | `BR-CART-03`                  | [Setup Builder](../customer-experiences.md#3-trai-nghiem-3-quy-hoach-toan-dien-goc-lam-viec--choi-game-full-gaming--workstation-setup-builder) |
| **`FR-EXP-04`** | Bộ Tùy Biến Bàn Phím Cơ (Customizer)       | Guest, Customer | Hệ thống hoạt động   | Tùy biến từng tầng: Layout, Case nhôm, PCB hot-swap, Plate, Switch (3-pin/5-pin), Keycap và Dịch vụ mod. |  `P1`   | **`CONFIRMED`** | `BR-CART-03`                  | [Product Customizer](../customer-experiences.md#4-trai-nghiem-4-tuy-bien-ban-phim-co-tung-tang-modular-product-customizer)                     |

#### Tiêu chí nghiệm thu (Acceptance Criteria):

- **AC-EXP-01**: Trên trang PDP, khi chuyển sang tab Hàng Cũ và chọn một Stock Unit, thư viện ảnh cập nhật đúng ảnh chụp thật vết xước của chiếc máy đó kèm kết quả test FurMark/Prime95.
- **AC-EXP-02**: Trong PC Builder, khi người dùng chọn CPU Intel Socket LGA1700, danh sách Bo mạch chủ chỉ hiển thị các bo mạch có Socket LGA1700, các bo mạch AMD AM5 tự động bị ẩn hoặc gắn cảnh báo không tương thích.
- **AC-EXP-03**: Trong Setup Builder, nếu chọn màn hình 34-inch nặng 8.5kg kết hợp với Arm màn hình chịu tải tối đa 9kg, hệ thống hiển thị cảnh báo cận tải và khuyến nghị dùng Arm hạng nặng.
- **AC-EXP-04**: Trong Bàn Phím Customizer, switch 5-pin không thể chọn nếu bảng mạch PCB chỉ hỗ trợ 3-pin trừ khi người dùng xác nhận đã biết cách cắt chân nhựa.

---

### 2.4 Phân Hệ Quản Lý Giỏ Hàng (FR-CART)

| Mã yêu cầu       | Tên chức năng                                   | Tác nhân        | Điều kiện tiên quyết  | Kết quả mong đợi & Mô tả nghiệp vụ                                                                 | Ưu tiên |   Trạng thái    | Quy tắc liên quan             | Quy trình liên quan                                   |
| :--------------- | :---------------------------------------------- | :-------------- | :-------------------- | :------------------------------------------------------------------------------------------------- | :-----: | :-------------: | :---------------------------- | :---------------------------------------------------- |
| **`FR-CART-01`** | Giỏ hàng Khách vãng lai (Guest Cart)            | Khách vãng lai  | Trình duyệt hỗ trợ    | Lưu trữ sản phẩm trong `localStorage`. Tự do thêm/sửa/xóa không cần tài khoản.                     |  `P0`   | **`CONFIRMED`** | `BR-AUTH-01`<br/>`BR-CART-02` | [WF-CART-01](./workflows/cart-management-workflow.md) |
| **`FR-CART-02`** | Giỏ hàng Khách hàng (Customer Cart)             | Khách hàng      | Đã đăng nhập          | Lưu trữ giỏ hàng trong Database máy chủ, đồng bộ xuyên suốt các thiết bị đăng nhập.                |  `P0`   | **`CONFIRMED`** | `BR-CART-02`                  | [WF-CART-01](./workflows/cart-management-workflow.md) |
| **`FR-CART-03`** | Gộp giỏ hàng an toàn khi đăng nhập (Cart Merge) | Khách vãng lai  | Có hàng trong Local   | Gộp toàn bộ giỏ Local vào Database khi đăng nhập; chỉ xóa `localStorage` khi DB đã lưu thành công. |  `P0`   | **`CONFIRMED`** | `BR-CART-04`                  | [WF-CART-01](./workflows/cart-management-workflow.md) |
| **`FR-CART-04`** | Hiển thị giá thị trường hiện thời & Cảnh báo    | Guest, Customer | Mở giỏ hàng           | Hiển thị giá niêm yết mới nhất; hiển thị thông báo màu vàng nếu giá sản phẩm vừa tăng/giảm.        |  `P0`   | **`CONFIRMED`** | `BR-CART-01`                  | [WF-CART-01](./workflows/cart-management-workflow.md) |
| **`FR-CART-05`** | Quản lý Bộ cấu hình nhóm (Grouped Item)         | Guest, Customer | Có PC/Setup trong giỏ | Khóa không cho xóa lẻ linh kiện; bấm "Sửa trong Builder" để mở lại công cụ cấu hình kiểm tra.      |  `P0`   | **`CONFIRMED`** | `BR-CART-03`<br/>`BR-CART-05` | [WF-CART-01](./workflows/cart-management-workflow.md) |

#### Tiêu chí nghiệm thu (Acceptance Criteria):

- **AC-CART-01**: Đơn vị hàng cũ (Used Stock Unit) trong giỏ hàng chỉ có số lượng = 1; không có nút bấm tăng số lượng; không thể thêm 2 lần cùng một số Serial.
- **AC-CART-02**: Khi gộp giỏ hàng, sản phẩm hàng mới cùng Biến thể được cộng dồn số lượng; nếu vượt quá tồn kho khả dụng thì điều chỉnh bằng tồn kho tối đa kèm thông báo.
- **AC-CART-03**: Nếu quá trình lưu cơ sở dữ liệu khi gộp giỏ gặp sự cố mạng (mã lỗi 500), `localStorage` của khách hàng được giữ nguyên vẹn 100%.
- **AC-CART-04**: Nếu 1 linh kiện trong bộ PC bị hết hàng, bộ PC bị khóa nút Thanh toán, hiển thị cảnh báo đỏ và hướng dẫn khách mở Builder để chọn linh kiện thay thế.

---

### 2.5 Phân Hệ Đặt Hàng & Thanh Toán (FR-CHK)

| Mã yêu cầu      | Tên chức năng                                    | Tác nhân        | Điều kiện tiên quyết   | Kết quả mong đợi & Mô tả nghiệp vụ                                                                 | Ưu tiên |   Trạng thái    | Quy tắc liên quan                      | Quy trình liên quan                                   |
| :-------------- | :----------------------------------------------- | :-------------- | :--------------------- | :------------------------------------------------------------------------------------------------- | :-----: | :-------------: | :------------------------------------- | :---------------------------------------------------- |
| **`FR-CHK-01`** | Tái thẩm định giá và tồn kho tại Checkout        | Khách hàng      | Bấm vào Checkout       | Kiểm tra lại giá và tồn kho toàn bộ giỏ hàng từ Database; yêu cầu xác nhận nếu có đổi giá.         |  `P0`   | **`CONFIRMED`** | `BR-CHECKOUT-01`<br/>`BR-CHECKOUT-02`  | [WF-CHK-01](./workflows/checkout-payment-workflow.md) |
| **`FR-CHK-02`** | Giữ chỗ tồn kho có thời hạn (Reservation)        | Khách hàng      | Khởi tạo Checkout      | Khóa số lượng hàng mới và khóa Serial hàng cũ trong 15-30 phút; tự hoàn trả kho nếu hết hạn.       |  `P0`   | **`CONFIRMED`** | `BR-INVENTORY-02`<br/>`BR-CHECKOUT-03` | [WF-CHK-01](./workflows/checkout-payment-workflow.md) |
| **`FR-CHK-03`** | Tích hợp Cổng thanh toán trực tuyến (VNPAY/MoMo) | Khách hàng      | Chọn thanh toán online | Chuyển hướng khách sang cổng, ký số HMAC SHA512, tạo URL thanh toán có bảo mật.                    |  `P0`   | **`CONFIRMED`** | `BR-PAYMENT-01`                        | [WF-CHK-01](./workflows/checkout-payment-workflow.md) |
| **`FR-CHK-04`** | Xử lý Webhook thanh toán an toàn & Bất biến      | Cổng thanh toán | Khách trả tiền xong    | Lắng nghe Webhook máy chủ - máy chủ, giải mã chữ ký số, đối soát số tiền, cập nhật trạng thái đơn. |  `P0`   | **`CONFIRMED`** | `BR-PAYMENT-01`<br/>`BR-PAYMENT-02`    | [WF-CHK-01](./workflows/checkout-payment-workflow.md) |
| **`FR-CHK-05`** | Thanh toán COD có điều kiện kiểm soát            | Khách hàng      | Đơn < 10.000.000 VNĐ   | Cho phép đặt hàng trả sau bằng tiền mặt, tạo đơn ở trạng thái chờ nhân viên gọi điện xác nhận.     |  `P1`   |   `PROPOSED`    | `BR-PAYMENT-03`                        | [WF-CHK-01](./workflows/checkout-payment-workflow.md) |

#### Tiêu chí nghiệm thu (Acceptance Criteria):

- **AC-CHK-01**: Backend từ chối khởi tạo phiên Checkout nếu người gửi yêu cầu không có JWT Token hợp lệ (HTTP 401 Unauthorized).
- **AC-CHK-02**: Nếu giá sản phẩm trong database cao hơn lúc khách thêm vào giỏ, màn hình Checkout hiển thị bảng so sánh giá cũ - giá mới và nút bấm "Tôi đồng ý với mức giá mới" trước khi cho phép bấm đặt hàng.
- **AC-CHK-03**: Sau khi phiên Checkout được tạo, số lượng tồn kho khả dụng của sản phẩm lập tức giảm đi tương ứng; nếu mở tab ẩn danh khác thì sản phẩm cũ đó báo "Đang có người giữ chỗ".
- **AC-PAY-01**: Webhook gửi từ Cổng thanh toán nếu thiếu chữ ký số HMAC hoặc chữ ký số không khớp với Secret Key sẽ bị trả về HTTP 400 Bad Request và không thay đổi trạng thái đơn hàng.
- **AC-PAY-02**: Không bao giờ cập nhật trạng thái đơn hàng thành `PAID` chỉ dựa vào sự kiện người dùng quay lại trình duyệt ở URL `/order/success`.

---

### 2.6 Phân Hệ Vòng Đời Đơn Hàng & Vận Chuyển (FR-ORD)

| Mã yêu cầu      | Tên chức năng                                       | Tác nhân               | Điều kiện tiên quyết | Kết quả mong đợi & Mô tả nghiệp vụ                                                          | Ưu tiên |   Trạng thái    | Quy tắc liên quan | Quy trình liên quan                       |
| :-------------- | :-------------------------------------------------- | :--------------------- | :------------------- | :------------------------------------------------------------------------------------------ | :-----: | :-------------: | :---------------- | :---------------------------------------- |
| **`FR-ORD-01`** | Tạo bản chụp đơn hàng bất biến (Immutable Snapshot) | Hệ thống               | Đặt hàng thành công  | Lưu cố định toàn bộ tên, giá, thông số, ảnh và số Serial linh kiện tại thời điểm mua.       |  `P0`   | **`CONFIRMED`** | `BR-ORDER-01`     | [Vòng đời đơn hàng](./order-lifecycle.md) |
| **`FR-ORD-02`** | Quét và liên kết Serial linh kiện cho bảo hành      | Nhân viên Kho/Kỹ thuật | Soạn hàng / Ráp máy  | Quét mã vạch số Serial thực tế của từng linh kiện thành phần để kích hoạt bảo hành điện tử. |  `P0`   | **`CONFIRMED`** | `BR-ORDER-02`     | [Vòng đời đơn hàng](./order-lifecycle.md) |
| **`FR-ORD-03`** | Tra cứu lịch sử đơn hàng & Tiến độ giao hàng        | Khách hàng             | Đã đăng nhập         | Xem chi tiết đơn hàng, mã vận đơn Tracking, trạng thái 4 chiều và danh sách Serial đã mua.  |  `P1`   | **`CONFIRMED`** | `BR-ORDER-03`     | [Vòng đời đơn hàng](./order-lifecycle.md) |
| **`FR-ORD-04`** | Hủy đơn hàng và tự động hoàn trả tồn kho            | Customer / System      | Đơn chưa đóng gói    | Cho phép khách bấm hủy khi chưa thanh toán; hoặc hệ thống tự hủy khi quá hạn thanh toán.    |  `P0`   | **`CONFIRMED`** | `BR-INVENTORY-03` | [Vòng đời đơn hàng](./order-lifecycle.md) |

#### Tiêu chí nghiệm thu (Acceptance Criteria):

- **AC-ORD-01**: Dù sản phẩm trên website sau này bị sửa tên hoặc tăng giá gấp đôi, đơn hàng lịch sử của khách hàng vẫn hiển thị nguyên vẹn 100% dữ liệu gốc tại thời điểm mua hàng.
- **AC-ORD-02**: Đơn hàng hoàn tất phải hiển thị danh sách Serial vật lý của từng món đồ (ví dụ: Serial CPU, Serial GPU, Serial RAM) để khách hàng đối chiếu tem dán khi nhận máy.
- **AC-ORD-03**: Khi đơn hàng bị hủy (`CANCELLED`), tồn kho hàng mới được cộng hoàn trả tức thì và đơn vị hàng cũ chuyển trạng thái trở lại `AVAILABLE`.

---

### 2.7 Phân Hệ Quản Lý Kho & Kiểm Định Hàng Cũ (FR-INV)

| Mã yêu cầu      | Tên chức năng                                  | Tác nhân           | Điều kiện tiên quyết | Kết quả mong đợi & Mô tả nghiệp vụ                                                                  | Ưu tiên |   Trạng thái    | Quy tắc liên quan                 | Quy trình liên quan                                         |
| :-------------- | :--------------------------------------------- | :----------------- | :------------------- | :-------------------------------------------------------------------------------------------------- | :-----: | :-------------: | :-------------------------------- | :---------------------------------------------------------- |
| **`FR-INV-01`** | Nhập kho lô hàng mới theo số lượng (FIFO)      | Nhân viên Kho      | Có lô hàng mới về    | Quét mã lô, cập nhật số lượng tồn kho khả dụng, giá nhập và ngày sản xuất.                          |  `P0`   | **`CONFIRMED`** | `BR-PRODUCT-01`                   | [Mô hình tồn kho](./product-catalog.md)                     |
| **`FR-INV-02`** | Đăng kiểm linh kiện cũ & Lập biên bản kỹ thuật | Nhân viên Kỹ thuật | Hàng cũ đã test đạt  | Nhập số Serial, phân cấp `LIKE_NEW/GOOD/FAIR`, tải ảnh vết trầy thật, nhập kết quả FurMark/Prime95. |  `P0`   | **`CONFIRMED`** | `BR-INVENTORY-01`<br/>`BR-PDP-02` | [Tiêu chuẩn kiểm định](./product-condition-and-warranty.md) |

#### Tiêu chí nghiệm thu (Acceptance Criteria):

- **AC-INV-01**: Mỗi bản ghi Đơn vị hàng cũ (`StockUnit`) bắt buộc phải có trường `serialNumber` duy nhất trên toàn hệ thống (Unique Constraint).
- **AC-INV-02**: Không thể xuất bản một đơn vị hàng cũ ra ngoài website nếu thiếu biên bản kiểm định kỹ thuật hoặc thiếu tối thiểu 2 ảnh chụp thực tế.

---

## 3. Ma Trận Truy Xuất Nguồn Gốc (Traceability Matrix)

| Yêu cầu chức năng | Quy tắc nghiệp vụ liên quan         | Quy trình nghiệp vụ nguồn                                                                                    | Trải nghiệm người dùng | Tiêu chí nghiệm thu  | Trạng thái quyết định |
| :---------------- | :---------------------------------- | :----------------------------------------------------------------------------------------------------------- | :--------------------- | :------------------- | :-------------------: |
| **`FR-AUTH-02`**  | `BR-AUTH-02`                        | [WF-CART-01](./workflows/cart-management-workflow.md)                                                        | Cửa ngõ thanh toán     | AC-AUTH-02           |    **`CONFIRMED`**    |
| **`FR-CAT-01`**   | `BR-PRODUCT-01`, `BR-DISC-01`       | [WF-DISC-01](./workflows/product-discovery-workflow.md)                                                      | Khám phá sản phẩm      | AC-CAT-01, AC-CAT-02 |    **`CONFIRMED`**    |
| **`FR-CAT-04`**   | `BR-PRODUCT-02`                     | [WF-DISC-01](./workflows/product-discovery-workflow.md)                                                      | Khám phá & Chi tiết    | AC-CAT-04            |    **`CONFIRMED`**    |
| **`FR-EXP-01`**   | `BR-PDP-01`, `BR-PDP-02`            | [WF-PDP-01](./workflows/product-detail-workflow.md)                                                          | Mua lẻ tiêu chuẩn      | AC-EXP-01            |    **`CONFIRMED`**    |
| **`FR-EXP-02`**   | `BR-CART-03`, `BR-CART-05`          | [PC Builder](../customer-experiences.md#2-trai-nghiem-2-tu-cau-hinh-dan-pc-tuong-tac-interactive-pc-builder) | Cấu hình dàn PC        | AC-EXP-02            |    **`CONFIRMED`**    |
| **`FR-CART-03`**  | `BR-CART-04`                        | [WF-CART-01](./workflows/cart-management-workflow.md)                                                        | Đăng nhập & Gộp giỏ    | AC-CART-03           |    **`CONFIRMED`**    |
| **`FR-CHK-01`**   | `BR-CHECKOUT-01`                    | [WF-CHK-01](./workflows/checkout-payment-workflow.md)                                                        | Tái thẩm định giá      | AC-CHK-02            |    **`CONFIRMED`**    |
| **`FR-CHK-02`**   | `BR-INVENTORY-02`, `BR-CHECKOUT-03` | [WF-CHK-01](./workflows/checkout-payment-workflow.md)                                                        | Giữ chỗ kho            | AC-CHK-03            |    **`CONFIRMED`**    |
| **`FR-CHK-04`**   | `BR-PAYMENT-01`, `BR-PAYMENT-02`    | [WF-CHK-01](./workflows/checkout-payment-workflow.md)                                                        | Thanh toán trực tuyến  | AC-PAY-01, AC-PAY-02 |    **`CONFIRMED`**    |
| **`FR-ORD-01`**   | `BR-ORDER-01`                       | [Vòng đời đơn hàng](./order-lifecycle.md)                                                                    | Đặt hàng thành công    | AC-ORD-01            |    **`CONFIRMED`**    |
| **`FR-ORD-02`**   | `BR-ORDER-02`                       | [Vòng đời đơn hàng](./order-lifecycle.md)                                                                    | Kích hoạt bảo hành     | AC-ORD-02            |    **`CONFIRMED`**    |

---

## 4. Tài Liệu Tham Chiếu

- [Bảng quy tắc nghiệp vụ tập trung](./business-rules-catalog.md)
- [Quy trình nghiệp vụ giỏ hàng](./workflows/cart-management-workflow.md)
- [Quy trình nghiệp vụ thanh toán](./workflows/checkout-payment-workflow.md)
- [Đặc tả vòng đời đơn hàng](./order-lifecycle.md)
