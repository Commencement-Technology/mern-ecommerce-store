import { Upload, Form, Input, Select, UploadProps, InputNumber } from "antd";
import MainLayout from "../../components/Layouts/MainLayout";
import { useCallback, useEffect, useState } from "react";
import { categoryService } from "../../services/categoryService";
import { ICategory, ProductData } from "../../types";
import { UploadFile } from "antd/es/upload/interface";
import { uploadImgService } from "../../services/uploadImageService";
import { productService } from "../../services/productService";
import Button from "../../components/Buttons/Button";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { handleApiStatusCode } from "../../services/utils";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [imagePath, setImagePath] = useState<string>("");
  const [editingProduct, setEditingProduct] = useState<boolean>(false);
  const [imageUploaded, setImageUploaded] = useState<boolean>(false);
  const [deletingProduct, setDeletingProduct] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [operation, setOperation] = useState<"update" | "delete" | null>(null);

  const fetchExistingProductData = useCallback(
    async (id: string) => {
      const res = await productService.getProductById(id);
      const { data, status } = handleApiStatusCode(res);
      if (status === 200) {
        form.setFieldsValue({
          product_name: data?.name,
          product_price: data?.price,
          product_brand: data?.brand,
          product_quantity: data?.quantity,
          product_count_in_stock: data?.countInStock,
          product_category: data?.category,
          product_description: data?.description,
        });
        setImagePath(data?.image);
        setFileList([
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: data?.image,
          },
        ]);
      } else if (status === 404) {
        console.error("Failed to fetch product data.");
      } else {
        console.error("Internal server error.");
      }
    },
    [form]
  );

  const fetchCategories = async () => {
    const res = await categoryService.getAllCategories();
    const { status, data } = res;
    if (status === 200) {
      setCategories(data);
    } else {
      console.log("Some error occurred while fetching the categories");
    }
  };

  useEffect(() => {
    if (id) {
      fetchExistingProductData(id);
    }
  }, [id, fetchExistingProductData]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleImageUpload: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList.slice(-1));
    const formData = new FormData();
    const file = newFileList[0]?.originFileObj;
    if (file && !imageUploaded) {
      setImageUploaded(true);
      formData.append("image", file);
      const res = await uploadImgService.uploadImage(formData);
      const { status, data } = res;
      if (status === 200) {
        setImagePath(data?.image);
      } else {
        console.error(res?.response?.data?.message || "Image upload failed");
      }
    }
  };

  const handleUpdateProduct = async (values: ProductData) => {
    const {
      product_name,
      product_brand,
      product_description,
      product_price,
      product_category,
      product_quantity,
      product_count_in_stock,
    } = values;
    const productData = new FormData();
    productData.append("image", imagePath);
    productData.append("name", product_name);
    productData.append("description", product_description);
    productData.append("price", product_price);
    productData.append("category", product_category);
    productData.append("quantity", product_quantity);
    productData.append("brand", product_brand);
    productData.append("countInStock", product_count_in_stock);
    if (id) {
      setEditingProduct(true);
      const res = await productService.updateProductDetails(productData, id);
      const { data, status } = handleApiStatusCode(res);
      if (status === 200) {
        setEditingProduct(false);
        setFileList([]);
        setImagePath("");
        toast.success(data?.message || "Product updated successfully");
        form.resetFields();
        navigate("/");
      } else {
        setEditingProduct(false);
        setFileList([]);
        setImagePath("");
        toast.error(data?.error || "Product updation failed");
      }
    }
  };

  const handleDeleteProduct = async () => {
    if (id) {
      setDeletingProduct(true);
      const res = await productService.deleteProduct(id);
      const { status } = handleApiStatusCode(res);
      if (status === 200) {
        setDeletingProduct(false);
        toast.success("Product deleted successfully");
        navigate("/admin/product-list");
      } else {
        setDeletingProduct(false);
        toast.error("Product deletion failed");
      }
    }
  };

  const handleFormSubmit = (values: any) => {
    if (operation === "update") {
      handleUpdateProduct(values);
    } else if (operation === "delete") {
      handleDeleteProduct();
    }
  };

  return (
    <MainLayout>
      <div className="bg-zinc-900 min-h-screen flex items-center lg:items-start justify-start flex-col">
        <div className="pt-20 lg:pt-12 lg:pl-20 w-2/3 lg:pr-12 pb-20">
          <h1 className="text-white font-medim text-xl pb-5">Update Product</h1>
          <Form.Item
            className="w-full"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Upload
              rootClassName="rm-upload-product-img"
              listType="picture-card"
              accept="image/png, image/jpeg"
              maxCount={1}
              fileList={fileList}
              onChange={handleImageUpload}
              showUploadList={{
                showPreviewIcon: false,
                showRemoveIcon: true,
                showDownloadIcon: false,
              }}
              className="text-white w-full"
            >
              {fileList.length < 1 && (
                <div>
                  <div style={{ marginTop: 8 }}>Upload image</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form
            layout="vertical"
            form={form}
            name="create-product-form"
            autoComplete="off"
            onFinish={handleFormSubmit}
          >
            <div className="flex flex-col items-center md:flex-row justify-between md:gap-10">
              <Form.Item
                rules={[{ required: true, message: "This field is required" }]}
                rootClassName="rm-form-input"
                name="product_name"
                className="w-full"
                label={<label className="text-white font-light">Name</label>}
              >
                <Input className="py-3" />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "This field is required" }]}
                name="product_price"
                rootClassName="rm-form-input"
                className="w-full"
                label={<label className="text-white font-light">Price</label>}
              >
                <InputNumber
                  min={1}
                  type="number"
                  max={100000}
                  defaultValue={1}
                  size="large"
                  className="w-full"
                  rootClassName="rm-input-number-btn"
                />
              </Form.Item>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between md:gap-10">
              <Form.Item
                rules={[{ required: true, message: "This field is required" }]}
                name="product_quantity"
                rootClassName="rm-form-input"
                className="w-full"
                label={
                  <label className="text-white font-light">Quantity</label>
                }
              >
                <InputNumber
                  min={1}
                  type="number"
                  max={100000}
                  defaultValue={1}
                  size="large"
                  className="w-full"
                  rootClassName="rm-input-number-btn"
                />
              </Form.Item>
              <Form.Item
                rules={[
                  { required: true, message: "This field is required" },
                  { type: "string", message: "Please enter valid brand" },
                ]}
                name="product_brand"
                rootClassName="rm-form-input"
                className="w-full"
                label={<label className="text-white font-light">Brand</label>}
              >
                <Input className="py-3" />
              </Form.Item>
            </div>
            <Form.Item
              rules={[{ required: true, message: "This field is required" }]}
              name="product_description"
              rootClassName="rm-form-input"
              className="w-full"
              label={
                <label className="text-white font-light">Description</label>
              }
            >
              <TextArea rows={4} />
            </Form.Item>
            <div className="flex items-center flex-col md:flex-row justify-between md:gap-10">
              <Form.Item
                rules={[
                  {
                    required: true,
                  },
                ]}
                rootClassName="rm-form-input"
                className="w-full"
                name="product_count_in_stock"
                label={
                  <label className="text-white font-light">
                    Count In Stock
                  </label>
                }
              >
                <InputNumber
                  min={1}
                  type="number"
                  max={100000}
                  defaultValue={1}
                  size="large"
                  className="w-full"
                  rootClassName="rm-input-number-btn"
                />
              </Form.Item>
              <Form.Item
                className="w-full"
                name="product_category"
                label={
                  <label className="text-white font-light">Category</label>
                }
                rules={[
                  {
                    required: true,
                    message: "Please select a cateogory",
                  },
                ]}
              >
                <Select
                  rootClassName="rm-categories-select"
                  defaultValue={categories[0]?.name}
                  placement="bottomRight"
                  className="h-12 text-white"
                  options={categories.map((category) => ({
                    label: category.name,
                    value: category._id,
                  }))}
                />
              </Form.Item>
            </div>

            <div className="flex gap-4 pt-5">
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => setOperation("update")}
                className="px-5 py-5 rounded-md"
              >
                {editingProduct ? (
                  <span>
                    <Spin
                      indicator={
                        <LoadingOutlined style={{ fontSize: 24 }} spin />
                      }
                    />
                    Updating...
                  </span>
                ) : (
                  "Update Product"
                )}
              </Button>
              <Button
                onClick={() => setOperation("delete")}
                className="px-5 py-5 rm-category-delete-btn rounded-md"
              >
                {deletingProduct ? (
                  <span>
                    <Spin
                      indicator={
                        <LoadingOutlined style={{ fontSize: 24 }} spin />
                      }
                    />
                    Deleting...
                  </span>
                ) : (
                  "Delete Product"
                )}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </MainLayout>
  );
};

export default UpdateProduct;
