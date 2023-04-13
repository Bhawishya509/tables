import React, { useState ,useEffect} from 'react';
import { Modal, Input} from 'antd';
import { add_data } from "../../features/counter/counterSlice"
import { useDispatch,useSelector } from 'react-redux';
const Forms = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [set, update] = useState({
    title: "",
    Description: "",
    duedate: "",
    tag: "",
    statuss:""
  })
  const dispatch = useDispatch()
  const db = useSelector((state) => state.counter.value);

  const handleOk = (e) => {
    if (set.title && set.Description && set.title.length<=100 && set.Description.length<=1000) {
      let dy = new Date();
      
      let fin = dy.toLocaleDateString() + " " + dy.toLocaleTimeString();
      set["Timestamp"] = fin;
      set['key'] = db.length + 1;
      dispatch(add_data(set))
      setIsModalOpen(false);
    }

  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (e) =>
  {
    const { name, value } = e.target;
    update((old_data) =>
    {
      return ({...old_data,[name]:value})
    })
  }

  useEffect(() =>
  {

  },[])
  return (
    <>
      <form>
     
      <Modal title="Form Data" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input placeholder="Enter Title" name="title" allowClear onChange={onChange} value={set.title} required  />
        <br /><br />
        <Input name="Description" placeholder="Enter Description" allowClear onChange={onChange} value={set.dec} required />
        <br /><br />
        <Input name="duedate" placeholder="Enter Due Date" allowClear onChange={onChange} value={set.date} />
        <br /><br />
        <Input name="tag" placeholder="Enter Tag" allowClear onChange={onChange} value={set.tag} />
        <br /><br />
        <Input name="statuss" placeholder="Enter Status" allowClear onChange={onChange} value={set.sat} />
        </Modal>
       
        </form>
    </>
  );
};

export default Forms;