# Báo Cáo Hoàn Thành Nền Tảng Tài Liệu Nghiệp Vụ NovaStore

(NovaStore Business Documentation Baseline Completion Report)

| Thuộc tính              | Chi tiết                                                                                       |
| :---------------------- | :--------------------------------------------------------------------------------------------- |
| **Mã tài liệu**         | `DOC-BIZ-REPORT-FINAL`                                                                         |
| **Tên tài liệu**        | Báo Cáo Hoàn Thành Nền Tảng Tài Liệu Nghiệp Vụ NovaStore (Business Baseline Completion Report) |
| **Phiên bản**           | `1.0.0`                                                                                        |
| **Trạng thái tài liệu** | **`READY FOR HUMAN REVIEW & APPROVAL`**                                                        |
| **Vai trò thực hiện**   | Senior Business Analyst (BA) & Software Architect                                              |
| **Ngôn ngữ**            | Tiếng Việt (kèm thuật ngữ chuyên ngành tiếng Anh)                                              |
| **Ngày lập báo cáo**    | 14/11/2026                                                                                     |

---

## 1. Tóm Tắt Hiện Trạng Tài Liệu Trước Khi Thực Hiện (Audit Summary of Existing Documentation)

Trước khi thực hiện chuẩn hóa, hệ thống tài liệu ban đầu của NovaStore tồn tại một số hạn chế và sự không đồng bộ:

1. **Rào cản ngôn ngữ và cấu trúc sơ khai**: Các tài liệu trong thư mục `docs/business/` ban đầu được soạn thảo bằng tiếng Anh dưới dạng các bản ghi chú ngắn (20 - 90 dòng), thiếu chiều sâu phân tích quy trình chi tiết và chưa đáp ứng tiêu chuẩn tài liệu phân tích nghiệp vụ tại thị trường Việt Nam.
2. **Thiếu vắng đặc tả hành trình cốt lõi**: Tài liệu `customer-experiences.md` cũ chỉ tập trung vào 3 bộ công cụ cấu hình kỹ thuật, hoàn toàn bỏ sót hành trình mua sắm linh kiện rời tiêu chuẩn (Standard Individual Purchase Journey).
3. **Chưa có đặc tả quy trình chuẩn hóa**: Thư mục `docs/business/workflows/` chưa tồn tại. Thiếu hoàn toàn các kịch bản luồng chính, luồng nhánh, luồng ngoại lệ và biểu đồ tuần tự cho các nghiệp vụ sống còn: Khám phá sản phẩm, Trang chi tiết PDP, Giỏ hàng và Thanh toán.
4. **Trộn lẫn các chiều trạng thái đơn hàng**: Các trạng thái thanh toán, hoàn tất kho và giao dịch giữ hàng chưa được tách bạch độc lập.
5. **Thiếu hệ thống mã định danh quy tắc và truy xuất nguồn gốc**: Chưa có bảng quy tắc nghiệp vụ tập trung (`BR-xxx`) và danh mục yêu cầu chức năng có tiêu chí nghiệm thu kiểm thử được (`FR-xxx`).

---

## 2. Danh Mục Các Tài Liệu Tạo Mới (Documents Created)

Đội ngũ BA & Architect đã xây dựng mới hoàn toàn **9 tài liệu nghiệp vụ chuyên sâu**, tuân thủ nghiêm ngặt định dạng chuẩn:

