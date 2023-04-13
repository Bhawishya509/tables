import React, { useEffect, useState } from "react";
import { Modal, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { value_update,checking_update } from "../../features/counter/counterSlice";
const Update = () => {
  const dispatch = useDispatch();
  const check_index = Number(useSelector((state) => state.counter.value3)) - 1;
  const oriarray = useSelector((state) => state.counter.value);
  let ab = [...oriarray];
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [data, setdata] = useState(ab[check_index]);

  const handleOk = () => {
    ab[check_index] = data;
      dispatch(value_update(ab));
      dispatch(checking_update())
      setIsModalOpen(false);
      
  };

    const handleCancel = () => {
      
    setIsModalOpen(false);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setdata((old_data) => {
      return { ...old_data, [name]: value };
    });
  };
  useEffect(() => {}, []);
  return (
    <>
      <form>
        <Modal
          title="Update data"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Input value={data.Timestamp} disabled={true}  />
          <br />
          <br />
          <Input
            placeholder="Enter Title"
            name="title"
            allowClear
            onChange={onChange}
            value={data.title}
            required
          />
          <br />
          <br />
          <Input
            name="Description"
            placeholder="Enter Description"
            allowClear
            onChange={onChange}
            value={data.Description}
            required
          />
          <br />
          <br />
          <Input
            name="duedate"
            placeholder="Enter Due Date"
            allowClear
            onChange={onChange}
            value={data.duedate}
          />
          <br />
          <br />
          <Input
            name="tag"
            placeholder="Enter Tag"
            allowClear
            onChange={onChange}
            value={data.tag}
          />
          <br />
          <br />
          <Input
            name="statuss"
            placeholder="Enter Status"
            allowClear
            onChange={onChange}
            value={data.statuss}
          />
        </Modal>
      </form>
    </>
  );
};

export default Update;
