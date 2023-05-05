
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Switch} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import client from "../../../../api/api";

const AdminPanel = () => {
  const [categories, setCategories] = useState([]);
  const [clientCategories, setClientCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [visible, setVisible] = useState(true);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedCategoryName, setEditedCategoryName] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await client.get("categories");
      if (response.data.length) {
        setCategories(response.data);
        setClientCategories(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCategory = () => {
    const newCategory = { name: categoryName, visible: true };
    client.post("categories", newCategory)
      .then(response => {
        setCategories([...categories, response.data]);
        setClientCategories([...clientCategories, response.data]);
        setCategoryName("");
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDeleteCategory = (id) => {
    client.delete(`categories/${id}`)
      .then(response => {
        const newCategories = categories.filter((category) => category.id !== id);
        setCategories(newCategories);
        const newClientCategories = clientCategories.filter((category) => category.id !== id);
        setClientCategories(newClientCategories);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleToggleVisibility = (id) => {
    const category = categories.find((category) => category.id === id);
    if (!category) {
      console.error(`Category with id ${id} not found`);
      return;
    }
    const updatedCategory = { ...category, visible: !category.visible };
    client.put(`categories/${id}`, updatedCategory)
      .then(response => {
        const newCategories = categories.map((category) =>
          category.id === id ? updatedCategory : category
        );
        setCategories(newCategories);
        const newClientCategories = clientCategories.map((category) =>
          category.id === id ? updatedCategory : category
        );
        setClientCategories(newClientCategories);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleToggleAllVisibility = () => {
    const updatedCategories = categories.map((category) => {
      return { ...category, visible: !visible };
    });
    setCategories(updatedCategories);
    setClientCategories(updatedCategories);
    setVisible(!visible);
  };

  const handleEditCategory = () => {
    const updatedCategory = { ...editingCategory, name: editedCategoryName };
    client.put(`categories/${editingCategory.id}`, updatedCategory)
      .then(response => {
        const newCategories = categories.map((category) =>
          category.id === editingCategory.id ? updatedCategory : category
        );
        setCategories(newCategories);
        const newClientCategories = clientCategories.map((category) =>
          category.id === editingCategory.id ? updatedCategory : category
        );
        setClientCategories(newClientCategories);
        setEditingCategory(null);
        setEditedCategoryName("");
        setEditModalVisible(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Visible",
      dataIndex: "visible",
      key: "visible",
      render: (visible, record) => (
        <Switch
          checked={visible}
          onChange={() => handleToggleVisibility(record.id)}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDeleteCategory(record.id)}>Delete</Button>
        </div>
      ),
    },
  ];

  const handleEdit = (record) => {
    setEditingCategory(record);
    setEditedCategoryName(record.name);
    setEditModalVisible(true);
  };

  const handleCancel = () => {
    setEditingCategory(null);
    setEditedCategoryName("");
    setEditModalVisible(false);
  };

  return (
    <div>
      <h1>Categories</h1>
      <div>
        <Input
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <Button type="primary" onClick={handleAddCategory} icon={<PlusOutlined />}>
          Add
        </Button>
        <Button onClick={handleToggleAllVisibility}>
          {visible ? 'Hide All' : 'Show All'}
        </Button>
      </div>
      <Table dataSource={clientCategories.filter((category) => category.visible)} columns={columns} />
      <Modal
        title="Edit Category"
        visible={editModalVisible}
        onOk={handleEditCategory}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="Name">
            <Input
              value={editedCategoryName}
              onChange={(e) => setEditedCategoryName(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminPanel;