| STT | Đường dẫn tài liệu                                                                                 | Mã tài liệu               | Mục đích và nội dung cốt lõi                                                                                                                                                                 |
| :-: | :------------------------------------------------------------------------------------------------- | :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  1  | [docs/business/business-overview.md](./business-overview.md)                                       | `DOC-BIZ-OVERVIEW`        | Bức tranh tổng quan toàn diện về mục tiêu doanh nghiệp, mô hình bán lẻ Model A, 5 nhóm khách hàng mục tiêu, 8 ngành hàng, 4 trải nghiệm mua sắm, mô hình doanh thu và ranh giới hệ thống.    |
|  2  | [docs/business/actors-and-roles.md](./actors-and-roles.md)                                         | `DOC-BIZ-ACTORS`          | Đặc tả chi tiết 5 nhóm tác nhân nghiệp vụ (Guest, Customer, Staff, Admin, System), trách nhiệm, quyền hạn mức nghiệp vụ, hạn chế phân quyền và ma trận phân quyền.                           |
|  3  | [docs/business/workflows/product-discovery-workflow.md](./workflows/product-discovery-workflow.md) | `WF-DISC-01`              | Đặc tả quy trình khám phá sản phẩm, tìm kiếm, gợi ý tự động, bộ lọc kỹ thuật theo ngữ cảnh và quy tắc hiển thị hàng hết kho theo mẫu 14 mục chuẩn.                                           |
|  4  | [docs/business/workflows/product-detail-workflow.md](./workflows/product-detail-workflow.md)       | `WF-PDP-01`               | Đặc tả quy trình xem chi tiết sản phẩm, chọn biến thể hàng mới, chọn đơn vị Serial hàng cũ kèm xem ảnh thật vết xước và biên bản stress test FurMark/Prime95.                                |
|  5  | [docs/business/workflows/cart-management-workflow.md](./workflows/cart-management-workflow.md)     | `WF-CART-01`              | Đặc tả quy trình quản lý 3 nhóm mục giỏ hàng, tái thẩm định giá hiện thời, thuật toán gộp giỏ hàng an toàn khi đăng nhập (Cart Merge) và chốt chặn kiểm soát xác thực.                       |
|  6  | [docs/business/workflows/checkout-payment-workflow.md](./workflows/checkout-payment-workflow.md)   | `WF-CHK-01`               | Đặc tả quy trình đặt hàng, tái thẩm định tồn kho, khóa giữ chỗ có thời hạn (15-30 phút), cổng thanh toán trực tuyến, xác thực chữ ký số Webhook từ máy chủ và kiểm soát rủi ro COD.          |
|  7  | [docs/business/order-lifecycle.md](./order-lifecycle.md)                                           | `DOC-BIZ-ORDER-LIFECYCLE` | Đặc tả vòng đời đơn hàng tách bạch 4 chiều trạng thái độc lập (`OrderStatus`, `PaymentStatus`, `FulfillmentStatus`, `ReservationStatus`), ma trận chuyển đổi và kiến trúc bản chụp bất biến. |
|  8  | [docs/business/business-rules-catalog.md](./business-rules-catalog.md)                             | `DOC-BIZ-RULES`           | Danh mục tập trung toàn bộ các quy tắc nghiệp vụ với mã ổn định (`BR-AUTH`, `BR-PRODUCT`, `BR-INVENTORY`, `BR-DISC`, `BR-PDP`, `BR-CART`, `BR-CHECKOUT`, `BR-PAYMENT`, `BR-ORDER`).          |
|  9  | [docs/business/functional-requirements.md](./functional-requirements.md)                           | `DOC-BIZ-FUNC-REQ`        | Danh mục yêu cầu chức năng (`FR-xxx`) phân theo phân hệ, gắn liền với tiêu chí nghiệm thu kiểm thử được và ma trận truy xuất nguồn gốc (Traceability Matrix).                                |
| 10  | [docs/business/glossary.md](./glossary.md)                                                         | `DOC-BIZ-GLOSSARY`        | Từ điển chuẩn hóa 26 thuật ngữ nghiệp vụ cốt lõi song ngữ Việt - Anh, đồng nhất ý nghĩa trên toàn hệ thống.                                                                                  |
| 11  | [docs/business/scope-and-roadmap.md](./scope-and-roadmap.md)                                       | `DOC-BIZ-ROADMAP`         | Lộ trình phát triển 4 giai đoạn, phân định ranh giới giữa Baseline, MVP, Tính năng nâng cao, Phạm vi AI tương lai và các yếu tố loại trừ tuyệt đối.                                          |

---

## 3. Danh Mục Các Tài Liệu Cập Nhật (Documents Updated)

Nâng cấp và Việt hóa toàn diện **5 tài liệu nền tảng hiện có** để đạt chuẩn chuyên sâu:

| STT | Đường dẫn tài liệu                                                                     | Mã tài liệu                  | Nội dung cải tiến và chuẩn hóa                                                                                                                                                                                       |
| :-: | :------------------------------------------------------------------------------------- | :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  1  | [docs/business/business-model.md](./business-model.md)                                 | `DOC-BIZ-MODEL`              | Chuyển dịch sang tiếng Việt hoàn chỉnh, bổ sung biểu đồ Mermaid phân tích chuyên sâu lợi thế của Retailer-Owned Inventory đối với phần cứng PC và lý do loại trừ tuyệt đối Marketplace.                              |
|  2  | [docs/business/product-catalog.md](./product-catalog.md)                               | `DOC-BIZ-CATALOG`            | Nâng cấp cấu trúc phân tầng 3 cấp (Catalog Product Model -> Variant -> Physical Stock Unit), phân tích chi tiết thuộc tính kỹ thuật của 8 ngành hàng và mô hình thuộc tính mở rộng JSON.                             |
|  3  | [docs/business/product-condition-and-warranty.md](./product-condition-and-warranty.md) | `DOC-BIZ-CONDITION-WARRANTY` | Chuẩn hóa bảng phân cấp 4 tình trạng (`NEW`, `LIKE_NEW`, `GOOD`, `FAIR`), đặc tả quy trình kiểm định 5 bước phòng Lab (FurMark, Prime95, MemTest86), chính sách bảo hành 1-1 trong 15 ngày và tiền tệ VNĐ nguyên số. |
|  4  | [docs/business/customer-experiences.md](./customer-experiences.md)                     | `DOC-BIZ-EXPERIENCES`        | Bổ sung đầy đủ hành trình Mua lẻ tiêu chuẩn (Trải nghiệm 1), chi tiết hóa quy tắc kiểm tra của Động cơ tương thích PC Builder, Setup Builder và Bàn phím cơ Customizer.                                              |
|  5  | [docs/business/domain-model.md](./domain-model.md)                                     | `DOC-BIZ-DOMAIN`             | Phân rã hệ thống thành 10 Ngữ cảnh Giới hạn (Bounded Contexts) chuẩn Domain-Driven Design và ánh xạ tương ứng vào kiến trúc Modular Monolith NestJS.                                                                 |

---

## 4. Các Quy Tắc Nghiệp Vụ Quan Trọng Được Hợp Nhất (Consolidated Business Rules)

Toàn bộ các quy tắc nghiệp vụ đã được mã hóa bằng mã ổn định và phân loại trạng thái minh bạch:

### 4.1 Các Quyết Định Nghiệp Vụ Cố Định (CONFIRMED Decisions - Bất Biến)

