# Bảng Quy Tắc Nghiệp Vụ Tập Trung (Central Business Rules Catalog)

| Thuộc tính              | Chi tiết                                                                              |
| :---------------------- | :------------------------------------------------------------------------------------ |
| **Mã tài liệu**         | `DOC-BIZ-RULES`                                                                       |
| **Tên tài liệu**        | Danh mục Quy tắc Nghiệp vụ Chuẩn hóa (Business Rules Catalog) Toàn Hệ thống NovaStore |
| **Phiên bản**           | `1.0.0`                                                                               |
| **Trạng thái tài liệu** | `BASELINE REVIEW READY`                                                               |
| **Phạm vi**             | Tập hợp toàn bộ các quy tắc bất biến, chính sách vận hành và quyết định nghiệp vụ     |
| **Ngôn ngữ**            | Tiếng Việt (kèm thuật ngữ chuyên ngành tiếng Anh)                                     |
| **Ngày cập nhật**       | 14/11/2026                                                                            |

---

## 1. Cấu Trúc Mã Định Danh Quy Tắc Nghiệp Vụ (Rule ID Convention)

Mọi quy tắc nghiệp vụ trong hệ thống NovaStore được định danh bằng mã ổn định duy nhất theo cú pháp:
$$\text{BR-[PHÂN HỆ]-[SỐ THỨ TỰ]}$$

Các phân hệ bao gồm:

- **`BR-AUTH`**: Xác thực, Ủy quyền & Phân quyền người dùng (Authentication & Authorization).
- **`BR-PRODUCT`**: Danh mục, Mẫu sản phẩm & Trạng thái xuất bản (Product Catalog & Status).
- **`BR-INVENTORY`**: Quản lý Kho, Số lượng hàng mới & Serial hàng cũ (Inventory & Serialized Stock).
- **`BR-DISC`**: Khám phá, Tìm kiếm & Lọc sản phẩm (Product Discovery & Search).
- **`BR-PDP`**: Chi tiết sản phẩm, Biến thể & Khuyết tật (Product Detail Page).
- **`BR-CART`**: Quản lý giỏ hàng, Loại mục & Gộp giỏ hàng (Cart Management & Merge).
- **`BR-CHECKOUT`**: Quy trình đặt hàng, Tái thẩm định giá & Giữ chỗ tồn kho (Checkout & Reservation).
- **`BR-PAYMENT`**: Cổng thanh toán, Webhook, Ký số & COD (Payment & Gateways).
- **`BR-ORDER`**: Vòng đời đơn hàng, Bất biến hóa & Số serial linh kiện (Order Lifecycle & Fulfillment).

### Phân Định Mức Độ Ưu Tiên & Trạng Thái Quyết Định:

- **Mức độ ưu tiên (Priority)**:
  - **`P0` (Bắt buộc / Cốt lõi)**: Quy tắc nền tảng không thể thiếu để hệ thống vận hành đúng đắn.
  - **`P1` (Quan trọng)**: Quy tắc quan trọng để đảm bảo tính toàn vẹn và trải nghiệm người dùng cao cấp.
  - **`P2` (Bổ trợ)**: Quy tắc tối ưu hóa hoặc mở rộng trong các giai đoạn tiếp theo.
- **Trạng thái quyết định (Decision Status)**:
  - **`CONFIRMED`**: Quyết định nghiệp vụ cố định, đã được chốt chính thức, không được phép thay đổi.
  - **`PROPOSED`**: Đề xuất hợp lý đã qua phân tích chuyên môn của BA/Kiến trúc sư, đang chờ phê duyệt.
  - **`OPEN`**: Vấn đề nghiệp vụ đang thảo luận mở, cần thu thập thêm số liệu thị trường để chốt.

---

## 2. Bảng Danh Mục Quy Tắc Nghiệp Vụ Toàn Diện

### 2.1 Nhóm Xác Thực & Phân Quyền (BR-AUTH)

