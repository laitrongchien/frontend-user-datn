import Image from "next/image";

const Policy = () => {
  return (
    <div>
      <div
        className="relative bg-center bg-cover w-full h-[calc(100vh-66px)] p-6 flex flex-col justify-center"
        style={{
          backgroundImage: `url("https://rentabikevn.com/wp-content/uploads/2023/11/our-guide-looking-good-scaled-1-2048x1152.jpg")`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <h1 className="font-sans font-extrabold text-5xl text-white z-10">
          CHÍNH SÁCH
        </h1>
      </div>
      <div className="px-20 py-10">
        <div>
          <span className="font-semibold text-[20px]">Thủ tục thuê xe</span>
          <Image
            src="/contract.jpg"
            alt="contract"
            width={450}
            height={600}
            className="h-[600px] object-cover w-[450px] mt-4"
          />
          <p className="mt-2">Các bước làm thủ thuê xe như sau:</p>
          <ul>
            <li className="mt-2">
              <strong>1</strong>- Khách thuê xe phải là người trong độ tuổi được
              phép lái xe và có Giấy phép lái xe được cấp bởi cơ quan nhà nước
              có thẩm quyền.
            </li>
            <li className="mt-2">
              <p>
                <strong>2</strong>- lại các giấy tờ sau trong các giấy tờ sau:
              </p>
              <p className="mt-2">
                Đối với khách du lịch đi bằng máy bay vui lòng để lại{" "}
                <strong>CMND, thẻ Căn cước Công dân</strong> hoặc{" "}
                <strong>Hộ chiếu</strong> kèm với thông tin chuyến bay đến và
                rời.
              </p>
              <p className="mt-2">
                Với khách là người địa phương hoặc từ nơi khác đến không có vé
                máy bay, thủ tục yêu cầu là để lại{" "}
                <strong>CMND, thẻ Căn cước Công dân</strong> hoặc{" "}
                <strong>Hộ chiếu</strong> kèm <strong>Sổ hộ khẩu</strong> (nếu
                không có sổ hộ khẩu sẽ thay thế bằng tiền đặt cọc{" "}
                <strong>3 triệu đồng</strong>i với xe số và tiền đặt cọc{" "}
                <strong>5 triệu đồng</strong> đối với xe tay ga - số tiền này
                chúng tôi sẽ hoàn trả lại sau khi khách hàng hoàn tất trả xe)
              </p>
            </li>
            <li className="mt-2">
              <strong>3</strong>- Đồng ý các điều khoản và ký vào hợp đồng thuê
              xe giữa 2 bên.
            </li>
            <li className="mt-2">
              <strong>4</strong>- Nhận xe.
            </li>
          </ul>
        </div>
        <div className="mt-8">
          <span className="font-semibold text-[20px]">
            Trách nhiệm bên cho thuê
          </span>
          <p className="mt-2">
            Nhằm đảm bảo quyền lợi cho người thuê xe,{" "}
            <strong>motortour.vn</strong> luôn bàn giao đầy đủ giấy tờ pháp lý
            cho khách hàng bao gồm: Hợp đồng thuê xe máy đóng dấu đỏ kí với công
            ty chủ quản, giấy tờ xe photo công chứng hoặc đóng dấu công ty, bảo
            hiểm xe máy còn hiệu lực. Xe khi bàn giao cho khách đều đã điểm kiểm
            tra kĩ càng, đảm bảo tình trạng vận hành hoàn hảo, lốp(vỏ) - má
            phanh (bố thắng) - nhông xích (nhông sên đĩa) mới. Khi thuê xe máy
            sẽ có sẵn 1 lít xăng, dầu (nhớt) đảm bảo theo hợp đồng thuê xe của
            khách hàng (thuê đi trong thành phố hoặc đi tỉnh).
          </p>
        </div>
        <div className="mt-8">
          <span className="font-semibold text-[20px]">
            Trách nhiệm bên thuê
          </span>
          <ul className="mt-2 list-disc ml-5">
            <li className="mb-2">
              Người thuê xe sẽ phải tự đổ nhiên liệu cho xe để di chuyển.
            </li>
            <li className="mb-2">
              Kiểm tra kỹ xe trước khi nhận và tự đổ nhiên liệu để lưu thông xe
              trên đường.
            </li>
            <li className="mb-2">
              Không được bóc hay làm rách tem bảo hành và đảm bảo sửa chữa, thay
              thế bất cứ chi tiết nào.
            </li>
            <li className="mb-2">
              Các ngày xe nghỉ không chạy được do lỗi của bên thuê, thì bạn vẫn
              phải trả tiền cho các ngày đó như đang thuê xe để sử dụng.
            </li>
            <li className="mb-2">
              Các vết xước, bẹp nhẹ không phải thay đồ mới thì người thuê phải
              bồi thường cho cho thuê số tiền theo báo giá thị trường.
            </li>
            <li className="mb-2">
              Trường hợp người thuê xe vi phạm an toàn giao thông dẫn tới xe bị
              giữ thì người thuê xe phải có tránh nhiệm đóng toàn bộ tiền các
              lỗi vi phạm và thời gian giữ xe vẫn tính là ngày cho thuê xe. Mọi
              chi phí đi lại, ăn ở, vvv…của bên cho thuê để giải quyết việc do
              bên thuê gây ra, bên thuê phải chịu hoàn toàn trách nhiệm chi trả.
            </li>
            <li className="mb-2">
              Trong thời gian thuê xe người thuê làm mất xe, gây tai nạn nghiêm
              trọng dẫn đến xe bị phá hủy hoàn toàn thì người thuê phải chịu
              trách nhiệm đền tiền, giá trị tương đương với giá trị xe được định
              giá tại thời điểm cho thuê xe.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Policy;