- **`BR-AUTH-01`**: Khách vãng lai có toàn quyền tra cứu, tìm kiếm, lọc, xem biên bản kiểm định hàng cũ, dùng 3 bộ Builder và thêm hàng vào giỏ hàng cục bộ trên trình duyệt.
- **`BR-AUTH-02`**: **TẮT HOÀN TOÀN GUEST CHECKOUT**. Mọi thao tác Thanh toán bắt buộc phải đăng nhập tài khoản Khách hàng hợp lệ.
- **`BR-PRODUCT-01`**: Chỉ sản phẩm có trạng thái xuất bản `PUBLISHED` mới hiển thị ra ngoài website công khai.
- **`BR-PRODUCT-02`**: Sản phẩm hết hàng (`OUT_OF_STOCK`) vẫn được hiển thị trên danh mục và trang PDP để tối ưu SEO và tham khảo cấu hình, nhưng bắt buộc gắn nhãn "Tạm Hết Hàng" và vô hiệu hóa nút mua.
- **`BR-PRODUCT-03`**: Mọi giá trị tài chính, đơn giá, phụ phí và hóa đơn đều phải là **số nguyên Đồng Việt Nam (VNĐ)**. Không sử dụng số thập phân hoặc đơn vị cents.
- **`BR-INVENTORY-01`**: Đơn vị hàng cũ (`Used Stock Unit`) là duy nhất và không thể thay thế (Non-interchangeable). Mỗi đơn vị có số Serial vật lý riêng, ảnh chụp vết trầy xước riêng, biên bản test riêng và **số lượng mua cố định tuyệt đối = 1**.
- **`BR-INVENTORY-02`**: **THÊM VÀO GIỎ HÀNG KHÔNG GIỮ CHỖ TỒN KHO**. Tồn kho chỉ được giữ chỗ có thời hạn tại thời điểm khách hàng khởi tạo phiên Checkout.
- **`BR-CART-01`**: **THÊM VÀO GIỎ HÀNG KHÔNG KHÓA GIÁ**. Giỏ hàng luôn hiển thị giá niêm yết hiện thời và phát cảnh báo nếu giá tăng hoặc giảm so với lúc thêm vào giỏ.
- **`BR-CART-02`**: Giỏ hàng hỗ trợ đầy đủ 3 nhóm mục: Hàng mới tiêu chuẩn, Đơn vị hàng cũ (Qty = 1), và Bộ cấu hình nhóm.
- **`BR-CART-03`**: Khách hàng không được xóa lẻ linh kiện của Bộ cấu hình ngay tại giỏ hàng; bắt buộc phải bấm "Sửa trong Builder" để Động cơ tương thích kiểm tra lại.
- **`BR-CART-04`**: Quá trình Gộp giỏ hàng (Cart Merge) chỉ được phép xóa `localStorage` của khách sau khi máy chủ đã ghi dữ liệu giỏ hàng thành công vào cơ sở dữ liệu.
- **`BR-CART-05`**: Không bao giờ tự ý thay thế linh kiện bị hết hàng trong bộ PC. Bắt buộc người dùng phải tự vào Builder chọn linh kiện thay thế.
- **`BR-CHECKOUT-01`**: Giá bán toàn bộ đơn hàng bắt buộc phải được tái thẩm định từ cơ sở dữ liệu ngay khi mở màn hình Checkout.
- **`BR-PAYMENT-01`**: **TUYỆT ĐỐI KHÔNG TIN CẬY REDIRECT CỦA TRÌNH DUYỆT**. Kết quả thanh toán trực tuyến chỉ được công nhận thông qua Webhook máy chủ - máy chủ có chữ ký số HMAC SHA512 hợp lệ và số tiền khớp 100%.
- **`BR-PAYMENT-02`**: Xử lý Webhook thanh toán phải đảm bảo tính bất biến (Idempotent), ghi nhận mã giao dịch duy nhất để chống trừ kho hoặc cộng tiền hai lần.
- **`BR-ORDER-01`**: Tạo bản chụp bất biến (Immutable Order Snapshot) cố định thông tin sản phẩm, giá bán và số serial tại thời điểm mua, bảo vệ đơn hàng không bị ảnh hưởng bởi các thay đổi trên catalog sau này.
- **`BR-ORDER-02`**: Nhân viên kho/kỹ thuật bắt buộc phải quét số Serial vật lý thực tế của từng linh kiện khi xuất kho để kích hoạt bảo hành điện tử chính xác.

---

## 5. Các Quy Trình Nghiệp Vụ Hoàn Thiện Theo Mẫu 14 Mục Chuẩn (Workflows Completed)

Bốn quy trình nghiệp vụ cốt lõi đã được xây dựng hoàn chỉnh trong thư mục `docs/business/workflows/`, mỗi quy trình tuân thủ cấu trúc 14 mục chuẩn kèm biểu đồ Mermaid minh họa:

1. **`WF-DISC-01`: Quy Trình Khám Phá Sản Phẩm, Tìm Kiếm & Lọc Danh Mục**:
   - Bao phủ điều hướng danh mục, thanh tìm kiếm gợi ý tức thời, bộ lọc kỹ thuật theo ngữ cảnh danh mục, lọc phân tầng Mới/Cũ, xử lý sản phẩm hết hàng và giao diện khi không tìm thấy kết quả.
2. **`WF-PDP-01`: Quy Trình Chi Tiết Sản Phẩm, Chọn Biến Thể & Đơn Vị Hàng Cũ**:
   - Bao phủ hiển thị thông số kỹ thuật, chuyển đổi linh hoạt tab Hàng Mới vs Hàng Cũ, hiển thị ảnh chụp thật vết xước của từng số Serial, biên bản stress test FurMark/Prime95, khóa cứng số lượng = 1 và các nút chuyển đổi (Thêm giỏ, Mua ngay, Đưa vào PC Builder, Đưa vào Setup, Custom Bàn phím).