| Mã quy tắc       | Tên quy tắc nghiệp vụ                           | Mô tả chi tiết quy tắc                                                                                                                                                                                      | Phạm vi    | Ưu tiên |   Trạng thái    | Quy trình liên quan                                                                                             | Tiêu chí nghiệm thu liên quan |
| :--------------- | :---------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------- | :-----: | :-------------: | :-------------------------------------------------------------------------------------------------------------- | :---------------------------- |
| **`BR-AUTH-01`** | **Quyền khám phá công khai của Khách vãng lai** | Khách vãng lai (Guest) chưa đăng nhập có toàn quyền xem danh mục, tìm kiếm, lọc, xem chi tiết sản phẩm, biên bản kiểm định hàng cũ, sử dụng 3 bộ Builder và thêm hàng vào giỏ hàng cục bộ (`localStorage`). | Công khai  |  `P0`   | **`CONFIRMED`** | [WF-DISC-01](./workflows/product-discovery-workflow.md)<br/>[WF-PDP-01](./workflows/product-detail-workflow.md) | AC-AUTH-01<br/>AC-DISC-01     |
| **`BR-AUTH-02`** | **Tắt hoàn toàn Guest Checkout**                | Quy trình Thanh toán (Checkout) bắt buộc khách hàng phải đăng nhập tài khoản hợp lệ. Nếu Khách vãng lai bấm Thanh toán hoặc Mua ngay, hệ thống bắt buộc chuyển hướng sang Đăng nhập/Đăng ký.                | Thanh toán |  `P0`   | **`CONFIRMED`** | [WF-CART-01](./workflows/cart-management-workflow.md)<br/>[WF-CHK-01](./workflows/checkout-payment-workflow.md) | AC-AUTH-02<br/>AC-CHK-01      |
| **`BR-AUTH-03`** | **Bảo mật phiên đăng nhập JWT**                 | Khách hàng đăng nhập được cấp cặp mã thông báo JWT: Access Token (thời hạn ngắn: 15 phút) và Refresh Token (thời hạn dài: 7 ngày, lưu trong HTTP-only Cookie).                                              | Xác thực   |  `P1`   |   `PROPOSED`    | Toàn hệ thống                                                                                                   | AC-AUTH-03                    |

---

### 2.2 Nhóm Danh Mục & Trạng Thái Sản Phẩm (BR-PRODUCT)

| Mã quy tắc          | Tên quy tắc nghiệp vụ                    | Mô tả chi tiết quy tắc                                                                                                                                                                           | Phạm vi  | Ưu tiên |   Trạng thái    | Quy trình liên quan                                                                                             | Tiêu chí nghiệm thu liên quan |
| :------------------ | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :-----: | :-------------: | :-------------------------------------------------------------------------------------------------------------- | :---------------------------- |
| **`BR-PRODUCT-01`** | **Quy tắc hiển thị trạng thái xuất bản** | Chỉ những sản phẩm ở trạng thái `PUBLISHED` mới được xuất hiện công khai trên website. Các sản phẩm ở trạng thái `DRAFT` hoặc `ARCHIVED` tuyệt đối không hiển thị ra bên ngoài.                  | Catalog  |  `P0`   | **`CONFIRMED`** | [WF-DISC-01](./workflows/product-discovery-workflow.md)<br/>[WF-PDP-01](./workflows/product-detail-workflow.md) | AC-CAT-01                     |
| **`BR-PRODUCT-02`** | **Quy tắc hiển thị sản phẩm hết hàng**   | Sản phẩm hết hàng (`OUT_OF_STOCK`) vẫn được phép xuất hiện trên danh mục và xem chi tiết (để phục vụ SEO và tham khảo cấu hình), nhưng phải gắn nhãn "Tạm Hết Hàng" và vô hiệu hóa nút mua hàng. | Catalog  |  `P0`   | **`CONFIRMED`** | [WF-DISC-01](./workflows/product-discovery-workflow.md)<br/>[WF-PDP-01](./workflows/product-detail-workflow.md) | AC-CAT-02                     |
| **`BR-PRODUCT-03`** | **Định dạng tiền tệ nguyên số VNĐ**      | Toàn bộ giá bán, giá khuyến mãi, phụ phí và hóa đơn đều phải là số nguyên Đồng Việt Nam (VNĐ). Tuyệt đối không dùng số thập phân hoặc chia đơn vị cents.                                         | Toàn sàn |  `P0`   | **`CONFIRMED`** | Toàn bộ quy trình                                                                                               | AC-CAT-03                     |

---

### 2.3 Nhóm Kho Hàng & Định Danh Serial Hàng Cũ (BR-INVENTORY)

