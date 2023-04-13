import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutlined,PlusCircleOutlined} from '@ant-design/icons';
import {
  value_delete,
    false_value,
    checking_update,

} from "../../features/counter/counterSlice";
const Delete = () => {
  const dispatch = useDispatch();
    const check_index = Number(useSelector((state) => state.counter.value3))-1 ;
    console.log(check_index)
    const oriarray = useSelector((state) => state.counter.value);
    const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    dispatch(false_value());
    setIsModalOpen(false);
    };
    
    const del = (e) =>
    {
    
        let gg = [...oriarray]
       
        gg.splice(check_index, 1);
        dispatch(value_delete(gg))
        dispatch(false_value());
        setIsModalOpen(false);
    }

    const updates = () =>
    {
        dispatch(false_value());
        setIsModalOpen(false);
        dispatch(checking_update(true))
        
    }
  useEffect(() => {}, []);
  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
          >
        
        <Button type="primary" icon={<DeleteOutlined />} onClick={del}>
          Delete
              </Button>
              <br /><br />
              <Button type="primary" icon={<PlusCircleOutlined  />} onClick={updates}>
              Update
            </Button>
      </Modal>
    </>
  );
};

export default Delete;