3. **`WF-CART-01`: Quy Trình Quản Lý Giỏ Hàng & Gộp Giỏ Hàng An Toàn**:
   - Bao phủ quản lý 3 nhóm mục giỏ hàng, hiển thị giá thị trường hiện thời, cảnh báo biến động giá, thuật toán gộp giỏ hàng Guest-to-Customer đảm bảo an toàn dữ liệu, và chốt chặn xác thực tại cửa ngõ thanh toán.
4. **`WF-CHK-01`: Quy Trình Đặt Hàng, Giữ Chỗ Tồn Kho & Thanh Toán**:
   - Bao phủ tái thẩm định giá và tồn kho, khóa giữ chỗ tồn kho (Reservation 15-30 phút), tính phí giao hàng, áp mã giảm giá, xác thực chữ ký số HMAC cổng thanh toán, xử lý Webhook ngầm bất biến và kiểm soát điều kiện rủi ro của thanh toán COD.

---

## 6. Yêu Cầu Chức Năng & Tiêu Chí Nghiệm Thu Được Bổ Sung (Requirements Added)

Toàn bộ **25 yêu cầu chức năng (`FR-xxx`)** đã được đặc tả chi tiết trong tài liệu [functional-requirements.md](./functional-requirements.md), phân chia theo 8 phân hệ chính:

- **`FR-AUTH-01` đến `FR-AUTH-03`**: Xác thực tài khoản, Chặn Guest Checkout, Quản lý sổ địa chỉ.
- **`FR-CAT-01` đến `FR-CAT-04`**: Quản lý danh mục, Lọc thuộc tính kỹ thuật, Lọc hàng cũ, Hiển thị hàng hết tồn kho.
- **`FR-EXP-01` đến `FR-EXP-04`**: Bốn trải nghiệm mua sắm cốt lõi (Mua lẻ, PC Builder, Setup Builder, Bàn phím Customizer).
- **`FR-CART-01` đến `FR-CART-05`**: Giỏ hàng Guest, Giỏ hàng Customer, Gộp giỏ an toàn, Cập nhật giá hiện thời, Quản lý bộ cấu hình nhóm.
- **`FR-CHK-01` đến `FR-CHK-05`**: Tái thẩm định giá, Giữ chỗ kho có thời hạn, Tích hợp cổng trực tuyến, Xử lý Webhook an toàn, Thanh toán COD có kiểm soát.
- **`FR-ORD-01` đến `FR-ORD-04`**: Bản chụp đơn hàng bất biến, Quét Serial kích hoạt bảo hành, Tra cứu tiến độ giao hàng, Tự động hủy đơn hoàn trả kho.
- **`FR-INV-01` đến `FR-INV-02`**: Nhập kho hàng mới theo lô FIFO, Đăng kiểm hàng cũ kèm biên bản kỹ thuật số.

Mỗi yêu cầu chức năng đều đi kèm các **Tiêu chí nghiệm thu (Acceptance Criteria - AC)** có thể kiểm thử tự động hoặc kiểm thử thủ công rõ ràng.

---

## 7. Danh Mục Các Quyết Định Nghiệp Vụ Đang Mở / Đề Xuất (Open Decisions Register)

Bảng tổng hợp các vấn đề nghiệp vụ được phân tích đa chiều và gắn nhãn **`PROPOSED`**, sẵn sàng chờ Quản lý dự án / Khách hàng phê duyệt:

| Mã quyết định     | Nội dung chính sách nghiệp vụ                   | Đề xuất khuyến nghị ban đầu                                                                                                                                                                  | Lý do đề xuất & Tác động kiến trúc                                                                                                         | Trạng thái |
| :---------------- | :---------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- | :--------: |
| **`DEC-PAY-01`**  | **Lựa chọn cổng thanh toán trực tuyến đối tác** | Tích hợp trực tiếp **VNPAY** (Cổng nội địa/QR) và **VietQR Động** trong giai đoạn đầu.                                                                                                       | Phổ biến nhất tại Việt Nam, phí giao dịch cạnh tranh, người dùng quen thuộc, giảm độ trễ qua cổng trung gian.                              | `PROPOSED` |
| **`DEC-PAY-02`**  | **Chính sách kiểm soát thanh toán COD**         | Cho phép COD với đơn hàng linh kiện **dưới 10.000.000 VNĐ**; **CẤM COD** đối với dàn máy PC đã ráp hoàn chỉnh (buộc thanh toán trước hoặc đặt cọc tối thiểu 10%).                            | Tránh nguy cơ bị bom hàng đối với các dàn máy PC đã bóc seal linh kiện để lắp ráp, bảo vệ dòng tiền cửa hàng.                              | `PROPOSED` |
| **`DEC-RES-01`**  | **Thời hạn giữ chỗ tồn kho (Reservation TTL)**  | **15 phút** cho phiên thanh toán qua thẻ/ví điện tử; **30 phút** cho phiên chuyển khoản ngân hàng VietQR.                                                                                    | Đủ thời gian để người dùng lớn tuổi thao tác mở app ngân hàng quét mã, nhưng không giam giữ hàng cũ quá lâu làm mất cơ hội của khách khác. | `PROPOSED` |
| **`DEC-SHIP-01`** | **Tính phí vận chuyển hàng hóa**                | Giai đoạn 1: Biểu phí bậc thang (Nội thành: 30k, Liên tỉnh: 50k, Miễn phí đơn trên 5tr). Giai đoạn 2: Tích hợp API GHTK/Viettel Post.                                                        | Đơn giản hóa triển khai MVP mà vẫn bảo vệ biên lợi nhuận trước các mặt hàng cồng kềnh (vỏ case, ghế công thái học).                        | `PROPOSED` |
| **`DEC-ORD-01`**  | **Chính sách tự hủy đơn hàng từ phía khách**    | Cho phép khách tự bấm hủy đơn trên website khi đơn đang ở trạng thái `PENDING_PAYMENT` hoặc `PENDING_CONFIRMATION`. Khi đơn đã sang `PROCESSING` (kho đang đóng gói), buộc liên hệ tổng đài. | Giảm tỷ lệ giao hàng ảo, tự động giải phóng tồn kho nhanh chóng cho hệ thống.                                                              | `PROPOSED` |
| **`DEC-RET-01`**  | **Chính sách đổi trả & hoàn tiền**              | Hàng cũ: 1 đổi 1 trong 15 ngày đầu nếu có lỗi phần cứng. Hàng mới: Đổi trả trong 7 ngày nếu còn nguyên niêm phong nhà máy (nguyên seal 100%).                                                | Xây dựng niềm tin vượt trội cho khách mua hàng cũ, bảo vệ sản phẩm mới tránh bị tráo đổi linh kiện.                                        | `PROPOSED` |
| **`DEC-CART-01`** | **Thời hạn lưu giữ Giỏ hàng Khách vãng lai**    | Lưu trữ trên `localStorage` vô thời hạn cho tới khi khách chủ động xóa dữ liệu duyệt web hoặc bấm "Xóa toàn bộ giỏ".                                                                         | Tối ưu tỷ lệ chuyển đổi, khách quay lại sau vài tuần vẫn thấy cấu hình PC mình đã chọn.                                                    | `PROPOSED` |
| **`DEC-CART-02`** | **Số lượng giỏ hàng tối đa của Khách hàng**     | Mỗi tài khoản sở hữu **DUY NHẤT 1 Giỏ hàng Đang Hoạt Động (Active Cart)**.                                                                                                                   | Đơn giản hóa kiến trúc cơ sở dữ liệu, tránh phân mảnh đơn hàng; tính năng Wishlist sẽ được mở ở Phase 2.                                   | `PROPOSED` |

---

## 8. Các Giới Hạn Đã Biết & Giả Định Nghiệp Vụ (Known Limitations & Assumptions)