| Mã quy tắc            | Tên quy tắc nghiệp vụ                                  | Mô tả chi tiết quy tắc                                                                                                                                                                                                                    | Phạm vi  | Ưu tiên |   Trạng thái    | Quy trình liên quan                                                                                             | Tiêu chí nghiệm thu liên quan |
| :-------------------- | :----------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :-----: | :-------------: | :-------------------------------------------------------------------------------------------------------------- | :---------------------------- |
| **`BR-INVENTORY-01`** | **Tính duy nhất của Đơn vị hàng cũ (Used Stock Unit)** | Mỗi sản phẩm đã qua sử dụng là một đơn vị vật lý duy nhất (Non-interchangeable), có Số Serial riêng, ảnh thật vết xước, kết quả test FurMark/Prime95 riêng và số lượng mua luôn luôn cố định bằng 1. Một đơn vị đã bán không thể mua lại. | Kho hàng |  `P0`   | **`CONFIRMED`** | [WF-PDP-01](./workflows/product-detail-workflow.md)<br/>[WF-CART-01](./workflows/cart-management-workflow.md)   | AC-INV-01                     |
| **`BR-INVENTORY-02`** | **Phân biệt Thêm vào giỏ và Giữ chỗ tồn kho**          | Thêm sản phẩm vào Giỏ hàng KHÔNG giữ chỗ tồn kho. Tồn kho chỉ được khóa giữ chỗ (Reserved) tại thời điểm khách hàng mở phiên Thanh toán (Checkout) và được bảo vệ bằng cơ chế đếm ngược thời gian.                                        | Kho hàng |  `P0`   | **`CONFIRMED`** | [WF-CART-01](./workflows/cart-management-workflow.md)<br/>[WF-CHK-01](./workflows/checkout-payment-workflow.md) | AC-INV-02                     |
| **`BR-INVENTORY-03`** | **Thu hồi tồn kho giữ chỗ quá hạn**                    | Nếu phiên thanh toán quá hạn (15 phút đối với cổng trực tuyến, 30 phút đối với VietQR) mà chưa nhận được tiền, hệ thống tự động giải phóng tồn kho về trạng thái khả dụng cho người khác mua.                                             | Kho hàng |  `P0`   | **`CONFIRMED`** | [WF-CHK-01](./workflows/checkout-payment-workflow.md)                                                           | AC-INV-03                     |

---

### 2.4 Nhóm Khám Phá & Tìm Kiếm Sản Phẩm (BR-DISC)

| Mã quy tắc       | Tên quy tắc nghiệp vụ                           | Mô tả chi tiết quy tắc                                                                                                                                               | Phạm vi  | Ưu tiên |   Trạng thái    | Quy trình liên quan                                     | Tiêu chí nghiệm thu liên quan |
| :--------------- | :---------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :-----: | :-------------: | :------------------------------------------------------ | :---------------------------- |
| **`BR-DISC-01`** | **Hiển thị dải giá niêm yết linh hoạt**         | Nếu một mẫu sản phẩm có nhiều biến thể hoặc có cả hàng cũ, thẻ sản phẩm phải hiển thị dải giá minh bạch "Từ X VNĐ - Y VNĐ" hoặc "Hàng cũ từ X VNĐ".                  | Tìm kiếm |  `P1`   | **`CONFIRMED`** | [WF-DISC-01](./workflows/product-discovery-workflow.md) | AC-DISC-02                    |
| **`BR-DISC-02`** | **Bộ lọc thông số kỹ thuật thích ứng danh mục** | Giao diện bộ lọc thuộc tính kỹ thuật phải thay đổi ngữ cảnh theo danh mục đang xem (ví dụ: đang xem GPU chỉ hiện lọc VRAM/Chipset; xem CPU chỉ hiện lọc Socket/TDP). | Tìm kiếm |  `P1`   | **`CONFIRMED`** | [WF-DISC-01](./workflows/product-discovery-workflow.md) | AC-DISC-03                    |

---

### 2.5 Nhóm Trang Chi Tiết Sản Phẩm (BR-PDP)

