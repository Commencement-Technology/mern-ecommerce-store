import { Upload, Form, Input, Select, UploadProps, InputNumber } from "antd";
import MainLayout from "../../components/Layouts/MainLayout";
import { useEffect, useState } from "react";
import { categoryService } from "../../services/categoryService";
import { ICategory, ProductData } from "../../types";
import { UploadFile } from "antd/es/upload/interface";
import { uploadImgService } from "../../services/uploadImageService";
import { productService } from "../../services/productService";
import Button from "../../components/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleApiStatusCode } from "../../services/utils";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const AddProduct = () => {
  const navigate = useNavigate();
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [imagePath, setImagePath] = useState<string>("");
  const [addingProduct, setAddingProduct] = useState<boolean>(false);
  const [imageUploaded, setImageUploaded] = useState<boolean>(false);
  // upload file props are available in antd
  const [fileList, setFileList] = useState<UploadFile[]>([]);

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
    fetchCategories();
  }, []);

  const handleImageUpload: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    // slice -1 returns the last item from the array
    setFileList(newFileList.slice(-1));
    const formData = new FormData();
    const file = fileList[0]?.originFileObj;
    if (file && !imagePath && !imageUploaded) {
      setImageUploaded(true);
      formData.append("image", file);
      const res = await uploadImgService.uploadImage(formData);
      const { status, data } = res;
      if (status === 200) {
        setImagePath(data?.image);
        console.log(data?.message || "Image uploaded");
      } else {
        console.error(res?.response?.data?.message || "Image upload failed");
      }
    }
  };

  const handleSubmitProductForm = async (values: any) => {
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
    setAddingProduct(true);
    const res = await productService.addProduct(productData);
    const { data, status } = handleApiStatusCode(res);
    if (status === 200 || status === 201) {
      setAddingProduct(false);
      setFileList([]);
      setImagePath("");
      toast.success(data?.message || "Product created successfully");
      form.resetFields();
      navigate("/");
    } else {
      setAddingProduct(false);
      setFileList([]);
      setImagePath("");
      toast.error(data?.errorMsg || "Product creation failed");
    }
  };

  return (
    <MainLayout>
      <div className="bg-zinc-900 min-h-screen flex items-center lg:items-start justify-start flex-col">
        <div className="pt-12 lg:pl-20 w-2/3 lg:pr-12">
          <h1 className="text-white font-medim text-xl pb-5">Create Product</h1>
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
            name="create-product-form"
            autoComplete="off"
            onFinish={(values) =>
              handleSubmitProductForm(values as ProductData)
            }
          >
            <div className="flex flex-col items-center md:flex-row justify-between md:gap-10">
              <Form.Item
                rules={[
                  { required: true, message: "This field is required" },
                  {
                    type: "string",
                    message: "Please enter valid product name",
                  },
                ]}
                rootClassName="rm-form-input"
                name="product_name"
                className="w-full"
                label={<label className="text-white font-light">Name</label>}
              >
                <Input className="py-3" />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
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
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
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
                  {
                    type: "string",
                    message: "Please enter valid brand name",
                  },
                ]}
                className="w-full"
                rootClassName="rm-form-input"
                name="product_brand"
                label={<label className="text-white font-light">Brand</label>}
              >
                <Input className="py-3" />
              </Form.Item>
            </div>
            <Form.Item
              rules={[
                { required: true, message: "This field is required" },
                {
                  type: "string",
                  message: "Please enter valid product description",
                },
              ]}
              rootClassName="rm-form-input"
              name="product_description"
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
                  // onChange={(value) => {}}
                />
              </Form.Item>
            </div>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                className="mt-5 mb-8 py-5 px-6"
              >
                {addingProduct ? (
                  <Spin
                    indicator={
                      <LoadingOutlined spin style={{ color: "white" }} />
                    }
                    size="small"
                  />
                ) : (
                  <p>Submit</p>
                )}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </MainLayout>
  );
};