1. **Giả định thị trường mục tiêu**: Toàn bộ quy trình nghiệp vụ và chính sách thanh toán/vận chuyển được thiết kế tối ưu hóa cho thị trường nội địa **Việt Nam**. Đơn vị tiền tệ duy nhất là **Đồng Việt Nam (VNĐ)**.
2. **Quy mô tồn kho đơn vị hàng cũ**: Giả định số lượng Đơn vị hàng cũ (Stock Units) hoạt động đồng thời trên mỗi mẫu sản phẩm dao động từ 1 đến 50 đơn vị. Nếu quy mô tăng lên hàng nghìn đơn vị cùng lúc, giao diện chọn Serial trên trang PDP cần bổ sung tính năng phân trang và tìm kiếm theo khoảng giá riêng.
3. **Phạm vi Trợ lý Mua sắm AI (AI Shopping Assistant)**: Được ghi nhận rõ ràng là **Phạm vi tương lai (Future Scope)**. Toàn bộ tài liệu nghiệp vụ Baseline không đưa AI vào luồng bắt buộc của MVP, bảo đảm không làm chậm tiến độ triển khai kỹ thuật cốt lõi.

---

## 9. Kết Quả Kiểm Tra Tính Nhất Quán & Định Dạng (Consistency Validation Results)

1. **Kiểm tra liên kết chéo (Cross-Reference Validation)**: 100% các liên kết tương đối (`./workflows/...`, `./actors-and-roles.md`, v.v.) giữa các tài liệu Markdown đã được rà soát và hoạt động chính xác.
2. **Kiểm tra định dạng mã nguồn & phong cách (Code Style Check)**: Lệnh `pnpm format:check` đã chạy thành công trên toàn bộ 16 tệp tài liệu nghiệp vụ với kết quả: **`All matched files use Prettier code style!`**.
3. **Tính toàn vẹn mã nguồn ứng dụng (Zero Application Code Mutation)**: Quá trình hoàn thiện Baseline tài liệu hoàn toàn **KHÔNG CHỈNH SỬA, KHÔNG XÓA VÀ KHÔNG TẠO MỚI** bất kỳ tệp mã nguồn ứng dụng nào trong `apps/api`, `apps/web`, không tạo bảng CSDL Prisma và không cài thêm thư viện runtime mới, tuân thủ tuyệt đối quy định "Documentation Only".

---

## 10. Khuyến Nghị Cho Giai Đoạn Tiếp Theo (Recommended Next Phase)

Sau khi bộ **Tài Liệu Nghiệp Vụ Baseline (Business Documentation Baseline)** này được Người dùng / Lãnh đạo dự án xem xét và phê duyệt chính thức:

1. **Khuyến nghị KHÔNG BẮT ĐẦU code hoặc migrate CSDL ngay lập tức**.
2. **Giai đoạn kế tiếp được khuyến nghị**: **Giai Đoạn Phân Tích Kỹ Thuật & Thiết Kế Kiến Trúc Dữ Liệu (Technical Design & Database Modeling Phase)**:
   - Thiết kế lược đồ thực thể quan hệ cơ sở dữ liệu (ERD) trên PostgreSQL 16 chi tiết hóa 3 tầng Catalog - Variant - Serialized Stock Unit.
   - Định nghĩa lược đồ Prisma Schema (`schema.prisma`) phản ánh đúng các quy tắc khóa Serial, giỏ hàng đa tầng và bản chụp đơn hàng bất biến.
   - Thiết kế hợp đồng API chuẩn OpenAPI / Swagger cho các phân hệ Catalog, Builder, Cart và Checkout.
   - Thiết kế cơ chế khóa phân tán Redis (Distributed Lock) phục vụ giữ chỗ tồn kho chống xung đột đơn hàng.

---

## KẾT LUẬN & ĐÁNH GIÁ MỨC ĐỘ SẴN SÀNG

> [!IMPORTANT]
> **XÁC NHẬN TỪ ĐỘI NGŨ KIẾN TRÚC SƯ & BA**:
> Toàn bộ bộ tài liệu nghiệp vụ nền tảng (**NovaStore Business Documentation Baseline**) đã được hoàn thành 100% bằng Tiếng Việt (bảo tồn thuật ngữ kỹ thuật quốc tế), đầy đủ, nhất quán, có tính truy xuất nguồn gốc cao và **ĐÃ HOÀN TOÀN SẴN SÀNG ĐỂ CON NGƯỜI (HUMAN REVIEWER) XEM XÉT VÀ PHÊ DUYỆT**.