| Mã quy tắc      | Tên quy tắc nghiệp vụ                                      | Mô tả chi tiết quy tắc                                                                                                                                                        | Phạm vi  | Ưu tiên |   Trạng thái    | Quy trình liên quan                                 | Tiêu chí nghiệm thu liên quan |
| :-------------- | :--------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :-----: | :-------------: | :-------------------------------------------------- | :---------------------------- |
| **`BR-PDP-01`** | **Xác thực dữ liệu phía máy chủ (Server-side Validation)** | Máy chủ luôn kiểm tra trực tiếp mã sản phẩm, trạng thái xuất bản, tồn kho và giá bán từ cơ sở dữ liệu. Tuyệt đối không chấp nhận giá bán hoặc tồn kho do trình duyệt gửi lên. | Chi tiết |  `P0`   | **`CONFIRMED`** | [WF-PDP-01](./workflows/product-detail-workflow.md) | AC-PDP-01                     |
| **`BR-PDP-02`** | **Minh bạch khuyết tật và bài test hàng cũ**               | Hàng đã qua sử dụng bắt buộc phải công khai số Serial, cấp độ thẩm mỹ, ảnh chụp vết trầy thực tế và kết quả stress test trên trang PDP trước khi cho phép mua.                | Chi tiết |  `P0`   | **`CONFIRMED`** | [WF-PDP-01](./workflows/product-detail-workflow.md) | AC-PDP-02                     |
| **`BR-PDP-03`** | **Khóa cứng số lượng hàng cũ bằng 1**                      | Bộ chọn số lượng (Quantity Selector) của Đơn vị hàng cũ phải bị vô hiệu hóa ở giá trị 1. Hệ thống từ chối mọi yêu cầu thêm số lượng lớn hơn 1 cho một Stock Unit cũ.          | Chi tiết |  `P0`   | **`CONFIRMED`** | [WF-PDP-01](./workflows/product-detail-workflow.md) | AC-PDP-03                     |

---

### 2.6 Nhóm Quản Lý Giỏ Hàng (BR-CART)

| Mã quy tắc       | Tên quy tắc nghiệp vụ                                | Mô tả chi tiết quy tắc                                                                                                                                                             | Phạm vi  | Ưu tiên |   Trạng thái    | Quy trình liên quan                                   | Tiêu chí nghiệm thu liên quan |
| :--------------- | :--------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :-----: | :-------------: | :---------------------------------------------------- | :---------------------------- |
| **`BR-CART-01`** | **Giá giỏ hàng là giá thị trường hiện thời**         | Thêm vào giỏ hàng KHÔNG khóa giá. Giỏ hàng luôn hiển thị giá niêm yết hiện thời và phát cảnh báo nếu giá tăng hoặc giảm so với lúc thêm vào giỏ.                                   | Giỏ hàng |  `P0`   | **`CONFIRMED`** | [WF-CART-01](./workflows/cart-management-workflow.md) | AC-CART-01                    |
| **`BR-CART-02`** | **Hỗ trợ đầy đủ 3 nhóm mục giỏ hàng**                | Giỏ hàng phải phân biệt và xử lý độc lập: Mục hàng mới tiêu chuẩn, Mục hàng cũ có Serial (Qty = 1), và Mục Bộ cấu hình nhóm (PC Build, Setup, Bàn phím custom).                    | Giỏ hàng |  `P0`   | **`CONFIRMED`** | [WF-CART-01](./workflows/cart-management-workflow.md) | AC-CART-02                    |
| **`BR-CART-03`** | **Tính toàn vẹn của Bộ cấu hình trong giỏ**          | Khách hàng không được xóa lẻ từng linh kiện trong bộ cấu hình ngay tại giỏ hàng. Mọi thay đổi bắt buộc phải bấm "Sửa trong Builder" để Động cơ tương thích kiểm tra lại.           | Giỏ hàng |  `P0`   | **`CONFIRMED`** | [WF-CART-01](./workflows/cart-management-workflow.md) | AC-CART-03                    |
| **`BR-CART-04`** | **Bảo toàn dữ liệu khi gộp giỏ hàng (Cart Merge)**   | Chỉ được xóa `localStorage` của Khách vãng lai sau khi toàn bộ dữ liệu gộp đã được lưu thành công vào cơ sở dữ liệu máy chủ. Nếu lỗi mạng, phải giữ nguyên dữ liệu cục bộ.         | Giỏ hàng |  `P0`   | **`CONFIRMED`** | [WF-CART-01](./workflows/cart-management-workflow.md) | AC-CART-04                    |
| **`BR-CART-05`** | **Cấm tự ý thay thế linh kiện hết hàng trong bộ PC** | Nếu một linh kiện trong bộ PC bị hết hàng, bộ PC bị khóa thanh toán và yêu cầu người dùng vào Builder tự chọn linh kiện thay thế. Tuyệt đối không âm thầm tráo đổi linh kiện khác. | Giỏ hàng |  `P0`   | **`CONFIRMED`** | [WF-CART-01](./workflows/cart-management-workflow.md) | AC-CART-05                    |

