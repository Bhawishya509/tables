import { SearchOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, Space, Table, Badge } from "antd";
import { useRef, useState, useEffect } from "react";
import Update from "../delete_update/Update";
import Highlighter from "react-highlight-words";
import "./table.css";
import Forms from "../Forms/Forms";
import { useSelector,useDispatch } from "react-redux"
import Delete from "../delete_update/Delete";
import { true_value,value_index_delete } from '../../features/counter/counterSlice'

const TablesBlock = () => {
  const selector = useDispatch();
  const db = useSelector((state) => state.counter.value);
  const checking = useSelector((state) => state.counter.value2)
  const updatechecking=useSelector((state) => state.counter.update_check)
  const [flag,setFlag]=useState(false)
  
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
  
      console.log(selectedRows)
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      if (selectedRows.length) {
        selector(value_index_delete(selectedRowKeys))
        selector(true_value())
      }
      
      
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };



  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#82ff69",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  })

  const columns = [
    {
      title: "Timestamp",
      dataIndex: "Timestamp",
      key: "age",
      width: "15%",
      ...getColumnSearchProps("age"),
      sorter: (a, b) => a.age - b.age,
      sortAge: ["descend", "ascend"],
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "15%",
      ...getColumnSearchProps("title"),
      sorter: (a, b) => {
        return a.title.localeCompare(b.tile);
      },
      sortName: ["descend", "ascend"],
    },

    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      width: "20%",

      ...getColumnSearchProps("Description"),
      sorter: (a, b) => {
        return a.Description.localeCompare(b.Description);
      },
      sortName: ["descend", "ascend"],
    },

    {
      title: "Due Date",
      dataIndex: "duedate",
      key: "duedate",
      width: "14%",
      ...getColumnSearchProps("duedate"),
      sorter: (a, b) => {
        return b - a;
      },
      sortName: ["descend", "ascend"],
    },

    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
      width: "13%",
      ...getColumnSearchProps("tag"),
      sorter: (a, b) => {
        return a.tag.localeCompare(b.tag);
      },
      sortName: ["descend", "ascend"],
    },

    {
      title: "Status",
      dataIndex: "statuss",
      key: "statuss",
      width: "13%",
      ...getColumnSearchProps("statuss"),
      sorter: (a, b) => {
        return a.statuss.localeCompare(b.statuss);
      },
      sortName: ["descend", "ascend"],
      render: () => <Badge status="success" text="Finished" />,
    },
  ];

  const clicked = () =>
  {
    setFlag(!flag)
  };
  useEffect(() => {}, []);
  return (
    <>
      {flag && <Forms />}
      {checking && <Delete />}
      {updatechecking && <Update/>}
      <main className="mains">
        <section className="sections">
          <Button type="primary" className="btn" onClick={clicked}>
            Add Task
          </Button>
          <Table
            columns={columns}
            dataSource={db}
            rowSelection={{
              type: Checkbox,
              ...rowSelection,
            }}
            size="large"
            pagination={{
              pageSize: 9,
              position: "bottom",
            }}
            scroll={{
              y: 458,
            }}
          />
        </section>
      </main>
    </>
  );
};

export default TablesBlock;