---

### 2.7 Nhóm Đặt Hàng & Thanh Toán (BR-CHECKOUT)

| Mã quy tắc           | Tên quy tắc nghiệp vụ                                         | Mô tả chi tiết quy tắc                                                                                                                                                               | Phạm vi    | Ưu tiên |   Trạng thái    | Quy trình liên quan                                   | Tiêu chí nghiệm thu liên quan |
| :------------------- | :------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------- | :-----: | :-------------: | :---------------------------------------------------- | :---------------------------- |
| **`BR-CHECKOUT-01`** | **Tái thẩm định giá tại bước Checkout**                       | Giá bán của toàn bộ đơn hàng bắt buộc phải được tái thẩm định từ cơ sở dữ liệu ngay khi mở màn hình Checkout. Nếu có chênh lệch giá, khách hàng phải bấm xác nhận mới được tiếp tục. | Thanh toán |  `P0`   | **`CONFIRMED`** | [WF-CHK-01](./workflows/checkout-payment-workflow.md) | AC-CHK-02                     |
| **`BR-CHECKOUT-02`** | **Tái thẩm định tồn kho & tương thích trước khi tạo đơn**     | Hệ thống kiểm tra lần cuối toàn bộ số lượng hàng mới, khóa Serial hàng cũ và kiểm tra tính hợp lệ của bộ cấu hình trước khi cho phép bấm thanh toán.                                 | Thanh toán |  `P0`   | **`CONFIRMED`** | [WF-CHK-01](./workflows/checkout-payment-workflow.md) | AC-CHK-03                     |
| **`BR-CHECKOUT-03`** | **Thời hạn giữ chỗ tồn kho (Reservation TTL)**                | Đơn hàng chờ thanh toán trực tuyến được giữ chỗ tồn kho tối đa 15 phút (cổng trực tuyến) hoặc 30 phút (chuyển khoản VietQR) trước khi tự động hủy.                                   | Thanh toán |  `P1`   |   `PROPOSED`    | [WF-CHK-01](./workflows/checkout-payment-workflow.md) | AC-CHK-04                     |
| **`BR-CHECKOUT-04`** | **Tính duy nhất của phiên thanh toán (Checkout Idempotency)** | Khách hàng không thể tạo nhiều đơn hàng trùng lặp bằng cách bấm liên tiếp nút thanh toán. Hệ thống sử dụng Idempotency Key khóa nút bấm và xử lý duy nhất 1 lần.                     | Thanh toán |  `P1`   |   `PROPOSED`    | [WF-CHK-01](./workflows/checkout-payment-workflow.md) | AC-CHK-05                     |

---

### 2.8 Nhóm Cổng Thanh Toán & Webhook (BR-PAYMENT)

| Mã quy tắc          | Tên quy tắc nghiệp vụ                                           | Mô tả chi tiết quy tắc                                                                                                                                                                           | Phạm vi    | Ưu tiên |   Trạng thái    | Quy trình liên quan                                   | Tiêu chí nghiệm thu liên quan |
| :------------------ | :-------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------- | :-----: | :-------------: | :---------------------------------------------------- | :---------------------------- |
| **`BR-PAYMENT-01`** | **Xác thực chữ ký số Webhook từ máy chủ (Server-to-Server)**    | Chỉ công nhận thanh toán thành công khi nhận được Webhook từ Cổng thanh toán có chữ ký số HMAC SHA512 hợp lệ và số tiền khớp 100%. Tuyệt đối không tin cậy chuyển hướng trình duyệt phía client. | Thanh toán |  `P0`   | **`CONFIRMED`** | [WF-CHK-01](./workflows/checkout-payment-workflow.md) | AC-PAY-01                     |
| **`BR-PAYMENT-02`** | **Xử lý Webhook bất biến chống trùng lặp (Idempotent Webhook)** | Hệ thống kiểm tra mã giao dịch cổng thanh toán (`GatewayTransactionId`). Nếu Webhook bị gửi lại nhiều lần cho đơn đã trả tiền, hệ thống trả về HTTP 200 mà không cập nhật lại lần hai.           | Thanh toán |  `P0`   | **`CONFIRMED`** | [WF-CHK-01](./workflows/checkout-payment-workflow.md) | AC-PAY-02                     |
| **`BR-PAYMENT-03`** | **Điều kiện hạn chế thanh toán COD**                            | Thanh toán khi nhận hàng (COD) chỉ áp dụng cho đơn hàng có tổng giá trị dưới 10.000.000 VNĐ và KHÔNG chứa dịch vụ lắp ráp máy tính theo yêu cầu riêng.                                           | Thanh toán |  `P1`   |   `PROPOSED`    | [WF-CHK-01](./workflows/checkout-payment-workflow.md) | AC-PAY-03                     |
| **`BR-PAYMENT-04`** | **Chính sách hoàn tiền qua phương thức gốc**                    | Khi hủy đơn hàng đã thanh toán trực tuyến, tiền hoàn bắt buộc phải chuyển ngược lại đúng tài khoản/ví/thẻ đã thanh toán ban đầu thông qua API Refund của cổng.                                   | Thanh toán |  `P1`   |   `PROPOSED`    | [WF-CHK-01](./workflows/checkout-payment-workflow.md) | AC-PAY-04                     |

---

### 2.9 Nhóm Vòng Đời Đơn Hàng & Vận Chuyển (BR-ORDER)

| Mã quy tắc        | Tên quy tắc nghiệp vụ                                   | Mô tả chi tiết quy tắc                                                                                                                                                                                             | Phạm vi  | Ưu tiên |   Trạng thái    | Quy trình liên quan                       | Tiêu chí nghiệm thu liên quan |
| :---------------- | :------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :-----: | :-------------: | :---------------------------------------- | :---------------------------- |
| **`BR-ORDER-01`** | **Bản chụp bất biến của đơn hàng (Immutable Snapshot)** | Mọi dữ liệu về tên sản phẩm, thông số kỹ thuật, giá bán và ưu đãi được cố định vĩnh viễn trong bản ghi đơn hàng tại thời điểm đặt. Các sửa đổi trên catalog sau này không ảnh hưởng đến đơn hàng đã tạo.           | Đơn hàng |  `P0`   | **`CONFIRMED`** | [Vòng đời đơn hàng](./order-lifecycle.md) | AC-ORD-01                     |
| **`BR-ORDER-02`** | **Ghi nhận chính xác số Serial vật lý cho bảo hành**    | Khi xuất kho dàn máy PC Builder hoặc hàng cũ, nhân viên kho/kỹ thuật bắt buộc phải quét số Serial thực tế của từng linh kiện để lưu vào bản ghi đơn hàng, làm căn cứ kích hoạt bảo hành điện tử.                   | Đơn hàng |  `P0`   | **`CONFIRMED`** | [Vòng đời đơn hàng](./order-lifecycle.md) | AC-ORD-02                     |
| **`BR-ORDER-03`** | **Tách biệt 4 chiều trạng thái độc lập**                | Đơn hàng phải theo dõi độc lập 4 trạng thái: Trạng thái Đơn hàng (`OrderStatus`), Thanh toán (`PaymentStatus`), Vận chuyển (`FulfillmentStatus`), và Giữ chỗ tồn kho (`ReservationStatus`). Không gộp thành 1 cột. | Đơn hàng |  `P0`   | **`CONFIRMED`** | [Vòng đời đơn hàng](./order-lifecycle.md) | AC-ORD-03                     |

---

## 3. Tài Liệu Tham Chiếu

- [Tổng quan nghiệp vụ NovaStore](./business-overview.md)
- [Bảng phân quyền và vai trò tác nhân](./actors-and-roles.md)
- [Danh mục yêu cầu chức năng](./functional-requirements.md)
- [Quy trình nghiệp vụ giỏ hàng](./workflows/cart-management-workflow.md)
- [Quy trình nghiệp vụ thanh toán](./workflows/checkout-payment-workflow.md)
- [Đặc tả vòng đời đơn hàng](./order-lifecycle.md)
